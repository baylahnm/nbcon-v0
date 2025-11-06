/**
 * Supabase Edge Functions Audit Script
 * 
 * This script audits Supabase Edge Functions logs and performance.
 * Run this after deploying to production to verify function health.
 * 
 * Usage:
 *   pnpm tsx scripts/production-validation/supabase-audit.ts
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

interface AuditResult {
  function: string;
  status: 'healthy' | 'warning' | 'error';
  metrics: {
    totalRequests: number;
    errorCount: number;
    errorRate: number;
    avgExecutionTime?: number;
    lastExecution?: string;
  };
  issues: string[];
}

async function auditEdgeFunction(functionName: string): Promise<AuditResult> {
  const issues: string[] = [];
  
  // Query audit_logs for function executions
  const { data: logs, error } = await supabase
    .from('audit_logs')
    .select('*')
    .eq('action', `edge_function:${functionName}`)
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    console.error(`Error fetching logs for ${functionName}:`, error);
    return {
      function: functionName,
      status: 'error',
      metrics: {
        totalRequests: 0,
        errorCount: 0,
        errorRate: 0,
      },
      issues: [`Failed to fetch logs: ${error.message}`],
    };
  }

  const totalRequests = logs?.length || 0;
  const errorLogs = logs?.filter(log => 
    log.metadata?.error || 
    log.metadata?.status_code >= 400
  ) || [];
  const errorCount = errorLogs.length;
  const errorRate = totalRequests > 0 ? (errorCount / totalRequests) * 100 : 0;

  // Check error rate
  if (errorRate > 5) {
    issues.push(`High error rate: ${errorRate.toFixed(2)}%`);
  }

  // Check recent execution
  const lastExecution = logs?.[0]?.created_at;
  if (!lastExecution) {
    issues.push('No recent executions found');
  } else {
    const lastExecDate = new Date(lastExecution);
    const hoursSinceLastExec = (Date.now() - lastExecDate.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceLastExec > 24 && functionName === 'lifecycle-cron') {
      issues.push(`Lifecycle cron not executed in ${hoursSinceLastExec.toFixed(1)} hours`);
    }
  }

  // Determine status
  let status: 'healthy' | 'warning' | 'error' = 'healthy';
  if (errorRate > 10 || issues.length > 2) {
    status = 'error';
  } else if (errorRate > 5 || issues.length > 0) {
    status = 'warning';
  }

  return {
    function: functionName,
    status,
    metrics: {
      totalRequests,
      errorCount,
      errorRate: parseFloat(errorRate.toFixed(2)),
      lastExecution: lastExecution || undefined,
    },
    issues,
  };
}

async function auditBillingEvents() {
  console.log('\n📊 Billing Events Audit:');
  console.log('='.repeat(50));

  // Check recent billing events
  const { data: events, error } = await supabase
    .from('billing_events')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('❌ Failed to fetch billing events:', error);
    return;
  }

  if (!events || events.length === 0) {
    console.log('⚠️  No billing events found');
    return;
  }

  const eventTypes = events.reduce((acc, event) => {
    acc[event.event_type] = (acc[event.event_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log(`Total events: ${events.length}`);
  console.log('Event types:');
  Object.entries(eventTypes).forEach(([type, count]) => {
    console.log(`  - ${type}: ${count}`);
  });

  const recentErrors = events.filter(e => e.metadata?.error);
  if (recentErrors.length > 0) {
    console.log(`\n⚠️  Found ${recentErrors.length} billing events with errors`);
  }
}

async function auditChurnReports() {
  console.log('\n📈 Churn Reports Audit:');
  console.log('='.repeat(50));

  // Check for monthly churn reports in audit_logs
  const { data: reports, error } = await supabase
    .from('audit_logs')
    .select('*')
    .eq('action', 'monthly_churn_report')
    .order('created_at', { ascending: false })
    .limit(12); // Last 12 months

  if (error) {
    console.error('❌ Failed to fetch churn reports:', error);
    return;
  }

  if (!reports || reports.length === 0) {
    console.log('⚠️  No churn reports found');
    console.log('   This is normal if lifecycle-cron has not run yet');
    return;
  }

  console.log(`Found ${reports.length} churn report(s)`);
  reports.forEach((report, index) => {
    const data = report.metadata?.churn_report || {};
    console.log(`\nReport ${index + 1} (${report.created_at}):`);
    console.log(`  Total users: ${data.total_users || 'N/A'}`);
    console.log(`  Active subscriptions: ${data.active_subscriptions || 'N/A'}`);
    console.log(`  Cancelled this month: ${data.cancelled_this_month || 'N/A'}`);
    console.log(`  Retention rate: ${data.retention_rate ? `${data.retention_rate}%` : 'N/A'}`);
  });
}

async function runAudit() {
  console.log('🔍 Starting Supabase Edge Functions Audit\n');

  const functions = [
    'stripe-checkout',
    'stripe-webhook',
    'stripe-portal',
    'lifecycle-cron',
  ];

  const results: AuditResult[] = [];

  for (const func of functions) {
    console.log(`Auditing ${func}...`);
    const result = await auditEdgeFunction(func);
    results.push(result);
  }

  // Print results
  console.log('\n📊 Audit Results Summary:');
  console.log('='.repeat(50));

  results.forEach((result) => {
    const icon = result.status === 'healthy' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';
    console.log(`\n${icon} ${result.function}`);
    console.log(`   Status: ${result.status}`);
    console.log(`   Total requests: ${result.metrics.totalRequests}`);
    console.log(`   Error count: ${result.metrics.errorCount}`);
    console.log(`   Error rate: ${result.metrics.errorRate}%`);
    if (result.metrics.lastExecution) {
      console.log(`   Last execution: ${result.metrics.lastExecution}`);
    }
    if (result.issues.length > 0) {
      console.log(`   Issues:`);
      result.issues.forEach(issue => console.log(`     - ${issue}`));
    }
  });

  // Audit billing events
  await auditBillingEvents();

  // Audit churn reports
  await auditChurnReports();

  // Summary
  const healthyCount = results.filter(r => r.status === 'healthy').length;
  const warningCount = results.filter(r => r.status === 'warning').length;
  const errorCount = results.filter(r => r.status === 'error').length;

  console.log('\n' + '='.repeat(50));
  console.log('Summary:');
  console.log(`  ✅ Healthy: ${healthyCount}`);
  console.log(`  ⚠️  Warnings: ${warningCount}`);
  console.log(`  ❌ Errors: ${errorCount}`);

  if (errorCount === 0 && warningCount === 0) {
    console.log('\n🎉 All Edge Functions are healthy!');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some functions need attention. Review logs in Supabase Dashboard.');
    process.exit(1);
  }
}

// Run audit
runAudit().catch((error) => {
  console.error('❌ Audit failed:', error);
  process.exit(1);
});


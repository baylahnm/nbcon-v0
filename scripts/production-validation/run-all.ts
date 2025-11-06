/**
 * Run All Production Validation Scripts
 * 
 * This script runs all validation scripts in sequence.
 * 
 * Usage:
 *   pnpm tsx scripts/production-validation/run-all.ts
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const scripts = [
  {
    name: 'Stripe Webhook Tests',
    path: 'scripts/production-validation/stripe-webhook-test.ts',
    required: true,
  },
  {
    name: 'Supabase Audit',
    path: 'scripts/production-validation/supabase-audit.ts',
    required: true,
  },
  {
    name: 'Cloudflare QA',
    path: 'scripts/production-validation/cloudflare-qa.ts',
    required: true,
  },
];

async function runScript(script: { name: string; path: string; required: boolean }) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Running: ${script.name}`);
  console.log('='.repeat(60));

  try {
    const { stdout, stderr } = await execAsync(`pnpm tsx ${script.path}`);
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    return { success: true, script: script.name };
  } catch (error: any) {
    console.error(`❌ ${script.name} failed:`, error.message);
    if (script.required) {
      return { success: false, script: script.name, required: true };
    }
    return { success: false, script: script.name, required: false };
  }
}

async function main() {
  console.log('🚀 Starting Production Validation Suite');
  console.log(`Time: ${new Date().toISOString()}\n`);

  const results = [];

  for (const script of scripts) {
    const result = await runScript(script);
    results.push(result);

    if (!result.success && result.required) {
      console.error(`\n❌ Required script failed: ${script.name}`);
      console.log('Stopping validation suite.');
      process.exit(1);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Validation Suite Summary');
  console.log('='.repeat(60));

  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  results.forEach((result) => {
    console.log(`${result.success ? '✅' : '❌'} ${result.script}`);
  });

  console.log(`\nTotal: ${passed}/${results.length} passed, ${failed} failed`);

  if (failed === 0) {
    console.log('\n🎉 All validation scripts passed!');
    console.log('✅ Production environment is healthy.');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some validation scripts failed.');
    console.log('Review the output above and fix issues.');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('❌ Validation suite failed:', error);
  process.exit(1);
});


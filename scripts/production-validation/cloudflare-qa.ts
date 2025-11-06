/**
 * Cloudflare Deployment & QA Validation Script
 * 
 * This script validates Cloudflare Pages deployment and runs QA checks.
 * Run this after deploying to production.
 * 
 * Usage:
 *   pnpm tsx scripts/production-validation/cloudflare-qa.ts
 */

const PRODUCTION_URL = process.env.PRODUCTION_URL || 'https://app.nbcon.pro';
const SENTRY_DSN = process.env.SENTRY_DSN || '';

interface QAResult {
  test: string;
  passed: boolean;
  message: string;
  details?: any;
}

const results: QAResult[] = [];

async function testEndpoint(path: string, expectedStatus: number = 200): Promise<QAResult> {
  try {
    const response = await fetch(`${PRODUCTION_URL}${path}`, {
      method: 'GET',
      headers: {
        'Accept': 'text/html',
      },
    });

    const passed = response.status === expectedStatus;
    return {
      test: `GET ${path}`,
      passed,
      message: passed
        ? `✅ Status ${response.status}`
        : `❌ Expected ${expectedStatus}, got ${response.status}`,
      details: {
        status: response.status,
        contentType: response.headers.get('content-type'),
      },
    };
  } catch (error: any) {
    return {
      test: `GET ${path}`,
      passed: false,
      message: `❌ Request failed: ${error.message}`,
      details: { error: error.message },
    };
  }
}

async function testAPIEndpoint(path: string): Promise<QAResult> {
  try {
    const response = await fetch(`${PRODUCTION_URL}${path}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const passed = response.status < 500; // Accept 4xx as valid (auth required, etc.)
    return {
      test: `API ${path}`,
      passed,
      message: passed
        ? `✅ Status ${response.status}`
        : `❌ Server error: ${response.status}`,
      details: {
        status: response.status,
      },
    };
  } catch (error: any) {
    return {
      test: `API ${path}`,
      passed: false,
      message: `❌ Request failed: ${error.message}`,
    };
  }
}

async function testHTTPS(): Promise<QAResult> {
  try {
    const response = await fetch(PRODUCTION_URL, {
      method: 'HEAD',
      redirect: 'follow',
    });

    const url = response.url;
    const isHTTPS = url.startsWith('https://');
    
    return {
      test: 'HTTPS Redirect',
      passed: isHTTPS,
      message: isHTTPS
        ? '✅ HTTPS enabled'
        : '❌ Not using HTTPS',
      details: { finalUrl: url },
    };
  } catch (error: any) {
    return {
      test: 'HTTPS Redirect',
      passed: false,
      message: `❌ Failed to check HTTPS: ${error.message}`,
    };
  }
}

async function testCoreWebVitals(): Promise<QAResult> {
  // This would ideally use Lighthouse CI or similar
  // For now, we'll check that the page loads
  try {
    const startTime = Date.now();
    const response = await fetch(PRODUCTION_URL);
    const endTime = Date.now();
    const loadTime = endTime - startTime;

    const passed = loadTime < 3000; // Target: < 3 seconds
    
    return {
      test: 'Page Load Performance',
      passed,
      message: passed
        ? `✅ Page loaded in ${loadTime}ms`
        : `⚠️  Page load time: ${loadTime}ms (target: <3000ms)`,
      details: { loadTime },
    };
  } catch (error: any) {
    return {
      test: 'Page Load Performance',
      passed: false,
      message: `❌ Failed to measure performance: ${error.message}`,
    };
  }
}

async function testSentryIntegration(): Promise<QAResult> {
  if (!SENTRY_DSN) {
    return {
      test: 'Sentry Integration',
      passed: true,
      message: '⚠️  Sentry DSN not configured (skipped)',
    };
  }

  // Check if Sentry is included in the page
  try {
    const response = await fetch(PRODUCTION_URL);
    const html = await response.text();
    
    const hasSentry = html.includes('sentry') || html.includes('SENTRY_DSN');
    
    return {
      test: 'Sentry Integration',
      passed: hasSentry,
      message: hasSentry
        ? '✅ Sentry detected in page'
        : '⚠️  Sentry not detected (may be loaded dynamically)',
    };
  } catch (error: any) {
    return {
      test: 'Sentry Integration',
      passed: false,
      message: `❌ Failed to check Sentry: ${error.message}`,
    };
  }
}

async function testBuildArtifacts(): Promise<QAResult> {
  try {
    // Check that Next.js static files are served
    const response = await fetch(`${PRODUCTION_URL}/_next/static/chunks/webpack.js`, {
      method: 'HEAD',
    });

    const passed = response.status === 200;
    
    return {
      test: 'Build Artifacts',
      passed,
      message: passed
        ? '✅ Build artifacts accessible'
        : '❌ Build artifacts not found',
      details: { status: response.status },
    };
  } catch (error: any) {
    return {
      test: 'Build Artifacts',
      passed: false,
      message: `❌ Failed to check artifacts: ${error.message}`,
    };
  }
}

async function runQA() {
  console.log('🧪 Starting Cloudflare Deployment & QA Validation\n');
  console.log(`Production URL: ${PRODUCTION_URL}\n`);

  // Test HTTPS
  console.log('Testing HTTPS...');
  results.push(await testHTTPS());

  // Test main pages
  console.log('Testing main pages...');
  results.push(await testEndpoint('/', 200));
  results.push(await testEndpoint('/docs', 200));
  results.push(await testEndpoint('/auth/login', 200));
  results.push(await testEndpoint('/auth/signup', 200));

  // Test API endpoints
  console.log('Testing API endpoints...');
  results.push(await testAPIEndpoint('/api/health'));
  results.push(await testAPIEndpoint('/api/ai/run')); // Should return 401 or 405

  // Test build artifacts
  console.log('Testing build artifacts...');
  results.push(await testBuildArtifacts());

  // Test performance
  console.log('Testing performance...');
  results.push(await testCoreWebVitals());

  // Test Sentry
  console.log('Testing Sentry integration...');
  results.push(await testSentryIntegration());

  // Print results
  console.log('\n📊 QA Results Summary:');
  console.log('='.repeat(50));

  results.forEach((result) => {
    console.log(`${result.passed ? '✅' : '❌'} ${result.test}`);
    console.log(`   ${result.message}`);
    if (result.details && !result.passed) {
      console.log(`   Details: ${JSON.stringify(result.details, null, 2)}`);
    }
  });

  const passedCount = results.filter(r => r.passed).length;
  const totalCount = results.length;

  console.log('\n' + '='.repeat(50));
  console.log(`Total: ${passedCount}/${totalCount} tests passed`);

  if (passedCount === totalCount) {
    console.log('🎉 All QA tests passed!');
    process.exit(0);
  } else {
    console.log('⚠️  Some tests failed. Review deployment and fix issues.');
    process.exit(1);
  }
}

// Run QA
runQA().catch((error) => {
  console.error('❌ QA execution failed:', error);
  process.exit(1);
});


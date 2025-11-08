# Environment Variables Verification (PowerShell)
# Run this in PowerShell to verify your .env.local is set up correctly

Write-Host "=== Environment Variables Verification ===" -ForegroundColor Cyan
Write-Host ""

# Check if .env.local exists
$envFile = "apps/web/.env.local"
if (-not (Test-Path $envFile)) {
    Write-Host "❌ ERROR: $envFile file not found!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ .env.local file exists" -ForegroundColor Green
Write-Host ""

# Read .env.local file
$envContent = Get-Content $envFile | Where-Object { $_ -match '^[^#].*=' }

# Parse variables
$envVars = @{}
foreach ($line in $envContent) {
    if ($line -match '^([^=]+)=(.*)$') {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim()
        $envVars[$key] = $value
    }
}

# Critical variables
Write-Host "=== Critical Variables (App won't start without these) ===" -ForegroundColor Yellow
Write-Host ""

if (-not $envVars.ContainsKey("NEXT_PUBLIC_SUPABASE_URL") -or [string]::IsNullOrWhiteSpace($envVars["NEXT_PUBLIC_SUPABASE_URL"])) {
    Write-Host "❌ NEXT_PUBLIC_SUPABASE_URL is missing" -ForegroundColor Red
} else {
    Write-Host "✅ NEXT_PUBLIC_SUPABASE_URL is set" -ForegroundColor Green
}

if (-not $envVars.ContainsKey("NEXT_PUBLIC_SUPABASE_ANON_KEY") -or [string]::IsNullOrWhiteSpace($envVars["NEXT_PUBLIC_SUPABASE_ANON_KEY"])) {
    Write-Host "❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing" -ForegroundColor Red
} else {
    Write-Host "✅ NEXT_PUBLIC_SUPABASE_ANON_KEY is set" -ForegroundColor Green
}

if (-not $envVars.ContainsKey("SUPABASE_SERVICE_ROLE_KEY") -or [string]::IsNullOrWhiteSpace($envVars["SUPABASE_SERVICE_ROLE_KEY"])) {
    Write-Host "⚠️  SUPABASE_SERVICE_ROLE_KEY is missing (server-side operations won't work)" -ForegroundColor Yellow
} else {
    Write-Host "✅ SUPABASE_SERVICE_ROLE_KEY is set" -ForegroundColor Green
}

if (-not $envVars.ContainsKey("OPENAI_API_KEY") -or [string]::IsNullOrWhiteSpace($envVars["OPENAI_API_KEY"])) {
    Write-Host "⚠️  OPENAI_API_KEY is missing (AI chat features won't work)" -ForegroundColor Yellow
} else {
    Write-Host "✅ OPENAI_API_KEY is set" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Important Variables (Features won't work without these) ===" -ForegroundColor Yellow
Write-Host ""

if (-not $envVars.ContainsKey("NEXT_PUBLIC_STRIPE_PUBLIC_KEY") -or [string]::IsNullOrWhiteSpace($envVars["NEXT_PUBLIC_STRIPE_PUBLIC_KEY"])) {
    Write-Host "⚠️  NEXT_PUBLIC_STRIPE_PUBLIC_KEY is missing (billing features won't work)" -ForegroundColor Yellow
} else {
    Write-Host "✅ NEXT_PUBLIC_STRIPE_PUBLIC_KEY is set" -ForegroundColor Green
}

if (-not $envVars.ContainsKey("STRIPE_SECRET_KEY") -or [string]::IsNullOrWhiteSpace($envVars["STRIPE_SECRET_KEY"])) {
    Write-Host "⚠️  STRIPE_SECRET_KEY is missing (billing features won't work)" -ForegroundColor Yellow
} else {
    Write-Host "✅ STRIPE_SECRET_KEY is set" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Verification Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "1. Restart dev server: pnpm dev" -ForegroundColor Gray
Write-Host "2. Check browser console for errors" -ForegroundColor Gray
Write-Host "3. Test Supabase connection" -ForegroundColor Gray
Write-Host "4. Test AI chat (if OpenAI key is set)" -ForegroundColor Gray


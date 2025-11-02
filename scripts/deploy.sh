#!/bin/bash

# NBCON PRO Deployment Script
set -e

echo "🚀 Starting NBCON PRO deployment..."

# Check prerequisites
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm not found. Please install pnpm first."
    exit 1
fi

if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Please install Supabase CLI first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Run tests
echo "🧪 Running tests..."
pnpm test

# Type check
echo "🔍 Type checking..."
pnpm typecheck

# Build
echo "🏗️  Building application..."
pnpm build

# Deploy Supabase
echo "🗄️  Deploying Supabase migrations..."
pnpm migrate

echo "⚡ Deploying Supabase Edge Functions..."
supabase functions deploy stripe-checkout
supabase functions deploy stripe-webhook
supabase functions deploy lifecycle-cron

# Build web app
echo "🌐 Building web application..."
pnpm --filter @nbcon/web build

echo "✅ Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Deploy to Cloudflare Pages (manual or via CI/CD)"
echo "2. Verify Edge Functions in Supabase dashboard"
echo "3. Test production endpoints"
echo "4. Monitor PostHog and Sentry for errors"


# Environment Variables Verification Script
# Run this to verify your .env.local is set up correctly

echo "=== Environment Variables Verification ==="
echo ""

# Check if .env.local exists
if [ ! -f "apps/web/.env.local" ]; then
  echo "❌ ERROR: apps/web/.env.local file not found!"
  exit 1
fi

echo "✅ .env.local file exists"
echo ""

# Load environment variables
set -a
source apps/web/.env.local
set +a

# Critical variables
echo "=== Critical Variables (App won't start without these) ==="
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
  echo "❌ NEXT_PUBLIC_SUPABASE_URL is missing"
else
  echo "✅ NEXT_PUBLIC_SUPABASE_URL is set"
fi

if [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
  echo "❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing"
else
  echo "✅ NEXT_PUBLIC_SUPABASE_ANON_KEY is set"
fi

if [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  echo "⚠️  SUPABASE_SERVICE_ROLE_KEY is missing (server-side operations won't work)"
else
  echo "✅ SUPABASE_SERVICE_ROLE_KEY is set"
fi

if [ -z "$OPENAI_API_KEY" ]; then
  echo "⚠️  OPENAI_API_KEY is missing (AI chat features won't work)"
else
  echo "✅ OPENAI_API_KEY is set"
fi

echo ""
echo "=== Important Variables (Features won't work without these) ==="
if [ -z "$NEXT_PUBLIC_STRIPE_PUBLIC_KEY" ]; then
  echo "⚠️  NEXT_PUBLIC_STRIPE_PUBLIC_KEY is missing (billing features won't work)"
else
  echo "✅ NEXT_PUBLIC_STRIPE_PUBLIC_KEY is set"
fi

if [ -z "$STRIPE_SECRET_KEY" ]; then
  echo "⚠️  STRIPE_SECRET_KEY is missing (billing features won't work)"
else
  echo "✅ STRIPE_SECRET_KEY is set"
fi

echo ""
echo "=== Verification Complete ==="
echo ""
echo "Next steps:"
echo "1. Restart dev server: pnpm dev"
echo "2. Check browser console for errors"
echo "3. Test Supabase connection"
echo "4. Test AI chat (if OpenAI key is set)"


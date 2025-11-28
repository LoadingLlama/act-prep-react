#!/bin/bash

# 🔧 Automated Stripe Integration Deployment Script
# This script deploys your Stripe edge functions to Supabase

set -e  # Exit on any error

echo "🚀 Starting Stripe Integration Deployment..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Error: Supabase CLI not found${NC}"
    echo "Install it with: brew install supabase/tap/supabase"
    exit 1
fi

echo -e "${GREEN}✅ Supabase CLI found${NC}"
echo ""

# Check if user is logged in
echo "📋 Checking Supabase login status..."
if ! supabase projects list &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Supabase${NC}"
    echo "Logging you in now..."
    supabase login
fi

echo -e "${GREEN}✅ Logged in to Supabase${NC}"
echo ""

# Link project
echo "🔗 Linking to Supabase project..."
if ! supabase link --project-ref rabavobdklnwvwsldbix; then
    echo -e "${RED}❌ Failed to link project${NC}"
    echo "You may need to enter your database password: Minecraft12!"
    exit 1
fi

echo -e "${GREEN}✅ Project linked${NC}"
echo ""

# Prompt for Stripe Secret Key
echo "🔑 Setting up environment variables..."
echo ""
echo -e "${YELLOW}Please enter your Stripe Secret Key (starts with sk_test_...):${NC}"
echo "Get it from: https://dashboard.stripe.com/test/apikeys"
read -p "Stripe Secret Key: " STRIPE_SECRET_KEY

if [[ -z "$STRIPE_SECRET_KEY" ]]; then
    echo -e "${RED}❌ Stripe Secret Key is required${NC}"
    exit 1
fi

# Set Stripe secret
echo "Setting STRIPE_SECRET_KEY..."
supabase secrets set STRIPE_SECRET_KEY="$STRIPE_SECRET_KEY"

# Note: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are automatically available to edge functions

echo -e "${GREEN}✅ Environment variables set${NC}"
echo ""

# Deploy functions
echo "📦 Deploying Edge Functions..."
echo ""

echo "Deploying create-checkout-session..."
supabase functions deploy create-checkout-session --no-verify-jwt

echo ""
echo "Deploying create-portal-session..."
supabase functions deploy create-portal-session --no-verify-jwt

echo ""
echo "Deploying stripe-webhook..."
supabase functions deploy stripe-webhook --no-verify-jwt

echo ""
echo -e "${GREEN}✅ All functions deployed successfully!${NC}"
echo ""

# Print webhook URL
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo ""
echo "Next steps:"
echo ""
echo "1. Set up Stripe Webhook:"
echo "   • Go to: https://dashboard.stripe.com/test/webhooks"
echo "   • Click: '+ Add endpoint'"
echo "   • Endpoint URL: ${YELLOW}https://rabavobdklnwvwsldbix.supabase.co/functions/v1/stripe-webhook${NC}"
echo "   • Select events:"
echo "     - checkout.session.completed"
echo "     - customer.subscription.updated"
echo "     - customer.subscription.deleted"
echo "     - invoice.payment_failed"
echo ""
echo "2. After creating the webhook, copy the webhook signing secret and run:"
echo "   ${YELLOW}supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET${NC}"
echo ""
echo "3. Test the integration:"
echo "   • Go to: http://localhost:3000/app/upgrade"
echo "   • Click 'Start Pro Now'"
echo "   • Use test card: 4242 4242 4242 4242"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}✅ Your Stripe integration is now ready!${NC}"
echo ""

# Ask if user wants to open Stripe Dashboard
read -p "Open Stripe Dashboard to set up webhook? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    open "https://dashboard.stripe.com/test/webhooks/create?endpoint_location=off_session"
fi

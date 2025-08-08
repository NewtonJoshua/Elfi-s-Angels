#!/bin/bash

# ============================================
# 🔍 DNS Conflict Checker for elfisangels.com
# ============================================
# This script checks if DNS conflicts are resolved

echo "🔍 Checking DNS configuration for elfisangels.com..."
echo "================================================"

echo ""
echo "📋 Current A Records:"
echo "----------------------------------------------"
dig elfisangels.com A +short

echo ""
echo "📋 Expected Firebase IPs:"
echo "----------------------------------------------"
echo "151.101.1.195"
echo "151.101.65.195"

echo ""
echo "📋 Analysis:"
echo "----------------------------------------------"

# Get current IPs
CURRENT_IPS=$(dig elfisangels.com A +short | sort)
EXPECTED_IPS="151.101.1.195
151.101.65.195"

echo "Current IPs:"
echo "$CURRENT_IPS"

echo ""
echo "Expected IPs:"
echo "$EXPECTED_IPS"

echo ""
if [ "$CURRENT_IPS" = "$(echo "$EXPECTED_IPS" | sort)" ]; then
    echo "✅ DNS is CORRECT! Only Firebase IPs found."
    echo "   You can now retry domain setup in Firebase Console."
else
    echo "❌ DNS CONFLICT detected!"
    echo ""
    echo "🚨 Action Required:"
    echo "1. Go to GoDaddy DNS management"
    echo "2. Delete ALL A records for @ and www"
    echo "3. Add ONLY these Firebase A records:"
    echo "   @ → 151.101.1.195"
    echo "   @ → 151.101.65.195"
    echo "   www → 151.101.1.195"
    echo "   www → 151.101.65.195"
    echo "4. Wait 30-60 minutes"
    echo "5. Run this script again"
fi

echo ""
echo "🔗 Useful Tools:"
echo "• Check DNS propagation: https://www.whatsmydns.net/#A/elfisangels.com"
echo "• GoDaddy DNS: https://dcc.godaddy.com/manage/elfisangels.com/dns"
echo "• Firebase Console: https://console.firebase.google.com/project/elfis-poodles/hosting/main"

echo ""
echo "================================================"

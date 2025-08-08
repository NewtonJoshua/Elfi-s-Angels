#!/bin/bash

# ============================================
# 🌐 Custom Domain Setup Script for elfisangels.com
# ============================================
# This script helps set up your custom domain with Firebase Hosting
# and provides all necessary DNS configuration details

echo "🌐 Setting up elfisangels.com domain for Firebase Hosting..."
echo "================================================"

# STEP 1: Open Firebase Console
echo "📋 STEP 1: Add Custom Domain in Firebase Console"
echo "----------------------------------------------"
echo "🔗 Opening Firebase Hosting console..."

# Open Firebase console
firebase open hosting

echo ""
echo "In the Firebase Console that just opened:"
echo "1. Click 'Add custom domain'"
echo "2. Enter: elfisangels.com"
echo "3. Click 'Continue'"
echo "4. Copy the TXT record for domain verification"
echo ""

# STEP 2: DNS Configuration Guide
echo "📋 STEP 2: Configure DNS in GoDaddy"
echo "----------------------------------------------"
echo ""
echo "🔍 DNS Records to add in GoDaddy:"
echo ""
echo "1️⃣  DOMAIN VERIFICATION (TXT Record):"
echo "   Type: TXT"
echo "   Host: @"
echo "   Value: [Copy from Firebase Console - will look like: firebase=elfis-poodles-abc123]"
echo "   TTL: 600"
echo ""
echo "2️⃣  MAIN DOMAIN (A Records):"
echo "   Type: A"
echo "   Host: @"
echo "   Value: 151.101.1.195"
echo "   TTL: 600"
echo ""
echo "   Type: A"
echo "   Host: @"
echo "   Value: 151.101.65.195"
echo "   TTL: 600"
echo ""
echo "3️⃣  WWW SUBDOMAIN (A Records):"
echo "   Type: A"
echo "   Host: www"
echo "   Value: 151.101.1.195"
echo "   TTL: 600"
echo ""
echo "   Type: A"
echo "   Host: www"
echo "   Value: 151.101.65.195"
echo "   TTL: 600"
echo ""

# STEP 3: GoDaddy Setup Instructions
echo "📋 STEP 3: GoDaddy Setup Instructions"
echo "----------------------------------------------"
echo ""
echo "🔗 GoDaddy DNS Management:"
echo "1. Go to: https://dcc.godaddy.com/manage/"
echo "2. Select domain: elfisangels.com"
echo "3. Click 'DNS' → 'Manage Zones'"
echo "4. Delete any existing @ and www A/CNAME records"
echo "5. Add the DNS records listed above"
echo ""

# STEP 4: Verification
echo "📋 STEP 4: Verification & Testing"
echo "----------------------------------------------"
echo ""
echo "⏱️  Wait for DNS propagation (15 minutes - 2 hours)"
echo "🔍 Check DNS propagation:"
echo "   • https://www.whatsmydns.net/#A/elfisangels.com"
echo "   • dig elfisangels.com"
echo "   • nslookup elfisangels.com"
echo ""

# STEP 5: Update Website Code
echo "📋 STEP 5: Update Website Code (after domain is active)"
echo "----------------------------------------------"
echo ""
echo "Once elfisangels.com is working, run:"
echo "   ./deployment/update-domain.sh"
echo ""

echo "================================================"
echo "🎉 Custom Domain Setup Guide Complete!"
echo ""
echo "📞 Need Help?"
echo "   • Firebase Support: https://firebase.google.com/support/"
echo "   • GoDaddy Support: https://www.godaddy.com/help"
echo "   • DNS Checker: https://www.whatsmydns.net/"
echo ""
echo "🐾 Soon: https://elfisangels.com will showcase your"
echo "   premium Mini Poodle puppies to the world!"
echo "================================================"

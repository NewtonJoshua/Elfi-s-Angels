#!/bin/bash

# ============================================
# 🔄 Domain Update Script - elfisangels.com
# ============================================
# This script updates all references from elfis-poodles.web.app
# to elfisangels.com after the custom domain is active

echo "🔄 Updating website references to elfisangels.com..."
echo "================================================"

# Backup current files before making changes
echo "📋 Creating backup..."
cp index.html index.html.backup
echo "✅ Backup created: index.html.backup"

# STEP 1: Update Structured Data
echo ""
echo "📋 STEP 1: Updating Structured Data (JSON-LD)..."

# Update URL in structured data
sed -i '' 's|https://elfis-poodles\.web\.app|https://elfisangels.com|g' index.html

# Update image references in structured data
sed -i '' 's|"https://elfisangels\.com/logo\.svg"|"https://elfisangels.com/src/icons/logo.svg"|g' index.html

echo "✅ Structured data updated"

# STEP 2: Update Open Graph Meta Tags
echo ""
echo "📋 STEP 2: Updating Open Graph Meta Tags..."

# Already updated by the global replace above
echo "✅ Open Graph tags updated"

# STEP 3: Update Canonical URL
echo ""
echo "📋 STEP 3: Updating Canonical URL..."

# Already updated by the global replace above
echo "✅ Canonical URL updated"

# STEP 4: Update Privacy Policy Link
echo ""
echo "📋 STEP 4: Updating Privacy Policy Link..."

# Update privacy policy references
sed -i '' 's|https://elfis-poodles\.web\.app/privacy-policy\.html|https://elfisangels.com/privacy-policy.html|g' index.html

echo "✅ Privacy Policy link updated"

# STEP 5: Update deployment script success message
echo ""
echo "📋 STEP 5: Updating deployment script..."

# Update deployment script to show new domain
sed -i '' 's|🌐 Website: https://elfis-poodles\.web\.app|🌐 Website: https://elfisangels.com|g' deployment/deploy.sh
sed -i '' 's|🔒 Privacy Policy: https://elfis-poodles\.web\.app/privacy-policy\.html|🔒 Privacy Policy: https://elfisangels.com/privacy-policy.html|g' deployment/deploy.sh

echo "✅ Deployment script updated"

# STEP 6: Verify changes
echo ""
echo "📋 STEP 6: Verifying changes..."

echo ""
echo "🔍 Updated references found:"
grep -n "elfisangels.com" index.html | head -5
echo ""

# STEP 7: Google Analytics Update Notice
echo "📋 STEP 7: Google Analytics Update Required"
echo "----------------------------------------------"
echo ""
echo "⚠️  IMPORTANT: Update Google Analytics 4 settings:"
echo ""
echo "1. Go to: https://analytics.google.com"
echo "2. Select property: G-3HXJK8QRWM"
echo "3. Go to Admin → Property → Property Details"
echo "4. Update Website URL from:"
echo "   https://elfis-poodles.web.app"
echo "   ↓ TO ↓"
echo "   https://elfisangels.com"
echo ""
echo "5. Go to Admin → Data Streams → Web"
echo "6. Click your data stream"
echo "7. Update Website URL to: https://elfisangels.com"
echo ""

# STEP 8: Deploy updated website
echo "📋 STEP 8: Deploy Updated Website"
echo "----------------------------------------------"
echo ""
echo "Run the following command to deploy the updated website:"
echo "   ./deployment/deploy.sh"
echo ""

echo "================================================"
echo "✅ Domain Update Complete!"
echo ""
echo "📋 Summary of changes:"
echo "   • Structured data URLs updated"
echo "   • Open Graph meta tags updated"
echo "   • Canonical URL updated"
echo "   • Privacy policy links updated"
echo "   • Deployment script updated"
echo ""
echo "🔄 Next Steps:"
echo "   1. Deploy updated website"
echo "   2. Test https://elfisangels.com"
echo "   3. Update Google Analytics settings"
echo "   4. Update Google Search Console"
echo "   5. Update social media profiles"
echo ""
echo "🎉 Your premium Mini Poodle website is ready for"
echo "   the new domain: https://elfisangels.com! 🐾"
echo "================================================"

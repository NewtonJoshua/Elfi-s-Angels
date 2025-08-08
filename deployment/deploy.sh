#!/bin/bash

# ============================================
# 🐾 Elfi's Angels - Firebase Deployment Script
# ============================================
# Automated deployment script for Firebase Hosting
# This script performs safety checks and deploys the website
# to https://elfis-poodles.web.app
# 
# Usage: ./deployment/deploy.sh
# 
# Requirements:
# - Firebase CLI installed (npm install -g firebase-tools)
# - Firebase authentication (firebase login)
# - Valid firebase.json configuration
# ============================================

# Display deployment header with branding
echo "🐾 Deploying Elfi's Angels Website to Firebase..."
echo "================================================"

# ============================================
# STEP 1: Check Firebase CLI Installation
# ============================================
# Verify that Firebase CLI is available on the system
# Exit with error if not found
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Please install it first:"
    echo "npm install -g firebase-tools"
    exit 1
fi

# ============================================
# STEP 2: Check Firebase Authentication
# ============================================
# Verify user is logged into Firebase
# This prevents deployment failures due to auth issues
echo "🔐 Checking Firebase authentication..."
if ! firebase projects:list &> /dev/null; then
    echo "❌ Not logged in to Firebase. Please run:"
    echo "firebase login"
    exit 1
fi

# ============================================
# STEP 3: Validate Project Files
# ============================================
# Check for essential files before deployment
# This prevents deploying incomplete or broken sites
echo "🔍 Checking project files..."

# Check for main HTML file
if [ ! -f "index.html" ]; then
    echo "❌ index.html not found!"
    echo "Make sure you're running this from the project root directory"
    exit 1
fi

# Check for source directory
if [ ! -d "src" ]; then
    echo "❌ src directory not found!"
    echo "Source files (CSS, JS, images) should be in the src/ directory"
    exit 1
fi

# Check for essential CSS files
if [ ! -f "src/css/styles.css" ]; then
    echo "❌ Main stylesheet (src/css/styles.css) not found!"
    exit 1
fi

# Check for essential JavaScript files
if [ ! -f "src/js/script.js" ]; then
    echo "❌ Main script file (src/js/script.js) not found!"
    exit 1
fi

# Check for Firebase configuration
if [ ! -f "firebase.json" ]; then
    echo "❌ firebase.json configuration not found!"
    exit 1
fi

# Check for Google Analytics setup
echo "🔍 Verifying Google Analytics configuration..."
if grep -q "G-3HXJK8QRWM" index.html; then
    echo "✅ Google Analytics 4 tracking ID found"
else
    echo "⚠️  Warning: Google Analytics tracking ID not found in index.html"
fi

# Check for privacy policy
if [ ! -f "privacy-policy.html" ]; then
    echo "⚠️  Warning: privacy-policy.html not found (recommended for GDPR compliance)"
else
    echo "✅ Privacy policy found"
fi

echo "✅ All required files found"

# ============================================
# STEP 4: Deploy to Firebase Hosting
# ============================================
# Deploy the website to Firebase Hosting
# This uploads all files and updates the live site
echo "🚀 Deploying to Firebase Hosting..."
echo "This may take a few moments..."

# Execute the deployment command
# --only hosting: Deploy only hosting (not functions, database, etc.)
firebase deploy --only hosting

# ============================================
# STEP 5: Check Deployment Status
# ============================================
# Verify deployment was successful and provide feedback
if [ $? -eq 0 ]; then
    echo ""
    echo "================================================"
    echo "✅ Deployment successful!"
    echo "🌐 Website: https://elfis-poodles.web.app"
    echo "� Google Analytics: https://analytics.google.com (Property: G-3HXJK8QRWM)"
    echo "🔒 Privacy Policy: https://elfis-poodles.web.app/privacy-policy.html"
    echo ""
    echo "�📱 Test on mobile devices to verify mobile fixes"
    echo "🔍 Check all functionality:"
    echo "   - Navigation menu"
    echo "   - Logo display"
    echo "   - Image loading"
    echo "   - Contact buttons (WhatsApp tracking)"
    echo "   - Responsive design"
    echo "   - Google Analytics events"
    echo ""
    echo "📊 Analytics Events to Test:"
    echo "   - Puppy card clicks"
    echo "   - WhatsApp button clicks"
    echo "   - Section scrolling"
    echo "   - Video interactions"
    echo ""
    echo "🎉 Elfi's Angels is live with full analytics! 🐾"
    echo "================================================"
else
    echo ""
    echo "================================================"
    echo "❌ Deployment failed!"
    echo "Common issues:"
    echo "   - Network connection problems"
    echo "   - Firebase permissions"
    echo "   - Invalid configuration"
    echo "   - Missing required files"
    echo ""
    echo "Please check the error messages above and try again."
    echo "================================================"
    exit 1
fi

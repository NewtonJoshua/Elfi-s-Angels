#!/bin/bash

# ============================================
# 🧹 Project Cleanup Script - Remove Unwanted Files
# ============================================
# This script removes outdated, duplicate, and unnecessary files
# while keeping the core website and deployment files

echo "🧹 Cleaning up Elfi's Angels project..."
echo "================================================"

# Create cleanup log
echo "📋 Creating cleanup log..."
touch cleanup-log.txt
echo "Project cleanup started at $(date)" > cleanup-log.txt
echo "" >> cleanup-log.txt

# Function to safely remove files/directories
safe_remove() {
    if [ -e "$1" ]; then
        echo "🗑️  Removing: $1"
        rm -rf "$1"
        echo "   ✅ Removed: $1" >> cleanup-log.txt
    else
        echo "   ⚠️  Not found: $1"
        echo "   ⚠️  Not found: $1" >> cleanup-log.txt
    fi
}

# STEP 1: Remove outdated HTML files
echo ""
echo "📋 STEP 1: Removing outdated HTML files..."
echo "   (Keeping main index.html and privacy-policy.html)"
echo "----------------------------------------------"

safe_remove "clean.html"
safe_remove "index.optimized.html"
safe_remove "mobile-debug.html"
safe_remove "mobile-simple.html"
safe_remove "mobile-test.html"

# STEP 2: Remove old assets directory (replaced by src/)
echo ""
echo "📋 STEP 2: Removing old assets directory..."
echo "   (All assets moved to src/ structure)"
echo "----------------------------------------------"

safe_remove "assets/"

# STEP 3: Remove duplicate files in root
echo ""
echo "📋 STEP 3: Removing duplicate files in root..."
echo "   (These are duplicated in src/ or config/)"
echo "----------------------------------------------"

safe_remove "styles.css"      # Moved to src/css/
safe_remove "script.js"       # Moved to src/js/
safe_remove "logo.svg"        # Moved to src/icons/
safe_remove "hero-poodles.jpg" # Moved to src/images/
safe_remove "manifest.json"   # In config/
safe_remove "sw.js"          # Service worker not needed

# STEP 4: Remove outdated documentation
echo ""
echo "📋 STEP 4: Removing outdated documentation..."
echo "   (Keeping essential guides and current docs)"
echo "----------------------------------------------"

safe_remove "DEPLOYMENT-CHECKLIST.md"
safe_remove "FAVICON-SETUP.md"
safe_remove "FIXES-COMPLETED.md"
safe_remove "LAYOUT_FIX_REPORT.md"
safe_remove "OPTIMIZATION_REPORT.md"
safe_remove "STATUS.md"

# STEP 5: Remove backup files
echo ""
echo "📋 STEP 5: Removing backup directory..."
echo "   (Contains only outdated backup files)"
echo "----------------------------------------------"

safe_remove "backup/"

# STEP 6: Remove old deployment script
echo ""
echo "📋 STEP 6: Removing old deployment script..."
echo "   (Using deployment/deploy.sh instead)"
echo "----------------------------------------------"

safe_remove "deploy.sh"

# STEP 7: Remove package.json (not needed for static site)
echo ""
echo "📋 STEP 7: Removing Node.js files..."
echo "   (Not needed for static HTML/CSS/JS site)"
echo "----------------------------------------------"

safe_remove "package.json"

# STEP 8: Clean up any .DS_Store files (macOS)
echo ""
echo "📋 STEP 8: Removing macOS system files..."
echo "----------------------------------------------"

find . -name ".DS_Store" -type f -delete 2>/dev/null && echo "🗑️  Removed .DS_Store files" || echo "   ℹ️  No .DS_Store files found"

# STEP 9: Show final project structure
echo ""
echo "📋 STEP 9: Final project structure..."
echo "----------------------------------------------"

echo ""
echo "📁 Current project structure:"
echo "├── 📄 index.html                    (Main website)"
echo "├── 📄 privacy-policy.html           (GDPR compliance)"
echo "├── 📄 robots.txt                    (SEO)"
echo "├── 📄 sitemap.xml                   (SEO)"
echo "├── 📄 firebase.json                 (Firebase config)"
echo "├── 📄 .firebaserc                   (Firebase project)"
echo "├── 📄 .firebaseignore               (Firebase ignore)"
echo "├── 📄 .gitignore                    (Git ignore)"
echo "├── 📄 README.md                     (Project info)"
echo "├── 📄 PROJECT-STRUCTURE.md          (Structure guide)"
echo "├── 📁 src/                          (Source files)"
echo "│   ├── 📁 css/                      (Stylesheets)"
echo "│   ├── 📁 js/                       (JavaScript)"
echo "│   ├── 📁 images/                   (Images)"
echo "│   └── 📁 icons/                    (Icons & logos)"
echo "├── 📁 config/                       (Configuration)"
echo "│   ├── 📄 manifest.json             (PWA manifest)"
echo "│   ├── 📄 robots.txt                (SEO robots)"
echo "│   └── 📄 sitemap.xml               (SEO sitemap)"
echo "├── 📁 deployment/                   (Deployment scripts)"
echo "│   ├── 📄 deploy.sh                 (Main deployment)"
echo "│   ├── 📄 setup-domain.sh           (Domain setup)"
echo "│   └── 📄 update-domain.sh          (Domain update)"
echo "├── 📁 docs/                         (Documentation)"
echo "│   ├── 📄 GOOGLE-ANALYTICS-SETUP.md (GA4 guide)"
echo "│   ├── 📄 DOMAIN-SETUP-GUIDE.md     (Domain guide)"
echo "│   ├── 📄 FIREBASE-DEPLOYMENT.md    (Deploy guide)"
echo "│   ├── 📄 DEVELOPMENT.md            (Dev guide)"
echo "│   └── 📄 README.md                 (Docs index)"
echo "└── 📁 .firebase/                    (Firebase cache)"
echo ""

# Final summary
echo "================================================"
echo "✅ Project cleanup completed successfully!"
echo ""
echo "📊 Cleanup Summary:"
echo "   • Removed outdated HTML files"
echo "   • Removed old assets directory"
echo "   • Removed duplicate root files"
echo "   • Removed outdated documentation"
echo "   • Removed backup files"
echo "   • Cleaned up system files"
echo ""
echo "📋 Kept Essential Files:"
echo "   • Main website files (index.html, privacy-policy.html)"
echo "   • Source files (src/ directory)"
echo "   • Configuration files (firebase.json, etc.)"
echo "   • Deployment scripts (deployment/ directory)"
echo "   • Current documentation (docs/ directory)"
echo "   • SEO files (robots.txt, sitemap.xml)"
echo ""
echo "📁 Your project is now clean and organized!"
echo "🚀 Ready for deployment with: ./deployment/deploy.sh"
echo ""
echo "📝 Cleanup log saved to: cleanup-log.txt"
echo "================================================"

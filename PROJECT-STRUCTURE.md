# 🐾 Elfi's Angels - Project Structure

## 📁 Folder Organization

```
Elfi's Kennel/
├── 📄 index.html                    # Main website file
├── 📄 sw.js                         # Service worker for PWA
├── 📄 package.json                  # Project dependencies
├── 📄 firebase.json                 # Firebase hosting config
├── 📄 .firebaserc                   # Firebase project config
├── 📄 .firebaseignore              # Firebase ignore file
├── 📄 .gitignore                    # Git ignore file
├── 📄 README.md                     # Project documentation
│
├── 📁 src/                          # Source files
│   ├── 📁 css/                      # Stylesheets
│   │   ├── styles.css               # Main CSS file
│   │   └── mobile-fix.css           # Mobile-specific fixes
│   ├── 📁 js/                       # JavaScript files
│   │   ├── script.js                # Main JavaScript
│   │   └── mobile-fix.js            # Mobile-specific JS
│   ├── 📁 images/                   # Image assets
│   └── 📁 icons/                    # Icon files (favicon, etc.)
│
├── 📁 backup/                       # Backup files
│   └── clean.html                   # Clean backup version
│
├── 📁 deployment/                   # Deployment related files
│   ├── deploy.sh                    # Deployment script
│   └── DEPLOYMENT-CHECKLIST.md     # Deployment checklist
│
├── 📁 docs/                         # Documentation
│   ├── FIREBASE-DEPLOYMENT.md      # Firebase setup guide
│   └── FAVICON-SETUP.md            # Favicon documentation
│
├── 📁 config/                       # Configuration files
│   └── manifest.json               # PWA manifest
│
└── 📁 .firebase/                    # Firebase cache (auto-generated)
```

## 🎯 Key Features

### ✅ **Clean Structure:**
- **src/**: All source code organized by type
- **backup/**: Safe backup versions
- **deployment/**: Deployment scripts and docs
- **docs/**: Project documentation
- **config/**: Configuration files

### ✅ **Mobile Optimized:**
- **mobile-fix.css**: Mobile-specific CSS overrides
- **mobile-fix.js**: Mobile-specific JavaScript
- Animation-free mobile experience

### ✅ **Production Ready:**
- Firebase hosting configured
- PWA capabilities
- Service worker enabled
- Optimized for performance

## 🚀 Quick Commands

```bash
# Deploy to Firebase
firebase deploy

# Run deployment script
./deployment/deploy.sh

# View project structure
tree -I 'node_modules|.firebase'
```

## 📱 Live URLs

- **Main Site**: https://elfis-poodles.web.app
- **Backup**: https://elfis-poodles.web.app/backup/clean.html

## 🔧 Development Notes

- Desktop: Full animations and effects enabled
- Mobile: All animations disabled for performance
- Assets organized in logical src/ structure
- Backup versions maintained for safety
- Comprehensive documentation included

---
*Last Updated: August 2025*
*Project: Elfi's Angels Premium Mini Poodle Website*

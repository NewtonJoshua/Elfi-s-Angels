# 🐾 Elfi's Angels - Goldendoodle Breeder Website

> A responsive website for Elfi's Angels Goldendoodle breeding business, featuring current litters, puppy information, and breeder contact details.

## 🌐 Live Website
**Production:** [https://elfis-poodles.web.app](https://elfis-poodles.web.app)

## 📁 Project Structure

```
Elfi's Kennel/
├── 📄 index.html              # Main website page
├── 📄 firebase.json           # Firebase hosting configuration
├── 📄 .firebaserc            # Firebase project settings
├── 
├── 📁 src/                   # Source files
│   ├── 📁 css/
│   │   ├── styles.css        # Main stylesheet
│   │   └── mobile-fix.css    # Mobile-specific fixes
│   ├── 📁 js/
│   │   ├── script.js         # Main JavaScript
│   │   └── mobile-fix.js     # Mobile-specific JavaScript
│   └── 📁 images/            # Image assets
│       ├── hero/             # Hero section images
│       ├── puppies/          # Puppy photos
│       ├── gallery/          # Gallery images
│       └── icons/            # Icons and favicons
│
├── 📁 deployment/            # Deployment scripts
│   ├── deploy.sh            # Automated deployment
│   └── GUIDE.md             # Deployment documentation
│
└── 📁 backup/               # Backup files
    └── simple.html          # Emergency backup page
```

## �️ Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Hosting:** Firebase Hosting
- **Responsive:** Mobile-first design
- **Animations:** AOS (Animate On Scroll) - disabled on mobile
- **Icons:** Font Awesome
- **Fonts:** Google Fonts

## 📱 Mobile Optimization

### **Key Features:**
- ✅ **Animation-free mobile experience** for better performance
- ✅ **Touch-friendly navigation** with proper tap targets
- ✅ **Optimized images** for mobile bandwidth
- ✅ **Mobile-first CSS** with progressive enhancement

### **Mobile Fix Strategy:**
```css
/* Mobile-specific overrides */
@media (max-width: 768px) {
    * {
        animation: none !important;
        transition: none !important;
        transform: none !important;
    }
}
```

## 🚀 Quick Start

### **Prerequisites:**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login
```

### **Development:**
1. **Clone & Navigate:**
   ```bash
   cd "/Users/njoshua/Documents/GitHub/Elfi's Kennel"
   ```

2. **Local Development:**
   ```bash
   # Serve locally
   firebase serve --only hosting
   
   # Open http://localhost:5000
   ```

3. **Deploy:**
   ```bash
   # Quick deploy
   ./deployment/deploy.sh
   
   # Or manual
   firebase deploy --only hosting
   ```

## 🎨 Design System

### **Color Palette:**
- **Primary:** #8B4513 (Saddle Brown)
- **Secondary:** #D2691E (Chocolate)
- **Accent:** #FFD700 (Gold)
- **Background:** #FFF8DC (Cornsilk)

### **Typography:**
- **Headers:** 'Playfair Display' (serif)
- **Body:** 'Source Sans Pro' (sans-serif)
- **Accent:** 'Dancing Script' (cursive)

### **Responsive Breakpoints:**
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 📊 Performance

### **Optimization Features:**
- **Lazy Loading:** Images load on scroll
- **Mobile Animations:** Disabled for performance
- **Optimized Assets:** Compressed images
- **Minimal Dependencies:** Lightweight libraries only

### **Core Web Vitals:**
- **LCP:** < 2.5s (Large Contentful Paint)
- **FID:** < 100ms (First Input Delay)
- **CLS:** < 0.1 (Cumulative Layout Shift)

## 🔧 Maintenance

### **Regular Tasks:**
- [ ] **Update puppy information** monthly
- [ ] **Refresh gallery images** quarterly
- [ ] **Check contact information** monthly
- [ ] **Test mobile functionality** monthly
- [ ] **Monitor site performance** weekly

### **Content Updates:**
```bash
# Update content
# Edit index.html directly

# Deploy changes
./deployment/deploy.sh

# Verify live site
open https://elfis-poodles.web.app
```

## � Troubleshooting

### **Common Issues:**

**Mobile site blank/broken:**
```bash
# Check mobile-fix files exist
ls src/css/mobile-fix.css
ls src/js/mobile-fix.js

# Verify paths in index.html
grep -n "mobile-fix" index.html
```

**Images not loading:**
```bash
# Check image paths
ls -la src/images/

# Verify HTML references
grep -n "src/images" index.html
```

**CSS not applying:**
```bash
# Check CSS file paths
ls -la src/css/

# Verify HTML links
grep -n "src/css" index.html
```

## � Analytics & SEO

### **Tracking:**
- **Google Analytics:** Configured
- **Search Console:** Set up
- **Schema Markup:** Implemented

### **SEO Features:**
- **Meta Tags:** Complete set
- **Open Graph:** Social sharing optimized
- **Structured Data:** Local business markup
- **Sitemap:** Auto-generated

## 🔄 Backup & Recovery

### **Backup Strategy:**
- **Emergency Page:** `backup/simple.html`
- **Firebase Rollback:** Previous deployments available
- **Source Control:** Git repository

### **Recovery Process:**
```bash
# Emergency rollback
firebase hosting:releases:rollback

# Deploy backup page
cp backup/simple.html index.html
firebase deploy --only hosting
```

## 📞 Support

### **Technical Issues:**
- Check deployment guide: `deployment/GUIDE.md`
- Review project structure above
- Test on multiple devices

### **Content Updates:**
- Edit `index.html` directly
- Update images in `src/images/`
- Deploy using `./deployment/deploy.sh`

---

**Last Updated:** August 2025  
**Version:** 2.0 (Mobile Optimized)  
**Maintainer:** Development Team
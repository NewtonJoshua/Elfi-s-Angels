# 🚀 Deployment Guide - Elfi's Angels

## Quick Deployment

### Method 1: Automated Script
```bash
./deployment/deploy.sh
```

### Method 2: Manual Firebase
```bash
firebase deploy --only hosting
```

## Pre-Deployment Checklist

### ✅ **File Structure Check:**
- [ ] `index.html` exists in root
- [ ] `src/css/styles.css` exists
- [ ] `src/js/script.js` exists
- [ ] All image assets in `src/images/`
- [ ] Firebase config files present

### ✅ **Content Verification:**
- [ ] Contact information updated
- [ ] Puppy information current
- [ ] Images optimized and loading
- [ ] All links working

### ✅ **Mobile Testing:**
- [ ] Responsive design working
- [ ] Touch targets proper size
- [ ] Navigation menu functional
- [ ] Performance acceptable

### ✅ **SEO & Analytics:**
- [ ] Meta tags updated
- [ ] Structured data valid
- [ ] Analytics tracking active
- [ ] Sitemap current

## Deployment Commands

```bash
# Check Firebase login
firebase login

# Select project
firebase use elfis-poodles

# Deploy hosting only
firebase deploy --only hosting

# Deploy with message
firebase deploy -m "Update: Mobile fixes applied"

# Deploy to preview channel
firebase hosting:channel:deploy preview
```

## Post-Deployment

### ✅ **Testing:**
1. **Desktop:** https://elfis-poodles.web.app
2. **Mobile:** Test on actual devices
3. **Performance:** Check loading speed
4. **Functionality:** Test all features

### ✅ **Backup URLs:**
- **Simple Backup:** https://elfis-poodles.web.app/backup/simple.html

## Troubleshooting

### Common Issues:
- **Mobile not working:** Check mobile-fix.css loading
- **Images not loading:** Verify src/images/ path
- **CSS not applying:** Check src/css/ path in HTML
- **JS errors:** Check browser console

### Emergency Rollback:
```bash
# List recent deployments
firebase hosting:releases:list

# Rollback to previous
firebase hosting:releases:rollback
```

---
*Last Updated: August 2025*

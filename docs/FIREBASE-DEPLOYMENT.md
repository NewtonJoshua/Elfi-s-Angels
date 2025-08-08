# 🚀 Firebase Hosting Deployment Guide

## Prerequisites

1. **Firebase CLI installed** (should be installed globally)
2. **Google/Firebase account**
3. **Firebase project created**

## Quick Deployment Steps

### Step 1: Install Firebase CLI (if not already installed)
```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase
```bash
firebase login
```
This will open your browser to authenticate with Google.

### Step 3: Initialize Firebase Project
```bash
firebase init hosting
```

**Configuration Options:**
- **Public directory**: `.` (current directory)
- **Configure as single-page app**: `Yes`
- **Set up automatic builds**: `No` (for now)
- **File already exists, overwrite**: `No` (keep our firebase.json)

### Step 4: Deploy to Firebase
```bash
firebase deploy --only hosting
```

Or use our npm script:
```bash
npm run deploy
```

## Alternative: Manual Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `elfis-angels-website`
4. Disable Google Analytics (optional)
5. Create project

### 2. Configure .firebaserc
Create `.firebaserc` file with your project ID:
```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

### 3. Deploy
```bash
firebase deploy --only hosting
```

## Project Structure for Hosting

```
Elfi's Kennel/
├── index.html              # ✅ Main entry point
├── assets/                 # ✅ Static assets
│   ├── css/styles.css     # ✅ Stylesheets
│   ├── js/script.js       # ✅ JavaScript
│   ├── images/            # ✅ Images
│   └── icons/             # ✅ Icons/logos
├── config/                 # ✅ Configuration files
│   ├── manifest.json      # ✅ PWA manifest
│   ├── robots.txt         # ✅ SEO
│   └── sitemap.xml        # ✅ SEO
├── sw.js                   # ✅ Service Worker
├── firebase.json           # ✅ Firebase config
├── .firebaseignore        # ✅ Deployment ignore
└── package.json           # ✅ Project config
```

## Firebase Configuration Explained

### firebase.json
```json
{
  "hosting": {
    "public": ".",                    // Serve from current directory
    "ignore": [...],                  // Files to ignore during deployment
    "rewrites": [...],                // SPA routing support
    "headers": [...],                 // Cache control headers
    "cleanUrls": true,                // Remove .html extensions
    "trailingSlash": false            // No trailing slashes
  }
}
```

### Key Features Configured:
- **Cache Control**: Images cached for 1 year, HTML for 1 hour
- **Clean URLs**: `/about` instead of `/about.html`
- **SPA Support**: All routes serve `index.html`
- **Performance Headers**: Optimized for speed

## Deployment Commands

### Development
```bash
# Local development server
npm run dev

# Firebase local hosting
firebase serve --only hosting
```

### Production Deployment
```bash
# Validate HTML then deploy
npm run deploy

# Direct deployment
firebase deploy --only hosting

# Deploy with specific project
firebase deploy --only hosting --project your-project-id
```

### Post-Deployment
```bash
# View deployment
firebase open hosting:site

# Check logs
firebase functions:log
```

## Custom Domain Setup

### 1. Add Custom Domain
```bash
firebase hosting:channel:deploy production --project your-project-id
```

### 2. Configure DNS
Add these records to your domain:
```
Type: A
Name: @
Value: 151.101.1.195

Type: A  
Name: @
Value: 151.101.65.195

Type: CNAME
Name: www
Value: your-project-id.web.app
```

### 3. Verify Domain
In Firebase Console:
1. Go to Hosting
2. Add custom domain
3. Follow verification steps

## Performance Optimization

### 1. Enable Compression
Firebase automatically enables gzip compression.

### 2. CDN Distribution
Firebase uses Google's global CDN automatically.

### 3. SSL Certificate
HTTPS is automatically provided and renewed.

## Monitoring & Analytics

### 1. Enable Performance Monitoring
```bash
# Install Performance SDK
npm install firebase
```

Add to your website:
```html
<script type="module">
  import { initializeApp } from 'firebase/app';
  import { getPerformance } from 'firebase/performance';
  
  const firebaseConfig = {
    // Your config
  };
  
  const app = initializeApp(firebaseConfig);
  const perf = getPerformance(app);
</script>
```

### 2. View Analytics
- Firebase Console → Performance
- Real-time monitoring
- Core Web Vitals tracking

## Environment-Specific Deployments

### Preview Channels
```bash
# Create preview deployment
firebase hosting:channel:deploy preview

# Deploy to specific channel
firebase hosting:channel:deploy feature-xyz
```

### Multiple Environments
```bash
# Production
firebase deploy --only hosting --project elfis-angels-prod

# Staging  
firebase deploy --only hosting --project elfis-angels-staging
```

## Troubleshooting

### Common Issues

#### 1. 404 Errors
**Solution**: Check `firebase.json` rewrites configuration.

#### 2. Assets Not Loading
**Solution**: Verify file paths in HTML are relative to public directory.

#### 3. Cache Issues
**Solution**: 
```bash
# Force refresh deployment
firebase deploy --only hosting --force
```

#### 4. Permission Denied
**Solution**:
```bash
firebase login --reauth
```

### Debug Mode
```bash
firebase deploy --only hosting --debug
```

## Security Rules

### 1. Enable Security Headers
Firebase automatically includes:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options

### 2. Access Control
Configure in `firebase.json`:
```json
{
  "hosting": {
    "headers": [
      {
        "source": "/admin/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache, no-store, must-revalidate"
          }
        ]
      }
    ]
  }
}
```

## Cost Optimization

### Firebase Hosting Pricing
- **Spark Plan (Free)**:
  - 10 GB storage
  - 10 GB/month transfer
  - Custom domain support

- **Blaze Plan (Pay-as-you-go)**:
  - $0.026/GB storage
  - $0.15/GB transfer

### Tips to Minimize Costs
1. Optimize image sizes
2. Use efficient caching headers
3. Compress assets before deployment
4. Monitor usage in Firebase Console

## Backup Strategy

### 1. Version Control
```bash
# Tag releases
git tag v1.0.0
git push origin v1.0.0
```

### 2. Firebase Releases
View deployment history:
```bash
firebase hosting:releases:list
```

### 3. Rollback
```bash
# Rollback to previous version
firebase hosting:releases:rollback
```

## Next Steps After Deployment

1. **Verify Website**: Check all functionality works
2. **Test Performance**: Run Lighthouse audit
3. **Set Up Monitoring**: Enable Firebase Performance
4. **Configure Analytics**: Add Google Analytics
5. **SEO Verification**: Submit to Google Search Console
6. **Social Media**: Update social links with new URL

---

**Your website will be live at**: `https://your-project-id.web.app`

**Custom domain**: Configure after deployment for professional appearance.

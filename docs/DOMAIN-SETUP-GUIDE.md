# 🌐 Custom Domain Setup Guide - elfisangels.com

## Overview
This guide will help you connect your GoDaddy domain `elfisangels.com` to your Firebase Hosting project.

## 📋 Prerequisites
- ✅ GoDaddy domain: `elfisangels.com` (owned)
- ✅ Firebase project: `elfis-poodles` (deployed)
- ✅ Firebase CLI access
- ✅ GoDaddy DNS management access

## 🔧 Step-by-Step Setup

### Step 1: Add Custom Domain in Firebase Console

1. **Open Firebase Console**
   ```bash
   # Open your project in browser
   open https://console.firebase.google.com/project/elfis-poodles/hosting/main
   ```

2. **Navigate to Hosting**
   - Go to Firebase Console → Your Project → Hosting
   - Click "Add custom domain"

3. **Add Domain**
   - Enter: `elfisangels.com`
   - Enter: `www.elfisangels.com` (optional but recommended)
   - Click "Continue"

### Step 2: Verify Domain Ownership

Firebase will provide you with a **TXT record** for domain verification:

**Example TXT Record:**
```
Host: @
Type: TXT
Value: firebase=elfis-poodles-[verification-code]
TTL: 600
```

### Step 3: Configure DNS in GoDaddy

#### 🔑 **IMPORTANT DNS RECORDS TO ADD:**

1. **Domain Verification (TXT Record)**
   ```
   Type: TXT
   Host: @
   Value: firebase=elfis-poodles-[your-verification-code]
   TTL: 600
   ```

2. **Main Domain (A Records)**
   ```
   Type: A
   Host: @
   Value: 151.101.1.195
   TTL: 600
   
   Type: A
   Host: @
   Value: 151.101.65.195
   TTL: 600
   ```

3. **WWW Subdomain (A Records)**
   ```
   Type: A
   Host: www
   Value: 151.101.1.195
   TTL: 600
   
   Type: A
   Host: www
   Value: 151.101.65.195
   TTL: 600
   ```

#### Alternative CNAME Setup (if A records don't work):
```
Type: CNAME
Host: @
Value: elfis-poodles.web.app
TTL: 600

Type: CNAME
Host: www
Value: elfis-poodles.web.app
TTL: 600
```

### Step 4: GoDaddy DNS Management

1. **Login to GoDaddy**
   - Go to: https://dcc.godaddy.com/manage/
   - Select your domain: `elfisangels.com`

2. **Manage DNS**
   - Click "DNS" → "Manage Zones"
   - Or direct link: DNS Management

3. **Add Records**
   - Remove any existing conflicting A/CNAME records for @ and www
   - Add the Firebase DNS records as shown above

### Step 5: SSL Certificate Setup

Firebase automatically provides SSL certificates for custom domains:
- ✅ Automatic SSL certificate provisioning
- ✅ HTTPS redirect enforcement
- ✅ HTTP/2 support

## 🚀 Alternative: Automated Setup via CLI

You can also use Firebase CLI to add the domain:

```bash
# Add custom domain
firebase hosting:domains:add elfisangels.com

# Check status
firebase hosting:domains:list
```

## 📊 Expected Timeline

| Step | Time |
|------|------|
| DNS propagation | 15 minutes - 2 hours |
| SSL certificate | 15 minutes - 24 hours |
| Full activation | Up to 24 hours |

## 🔍 Verification Commands

```bash
# Check DNS propagation
dig elfisangels.com
dig www.elfisangels.com

# Check if pointing to Firebase
nslookup elfisangels.com

# Test HTTPS
curl -I https://elfisangels.com
```

## 📱 Update Your Website References

Once the domain is active, update these references in your code:

### 1. Update Structured Data (index.html)
```json
{
  "@type": "LocalBusiness",
  "url": "https://elfisangels.com",
  "image": "https://elfisangels.com/src/icons/logo.svg"
}
```

### 2. Update Open Graph Tags
```html
<meta property="og:url" content="https://elfisangels.com">
<meta property="og:image" content="https://elfisangels.com/src/images/hero-poodles.jpg">
```

### 3. Update Canonical URL
```html
<link rel="canonical" href="https://elfisangels.com">
```

## 🛠️ Troubleshooting

### Common Issues:

1. **DNS Not Propagating**
   ```bash
   # Clear local DNS cache
   sudo dscacheutil -flushcache
   
   # Check from different locations
   https://www.whatsmydns.net/#A/elfisangels.com
   ```

2. **SSL Certificate Pending**
   - Wait 24 hours for automatic provisioning
   - Ensure DNS is correctly configured
   - Contact Firebase support if needed

3. **Domain Verification Failed**
   - Double-check TXT record value
   - Ensure no typos in Firebase verification code
   - Wait for DNS propagation (up to 48 hours)

## 📞 Support Contacts

- **Firebase Support**: https://firebase.google.com/support/contact/
- **GoDaddy Support**: https://www.godaddy.com/help
- **DNS Checker**: https://www.whatsmydns.net/

## 🎉 Success Checklist

- [ ] Domain added in Firebase Console
- [ ] TXT record added for verification
- [ ] A records pointing to Firebase
- [ ] www subdomain configured
- [ ] SSL certificate active
- [ ] https://elfisangels.com loads correctly
- [ ] https://www.elfisangels.com redirects properly
- [ ] Website content displays correctly
- [ ] Google Analytics still working
- [ ] All links and images load properly

---

**Next Steps After Domain Setup:**
1. Update all marketing materials with new domain
2. Set up Google Search Console for new domain
3. Update Google Analytics property settings
4. Submit new sitemap to search engines
5. Update social media profiles with new URL

🐾 **Your premium Mini Poodle website will be live at https://elfisangels.com!**

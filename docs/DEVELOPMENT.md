# Development Guide - Elfi's Angels Website

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ (for development tools)
- Git
- Modern web browser
- Code editor (VS Code recommended)

### Initial Setup
```bash
# Clone and navigate to project
git clone <repository-url>
cd elfis-kennel

# Install development dependencies (optional)
npm install

# Start development server
npm run dev
```

## 📁 Project Structure Explained

### `/assets/` - Static Assets
```
assets/
├── css/           # Stylesheets
├── js/            # JavaScript files  
├── images/        # Photos and graphics
└── icons/         # Logo and icon files
```

### `/config/` - Configuration Files
```
config/
├── manifest.json  # PWA configuration
├── robots.txt     # SEO crawler instructions
└── sitemap.xml    # Site structure for search engines
```

### `/docs/` - Documentation
```
docs/
└── README.md      # Additional project documentation
```

## 🛠️ Development Workflow

### 1. Local Development
```bash
# Option 1: Use npm script
npm run dev

# Option 2: Use Python
python -m http.server 8000

# Option 3: Use PHP
php -S localhost:8000
```

### 2. Making Changes

#### HTML Updates
- Edit `index.html` directly
- Follow semantic HTML structure
- Maintain accessibility attributes
- Test across devices

#### CSS Modifications
- Edit `/assets/css/styles.css`
- Follow existing class naming conventions
- Use CSS Grid and Flexbox for layouts
- Maintain mobile-first responsive design

#### JavaScript Updates
- Edit `/assets/js/script.js`
- Follow existing code patterns
- Test interactive features
- Ensure cross-browser compatibility

### 3. Adding New Content

#### New Puppy Listings
1. Add new puppy card in the puppies section
2. Follow existing HTML structure:
```html
<article class="puppy-card" role="listitem" data-aos="fade-up">
    <img src="path-to-image" alt="descriptive-alt-text" loading="lazy">
    <div class="card-content">
        <h3><span class="gender-prefix"><i class="fas fa-mars"></i> Male</span> Puppy Name</h3>
        <p class="details"><i class="fas fa-calendar-alt"></i> Age • <i class="fas fa-palette"></i> Color</p>
        <div class="lineage">
            <p class="sire"><i class="fas fa-mars"></i> Sire: Parent Name</p>
            <p class="dam"><i class="fas fa-venus"></i> Dam: Parent Name</p>
        </div>
    </div>
</article>
```

#### New Images
1. Optimize images before adding (use WebP format when possible)
2. Place in `/assets/images/`
3. Add appropriate alt text for accessibility
4. Use lazy loading for non-critical images

#### New Achievement Slides
1. Add new slide in championship gallery:
```html
<div class="slide">
    <img src="path-to-image" alt="descriptive-alt-text" loading="lazy">
    <div class="slide-content">
        <h4>🏆 Achievement Title</h4>
        <p>Achievement description</p>
    </div>
</div>
```
2. Update dots navigation if needed

## 🎨 Design Guidelines

### Color Palette
```css
/* Primary Colors */
--primary-dark: #0a0a0a;
--primary-light: #e0e0e0;
--accent-gold: #DAA520;

/* Secondary Colors */
--cream: #F5F5DC;
--apricot: #FBCEB1;
--background-overlay: rgba(10, 10, 10, 0.95);
```

### Typography Scale
```css
/* Heading Sizes */
h1: 4.5rem (mobile: 3.2rem)
h2: 3rem (mobile: 2.5rem)
h3: 2rem (mobile: 1.8rem)
h4: 1.5rem

/* Body Text */
body: 1rem (16px base)
small: 0.875rem
```

### Spacing System
```css
/* Consistent spacing */
--space-xs: 0.5rem;
--space-sm: 1rem;
--space-md: 1.5rem;
--space-lg: 2rem;
--space-xl: 3rem;
--space-xxl: 4rem;
```

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1400px) { /* Large Desktop */ }
```

### Testing Devices
- iPhone SE (375px)
- iPhone 12 Pro (390px)
- iPad (768px)
- iPad Pro (1024px)
- Desktop (1440px)
- Large Desktop (1920px)

## 🔧 Performance Optimization

### Image Optimization
```bash
# Compress images before adding
# Target file sizes:
# - Hero images: < 200KB
# - Puppy photos: < 100KB
# - Icons/logos: < 50KB
```

### CSS Optimization
- Use efficient selectors
- Minimize reflows and repaints
- Leverage CSS Grid and Flexbox
- Use CSS custom properties

### JavaScript Optimization
- Minimize DOM manipulation
- Use event delegation
- Defer non-critical scripts
- Optimize animations

## 🧪 Testing Checklist

### Browser Testing
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Accessibility Testing
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast ratios
- [ ] Focus indicators
- [ ] Alt text for images

### Performance Testing
- [ ] PageSpeed Insights
- [ ] Lighthouse audit
- [ ] Mobile performance
- [ ] Loading times

### SEO Testing
- [ ] Meta tags complete
- [ ] Structured data valid
- [ ] Sitemap accessible
- [ ] Robots.txt correct

## 🚀 Deployment

### Pre-deployment Checklist
- [ ] All links working
- [ ] Images optimized
- [ ] Contact information updated
- [ ] Meta tags complete
- [ ] Analytics tracking
- [ ] Error pages tested

### Deployment Steps
1. Test locally
2. Validate HTML/CSS
3. Run Lighthouse audit
4. Deploy to hosting platform
5. Test live site
6. Update DNS if needed

## 📊 Analytics & Monitoring

### Key Metrics to Track
- Page load times
- Mobile usability
- Contact form submissions
- WhatsApp click-through rates
- Popular puppy listings

### Tools Integration
- Google Analytics
- Google Search Console
- PageSpeed Insights
- WhatsApp Business API

## 🐛 Troubleshooting

### Common Issues

#### Images Not Loading
- Check file paths are correct
- Verify image files exist
- Check file permissions
- Validate image formats

#### Styles Not Applied
- Check CSS file path
- Verify CSS syntax
- Check browser cache
- Validate CSS selectors

#### JavaScript Not Working
- Check console for errors
- Verify script file path
- Check browser compatibility
- Validate JavaScript syntax

## 📝 Code Standards

### HTML
- Use semantic elements
- Include accessibility attributes
- Validate markup
- Maintain consistent indentation

### CSS
- Use BEM methodology for classes
- Mobile-first responsive design
- Consistent naming conventions
- Group related properties

### JavaScript
- Use modern ES6+ syntax
- Add comments for complex logic
- Handle errors gracefully
- Optimize for performance

## 🤝 Contributing

1. Create feature branch
2. Make changes following guidelines
3. Test thoroughly
4. Update documentation
5. Submit pull request

---

**Happy coding! 🐾**

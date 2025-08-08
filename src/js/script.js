/*
============================================
ELFI'S ANGELS - MAIN JAVASCRIPT
============================================
Interactive functionality for the premium Mini Poodle website
Handles navigation, animations, user interactions, and analytics

Key Features:
- Mobile-responsive navigation with hamburger menu
- AOS (Animate On Scroll) initialization
- Smooth scrolling and parallax effects
- Accessibility features (ARIA, focus management)
- User interaction tracking with Google Analytics
- Touch/swipe gesture support for mobile
- Championship slideshow functionality
- Performance monitoring

Author: Development Team
Last Updated: August 2025
Version: 2.0 (Mobile Optimized)
============================================
*/

// ============================================
// 1. DOM ELEMENT REFERENCES
// ============================================
// Get references to key navigation elements
const hamburger = document.querySelector('.hamburger');     // Mobile menu toggle button
const navMenu = document.querySelector('.nav-menu');        // Mobile navigation menu
const navbar = document.querySelector('.navbar');           // Main navigation bar

// ============================================
// 2. DOCUMENT READY INITIALIZATION
// ============================================
// Initialize all functionality when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🐾 Initializing Elfi\'s Angels website...');
    
    // Initialize AOS (Animate On Scroll) library with optimized settings
    AOS.init({
        duration: 1000,              // Animation duration in milliseconds
        easing: 'ease-out-cubic',    // Smooth easing function
        once: true,                  // Only animate once (performance optimization)
        offset: 100,                 // Trigger animations 100px before element enters viewport
        delay: 0,                    // No global delay
        anchorPlacement: 'top-bottom' // Animation trigger point
    });
    
    // Initialize core functionality modules
    initializeSmoothScrolling();     // Enhanced smooth scroll behavior
    initializeNavbarEffects();       // Navbar hide/show on scroll
    initializeParallaxEffects();     // Parallax scrolling effects
    initializeStaggerAnimations();   // Staggered animations for grid items
    
    console.log('✅ Core functionality initialized');
});

// ============================================
// 3. NAVBAR SCROLL EFFECTS - DISABLED FOR FIXED HEADER
// ============================================
// REMOVED: Enhanced navbar behavior on scroll (hide/show, styling changes)
// function initializeNavbarEffects() {
//     let lastScrollY = window.scrollY;  // Track previous scroll position
//     
//     window.addEventListener('scroll', () => {
//         const currentScrollY = window.scrollY;
//         
//         // Add visual styling when scrolled past hero section
//         if (currentScrollY > 100) {
//             navbar.classList.add('scrolled');      // Add backdrop blur and darker background
//         } else {
//             navbar.classList.remove('scrolled');   // Remove enhanced styling
//         }
//         
//         // Auto-hide navbar when scrolling down (improves mobile experience)
//         if (currentScrollY > lastScrollY && currentScrollY > 300) {
//             navbar.style.transform = 'translateY(-100%)';  // Hide navbar
//         } else {
//             navbar.style.transform = 'translateY(0)';      // Show navbar
//         }
//         
//         lastScrollY = currentScrollY;  // Update scroll position for next comparison
//     });
// }

// ============================================
// 4. SMOOTH SCROLLING ENHANCEMENT
// ============================================
// Enhanced smooth scrolling for internal anchor links
function initializeSmoothScrolling() {
    // Simple smooth scrolling to fixed header positions
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Fixed header offset - navbar is 80px + generous padding
                const headerOffset = 140; // Increased to ensure content appears below navbar
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                console.log(`Navigating to ${targetId} at position ${offsetPosition}, headerOffset: ${headerOffset}`);
            }
        });
    });
}

// ============================================
// 5. PARALLAX EFFECTS
// ============================================
// Subtle parallax scrolling effects for hero section
function initializeParallaxEffects() {
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image img');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;      // Background parallax rate
        const rate2 = scrolled * -0.3;     // Foreground parallax rate
        
        // Only apply parallax while hero section is visible (performance optimization)
        if (heroSection && scrolled < window.innerHeight) {
            // Move hero section background slightly slower than scroll
            heroSection.style.transform = `translate3d(0, ${rate2}px, 0)`;
            
            // Move hero image with slight scale effect
            if (heroImage) {
                heroImage.style.transform = `translate3d(0, ${rate}px, 0) scale(${1 + scrolled * 0.0002})`;
            }
        }
    });
}

// ============================================
// 6. STAGGERED ANIMATIONS SETUP
// ============================================
// Add progressive animation delays to grid items for visual appeal
function initializeStaggerAnimations() {
    const puppyCards = document.querySelectorAll('.puppy-card');       // Puppy showcase cards
    const portfolioItems = document.querySelectorAll('.portfolio-item'); // Portfolio gallery items
    const features = document.querySelectorAll('.feature');            // Feature highlight items
    
    // Add incremental delays to puppy cards (100ms intervals)
    puppyCards.forEach((card, index) => {
        card.setAttribute('data-aos-delay', (index * 100).toString());
    });
    
    // Add incremental delays to portfolio items (100ms intervals, starting at 200ms)
    portfolioItems.forEach((item, index) => {
        item.setAttribute('data-aos-delay', (200 + index * 100).toString());
    });
    
    // Add incremental delays to feature items (100ms intervals, starting at 300ms)
    features.forEach((feature, index) => {
        feature.setAttribute('data-aos-delay', (300 + index * 100).toString());
    });
}

// ============================================
// 7. MOBILE NAVIGATION TOGGLE
// ============================================
// Handle hamburger menu functionality with accessibility features
hamburger.addEventListener('click', () => {
    // Check current state for accessibility
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    
    // Update ARIA attributes for screen readers
    hamburger.setAttribute('aria-expanded', !isExpanded);
    
    // Toggle visual states
    hamburger.classList.toggle('active');    // Animate hamburger icon
    navMenu.classList.toggle('active');      // Show/hide mobile menu
    
    // Enhanced animation feedback
    if (!isExpanded) {
        navMenu.style.animation = 'fadeInUp 0.3s ease-out';
        trapFocus(navMenu);  // Trap keyboard focus within menu
    } else {
        navMenu.style.animation = 'fadeInUp 0.3s ease-out reverse';
        removeFocusTrap();   // Remove focus trap when closing
    }
});

// ============================================
// 8. ACCESSIBILITY: FOCUS MANAGEMENT
// ============================================
// Trap keyboard focus within mobile menu for accessibility compliance
function trapFocus(element) {
    // Get all focusable elements within the menu
    const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    );
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    // Handle keyboard navigation within menu
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                // Shift + Tab: wrap to last element
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                // Tab: wrap to first element
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
        if (e.key === 'Escape') {
            // Escape key: close menu and return focus to hamburger
            hamburger.click();
            hamburger.focus();
        }
    });
}

// Remove focus trap when menu is closed
function removeFocusTrap() {
    // Focus trap removal logic (handled by menu close)
}

// ============================================
// 9. MOBILE MENU LINK HANDLING
// ============================================
// Close mobile menu when user clicks on navigation links
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');    // Reset hamburger animation
    navMenu.classList.remove('active');      // Hide mobile menu
    hamburger.setAttribute('aria-expanded', 'false'); // Update ARIA state
    
    // Add smooth closing animation
    navMenu.style.animation = 'fadeInUp 0.3s ease-out reverse';
}));

// ============================================
// 10. ACTIVE NAVIGATION HIGHLIGHTING
// ============================================
// Highlight current section in navigation menu based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    // Determine which section is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {  // 200px offset for better UX
            current = section.getAttribute('id');
        }
    });

    // Update navigation link active states
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
            // Add subtle scale animation to active link
            link.style.transform = 'scale(1.1)';
            setTimeout(() => {
                link.style.transform = 'scale(1)';
            }, 200);
        }
    });
});

// ============================================
// 11. INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
// Enhanced scroll-triggered animations using Intersection Observer API
const observerOptions = {
    threshold: 0.1,                    // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px'    // Trigger 50px before element enters viewport
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation when element becomes visible
            entry.target.style.animation = 'slideInScale 0.8s ease-out';
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all major elements for scroll animations
document.querySelectorAll('section, .puppy-card, .portfolio-item, .feature').forEach(el => {
    observer.observe(el);
});

// ============================================
// 12. TOUCH GESTURE SUPPORT FOR MOBILE
// ============================================
// Enhanced touch support with swipe gesture recognition
let touchStartY = 0;   // Touch start Y coordinate
let touchEndY = 0;     // Touch end Y coordinate
let touchStartX = 0;   // Touch start X coordinate
let touchEndX = 0;     // Touch end X coordinate

// Record touch start position
document.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
    touchStartX = e.changedTouches[0].screenX;
});

// Handle touch end and determine swipe direction
document.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

// Process swipe gestures and perform corresponding actions
function handleSwipe() {
    const swipeThreshold = 100;  // Minimum distance for swipe recognition
    const diffY = touchStartY - touchEndY;  // Vertical swipe distance
    const diffX = touchStartX - touchEndX;  // Horizontal swipe distance
    
    // Handle vertical swipes (section navigation)
    if (Math.abs(diffY) > swipeThreshold) {
        if (diffY > 0) {
            // Swipe up: navigate to next section
            const currentSection = getCurrentSection();
            const nextSection = currentSection?.nextElementSibling;
            if (nextSection && nextSection.tagName === 'SECTION') {
                nextSection.scrollIntoView({ behavior: 'smooth' });
                trackEvent('swipe_up', 'Navigation', 'Mobile Gesture');
            }
        } else {
            // Swipe down: navigate to previous section
            const currentSection = getCurrentSection();
            const prevSection = currentSection?.previousElementSibling;
            if (prevSection && prevSection.tagName === 'SECTION') {
                prevSection.scrollIntoView({ behavior: 'smooth' });
                trackEvent('swipe_down', 'Navigation', 'Mobile Gesture');
            }
        }
    }
    
    // Handle horizontal swipes (menu interaction)
    if (Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0) {
            // Left swipe
            trackEvent('swipe_left', 'Navigation', 'Mobile Gesture');
        } else {
            // Right swipe: open mobile menu if closed
            if (!navMenu.classList.contains('active')) {
                hamburger.click();
                trackEvent('swipe_right_menu', 'Navigation', 'Mobile Gesture');
            }
        }
    }
}

// Helper function to determine which section is currently in viewport
function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    let currentSection = null;
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Check if section center is in viewport
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = section;
        }
    });
    
    return currentSection;
}

// ============================================
// 13. GOOGLE ANALYTICS 4 ENHANCED TRACKING
// ============================================
// Comprehensive tracking system for dog breeding business analytics

/**
 * Enhanced Google Analytics 4 event tracking function
 * Designed specifically for Elfi's Angels dog breeding business
 * 
 * @param {string} action - The action being tracked (e.g., 'button_click', 'puppy_inquiry')
 * @param {string} category - Event category (e.g., 'Engagement', 'Puppy Interest', 'Contact')
 * @param {string} label - Additional context (e.g., puppy name, button type)
 * @param {number} value - Numeric value for the event (optional)
 * @param {Object} customParams - Additional custom parameters for detailed tracking
 */
function trackEvent(action, category = 'User Interaction', label = '', value = 1, customParams = {}) {
    // Check if Google Analytics is loaded
    if (typeof gtag !== 'undefined') {
        // Determine device type for better segmentation
        const deviceType = window.innerWidth <= 768 ? 'mobile' : 'desktop';
        
        // Build comprehensive event data
        const eventData = {
            event_category: category,
            event_label: label,
            value: value,
            device_type: deviceType,
            page_title: document.title,
            page_location: window.location.href,
            timestamp: new Date().toISOString(),
            ...customParams  // Merge any additional custom parameters
        };
        
        // Send event to Google Analytics 4
        gtag('event', action, eventData);
        
        // Log for debugging (remove in production)
        console.log('📊 GA4 Event Tracked:', {
            action: action,
            category: category,
            label: label,
            device: deviceType
        });
    } else {
        // Fallback logging if GA4 is not available
        console.warn('⚠️ Google Analytics not available, event not tracked:', action);
    }
}

/**
 * Track puppy-specific interactions for business insights
 * 
 * @param {string} puppyName - Name of the puppy being viewed/inquired about
 * @param {string} action - Specific action (view, inquiry, contact)
 * @param {Object} puppyDetails - Additional puppy information
 */
function trackPuppyInteraction(puppyName, action, puppyDetails = {}) {
    trackEvent(action, 'Puppy Interest', puppyName, 1, {
        puppy_name: puppyName,
        puppy_age: puppyDetails.age || 'unknown',
        puppy_color: puppyDetails.color || 'unknown',
        puppy_gender: puppyDetails.gender || 'unknown',
        interaction_type: action
    });
}

/**
 * Track contact interactions with enhanced details
 * 
 * @param {string} method - Contact method (whatsapp, phone, email)
 * @param {string} context - Where the contact was initiated from
 */
function trackContactInteraction(method, context = '') {
    trackEvent('contact_initiated', 'Lead Generation', method, 10, {
        contact_method: method,
        contact_source: context,
        potential_customer: true,
        business_value: 'high'
    });
}

/**
 * Track business-critical events for conversion analysis
 * 
 * @param {string} eventType - Type of business event
 * @param {Object} details - Event details
 */
function trackBusinessEvent(eventType, details = {}) {
    trackEvent(eventType, 'Business Events', details.description || '', details.value || 1, {
        business_impact: details.impact || 'medium',
        conversion_stage: details.stage || 'awareness',
        ...details
    });
}

// ============================================
// 14. ENHANCED USER INTERACTION TRACKING
// ============================================
// Track all user interactions for comprehensive business analytics

// Track button clicks with enhanced puppy business context
document.querySelectorAll('.btn, .whatsapp-btn, .social-btn').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        
        // Determine button type and track accordingly
        if (buttonText.toLowerCase().includes('whatsapp')) {
            trackContactInteraction('whatsapp', 'main_button');
        } else if (buttonText.toLowerCase().includes('puppy') || buttonText.toLowerCase().includes('available')) {
            trackBusinessEvent('puppy_inquiry_button', {
                description: 'User clicked to view available puppies',
                impact: 'high',
                stage: 'interest'
            });
        } else {
            trackEvent('button_click', 'Engagement', buttonText);
        }
    });
});

// Enhanced puppy card interaction tracking with detailed information
document.querySelectorAll('.puppy-card').forEach(card => {
    card.addEventListener('click', function() {
        const puppyName = this.querySelector('h3').textContent;
        const puppyDetails = this.querySelector('.details');
        const genderElement = this.querySelector('.gender-prefix');
        
        // Extract puppy information for detailed tracking
        let puppyAge = 'unknown';
        let puppyColor = 'unknown';
        let puppyGender = 'unknown';
        
        if (puppyDetails) {
            const detailsText = puppyDetails.textContent;
            const ageMatch = detailsText.match(/(\d+)\s*weeks?/i);
            const colorMatch = detailsText.match(/•\s*([^•]+)$/);
            
            if (ageMatch) puppyAge = ageMatch[1] + ' weeks';
            if (colorMatch) puppyColor = colorMatch[1].trim();
        }
        
        if (genderElement) {
            puppyGender = genderElement.textContent.toLowerCase().includes('female') ? 'female' : 'male';
        }
        
        // Track detailed puppy interaction
        trackPuppyInteraction(puppyName, 'puppy_card_viewed', {
            age: puppyAge,
            color: puppyColor,
            gender: puppyGender
        });
        
        // Also track as high-value business event
        trackBusinessEvent('puppy_interest_shown', {
            description: `Interest shown in ${puppyName}`,
            impact: 'high',
            stage: 'consideration',
            value: 5,
            puppy_name: puppyName
        });
    });
});

// Enhanced WhatsApp click tracking with context
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        // Determine context of WhatsApp click
        let context = 'general';
        const nearestPuppy = this.closest('.puppy-card');
        const isFloating = this.classList.contains('floating-whatsapp');
        const isFooter = this.closest('footer');
        const isHero = this.closest('.hero');
        
        if (nearestPuppy) {
            const puppyName = nearestPuppy.querySelector('h3')?.textContent || 'unknown';
            context = `puppy_inquiry_${puppyName}`;
        } else if (isFloating) {
            context = 'floating_button';
        } else if (isFooter) {
            context = 'footer';
        } else if (isHero) {
            context = 'hero_section';
        }
        
        // Track as high-value contact interaction
        trackContactInteraction('whatsapp', context);
        
        // Also track as conversion event
        trackBusinessEvent('contact_attempt', {
            description: 'Customer initiated WhatsApp contact',
            impact: 'very_high',
            stage: 'action',
            value: 15,
            contact_source: context
        });
    });
});

// Track section visibility for engagement
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionName = entry.target.id || entry.target.className;
            trackEvent('section_viewed', 'Content Engagement', sectionName);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Google Analytics enhanced events
function trackEvent(action, category = 'User Interaction', label = '') {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: 1
        });
    }
}

// Enhanced scroll-to-top with accessibility
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top of page');
scrollToTopBtn.setAttribute('title', 'Scroll to top');

// Check if mobile and adjust positioning
const isMobile = window.innerWidth <= 768;
const bottomPosition = isMobile ? '150px' : '180px';
const rightPosition = isMobile ? '20px' : '30px';
const buttonSize = isMobile ? '45px' : '50px';
const fontSize = isMobile ? '1rem' : '1.2rem';

scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: ${bottomPosition};
    right: ${rightPosition};
    width: ${buttonSize};
    height: ${buttonSize};
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    font-size: ${fontSize};
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1001;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    trackEvent('scroll_to_top', 'Navigation', 'Scroll to Top Button');
});

// Floating puppies button enhanced visibility
document.addEventListener('DOMContentLoaded', () => {
    const floatingPuppies = document.getElementById('floatingPuppies');
    const puppiesSection = document.getElementById('puppies');
    
    function checkPuppiesVisibility() {
        if (!puppiesSection || !floatingPuppies) return;
        
        const rect = puppiesSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Show button when puppies section is not in view
        const isInView = rect.top < windowHeight && rect.bottom > 0;
        
        if (isInView) {
            floatingPuppies.classList.remove('show');
            floatingPuppies.classList.add('hide');
        } else {
            floatingPuppies.classList.add('show');
            floatingPuppies.classList.remove('hide');
        }
    }
    
    window.addEventListener('scroll', checkPuppiesVisibility);
    window.addEventListener('resize', checkPuppiesVisibility);
    checkPuppiesVisibility();
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    trackEvent('page_load_time', 'Performance', `${Math.round(loadTime)}ms`);
});

// Error tracking
window.addEventListener('error', (e) => {
    trackEvent('javascript_error', 'Error', e.message);
});

// Network status tracking
window.addEventListener('online', () => {
    trackEvent('network_status', 'Connection', 'online');
});

window.addEventListener('offline', () => {
    trackEvent('network_status', 'Connection', 'offline');
});

// Enhanced accessibility announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Skip link functionality
const skipLink = document.createElement('a');
skipLink.href = '#main';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
document.body.insertBefore(skipLink, document.body.firstChild);

// Add main landmark if not exists
const mainContent = document.querySelector('#about');
if (mainContent && !mainContent.getAttribute('role')) {
    mainContent.setAttribute('id', 'main');
}

console.log('🐾 Elfi\'s Angels website loaded successfully with enhanced mobile and accessibility features! 🐾');

// Championship Gallery Slideshow Functionality
let currentSlide = 0;
let slideInterval;

function initializeSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    console.log('🔧 Slideshow elements found:', {
        slides: slides.length,
        dots: dots.length,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn
    });
    
    if (slides.length === 0) {
        console.log('❌ No slides found, skipping slideshow initialization');
        return;
    }
    
    // Reset current slide
    currentSlide = 0;
    
    // Show first slide
    showSlide(0);
    
    // Add event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            console.log('⬅️ Previous button clicked');
            changeSlide(-1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            console.log('➡️ Next button clicked');
            changeSlide(1);
        });
    }
    
    // Add click listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            console.log(`🔘 Dot ${index + 1} clicked`);
            goToSlide(index);
        });
    });
    
    // Auto-play slideshow
    startAutoSlide();
    
    // Pause on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            console.log('⏸️ Slideshow paused (mouse enter)');
            stopAutoSlide();
        });
        slideshowContainer.addEventListener('mouseleave', () => {
            console.log('▶️ Slideshow resumed (mouse leave)');
            startAutoSlide();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            console.log('⬅️ Left arrow key pressed');
            changeSlide(-1);
        }
        if (e.key === 'ArrowRight') {
            console.log('➡️ Right arrow key pressed');
            changeSlide(1);
        }
    });
    
    console.log('✅ Slideshow initialized successfully');
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) {
        console.log('❌ No slides found in showSlide function');
        return;
    }
    
    // Normalize index
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;
    
    console.log(`🎬 Showing slide ${currentSlide + 1} of ${slides.length}`);
    
    // Hide all slides and deactivate dots
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
    });
    
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
    });
    
    // Show current slide and activate dot
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('active');
        console.log(`✅ Slide ${currentSlide + 1} is now active`);
    }
    
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
        console.log(`✅ Dot ${currentSlide + 1} is now active`);
    }
    
    // Announce to screen readers
    const slideContent = slides[currentSlide]?.querySelector('.slide-content h4')?.textContent;
    if (slideContent) {
        announceToScreenReader(`Showing slide ${currentSlide + 1} of ${slides.length}: ${slideContent}`);
    }
}

function changeSlide(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
    
    // Track slideshow interaction
    trackEvent('slideshow_navigation', 'Championship Gallery', direction > 0 ? 'next' : 'previous');
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
    
    // Track slideshow interaction
    trackEvent('slideshow_dot_click', 'Championship Gallery', `slide_${index + 1}`);
}

function startAutoSlide() {
    stopAutoSlide(); // Clear any existing interval
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

// Track video link clicks for analytics
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 Initializing slideshow and video tracking...');
    
    // Initialize slideshow
    setTimeout(() => {
        initializeSlideshow();
    }, 100);
    
    // Track video clicks
    const videoLinks = document.querySelectorAll('.video-thumbnail-link');
    videoLinks.forEach((link, index) => {
        link.addEventListener('click', function() {
            const videoTitle = this.querySelector('h4')?.textContent || `Video ${index + 1}`;
            console.log(`📺 Video clicked: ${videoTitle}`);
            trackEvent('video_click', 'Kennel Videos', videoTitle);
        });
    });
    
    console.log('✅ Slideshow and video tracking initialized successfully');
});

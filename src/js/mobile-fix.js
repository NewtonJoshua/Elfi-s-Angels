/*
============================================
ELFI'S ANGELS - MOBILE OPTIMIZATION JAVASCRIPT
============================================
Critical mobile-specific JavaScript fixes
This file only executes on mobile devices (width <= 768px)

Primary Purpose: 
- Completely disable all animations for performance
- Ensure mobile navigation works properly
- Fix blank screen issues on mobile devices
- Provide animation-free mobile experience

Key Features:
- AOS (Animate On Scroll) complete disabling
- Animation attribute removal from all elements
- Mobile-optimized navigation system
- Instant scrolling instead of smooth scroll
- Performance-first approach

Author: Development Team
Last Updated: August 2025
Version: 2.0 (Mobile Performance Focus)
============================================
*/

// ============================================
// MOBILE-ONLY INITIALIZATION
// ============================================
// Only execute this code on mobile devices to avoid desktop interference
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if current device is mobile (768px or smaller)
    if (window.innerWidth <= 768) {
        console.log('📱 Mobile device detected - Loading mobile optimizations...');
        
        // ============================================
        // 1. CRITICAL: DISABLE AOS ANIMATIONS
        // ============================================
        // Completely disable AOS (Animate On Scroll) library on mobile
        // This is the primary fix for mobile blank screen issues
        
        if (typeof AOS !== 'undefined') {
            console.log('🚫 Disabling AOS animations for mobile performance...');
            
            // Initialize AOS with disabled state
            AOS.init({
                disable: true,        // Completely disable AOS
                duration: 0,          // Set duration to 0
                once: false          // Don't trigger animations
            });
        }
        
        // ============================================
        // 2. REMOVE ALL ANIMATION ATTRIBUTES
        // ============================================
        // Remove all data-aos attributes that could cause animation conflicts
        
        const aosElements = document.querySelectorAll('[data-aos]');
        console.log(`🧹 Removing AOS attributes from ${aosElements.length} elements...`);
        
        aosElements.forEach(element => {
            // Remove all AOS-related attributes
            element.removeAttribute('data-aos');              // Animation type
            element.removeAttribute('data-aos-duration');     // Animation duration
            element.removeAttribute('data-aos-delay');        // Animation delay
            element.removeAttribute('data-aos-easing');       // Animation easing
            element.removeAttribute('data-aos-offset');       // Animation trigger offset
            element.removeAttribute('data-aos-anchor');       // Animation anchor
            
            // Force immediate visibility and remove transforms
            element.style.opacity = '1';              // Make fully visible
            element.style.transform = 'none';         // Remove transforms
            element.style.animation = 'none';         // Remove animations
            element.style.transition = 'none';        // Remove transitions
            element.style.visibility = 'visible';     // Force visibility
        });
        
        // ============================================
        // 3. UNIVERSAL ANIMATION REMOVAL
        // ============================================
        // Force all elements to be immediately visible without animations
        
        const allElements = document.querySelectorAll('*');
        console.log(`🎭 Removing all animations from ${allElements.length} elements...`);
        
        allElements.forEach(element => {
            // Force immediate visibility for all elements
            element.style.opacity = '1';              // Full opacity
            element.style.visibility = 'visible';     // Force visible
            element.style.transform = 'none';         // No transforms
            element.style.animation = 'none';         // No animations
            element.style.transition = 'none';        // No transitions
        });
        
        // ============================================
        // 4. MOBILE NAVIGATION SYSTEM
        // ============================================
        // Ensure hamburger menu works reliably on mobile devices
        
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            console.log('🍔 Initializing mobile navigation system...');
            
            // Remove any existing event listeners to prevent conflicts
            // Clone and replace to ensure clean event handling
            hamburger.replaceWith(hamburger.cloneNode(true));
            const newHamburger = document.querySelector('.hamburger');
            
            // Add mobile-optimized click handler
            newHamburger.addEventListener('click', function(e) {
                e.preventDefault();       // Prevent default behavior
                e.stopPropagation();     // Stop event bubbling
                
                console.log('🔄 Mobile menu toggle clicked');
                
                // Check current menu state
                const isActive = navMenu.classList.contains('active');
                
                if (isActive) {
                    // Close menu
                    navMenu.classList.remove('active');           // Hide menu
                    newHamburger.classList.remove('active');      // Reset hamburger
                    document.body.style.overflow = '';            // Restore scrolling
                    console.log('📴 Mobile menu closed');
                } else {
                    // Open menu
                    navMenu.classList.add('active');              // Show menu
                    newHamburger.classList.add('active');         // Animate hamburger
                    document.body.style.overflow = 'hidden';      // Prevent background scroll
                    console.log('📲 Mobile menu opened');
                }
            });
            
            // ============================================
            // 5. NAVIGATION LINK HANDLING
            // ============================================
            // Close menu when user clicks navigation links
            
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    console.log('🔗 Navigation link clicked - closing menu');
                    
                    // Close menu and reset states
                    navMenu.classList.remove('active');
                    newHamburger.classList.remove('active');
                    document.body.style.overflow = '';          // Restore scrolling
                });
            });
            
            // ============================================
            // 6. CLICK OUTSIDE TO CLOSE
            // ============================================
            // Close menu when clicking outside of navigation area
            
            document.addEventListener('click', function(e) {
                // Check if click is outside hamburger and menu
                if (!newHamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    console.log('🖱️ Click outside menu detected - closing menu');
                    
                    // Close menu
                    navMenu.classList.remove('active');
                    newHamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            console.log('✅ Mobile menu system initialized successfully');
        }
        
        // ============================================
        // 7. MOBILE-OPTIMIZED SCROLL BEHAVIOR
        // ============================================
        // Replace smooth scrolling with instant scrolling for better mobile performance
        
        console.log('📜 Setting up mobile-optimized scrolling...');
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();      // Prevent default jump
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70;  // Account for navbar height
                    
                    // Use instant scrolling instead of smooth for better mobile performance
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'auto'    // Instant scroll (no animation)
                    });
                    
                    console.log(`📍 Instantly scrolled to: ${this.getAttribute('href')}`);
                }
            });
        });
        
        // ============================================
        // 8. MOBILE PERFORMANCE MONITORING
        // ============================================
        // Log successful mobile optimization completion
        
        console.log('✅ Mobile JavaScript loaded successfully');
        console.log('🚫 ALL ANIMATIONS DISABLED for optimal mobile performance');
        console.log('📱 Mobile-optimized navigation active');
        console.log('⚡ Performance-first mobile experience enabled');
        
        // Optional: Track mobile optimization success
        if (typeof trackEvent === 'function') {
            trackEvent('mobile_optimization_loaded', 'Performance', 'Mobile Fix Applied');
        }
        
    } else {
        // Desktop device detected - no mobile fixes needed
        console.log('🖥️ Desktop device detected - mobile fixes not applied');
    }
});

// ============================================
// 9. MOBILE WINDOW RESIZE HANDLER
// ============================================
// Handle orientation changes and window resizing on mobile devices

window.addEventListener('resize', function() {
    // Only handle resize on mobile devices
    if (window.innerWidth <= 768) {
        console.log('📱 Mobile orientation/resize detected');
        
        // Close mobile menu if open during resize (improves UX)
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Re-apply mobile fixes if needed
        setTimeout(() => {
            const allElements = document.querySelectorAll('[data-aos], .aos-animate');
            allElements.forEach(element => {
                element.style.opacity = '1';
                element.style.transform = 'none';
                element.style.animation = 'none';
                element.style.transition = 'none';
            });
        }, 100);
    }
});

// ============================================
// 10. MOBILE ERROR HANDLING
// ============================================
// Catch and handle any mobile-specific errors

window.addEventListener('error', function(e) {
    if (window.innerWidth <= 768) {
        console.error('📱 Mobile error detected:', e.message);
        
        // Optional: Track mobile errors
        if (typeof trackEvent === 'function') {
            trackEvent('mobile_error', 'Error', e.message);
        }
    }
});

console.log('📱 Mobile optimization script loaded and ready');

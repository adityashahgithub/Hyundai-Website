/* ============================================
   COMMON JAVASCRIPT - SHARED FUNCTIONALITY
   ============================================ */

/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */

/**
 * Initialize mobile menu functionality
 * Toggles navigation menu on mobile devices
 * Closes menu when clicking outside
 */
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');

    // Mobile menu toggle functionality
    if (mobileMenuBtn && navLinks) {
        // Toggle menu when hamburger button is clicked
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside the navigation
        document.addEventListener('click', function(event) {
            if (!event.target.closest('nav') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    }

    /**
     * Toggle header scrolled state based on scroll position
     * Adds 'scrolled' class when user scrolls down for enhanced shadow
     */
    const toggleHeaderState = () => {
        if (!header) return;
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Listen for scroll events and update header state
    window.addEventListener('scroll', toggleHeaderState);
    
    // Check initial scroll position on page load
    toggleHeaderState();
});

/* ============================================
   SCROLL REVEAL ANIMATION
   ============================================ */

/**
 * Intersection Observer configuration for scroll animations
 * Triggers when 10% of element is visible
 */
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Offset from bottom
};

/**
 * Intersection Observer instance
 * Adds 'reveal' class to elements when they come into view
 */
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal'); // Trigger fade-in animation
        }
    });
}, observerOptions);

/**
 * Observe all model cards for scroll reveal animation
 * Cards fade in when scrolled into viewport
 */
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.model-card');
    cards.forEach(card => {
        observer.observe(card);
    });
});

/* ============================================
   SMOOTH SCROLL
   ============================================ */

/**
 * Smooth scroll functionality for anchor links
 * Provides smooth scrolling behavior when clicking links with hash (#)
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default jump behavior
        
        // Get target element from href attribute
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Smoothly scroll to target element
            target.scrollIntoView({
                behavior: 'smooth', // Smooth scrolling animation
                block: 'start'      // Align to top of viewport
            });
        }
    });
});


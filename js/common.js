/* ============================================
   COMMON JAVASCRIPT - SHARED FUNCTIONALITY
   ============================================ */

/**
 * Initialize common functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');

    // Create back-to-top button
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.textContent = '↑';
    document.body.appendChild(backToTop);

    const toggleBackToTop = () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    };

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Set active navigation link based on current page
    const setActiveNavLink = () => {
        const pathname = window.location.pathname;
        const currentPage = pathname.split('/').pop() || 'index.html';
        
        const navItems = document.querySelectorAll('.nav-links a');
        
        navItems.forEach(link => {
            const href = link.getAttribute('href');
            
            // Check if the current page matches the href
            // Handle both direct matches and index.html cases
            if (href === currentPage || 
                (currentPage === 'index.html' && href === 'index.html') ||
                (!currentPage && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // Set active link on page load
    setActiveNavLink();

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
    window.addEventListener('scroll', () => {
        toggleHeaderState();
        toggleBackToTop();
    });
    
    // Check initial scroll position on page load
    toggleHeaderState();
    toggleBackToTop();

    /* ============================================
       SCROLL ACTIVITY LOGIN PROMPT
       ============================================ */
    /**
     * Monitor scroll activity and prompt login after 3-4 minutes of scrolling
     * Only shows prompt if user is not already logged in
     */
    
    const SCROLL_TIMEOUT_SECONDS = 180; // 3 minutes in seconds
    const SCROLL_CHECK_INTERVAL = 1000; // Check every 1 second
    
    let scrollStartTime = null;
    let hasScrolled = false;
    let loginPromptShown = false;
    let scrollMonitoringEnabled = true;

    // Check if user is logged in
    const isUserLoggedIn = () => {
        if (typeof StorageUtil !== 'undefined') {
            const currentUser = StorageUtil.get('hyundai:currentUser');
            return !!currentUser;
        } else {
            const currentUser = localStorage.getItem('hyundai:currentUser');
            return !!currentUser;
        }
    };

    // Detect scroll activity
    const handleScroll = () => {
        // Don't track if user is already logged in
        if (isUserLoggedIn()) {
            scrollMonitoringEnabled = false;
            loginPromptShown = false;
            return;
        }

        // Only enable monitoring on actual pages (not login.html)
        if (window.location.pathname.includes('login.html')) {
            scrollMonitoringEnabled = false;
            return;
        }

        if (!hasScrolled) {
            hasScrolled = true;
            scrollStartTime = Date.now();
        }
    };

    // Check elapsed scroll time
    const checkScrollTime = () => {
        if (!scrollMonitoringEnabled || !hasScrolled || loginPromptShown) return;

        if (isUserLoggedIn()) {
            scrollMonitoringEnabled = false;
            return;
        }

        if (scrollStartTime) {
            const elapsedSeconds = (Date.now() - scrollStartTime) / 1000;

            if (elapsedSeconds >= SCROLL_TIMEOUT_SECONDS) {
                loginPromptShown = true;
                showScrollLoginPrompt();
            }
        }
    };

    // Show modal prompt for login
    const showScrollLoginPrompt = () => {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'scroll-login-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            backdrop-filter: blur(4px);
        `;

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'scroll-login-modal';
        modal.style.cssText = `
            background: white;
            border-radius: 16px;
            padding: 40px 32px;
            max-width: 420px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            text-align: center;
            animation: slideUp 0.3s ease;
        `;

        modal.innerHTML = `
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#002C5F" stroke-width="1.5" style="margin: 0 auto 16px; display: block;">
                <circle cx="12" cy="8" r="4"></circle>
                <path d="M5 19c0-3.5 3-6 7-6s7 2.5 7 6"></path>
            </svg>
            <h2 style="font-size: 24px; font-weight: 700; color: #002C5F; margin-bottom: 12px;">Create Your Account</h2>
            <p style="color: #666; font-size: 15px; line-height: 1.6; margin-bottom: 28px;">Sign up now to access exclusive offers, track your test drives, and save your favorite models.</p>
            
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <button class="scroll-login-btn-primary" style="
                    background: #002C5F;
                    color: white;
                    border: none;
                    padding: 13px 24px;
                    border-radius: 10px;
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">Sign Up Now</button>
                
                <button class="scroll-login-btn-secondary" style="
                    background: transparent;
                    color: #002C5F;
                    border: 2px solid #002C5F;
                    padding: 13px 24px;
                    border-radius: 10px;
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">Continue Browsing</button>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Add styles for animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .scroll-login-btn-primary:hover {
                background: #00A5E5 !important;
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(0, 165, 229, 0.3);
            }

            .scroll-login-btn-primary:active {
                transform: translateY(0);
            }

            .scroll-login-btn-secondary:hover {
                background: #f0f0f0 !important;
                border-color: #002C5F;
                transform: translateY(-2px);
            }

            .scroll-login-btn-secondary:active {
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);

        // Handle button clicks
        const signupBtn = modal.querySelector('.scroll-login-btn-primary');
        const continueBtn = modal.querySelector('.scroll-login-btn-secondary');

        signupBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });

        continueBtn.addEventListener('click', () => {
            overlay.remove();
            style.remove();
            loginPromptShown = false; // Allow prompt again after 3-4 more minutes
            scrollStartTime = Date.now(); // Reset timer
        });

        // Allow clicking overlay to close
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                style.remove();
                loginPromptShown = false;
                scrollStartTime = Date.now();
            }
        });
    };

    // Start monitoring scroll
    window.addEventListener('scroll', handleScroll);

    // Check scroll time periodically
    setInterval(checkScrollTime, SCROLL_CHECK_INTERVAL);

    // Re-enable monitoring on page visibility change (when user returns to tab)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && hasScrolled && !isUserLoggedIn()) {
            scrollMonitoringEnabled = true;
        }
    });
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


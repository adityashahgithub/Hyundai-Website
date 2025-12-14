/* ============================================
   OFFERS PAGE JAVASCRIPT
   ============================================ */

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    /* ============================================
       SCROLL ANIMATIONS
       ============================================ */
    
    /**
     * Animate flip cards on scroll
     * Cards fade in and slide up when they come into view
     */
    const flipCards = document.querySelectorAll('.flip-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation with delay based on index
                setTimeout(() => {
                    // Set initial state (hidden and scaled down)
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px) scale(0.95)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    // Trigger fade-in and scale-up animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                }, index * 100); // 100ms delay between each card
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of card is visible

    // Set initial state and observe all flip cards
    flipCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        cardObserver.observe(card);
    });

    /* ============================================
       MOBILE-FRIENDLY FLIP FUNCTIONALITY
       ============================================ */
    
    /**
     * Detect touch device
     * On touch devices, allow click to flip instead of just hover
     */
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        flipCards.forEach(card => {
            const cardInner = card.querySelector('.flip-card-inner');
            let isFlipped = false; // Track flip state

            /**
             * Toggle flip on card click
             * Prevents flip when clicking on links inside the card
             */
            card.addEventListener('click', function(e) {
                // Don't flip if clicking on a link
                if (e.target.closest('a')) {
                    return;
                }

                // Toggle flip state
                isFlipped = !isFlipped;
                if (isFlipped) {
                    cardInner.style.transform = 'rotateY(180deg)';
                } else {
                    cardInner.style.transform = 'rotateY(0deg)';
                }
            });

            /**
             * Reset flip when clicking outside the card
             * Returns card to front when user clicks elsewhere
             */
            document.addEventListener('click', function(e) {
                if (!card.contains(e.target)) {
                    isFlipped = false;
                    cardInner.style.transform = 'rotateY(0deg)';
                }
            });
        });
    }

    /* ============================================
       SECTION TITLE ANIMATIONS
       ============================================ */
    
    /**
     * Animate section title on scroll
     * Title slides down and fades in when it comes into view
     */
    const sectionTitle = document.querySelector('.section-title');
    const sectionSubtitle = document.querySelector('.section-subtitle');
    
    if (sectionTitle) {
        const titleObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Set initial state (hidden and translated up)
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(-20px)';
                    entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    
                    // Trigger fade-in and slide-down animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                    titleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 }); // Trigger when 20% of title is visible

        // Set initial state and observe title
        sectionTitle.style.opacity = '0';
        sectionTitle.style.transform = 'translateY(-20px)';
        titleObserver.observe(sectionTitle);
    }

    /**
     * Animate section subtitle on scroll
     * Subtitle animates with a slight delay after the title
     */
    if (sectionSubtitle) {
        const subtitleObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Set initial state with delay
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(-15px)';
                    entry.target.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
                    
                    // Trigger fade-in animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                    subtitleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        // Set initial state and observe subtitle
        sectionSubtitle.style.opacity = '0';
        sectionSubtitle.style.transform = 'translateY(-15px)';
        subtitleObserver.observe(sectionSubtitle);
    }

    /* ============================================
       DESKTOP HOVER ENHANCEMENTS
       ============================================ */
    
    /**
     * Add hover effect for desktop devices
     * Cards lift slightly on hover for better interactivity
     */
    if (!isTouchDevice) {
        flipCards.forEach(card => {
            // Lift card on mouse enter
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.transition = 'transform 0.3s ease';
            });

            // Return card to original position on mouse leave
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    /* ============================================
       BUTTON RIPPLE EFFECT
       ============================================ */
    
    /**
     * Add ripple effect to buttons on click
     * Creates a visual feedback effect when buttons are clicked
     */
    const buttons = document.querySelectorAll('.flip-card-back .btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            
            // Calculate ripple size (largest dimension of button)
            const size = Math.max(rect.width, rect.height);
            
            // Calculate ripple position (centered on click point)
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            // Set ripple styles
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            // Add ripple to button
            this.appendChild(ripple);

            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600); // Match animation duration
        });
    });
});


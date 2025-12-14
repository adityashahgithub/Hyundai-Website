/* ============================================
   TESTIMONIALS PAGE JAVASCRIPT
   ============================================ */

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    /* ============================================
       TESTIMONIAL CARDS ANIMATION
       ============================================ */
    
    /**
     * Animate testimonial cards on scroll
     * Cards fade in and slide up when they come into view
     * Uses staggered animation for visual appeal
     */
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation with delay based on card index
                setTimeout(() => {
                    // Set initial state (hidden and translated down)
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    // Trigger fade-in and slide-up animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100); // 100ms delay between each card
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of card is visible

    // Set initial state and observe all testimonial cards
    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        cardObserver.observe(card);
    });

    /* ============================================
       HIGHLIGHT CARDS ANIMATION
       ============================================ */
    
    /**
     * Animate highlight cards on scroll
     * Cards scale in from smaller size when they come into view
     * Uses scale animation for a pop-in effect
     */
    const highlightCards = document.querySelectorAll('.highlight-card');
    const highlightObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation with longer delay for highlight cards
                setTimeout(() => {
                    // Set initial state (hidden and scaled down)
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'scale(0.9)';
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    
                    // Trigger fade-in and scale-up animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, 50);
                }, index * 150); // 150ms delay between each card
                highlightObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of card is visible

    // Set initial state and observe all highlight cards
    highlightCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        highlightObserver.observe(card);
    });

    /* ============================================
       SECTION TITLES ANIMATION
       ============================================ */
    
    /**
     * Animate section title and subtitle on scroll
     * Title slides down from above when it comes into view
     * Subtitle animates with a slight delay after title
     */
    const sectionTitle = document.querySelector('.section-title');
    const sectionSubtitle = document.querySelector('.section-subtitle');
    
    // Animate section title
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
        }, { threshold: 0.2 }); // Trigger when 20% of element is visible

        // Set initial state and observe title
        sectionTitle.style.opacity = '0';
        sectionTitle.style.transform = 'translateY(-20px)';
        titleObserver.observe(sectionTitle);
    }

    // Animate section subtitle with delay
    if (sectionSubtitle) {
        const subtitleObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Set initial state with transition delay
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(-15px)';
                    entry.target.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
                    
                    // Trigger fade-in and slide-down animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                    subtitleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 }); // Trigger when 20% of element is visible

        // Set initial state and observe subtitle
        sectionSubtitle.style.opacity = '0';
        sectionSubtitle.style.transform = 'translateY(-15px)';
        subtitleObserver.observe(sectionSubtitle);
    }

    /* ============================================
       VIDEO PANEL ANIMATION
       ============================================ */
    
    /**
     * Animate video panel on scroll
     * Panel slides in from the left when it comes into view
     * Creates a smooth entrance effect for the service features section
     */
    const videoPanel = document.querySelector('.video-panel');
    if (videoPanel) {
        const videoObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Set initial state (hidden and translated left)
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-30px)';
                    entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    
                    // Trigger fade-in and slide-right animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, 50);
                    videoObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 }); // Trigger when 20% of panel is visible

        // Set initial state and observe video panel
        videoPanel.style.opacity = '0';
        videoPanel.style.transform = 'translateX(-30px)';
        videoObserver.observe(videoPanel);
    }
});


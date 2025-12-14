/* ============================================
   ABOUT PAGE JAVASCRIPT
   ============================================ */

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    /* ============================================
       TIMELINE ITEMS ANIMATION
       ============================================ */
    
    /**
     * Animate timeline items on scroll
     * Items slide in from alternating sides (left/right) based on position
     * Creates a dynamic zigzag effect matching the timeline layout
     */
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation with delay based on item index
                setTimeout(() => {
                    // Set initial state (hidden and translated based on position)
                    entry.target.style.opacity = '0';
                    // Odd items (left side) slide from left, even items (right side) slide from right
                    if (index % 2 === 0) {
                        entry.target.style.transform = 'translateX(-50px)';
                    } else {
                        entry.target.style.transform = 'translateX(50px)';
                    }
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    // Trigger fade-in and slide-in animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, 50);
                }, index * 150); // 150ms delay between each item
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of item is visible

    // Set initial state and observe all timeline items
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        // Set initial transform based on position (left or right side)
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        timelineObserver.observe(item);
    });

    /* ============================================
       VALUE CARDS ANIMATION
       ============================================ */
    
    /**
     * Animate value cards on scroll
     * Cards fade in, slide up, and scale up when they come into view
     * Uses combined transform for a smooth pop-in effect
     */
    const valueCards = document.querySelectorAll('.value-card');
    const valueObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation with delay based on card index
                setTimeout(() => {
                    // Set initial state (hidden, translated down, and scaled down)
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px) scale(0.95)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    // Trigger fade-in, slide-up, and scale-up animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                }, index * 100); // 100ms delay between each card
                valueObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of card is visible

    // Set initial state and observe all value cards
    valueCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        valueObserver.observe(card);
    });

    /* ============================================
       SECTION TITLES ANIMATION
       ============================================ */
    
    /**
     * Animate section titles on scroll
     * Titles slide down from above when they come into view
     */
    const sectionTitles = document.querySelectorAll('.section-title');
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

    // Set initial state and observe all section titles
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-20px)';
        titleObserver.observe(title);
    });

    /* ============================================
       SECTION SUBTITLES ANIMATION
       ============================================ */
    
    /**
     * Animate section subtitles on scroll
     * Subtitles slide down from above with a delay after titles
     * Creates a cascading effect with the title
     */
    const sectionSubtitles = document.querySelectorAll('.section-subtitle');
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

    // Set initial state and observe all section subtitles
    sectionSubtitles.forEach(subtitle => {
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(-15px)';
        subtitleObserver.observe(subtitle);
    });

    /* ============================================
       STORY PARAGRAPHS ANIMATION
       ============================================ */
    
    /**
     * Animate story paragraphs on scroll
     * Paragraphs fade in and slide up when they come into view
     * Uses longer stagger delay for a more sequential reading experience
     */
    const storyParagraphs = document.querySelectorAll('.about-story p');
    const storyObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation with longer delay for paragraphs
                setTimeout(() => {
                    // Set initial state (hidden and translated down)
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    // Trigger fade-in and slide-up animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 200); // 200ms delay between each paragraph
                storyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of paragraph is visible

    // Set initial state and observe all story paragraphs
    storyParagraphs.forEach(para => {
        para.style.opacity = '0';
        para.style.transform = 'translateY(20px)';
        storyObserver.observe(para);
    });
});


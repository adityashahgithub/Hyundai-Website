/* ============================================
   SERVICES PAGE JAVASCRIPT
   ============================================ */

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    /* ============================================
       SERVICE CARDS ANIMATION
       ============================================ */
    
    // Animate service cards with staggered fade-in effect
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation with delay based on index
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    // Trigger fade-in animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100); // 100ms delay between each card
                serviceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of card is visible

    // Set initial state and observe all service cards
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        serviceObserver.observe(card);
    });

    /* ============================================
       TIMELINE ITEMS ANIMATION
       ============================================ */
    
    // Animate timeline items with slide-in effect
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation with longer delay for timeline
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-30px)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    // Trigger slide-in animation
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
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        timelineObserver.observe(item);
    });

    /* ============================================
       BENEFIT CARDS ANIMATION
       ============================================ */
    
    // Animate benefit cards with fade-in effect
    const benefitCards = document.querySelectorAll('.benefit-card');
    const benefitObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation with shorter delay
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    
                    // Trigger fade-in animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 80); // 80ms delay between each card
                benefitObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Set initial state and observe all benefit cards
    benefitCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        benefitObserver.observe(card);
    });

    /* ============================================
       SERVICE CENTER CARDS ANIMATION
       ============================================ */
    
    // Animate service center cards with fade-in effect
    const centerCards = document.querySelectorAll('.center-card');
    const centerObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(25px)';
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    
                    // Trigger fade-in animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100); // 100ms delay between each card
                centerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Set initial state and observe all center cards
    centerCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(25px)';
        centerObserver.observe(card);
    });

    /* ============================================
       WARRANTY CARDS ANIMATION
       ============================================ */
    
    // Animate warranty cards with scale effect
    const warrantyCards = document.querySelectorAll('.warranty-card');
    const warrantyObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'scale(0.95)';
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    
                    // Trigger scale-in animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, 50);
                }, index * 100); // 100ms delay between each card
                warrantyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Set initial state and observe all warranty cards
    warrantyCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        warrantyObserver.observe(card);
    });

    /* ============================================
       SERVICE CENTER SEARCH FUNCTIONALITY
       ============================================ */
    
    // Get search input and service centers list
    const searchInput = document.getElementById('serviceCenterSearch');
    const serviceCentersList = document.getElementById('serviceCentersList');
    const allCenterCards = document.querySelectorAll('.center-card');

    if (searchInput && serviceCentersList) {
        /**
         * Filter service centers based on search input
         * Searches in card title and all card text content
         */
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            // Filter and show/hide cards based on search term
            allCenterCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                const cardTitle = card.querySelector('h3').textContent.toLowerCase();
                
                // Show card if search term matches or is empty
                if (!searchTerm || cardText.includes(searchTerm) || cardTitle.includes(searchTerm)) {
                    card.style.display = 'block';
                    
                    // Re-animate visible cards with fade-in effect
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(25px)';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    }, 10);
                } else {
                    // Hide card if it doesn't match search
                    card.style.display = 'none';
                }
            });

            // Show "no results" message if no cards are visible
            const visibleCards = Array.from(allCenterCards).filter(card => card.style.display !== 'none');
            if (visibleCards.length === 0 && searchTerm) {
                // Create and display no results message
                if (!document.querySelector('.no-results-message')) {
                    const noResults = document.createElement('p');
                    noResults.className = 'no-results-message';
                    noResults.style.textAlign = 'center';
                    noResults.style.padding = '2rem';
                    noResults.style.color = 'var(--text-light)';
                    noResults.textContent = 'No service centers found matching your search. Try "Nadiad", "Anand", "V.V. Nagar", or "Ahmedabad"';
                    serviceCentersList.appendChild(noResults);
                }
            } else {
                // Remove no results message if cards are visible
                const noResults = document.querySelector('.no-results-message');
                if (noResults) {
                    noResults.remove();
                }
            }
        });

        /**
         * Clear search when Escape key is pressed
         * Resets the search input and shows all cards
         */
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                this.dispatchEvent(new Event('input')); // Trigger input event to reset display
            }
        });
    }
});


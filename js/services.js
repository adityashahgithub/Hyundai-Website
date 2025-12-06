// Scroll animations for services page
document.addEventListener('DOMContentLoaded', function() {
    // Animate service cards
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
                serviceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        serviceObserver.observe(card);
    });

    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-30px)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, 50);
                }, index * 150);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        timelineObserver.observe(item);
    });

    // Animate benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    const benefitObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 80);
                benefitObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    benefitCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        benefitObserver.observe(card);
    });

    // Animate service center cards
    const centerCards = document.querySelectorAll('.center-card');
    const centerObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(25px)';
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
                centerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    centerCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(25px)';
        centerObserver.observe(card);
    });

    // Animate warranty cards
    const warrantyCards = document.querySelectorAll('.warranty-card');
    const warrantyObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'scale(0.95)';
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, 50);
                }, index * 100);
                warrantyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    warrantyCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        warrantyObserver.observe(card);
    });

    // Service Center Search Functionality
    const searchInput = document.getElementById('serviceCenterSearch');
    const serviceCentersList = document.getElementById('serviceCentersList');
    const allCenterCards = document.querySelectorAll('.center-card');

    if (searchInput && serviceCentersList) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            allCenterCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                const cardTitle = card.querySelector('h3').textContent.toLowerCase();
                
                if (!searchTerm || cardText.includes(searchTerm) || cardTitle.includes(searchTerm)) {
                    card.style.display = 'block';
                    // Re-animate visible cards
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(25px)';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });

            // Show message if no results
            const visibleCards = Array.from(allCenterCards).filter(card => card.style.display !== 'none');
            if (visibleCards.length === 0 && searchTerm) {
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
                const noResults = document.querySelector('.no-results-message');
                if (noResults) {
                    noResults.remove();
                }
            }
        });

        // Clear search on escape key
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                this.dispatchEvent(new Event('input'));
            }
        });
    }
});


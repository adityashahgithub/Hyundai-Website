// Offers page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Animate flip cards on scroll
    const flipCards = document.querySelectorAll('.flip-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px) scale(0.95)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    flipCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        cardObserver.observe(card);
    });

    // Mobile-friendly flip card functionality
    // On touch devices, allow click to flip instead of just hover
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        flipCards.forEach(card => {
            const cardInner = card.querySelector('.flip-card-inner');
            let isFlipped = false;

            card.addEventListener('click', function(e) {
                // Don't flip if clicking on a link
                if (e.target.closest('a')) {
                    return;
                }

                isFlipped = !isFlipped;
                if (isFlipped) {
                    cardInner.style.transform = 'rotateY(180deg)';
                } else {
                    cardInner.style.transform = 'rotateY(0deg)';
                }
            });

            // Reset flip when clicking outside
            document.addEventListener('click', function(e) {
                if (!card.contains(e.target)) {
                    isFlipped = false;
                    cardInner.style.transform = 'rotateY(0deg)';
                }
            });
        });
    }

    // Add smooth scroll reveal for section title
    const sectionTitle = document.querySelector('.section-title');
    const sectionSubtitle = document.querySelector('.section-subtitle');
    
    if (sectionTitle) {
        const titleObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(-20px)';
                    entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                    titleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        sectionTitle.style.opacity = '0';
        sectionTitle.style.transform = 'translateY(-20px)';
        titleObserver.observe(sectionTitle);
    }

    if (sectionSubtitle) {
        const subtitleObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(-15px)';
                    entry.target.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                    subtitleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        sectionSubtitle.style.opacity = '0';
        sectionSubtitle.style.transform = 'translateY(-15px)';
        subtitleObserver.observe(sectionSubtitle);
    }

    // Add hover effect enhancement for desktop
    if (!isTouchDevice) {
        flipCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.transition = 'transform 0.3s ease';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // Add ripple effect to buttons on click
    const buttons = document.querySelectorAll('.flip-card-back .btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});


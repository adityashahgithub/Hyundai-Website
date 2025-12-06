// Testimonials page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Animate testimonial cards on scroll
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const cardObserver = new IntersectionObserver(function(entries) {
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
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        cardObserver.observe(card);
    });

    // Animate highlight cards
    const highlightCards = document.querySelectorAll('.highlight-card');
    const highlightObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'scale(0.9)';
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, 50);
                }, index * 150);
                highlightObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    highlightCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        highlightObserver.observe(card);
    });

    // Animate section titles
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

    // Animate video panel
    const videoPanel = document.querySelector('.video-panel');
    if (videoPanel) {
        const videoObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-30px)';
                    entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, 50);
                    videoObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        videoPanel.style.opacity = '0';
        videoPanel.style.transform = 'translateX(-30px)';
        videoObserver.observe(videoPanel);
    }
});


// About page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    if (index % 2 === 0) {
                        entry.target.style.transform = 'translateX(-50px)';
                    } else {
                        entry.target.style.transform = 'translateX(50px)';
                    }
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

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        timelineObserver.observe(item);
    });

    // Animate value cards on scroll
    const valueCards = document.querySelectorAll('.value-card');
    const valueObserver = new IntersectionObserver(function(entries) {
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
                valueObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    valueCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        valueObserver.observe(card);
    });

    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
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

    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-20px)';
        titleObserver.observe(title);
    });

    // Animate section subtitles
    const sectionSubtitles = document.querySelectorAll('.section-subtitle');
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

    sectionSubtitles.forEach(subtitle => {
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(-15px)';
        subtitleObserver.observe(subtitle);
    });

    // Animate story paragraphs
    const storyParagraphs = document.querySelectorAll('.about-story p');
    const storyObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 200);
                storyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    storyParagraphs.forEach(para => {
        para.style.opacity = '0';
        para.style.transform = 'translateY(20px)';
        storyObserver.observe(para);
    });
});


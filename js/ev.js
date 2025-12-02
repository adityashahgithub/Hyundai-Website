// Animate metric cards on scroll
function animateMetricCards() {
    const progressCards = document.querySelectorAll('.ev-progress-card');
    
    progressCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Load EV models
async function loadEVModels() {
    try {
        const response = await fetch('data/cars.json');
        const data = await response.json();
        const evCars = data.cars.filter(car => car.category === 'EV');
        const container = document.getElementById('evModels');
        
        if (container) {
            container.innerHTML = evCars.map(car => `
                <div class="model-card">
                    <img src="${car.image}" alt="${car.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800';">
                    <div class="model-card-content">
                        <h3>${car.name}</h3>
                        <span class="category">${car.category}</span>
                        <div class="price">${car.price}</div>
                        <p style="margin: 1rem 0; color: var(--text-light);">${car.description}</p>
                        <div style="margin: 1rem 0;">
                            <strong>Range:</strong> ${car.specs.range || car.specs.mileage || 'N/A'}<br>
                            <strong>Charging:</strong> ${car.specs.charging || 'N/A'}
                        </div>
                        <a href="model-detail.html?id=${car.id}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            `).join('');
            
            // Observe cards for scroll reveal
            const cards = container.querySelectorAll('.model-card');
            cards.forEach(card => {
                const observer = new IntersectionObserver(function(entries) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('reveal');
                        }
                    });
                }, { threshold: 0.1 });
                observer.observe(card);
            });
        }
    } catch (error) {
        console.error('Error loading EV models:', error);
    }
}

// Load comparison panel
async function loadComparison() {
    try {
        const response = await fetch('data/cars.json');
        const data = await response.json();
        const evCars = data.cars.filter(car => car.category === 'EV');
        const container = document.getElementById('comparisonPanel');
        
        if (container && evCars.length > 0) {
            container.innerHTML = evCars.map(car => `
                <div class="comparison-card">
                    <h3>${car.name}</h3>
                    <div class="price" style="margin: 1rem 0;">${car.price}</div>
                    <div style="text-align: left; margin-top: 1.5rem;">
                        <p><strong>Range:</strong> ${car.specs.range || car.specs.mileage || 'N/A'}</p>
                        <p><strong>Power:</strong> ${car.specs.power || 'N/A'}</p>
                        <p><strong>Charging:</strong> ${car.specs.charging || 'N/A'}</p>
                    </div>
                    <a href="model-detail.html?id=${car.id}" class="btn btn-primary" style="margin-top: 1.5rem;">Learn More</a>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading comparison:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadEVModels();
    loadComparison();
    
    // Animate metric cards when they come into view
    const progressSection = document.querySelector('.ev-progress');
    if (progressSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateMetricCards();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(progressSection);
    }
});


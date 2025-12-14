/* ============================================
   ELECTRIC VEHICLES PAGE JAVASCRIPT
   ============================================ */

/* ============================================
   ANIMATION FUNCTIONS
   ============================================ */

/**
 * Animate metric cards with staggered fade-in effect
 * Cards fade in one by one when scrolled into view
 */
function animateMetricCards() {
    const progressCards = document.querySelectorAll('.ev-progress-card');
    
    // Set initial state (hidden and translated down)
    progressCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        // Stagger animation with delay based on index
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100); // 100ms delay between each card
    });
}

/* ============================================
   DATA LOADING FUNCTIONS
   ============================================ */

/**
 * Load and display EV models from JSON data
 * Filters cars by category 'EV' and renders them in a grid
 */
async function loadEVModels() {
    try {
        // Fetch car data from JSON file
        const response = await fetch('data/cars.json');
        const data = await response.json();
        
        // Filter only electric vehicles
        const evCars = data.cars.filter(car => car.category === 'EV');
        const container = document.getElementById('evModels');
        
        if (container) {
            // Generate HTML for each EV model card
            container.innerHTML = evCars.map(car => `
                <div class="model-card">
                    <!-- Car Image with 404 error fallback -->
                    <img src="${car.image}" alt="${car.name}" onerror="this.onerror=null; this.src='images/404error.svg';">
                    <div class="model-card-content">
                        <h3>${car.name}</h3>
                        <span class="category">${car.category}</span>
                        <div class="price">${car.price}</div>
                        <p style="margin: 1rem 0; color: var(--text-light);">${car.description}</p>
                        <!-- EV-specific specifications -->
                        <div style="margin: 1rem 0;">
                            <strong>Range:</strong> ${car.specs.range || car.specs.mileage || 'N/A'}<br>
                            <strong>Charging:</strong> ${car.specs.charging || 'N/A'}
                        </div>
                        <a href="model-detail.html?id=${car.id}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            `).join('');
            
            // Set up Intersection Observer for scroll-triggered animations
            // Cards fade in when they come into viewport
            const cards = container.querySelectorAll('.model-card');
            cards.forEach(card => {
                const observer = new IntersectionObserver(function(entries) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('reveal'); // Trigger fade-in animation
                        }
                    });
                }, { threshold: 0.1 }); // Trigger when 10% of card is visible
                observer.observe(card);
            });
        }
    } catch (error) {
        console.error('Error loading EV models:', error);
    }
}

/**
 * Load and display EV comparison panel
 * Shows side-by-side comparison of all EV models with key specifications
 */
async function loadComparison() {
    try {
        // Fetch car data from JSON file
        const response = await fetch('data/cars.json');
        const data = await response.json();
        
        // Filter only electric vehicles
        const evCars = data.cars.filter(car => car.category === 'EV');
        const container = document.getElementById('comparisonPanel');
        
        if (container && evCars.length > 0) {
            // Generate HTML for comparison cards
            container.innerHTML = evCars.map(car => `
                <div class="comparison-card">
                    <h3>${car.name}</h3>
                    <div class="price" style="margin: 1rem 0;">${car.price}</div>
                    <!-- Key EV specifications for comparison -->
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

/* ============================================
   INITIALIZATION
   ============================================ */

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load EV models and comparison panel
    loadEVModels();
    loadComparison();
    
    // Set up Intersection Observer for progress section animation
    // Animate metric cards when progress section comes into view
    const progressSection = document.querySelector('.ev-progress');
    if (progressSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateMetricCards(); // Trigger staggered animation
                    observer.unobserve(entry.target); // Stop observing after animation
                }
            });
        }, { threshold: 0.2 }); // Trigger when 20% of section is visible
        observer.observe(progressSection);
    }
});


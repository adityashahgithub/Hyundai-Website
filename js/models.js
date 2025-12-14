let allCars = [];

// Load all models
async function loadModels() {
    try {
        const response = await fetch('data/cars.json');
        const data = await response.json();
        allCars = data.cars;
        displayModels(allCars);
    } catch (error) {
        console.error('Error loading models:', error);
    }
}

// Display models
function displayModels(cars) {
    const container = document.getElementById('modelsGrid');
    if (!container) return;
    
    container.innerHTML = cars.map(car => `
        <div class="model-card" data-category="${car.category}">
            <img src="${car.image}" alt="${car.name}" onerror="this.onerror=null; this.src='images/404error.svg';">
            <div class="model-card-content">
                <h3>${car.name}</h3>
                <span class="category">${car.category}</span>
                <div class="price">${car.price}</div>
                <p style="margin: 1rem 0; color: var(--text-light);">${car.description.substring(0, 100)}...</p>
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

// Filter functionality
document.addEventListener('DOMContentLoaded', function() {
    loadModels();
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter cars
            if (filter === 'all') {
                displayModels(allCars);
            } else {
                const filtered = allCars.filter(car => car.category === filter);
                displayModels(filtered);
            }
        });
    });
});


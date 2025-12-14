/* ============================================
   MODELS PAGE JAVASCRIPT
   ============================================ */

// Global variable to store all car data
// This allows filtering without re-fetching data
let allCars = [];

/* ============================================
   DATA LOADING
   ============================================ */

/**
 * Load all car models from JSON data file
 * Fetches car data and stores it globally, then displays all models
 */
async function loadModels() {
    try {
        // Fetch car data from JSON file
        const response = await fetch('data/cars.json');
        const data = await response.json();
        
        // Store all cars globally for filtering
        allCars = data.cars;
        
        // Display all models initially
        displayModels(allCars);
    } catch (error) {
        console.error('Error loading models:', error);
    }
}

/* ============================================
   MODEL DISPLAY
   ============================================ */

/**
 * Display car models in the grid
 * Generates HTML for each car card and sets up scroll animations
 * @param {Array} cars - Array of car objects to display
 */
function displayModels(cars) {
    const container = document.getElementById('modelsGrid');
    if (!container) return; // Exit if container doesn't exist
    
    // Generate HTML for each car card
    container.innerHTML = cars.map(car => `
        <div class="model-card" data-category="${car.category}">
            <!-- Car Image with 404 error fallback -->
            <img src="${car.image}" alt="${car.name}" onerror="this.onerror=null; this.src='images/404error.svg';">
            <div class="model-card-content">
                <h3>${car.name}</h3>
                <span class="category">${car.category}</span>
                <div class="price">${car.price}</div>
                <!-- Truncated description (first 100 characters) -->
                <p style="margin: 1rem 0; color: var(--text-light);">${car.description.substring(0, 100)}...</p>
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

/* ============================================
   FILTER FUNCTIONALITY
   ============================================ */

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load all models on page load
    loadModels();
    
    // Get all filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Add click event listener to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter category from data attribute
            const filter = this.getAttribute('data-filter');
            
            // Filter and display cars based on selected category
            if (filter === 'all') {
                // Show all models
                displayModels(allCars);
            } else {
                // Filter cars by category and display filtered results
                const filtered = allCars.filter(car => car.category === filter);
                displayModels(filtered);
            }
        });
    });
});


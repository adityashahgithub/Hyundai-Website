/* ============================================
   HERO SLIDER FUNCTIONALITY
   ============================================ */

// Global variables for slider state
let currentSlide = 0; // Current active slide index
let slideInterval; // Interval ID for auto-advance
const slides = document.querySelectorAll('.hero-slide'); // All slide elements
const dots = document.querySelectorAll('.hero-dot'); // All dot indicators
const prevBtn = document.querySelector('.hero-nav-prev'); // Previous button
const nextBtn = document.querySelector('.hero-nav-next'); // Next button

/**
 * Display a specific slide by index
 * Handles wrapping (loops to first/last slide)
 * @param {number} index - The slide index to show
 */
function showSlide(index) {
    // Handle wrapping: if index is out of bounds, loop to opposite end
    if (index < 0) {
        currentSlide = slides.length - 1; // Loop to last slide
    } else if (index >= slides.length) {
        currentSlide = 0; // Loop to first slide
    } else {
        currentSlide = index;
    }
    
    // Update active class on slides
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });
    
    // Update active class on dot indicators
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

/**
 * Advance to the next slide
 */
function nextSlide() {
    showSlide(currentSlide + 1);
    resetInterval(); // Reset auto-advance timer
}

/**
 * Go back to the previous slide
 */
function prevSlide() {
    showSlide(currentSlide - 1);
    resetInterval(); // Reset auto-advance timer
}

/**
 * Reset the auto-advance interval
 * Called after manual navigation to restart the timer
 */
function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000); // Auto-advance every 5 seconds
}

/* ============================================
   SLIDER INITIALIZATION
   ============================================ */

// Initialize slider when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start auto-advance slider (changes slide every 5 seconds)
    slideInterval = setInterval(nextSlide, 5000);
    
    // Add click event listeners to navigation arrows
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Add click event listeners to dot indicators
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index); // Jump directly to selected slide
            resetInterval(); // Reset auto-advance timer
        });
    });
    
    // Pause auto-advance when user hovers over hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseenter', () => clearInterval(slideInterval));
        hero.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000); // Resume on mouse leave
        });
    }
});

/* ============================================
   FEATURED MODELS LOADING
   ============================================ */

/**
 * Load and display featured car models from JSON data
 * Fetches car data and renders the first 6 models in a grid
 */
async function loadFeaturedModels() {
    try {
        // Fetch car data from JSON file
        const response = await fetch('data/cars.json');
        const data = await response.json();
        
        // Get first 6 models to display as featured
        const featured = data.cars.slice(0, 6);
        const container = document.getElementById('featuredModels');
        
        if (container) {
            // Generate HTML for each featured model card
            container.innerHTML = featured.map(car => `
                <div class="model-card">
                    <img src="${car.image}" alt="${car.name}" onerror="this.onerror=null; this.src='images/404error.svg';">
                    <div class="model-card-content">
                        <h3>${car.name}</h3>
                        <span class="category">${car.category}</span>
                        <div class="price">${car.price}</div>
                        <a href="model-detail.html?id=${car.id}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            `).join('');
            
            // Set up Intersection Observer for scroll-triggered animations
            // Cards fade in when they come into view
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
        console.error('Error loading featured models:', error);
    }
}

// Load featured models when page loads
document.addEventListener('DOMContentLoaded', loadFeaturedModels);


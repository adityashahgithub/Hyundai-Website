/* ============================================
   MODEL DETAIL PAGE JAVASCRIPT
   ============================================ */

// Global variable to store current car data
let currentCar = null;

/* ============================================
   URL PARAMETER HANDLING
   ============================================ */

/**
 * Extract car ID from URL query parameters
 * @returns {string|null} The car ID from URL or null if not found
 */
function getCarIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

/* ============================================
   DATA LOADING
   ============================================ */

/**
 * Load car details from JSON data based on URL parameter
 * Redirects to models page if no ID is provided
 * Redirects to 404 page if car is not found
 */
async function loadCarDetails() {
    // Get car ID from URL
    const carId = getCarIdFromURL();
    
    // Redirect to models page if no ID provided
    if (!carId) {
        window.location.href = 'models.html';
        return;
    }
    
    try {
        // Fetch car data from JSON file
        const response = await fetch('data/cars.json');
        const data = await response.json();
        
        // Find the car with matching ID
        currentCar = data.cars.find(car => car.id === carId);
        
        // Redirect to 404 page if car not found
        if (!currentCar) {
            window.location.href = '404.html';
            return;
        }
        
        // Display the car details
        displayCarDetails(currentCar);
    } catch (error) {
        console.error('Error loading car details:', error);
    }
}

/* ============================================
   DISPLAY FUNCTIONS
   ============================================ */

/**
 * Display car details on the page
 * Updates hero section, description, features, and specifications
 * @param {Object} car - Car object containing all car details
 */
function displayCarDetails(car) {
    // Update Hero Section Background Image
    const hero = document.getElementById('modelHero');
    if (hero) {
        hero.style.backgroundImage = `url('${car.heroImage}')`;
        
        // Fallback if hero image fails to load
        const img = new Image();
        img.onerror = function() {
            hero.style.backgroundImage = "url('images/404error.svg')";
        };
        img.src = car.heroImage;
    }
    
    // Update Model Name
    document.getElementById('modelName').textContent = car.name;
    
    // Update Model Price
    document.getElementById('modelPrice').textContent = car.price;
    
    // Update Model Description
    document.getElementById('modelDescription').textContent = car.description;
    
    // Display Key Features as pill-shaped badges
    const featuresContainer = document.getElementById('modelFeatures');
    if (featuresContainer) {
        featuresContainer.innerHTML = car.features.map(feature => `
            <div style="display: inline-block; padding: 0.5rem 1rem; margin: 0.5rem; background: var(--bg-light); border-radius: 20px;">
                ✓ ${feature}
            </div>
        `).join('');
    }
    
    // Display Specifications in Grid Layout
    const specsContainer = document.getElementById('specsGrid');
    if (specsContainer && car.specs) {
        // Convert specs object to array and format keys (e.g., "engine" -> "Engine")
        specsContainer.innerHTML = Object.entries(car.specs).map(([key, value]) => `
            <div class="spec-item">
                <h4>${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</h4>
                <p>${value}</p>
            </div>
        `).join('');
    }
}

/* ============================================
   TAB FUNCTIONALITY
   ============================================ */

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load car details on page load
    loadCarDetails();
    
    // Get all tab buttons and tab content sections
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Add click event listener to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the target tab ID from data attribute
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tab buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tab content sections
            tabContents.forEach(content => {
                content.classList.remove('active');
                
                // Show the target tab content
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    /* ============================================
       MODAL FUNCTIONALITY
       ============================================ */
    
    // Get modal and related elements
    const modal = document.getElementById('testDriveModal');
    const openModalBtn = document.getElementById('bookTestDriveBtn');
    const closeModalBtn = document.getElementById('closeModal');
    const form = document.getElementById('testDriveForm');
    
    // Open modal when "Book Test Drive" button is clicked
    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });
    }
    
    // Close modal when close button is clicked
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside the modal content
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
    
    // Handle form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Show success message
            alert('Thank you! Your test drive request has been submitted. We will contact you soon.');
            
            // Reset form and close modal
            form.reset();
            modal.classList.remove('active');
        });
    }
});

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    loadCarDetails();
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Modal functionality
    const modal = document.getElementById('testDriveModal');
    const openModalBtn = document.getElementById('bookTestDriveBtn');
    const closeModalBtn = document.getElementById('closeModal');
    const form = document.getElementById('testDriveForm');
    
    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    // Close modal on outside click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
    
    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! Your test drive request has been submitted. We will contact you soon.');
            form.reset();
            modal.classList.remove('active');
        });
    }
});


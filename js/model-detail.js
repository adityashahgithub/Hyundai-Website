let currentCar = null;

// Get car ID from URL
function getCarIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Load car details
async function loadCarDetails() {
    const carId = getCarIdFromURL();
    if (!carId) {
        window.location.href = 'models.html';
        return;
    }
    
    try {
        const response = await fetch('data/cars.json');
        const data = await response.json();
        currentCar = data.cars.find(car => car.id === carId);
        
        if (!currentCar) {
            window.location.href = '404.html';
            return;
        }
        
        displayCarDetails(currentCar);
    } catch (error) {
        console.error('Error loading car details:', error);
    }
}

// Display car details
function displayCarDetails(car) {
    // Hero section
    const hero = document.getElementById('modelHero');
    if (hero) {
        hero.style.backgroundImage = `url('${car.heroImage}')`;
        // Fallback if image fails to load
        const img = new Image();
        img.onerror = function() {
            hero.style.backgroundImage = "url('https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200')";
        };
        img.src = car.heroImage;
    }
    
    document.getElementById('modelName').textContent = car.name;
    document.getElementById('modelPrice').textContent = car.price;
    document.getElementById('modelDescription').textContent = car.description;
    
    // Features
    const featuresContainer = document.getElementById('modelFeatures');
    if (featuresContainer) {
        featuresContainer.innerHTML = car.features.map(feature => `
            <div style="display: inline-block; padding: 0.5rem 1rem; margin: 0.5rem; background: var(--bg-light); border-radius: 20px;">
                ✓ ${feature}
            </div>
        `).join('');
    }
    
    // Specs
    const specsContainer = document.getElementById('specsGrid');
    if (specsContainer && car.specs) {
        specsContainer.innerHTML = Object.entries(car.specs).map(([key, value]) => `
            <div class="spec-item">
                <h4>${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</h4>
                <p>${value}</p>
            </div>
        `).join('');
    }
}

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


/* ============================================
   TEST DRIVE PAGE JAVASCRIPT
   ============================================ */

/* ============================================
   SERVICE CENTER DATA
   ============================================ */

/**
 * Service Center Data - Real locations in Gujarat
 * Contains address, phone, and hours for each service center
 */
const serviceCenters = {
    nadiad: {
        name: "Nadiad - Downtown Hyundai",
        address: "Downtown Hyundai Nadiad, Nadiad, Kheda District, Gujarat - 387001",
        phone: "+91 2696 223456",
        hours: "Mon-Sat: 9:00 AM - 7:00 PM | Sun: 10:00 AM - 6:00 PM"
    },
    anand: {
        name: "Anand - Advaika Motors",
        address: "Shop No. 8-9, Vallabh Vidyanagar Road, Near Anand Station, Anand, Gujarat - 388120",
        phone: "+91 2692 245678",
        hours: "Mon-Sat: 9:00 AM - 7:00 PM | Sun: 10:00 AM - 5:00 PM"
    },
    ahmedabad: {
        name: "Ahmedabad - SG Highway",
        address: "Shop No. 1-2, Ground Floor, Advaika House, Near Iskcon Temple, SG Highway, Ahmedabad - 380054",
        phone: "+91 79 4000 1234",
        hours: "Mon-Sat: 9:00 AM - 7:00 PM | Sun: 10:00 AM - 6:00 PM"
    }
};

/* ============================================
   DATA LOADING
   ============================================ */

/**
 * Load car models from JSON and display in selection grid
 * Fetches all car models and renders them as selectable cards
 */
async function loadModels() {
    try {
        // Fetch car data from JSON file
        const response = await fetch('data/cars.json');
        const data = await response.json();
        const container = document.getElementById('modelSelection');
        
        if (container) {
            // Generate HTML for each model card
            container.innerHTML = data.cars.map(car => `
                <div class="model-card-select" data-model-id="${car.id}" data-model-name="${car.name}">
                    <!-- Car Image with 404 error fallback -->
                    <img src="${car.image}" alt="${car.name}" onerror="this.onerror=null; this.src='images/404error.svg';">
                    <h4>${car.name}</h4>
                    <span class="model-category">${car.category}</span>
                </div>
            `).join('');
            
            // Add click event listeners to model cards
            const modelCards = container.querySelectorAll('.model-card-select');
            modelCards.forEach(card => {
                card.addEventListener('click', function() {
                    // Remove selected class from all cards
                    modelCards.forEach(c => c.classList.remove('selected'));
                    
                    // Add selected class to clicked card
                    this.classList.add('selected');
                    
                    // Update hidden input with selected model ID
                    document.getElementById('selectedModel').value = this.dataset.modelId;
                    
                    // Update summary with selected model name
                    updateSummary('model', this.dataset.modelName);
                });
            });
        }
    } catch (error) {
        console.error('Error loading models:', error);
    }
}

/* ============================================
   SUMMARY MANAGEMENT
   ============================================ */

/**
 * Update booking summary with selected values
 * Updates the summary card on the right side of the form
 * @param {string} field - The field to update (model, date, time, location)
 * @param {string} value - The value to display
 */
function updateSummary(field, value) {
    // Map of field names to their corresponding element IDs and default values
    const summaryMap = {
        model: { id: 'summaryModel', default: 'Not selected' },
        date: { id: 'summaryDate', default: 'Not selected' },
        time: { id: 'summaryTime', default: 'Not selected' },
        location: { id: 'summaryLocation', default: 'Not selected' }
    };
    
    if (summaryMap[field]) {
        const element = document.getElementById(summaryMap[field].id);
        if (element) {
            element.textContent = value || summaryMap[field].default;
        }
    }
}

/* ============================================
   DATE & TIME FORMATTING
   ============================================ */

/**
 * Format date string to readable format
 * Converts ISO date string to formatted date (e.g., "Monday, January 15, 2025")
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
function formatDate(dateString) {
    if (!dateString) return 'Not selected';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

/**
 * Format time string to 12-hour format
 * Converts 24-hour time (e.g., "14:00") to 12-hour format (e.g., "2:00 PM")
 * @param {string} timeString - 24-hour time string (HH:MM)
 * @returns {string} Formatted time string with AM/PM
 */
function formatTime(timeString) {
    if (!timeString) return 'Not selected';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12; // Convert 0 to 12 for midnight
    return `${displayHour}:${minutes} ${ampm}`;
}

/* ============================================
   FORM EVENT LISTENERS
   ============================================ */

/**
 * Initialize all form event listeners
 * Sets up date validation, time/date change handlers, and service center selection
 */
function initializeFormListeners() {
    // Date Input - Set minimum date and update summary on change
    const dateInput = document.getElementById('testDriveDate');
    if (dateInput) {
        // Set minimum date to today (prevent past dates)
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        // Update summary when date changes
        dateInput.addEventListener('change', function() {
            updateSummary('date', formatDate(this.value));
        });
    }
    
    // Time Select - Update summary when time changes
    const timeSelect = document.getElementById('testDriveTime');
    if (timeSelect) {
        timeSelect.addEventListener('change', function() {
            updateSummary('time', formatTime(this.value));
        });
    }
    
    // Service Center Select - Show/hide location details and update summary
    const serviceCenterSelect = document.getElementById('serviceCenter');
    if (serviceCenterSelect) {
        serviceCenterSelect.addEventListener('change', function() {
            const selectedCenter = serviceCenters[this.value];
            if (selectedCenter) {
                // Show location details card with address, phone, and hours
                const locationDetails = document.getElementById('locationDetails');
                if (locationDetails) {
                    locationDetails.style.display = 'block';
                    document.getElementById('locationAddress').textContent = selectedCenter.address;
                    document.getElementById('locationPhone').textContent = selectedCenter.phone;
                    document.getElementById('locationHours').textContent = selectedCenter.hours;
                }
                // Update summary with selected location
                updateSummary('location', selectedCenter.name);
            } else {
                // Hide location details if no center selected
                const locationDetails = document.getElementById('locationDetails');
                if (locationDetails) {
                    locationDetails.style.display = 'none';
                }
                updateSummary('location', 'Not selected');
            }
        });
    }
    
    // Form Submission Handler
    const form = document.getElementById('testDriveForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            handleFormSubmission();
        });
    }
}

/* ============================================
   FORM SUBMISSION HANDLING
   ============================================ */

/**
 * Handle form submission
 * Collects all form data, formats it, and displays confirmation modal
 * Resets form and summary after submission
 */
function handleFormSubmission() {
    const form = document.getElementById('testDriveForm');
    const formData = new FormData(form);
    
    // Get selected model name from the selected card
    const selectedModelCard = document.querySelector('.model-card-select.selected');
    const modelName = selectedModelCard ? selectedModelCard.dataset.modelName : 'Not selected';
    
    // Get service center name from selected option
    const serviceCenterSelect = document.getElementById('serviceCenter');
    const serviceCenterName = serviceCenters[serviceCenterSelect.value]?.name || 'Not selected';
    
    // Prepare booking data object with formatted values
    const bookingData = {
        model: modelName,
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        alternatePhone: formData.get('alternatePhone') || 'N/A',
        date: formatDate(formData.get('testDriveDate')), // Format date
        time: formatTime(formData.get('testDriveTime')), // Format time
        location: serviceCenterName,
        message: formData.get('message') || 'N/A'
    };
    
    // Display confirmation modal with booking details
    showConfirmationModal(bookingData);
    
    // Reset form to initial state
    form.reset();
    
    // Remove selected state from all model cards
    document.querySelectorAll('.model-card-select').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Hide location details
    document.getElementById('locationDetails').style.display = 'none';
    
    // Reset summary to default values
    updateSummary('model', 'Not selected');
    updateSummary('date', 'Not selected');
    updateSummary('time', 'Not selected');
    updateSummary('location', 'Not selected');
}

/* ============================================
   MODAL FUNCTIONALITY
   ============================================ */

/**
 * Show confirmation modal with booking details
 * Displays all booking information in a formatted modal
 * @param {Object} bookingData - Object containing all booking information
 */
function showConfirmationModal(bookingData) {
    const modal = document.getElementById('confirmationModal');
    const modalBody = document.getElementById('confirmationDetails');
    
    if (modal && modalBody) {
        // Generate HTML for confirmation details
        modalBody.innerHTML = `
            <div class="confirmation-detail">
                <span class="confirmation-detail-label">Vehicle Model:</span>
                <span class="confirmation-detail-value">${bookingData.model}</span>
            </div>
            <div class="confirmation-detail">
                <span class="confirmation-detail-label">Name:</span>
                <span class="confirmation-detail-value">${bookingData.fullName}</span>
            </div>
            <div class="confirmation-detail">
                <span class="confirmation-detail-label">Email:</span>
                <span class="confirmation-detail-value">${bookingData.email}</span>
            </div>
            <div class="confirmation-detail">
                <span class="confirmation-detail-label">Phone:</span>
                <span class="confirmation-detail-value">${bookingData.phone}</span>
            </div>
            <div class="confirmation-detail">
                <span class="confirmation-detail-label">Date:</span>
                <span class="confirmation-detail-value">${bookingData.date}</span>
            </div>
            <div class="confirmation-detail">
                <span class="confirmation-detail-label">Time:</span>
                <span class="confirmation-detail-value">${bookingData.time}</span>
            </div>
            <div class="confirmation-detail">
                <span class="confirmation-detail-label">Location:</span>
                <span class="confirmation-detail-value">${bookingData.location}</span>
            </div>
        `;
        
        // Show modal
        modal.classList.add('show');
        
        // Close modal when clicking outside the modal content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeConfirmationModal();
            }
        });
    }
}

/**
 * Close confirmation modal
 * Hides the modal by removing the 'show' class
 */
function closeConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

/* ============================================
   INITIALIZATION
   ============================================ */

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load car models for selection
    loadModels();
    
    // Initialize form event listeners
    initializeFormListeners();
    
    /* ============================================
       SCROLL ANIMATIONS
       ============================================ */
    
    // Intersection Observer configuration for scroll animations
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Offset from bottom
    };
    
    /**
     * Intersection Observer for scroll-triggered animations
     * Animates form sections and summary card when they come into view
     */
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Set initial state (hidden and translated down)
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                // Trigger fade-in animation
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all form sections for scroll animation
    document.querySelectorAll('.form-section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe summary card for scroll animation
    const summaryCard = document.querySelector('.summary-card');
    if (summaryCard) {
        observer.observe(summaryCard);
    }
});


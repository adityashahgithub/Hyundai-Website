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
const getTestDriveFormKey = () => {
        const currentUser = (window.StorageUtil && StorageUtil.get('hyundai:currentUser')) || 'guest';
        return `testDriveForm:${currentUser}`;
};

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

                    // Persist selection (per user)
                    if (window.StorageUtil) {
                        StorageUtil.saveForm('testDriveForm', getTestDriveFormKey());
                    }
                });
            });

            // Restore previously selected model from storage
            if (window.StorageUtil) {
                const saved = StorageUtil.get(getTestDriveFormKey());
                const savedModelId = saved && (saved.model || saved.selectedModel);
                if (savedModelId) {
                    const savedCard = container.querySelector(`.model-card-select[data-model-id="${savedModelId}"]`);
                    if (savedCard) {
                        modelCards.forEach(c => c.classList.remove('selected'));
                        savedCard.classList.add('selected');
                        const hidden = document.getElementById('selectedModel');
                        if (hidden) hidden.value = savedModelId;
                        updateSummary('model', savedCard.dataset.modelName);
                    }
                }
            }
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

/**
 * Reset booking summary and related UI to defaults
 * Clears selected model highlight, hides location details,
 * resets summary text, and clears hidden inputs.
 */
function resetSummary() {
    try {
        // Reset summary text values
        updateSummary('model', 'Not selected');
        updateSummary('date', 'Not selected');
        updateSummary('time', 'Not selected');
        updateSummary('location', 'Not selected');

        // Clear selected model card highlight
        document.querySelectorAll('.model-card-select.selected').forEach(card => {
            card.classList.remove('selected');
        });

        // Clear hidden selected model input if present
        const hiddenModel = document.getElementById('selectedModel');
        if (hiddenModel) hiddenModel.value = '';

        // Hide location details block
        const locationDetails = document.getElementById('locationDetails');
        if (locationDetails) locationDetails.style.display = 'none';
    } catch (e) {
        console.warn('resetSummary encountered an issue:', e);
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
   PHONE VALIDATION
   ============================================ */

/**
 * Validate phone numbers allowing optional country code
 * Accepts 10-15 digits after removing separators
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
function validatePhoneNumber(phone) {
    const trimmed = phone.trim();
    const cleaned = trimmed.replace(/[\s\-().]/g, '');
    const digits = cleaned.startsWith('+') ? cleaned.slice(1) : cleaned;
    const onlyDigits = /^\+?\d+$/.test(cleaned);
    return onlyDigits && digits.length >= 10 && digits.length <= 15;
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
            if (window.StorageUtil) {
                StorageUtil.saveForm('testDriveForm', getTestDriveFormKey());
            }
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
            if (window.StorageUtil) {
                StorageUtil.saveForm('testDriveForm', getTestDriveFormKey());
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

        // Handle reset button
        form.addEventListener('reset', function(e) {
            // Clear autosaved draft from localStorage
            if (window.StorageUtil) {
                StorageUtil.remove(getTestDriveFormKey());
            }
            // Reset summary card
            resetSummary();
            // Small delay to ensure reset completes
            setTimeout(() => {
                updateSummary();
                // Scroll to top of form section (robust)
                scrollToFormTop();
            }, 50);
        });

        // Autosave on input/change
        if (window.StorageUtil) {
            const saveHandler = () => StorageUtil.saveForm('testDriveForm', getTestDriveFormKey());
            form.addEventListener('input', saveHandler);
            form.addEventListener('change', saveHandler);
        }
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

    const phoneValue = (formData.get('phone') || '').trim();
    const altPhoneValue = (formData.get('alternatePhone') || '').trim();

    // Validate primary phone
    if (!validatePhoneNumber(phoneValue)) {
        alert('Please enter a valid phone number (10-15 digits, country code optional e.g., +91 98765 43210).');
        const phoneField = form.querySelector('#phone');
        if (phoneField) phoneField.focus();
        return;
    }

    // Validate alternate phone if provided
    if (altPhoneValue && !validatePhoneNumber(altPhoneValue)) {
        alert('Alternate phone must be 10-15 digits (country code optional).');
        const altField = form.querySelector('#alternatePhone');
        if (altField) altField.focus();
        return;
    }
    
    // Get selected model name from the selected card
    const selectedModelCard = document.querySelector('.model-card-select.selected');
    const modelName = selectedModelCard ? selectedModelCard.dataset.modelName : 'Not selected';
    
    // Get service center name from selected option
    const serviceCenterSelect = document.getElementById('serviceCenter');
    const serviceCenterName = serviceCenters[serviceCenterSelect.value]?.name || 'Not selected';
    
    // Prepare booking data object with formatted values
    const bookingData = {
        id: Date.now(), // Unique ID based on timestamp
        model: modelName,
        modelId: document.getElementById('selectedModel').value,
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: phoneValue,
        alternatePhone: altPhoneValue || 'N/A',
        date: formatDate(formData.get('testDriveDate')), // Format date
        rawDate: formData.get('testDriveDate'), // Keep raw date for comparison
        time: formatTime(formData.get('testDriveTime')), // Format time
        location: serviceCenterName,
        locationId: serviceCenterSelect.value,
        message: formData.get('message') || 'N/A',
        status: 'pending', // pending, confirmed, completed, cancelled
        bookedAt: new Date().toISOString(), // Timestamp when booking was made
        bookedAtFormatted: new Date().toLocaleString('en-IN', { 
            dateStyle: 'medium', 
            timeStyle: 'short' 
        })
    };
    
    // Save booking to localStorage
    saveTestDriveBooking(bookingData);
    
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

    // Clear saved draft after successful submission
    if (window.StorageUtil) {
        StorageUtil.remove(getTestDriveFormKey());
    }
    
    // Refresh bookings display if it exists
    if (typeof displayBookingHistory === 'function') {
        displayBookingHistory();
    }
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
            <div class="confirmation-detail">
                <span class="confirmation-detail-label">Booking ID:</span>
                <span class="confirmation-detail-value">#${bookingData.id}</span>
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
    // Automatically add 'required-field' class to form groups with required inputs
    // This ensures the asterisk appears even in browsers that don't support :has()
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const hasRequired = group.querySelector('input[required], select[required], textarea[required]');
        if (hasRequired) {
            group.classList.add('required-field');
        }
    });

    // Auth gate: block form if user is not logged in
    try {
        const currentUser = (window.StorageUtil && StorageUtil.get('hyundai:currentUser')) || null;
        const notLoggedIn = !currentUser || currentUser === 'guest';
        const form = document.getElementById('testDriveForm');
        const content = document.querySelector('.test-drive-content');
        const headerEl = document.querySelector('.test-drive-header');
        if (notLoggedIn && form) {
            // Disable all fields and actions
            form.querySelectorAll('input, select, textarea, button').forEach(el => {
                el.disabled = true;
            });
            // Dim and disable interaction for the content area
            if (content) content.classList.add('auth-disabled');
            // Inject login required banner above the content
            const notice = document.createElement('div');
            notice.className = 'login-required';
            notice.innerHTML = `
                <h3>Login Required</h3>
                <p>Please log in to book a test drive.</p>
                <a class="btn btn-primary" href="login.html">Log In</a>
            `;
            const container = document.querySelector('.test-drive-container');
            if (container) {
                if (headerEl && headerEl.nextSibling) {
                    container.insertBefore(notice, headerEl.nextSibling);
                } else {
                    container.insertBefore(notice, container.firstChild);
                }
            }
        }
    } catch (e) {
        console.warn('Auth gate setup failed:', e);
    }

    // Load car models for selection
    loadModels();
    
    // Initialize form event listeners
    initializeFormListeners();

    // Restore saved form values and apply to summary/location UI
    if (window.StorageUtil) {
        const formStorageKey = getTestDriveFormKey();
        StorageUtil.loadForm('testDriveForm', formStorageKey);
        const saved = StorageUtil.get(formStorageKey);
        if (saved) {
            if (saved.testDriveDate) updateSummary('date', formatDate(saved.testDriveDate));
            if (saved.testDriveTime) updateSummary('time', formatTime(saved.testDriveTime));
            if (saved.serviceCenter) {
                const sc = serviceCenters[saved.serviceCenter];
                if (sc) {
                    const locationDetails = document.getElementById('locationDetails');
                    if (locationDetails) {
                        locationDetails.style.display = 'block';
                        document.getElementById('locationAddress').textContent = sc.address;
                        document.getElementById('locationPhone').textContent = sc.phone;
                        document.getElementById('locationHours').textContent = sc.hours;
                    }
                    updateSummary('location', sc.name);
                }
            }
        }
    }
    
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
    
    // Display booking history if container exists
    if (document.getElementById('bookingHistoryContainer')) {
        displayBookingHistory();
    }
});

/* ============================================
   BOOKING MANAGEMENT FUNCTIONS
   ============================================ */

/**
 * Get storage key for current user's bookings
 * @returns {string} Storage key specific to user
 */
function getBookingsStorageKey() {
    const currentUser = (window.StorageUtil && StorageUtil.get('hyundai:currentUser')) || 'guest';
    return `testDriveBookings:${currentUser}`;
}

/**
 * Save test drive booking to localStorage
 * @param {Object} bookingData - Booking information to save
 */
function saveTestDriveBooking(bookingData) {
    try {
        const storageKey = getBookingsStorageKey();
        
        // Get existing bookings
        const existingBookings = getTestDriveBookings();
        
        // Check for duplicate bookings (same date, time, and location)
        const isDuplicate = existingBookings.some(booking => 
            booking.rawDate === bookingData.rawDate && 
            booking.time === bookingData.time && 
            booking.locationId === bookingData.locationId &&
            booking.status !== 'cancelled'
        );
        
        if (isDuplicate) {
            console.warn('Duplicate booking detected - user already has a booking for this date/time/location');
            // You can choose to prevent duplicate or allow it
            // For now, we'll allow it but you could show a warning
        }
        
        // Add new booking to the beginning of the array
        existingBookings.unshift(bookingData);
        
        // Save to localStorage
        if (window.StorageUtil) {
            StorageUtil.set(storageKey, existingBookings);
        } else {
            localStorage.setItem(storageKey, JSON.stringify(existingBookings));
        }
        
        console.log('Test drive booking saved successfully:', bookingData);
    } catch (error) {
        console.error('Error saving test drive booking:', error);
    }
}

/**
 * Get all test drive bookings for current user
 * @returns {Array} Array of booking objects
 */
function getTestDriveBookings() {
    try {
        const storageKey = getBookingsStorageKey();
        
        let bookings;
        if (window.StorageUtil) {
            bookings = StorageUtil.get(storageKey);
        } else {
            const data = localStorage.getItem(storageKey);
            bookings = data ? JSON.parse(data) : null;
        }
        
        return Array.isArray(bookings) ? bookings : [];
    } catch (error) {
        console.error('Error retrieving test drive bookings:', error);
        return [];
    }
}

/**
 * Update booking status
 * @param {number} bookingId - ID of the booking to update
 * @param {string} newStatus - New status (pending, confirmed, completed, cancelled)
 */
function updateBookingStatus(bookingId, newStatus) {
    try {
        const bookings = getTestDriveBookings();
        const booking = bookings.find(b => b.id === bookingId);
        
        if (booking) {
            booking.status = newStatus;
            booking.updatedAt = new Date().toISOString();
            
            const storageKey = getBookingsStorageKey();
            if (window.StorageUtil) {
                StorageUtil.set(storageKey, bookings);
            } else {
                localStorage.setItem(storageKey, JSON.stringify(bookings));
            }
            
            console.log(`Booking ${bookingId} status updated to ${newStatus}`);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error updating booking status:', error);
        return false;
    }
}

/**
 * Delete a booking
 * @param {number} bookingId - ID of the booking to delete
 */
function deleteBooking(bookingId) {
    try {
        const bookings = getTestDriveBookings();
        const filteredBookings = bookings.filter(b => b.id !== bookingId);
        
        const storageKey = getBookingsStorageKey();
        if (window.StorageUtil) {
            StorageUtil.set(storageKey, filteredBookings);
        } else {
            localStorage.setItem(storageKey, JSON.stringify(filteredBookings));
        }
        
        console.log(`Booking ${bookingId} deleted`);
        return true;
    } catch (error) {
        console.error('Error deleting booking:', error);
        return false;
    }
}

/**
 * Get bookings by status
 * @param {string} status - Status to filter by
 * @returns {Array} Filtered bookings
 */
function getBookingsByStatus(status) {
    const bookings = getTestDriveBookings();
    return bookings.filter(b => b.status === status);
}

/**
 * Get upcoming bookings (future dates only)
 * @returns {Array} Future bookings
 */
function getUpcomingBookings() {
    const bookings = getTestDriveBookings();
    const today = new Date().toISOString().split('T')[0];
    
    return bookings.filter(b => 
        b.rawDate >= today && 
        (b.status === 'pending' || b.status === 'confirmed')
    );
}

/**
 * Display booking history on the page
 * Creates a visual list of all user bookings
 */
function displayBookingHistory() {
    const container = document.getElementById('bookingHistoryContainer');
    if (!container) return;
    const currentUser = (window.StorageUtil && StorageUtil.get('hyundai:currentUser')) || null;
    if (!currentUser || currentUser === 'guest') {
        container.innerHTML = `
            <div class="login-required">
                <h3>Login Required</h3>
                <p>Please log in to view your bookings.</p>
                <a class="btn btn-primary" href="login.html">Log In</a>
            </div>
        `;
        return;
    }
    
    const bookings = getTestDriveBookings();
    
    if (bookings.length === 0) {
        container.innerHTML = `
            <div class="no-bookings">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3>No test drive bookings yet</h3>
                <p>Book your first test drive using the form above!</p>
                <a href="#test-drive-form" class="btn" onclick="scrollToFormTop(); return false;">Book Test Drive</a>
            </div>
        `;
        return;
    }
    
    const statusColors = {
        pending: '#FFA500',
        confirmed: '#28A745',
        completed: '#6C757D',
        cancelled: '#DC3545'
    };
    
    container.innerHTML = `
        <div class="bookings-header">
            <h3>Your Test Drive Bookings</h3>
            <p>${bookings.length} total booking${bookings.length !== 1 ? 's' : ''}</p>
        </div>
        <div class="bookings-list">
            ${bookings.map(booking => `
                <div class="booking-card" data-booking-id="${booking.id}">
                    <div class="booking-header">
                        <h4>${booking.model}</h4>
                        <span class="booking-status" style="background: ${statusColors[booking.status] || '#6C757D'}">
                            ${booking.status.toUpperCase()}
                        </span>
                    </div>
                    <div class="booking-details">
                        <p><strong>📅 Date:</strong> ${booking.date}</p>
                        <p><strong>🕐 Time:</strong> ${booking.time}</p>
                        <p><strong>📍 Location:</strong> ${booking.location}</p>
                        <p><strong>👤 Name:</strong> ${booking.fullName}</p>
                        <p><strong>📞 Phone:</strong> ${booking.phone}</p>
                        <p><strong>📧 Email:</strong> ${booking.email}</p>
                        ${booking.message !== 'N/A' ? `<p><strong>💬 Message:</strong> ${booking.message}</p>` : ''}
                        <p class="booking-time"><small>Booked on: ${booking.bookedAtFormatted}</small></p>
                    </div>
                    <div class="booking-actions">
                        ${booking.status === 'pending' ? `
                            <button class="btn-cancel-booking" onclick="cancelBooking(${booking.id})">Cancel</button>
                        ` : ''}
                        <button class="btn-delete-booking" onclick="removeBooking(${booking.id})">Delete</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

/**
 * Smoothly scroll viewport to the top of the test drive form section
 * Uses window.scrollTo for broader browser support than scrollIntoView
 */
function scrollToFormTop() {
    const target = document.getElementById('test-drive-form') || document.querySelector('.test-drive-container') || document.querySelector('.test-drive-form');
    if (!target) return;
    const header = document.querySelector('header');
    const headerOffset = header ? header.offsetHeight : 0;
    const y = target.getBoundingClientRect().top + window.pageYOffset - Math.max(headerOffset, 16);
    try {
        window.scrollTo({ top: y, behavior: 'smooth' });
    } catch (_) {
        window.scrollTo(0, y);
    }
}

/**
 * Cancel a booking (change status to cancelled)
 * @param {number} bookingId - ID of booking to cancel
 */
function cancelBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this test drive booking?')) {
        if (updateBookingStatus(bookingId, 'cancelled')) {
            displayBookingHistory();
            alert('Booking cancelled successfully');
        }
    }
}

/**
 * Remove a booking completely
 * @param {number} bookingId - ID of booking to remove
 */
function removeBooking(bookingId) {
    if (confirm('Are you sure you want to delete this booking record?')) {
        if (deleteBooking(bookingId)) {
            displayBookingHistory();
            alert('Booking deleted successfully');
        }
    }
}

// ============================================
// PAGE INITIALIZATION
// ============================================

/**
 * Initialize page on load
 */
document.addEventListener('DOMContentLoaded', function() {
    // Display booking history if user is logged in
    displayBookingHistory();
});

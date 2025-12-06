// Service Center Data
const serviceCenters = {
    mumbai: {
        name: "Mumbai - Andheri East",
        address: "Plot No. 1, Saki Vihar Road, Andheri East, Mumbai - 400072, Maharashtra",
        phone: "+91 22 2857 1234",
        hours: "Mon-Sat: 9:00 AM - 6:00 PM | Sun: 10:00 AM - 4:00 PM"
    },
    delhi: {
        name: "Delhi - Mathura Road",
        address: "12/2, Mathura Road, Near Apollo Hospital, New Delhi - 110076",
        phone: "+91 11 2685 7890",
        hours: "Mon-Sat: 9:00 AM - 6:00 PM | Sun: 10:00 AM - 4:00 PM"
    },
    bangalore: {
        name: "Bangalore - Marathahalli",
        address: "No. 45, Outer Ring Road, Marathahalli, Bangalore - 560037, Karnataka",
        phone: "+91 80 2856 3456",
        hours: "Mon-Sat: 9:00 AM - 6:00 PM | Sun: 10:00 AM - 4:00 PM"
    }
};

// Load Models
async function loadModels() {
    try {
        const response = await fetch('data/cars.json');
        const data = await response.json();
        const container = document.getElementById('modelSelection');
        
        if (container) {
            container.innerHTML = data.cars.map(car => `
                <div class="model-card-select" data-model-id="${car.id}" data-model-name="${car.name}">
                    <img src="${car.image}" alt="${car.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800';">
                    <h4>${car.name}</h4>
                    <span class="model-category">${car.category}</span>
                </div>
            `).join('');
            
            // Add click event listeners
            const modelCards = container.querySelectorAll('.model-card-select');
            modelCards.forEach(card => {
                card.addEventListener('click', function() {
                    // Remove selected class from all cards
                    modelCards.forEach(c => c.classList.remove('selected'));
                    // Add selected class to clicked card
                    this.classList.add('selected');
                    // Update hidden input
                    document.getElementById('selectedModel').value = this.dataset.modelId;
                    // Update summary
                    updateSummary('model', this.dataset.modelName);
                });
            });
        }
    } catch (error) {
        console.error('Error loading models:', error);
    }
}

// Update Summary
function updateSummary(field, value) {
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

// Format Date
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

// Format Time
function formatTime(timeString) {
    if (!timeString) return 'Not selected';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Initialize Form Listeners
function initializeFormListeners() {
    // Date input
    const dateInput = document.getElementById('testDriveDate');
    if (dateInput) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        dateInput.addEventListener('change', function() {
            updateSummary('date', formatDate(this.value));
        });
    }
    
    // Time select
    const timeSelect = document.getElementById('testDriveTime');
    if (timeSelect) {
        timeSelect.addEventListener('change', function() {
            updateSummary('time', formatTime(this.value));
        });
    }
    
    // Service center select
    const serviceCenterSelect = document.getElementById('serviceCenter');
    if (serviceCenterSelect) {
        serviceCenterSelect.addEventListener('change', function() {
            const selectedCenter = serviceCenters[this.value];
            if (selectedCenter) {
                // Show location details
                const locationDetails = document.getElementById('locationDetails');
                if (locationDetails) {
                    locationDetails.style.display = 'block';
                    document.getElementById('locationAddress').textContent = selectedCenter.address;
                    document.getElementById('locationPhone').textContent = selectedCenter.phone;
                    document.getElementById('locationHours').textContent = selectedCenter.hours;
                }
                updateSummary('location', selectedCenter.name);
            } else {
                // Hide location details
                const locationDetails = document.getElementById('locationDetails');
                if (locationDetails) {
                    locationDetails.style.display = 'none';
                }
                updateSummary('location', 'Not selected');
            }
        });
    }
    
    // Form submission
    const form = document.getElementById('testDriveForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission();
        });
    }
}

// Handle Form Submission
function handleFormSubmission() {
    const form = document.getElementById('testDriveForm');
    const formData = new FormData(form);
    
    // Get selected model name
    const selectedModelCard = document.querySelector('.model-card-select.selected');
    const modelName = selectedModelCard ? selectedModelCard.dataset.modelName : 'Not selected';
    
    // Get service center name
    const serviceCenterSelect = document.getElementById('serviceCenter');
    const serviceCenterName = serviceCenters[serviceCenterSelect.value]?.name || 'Not selected';
    
    // Prepare booking data
    const bookingData = {
        model: modelName,
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        alternatePhone: formData.get('alternatePhone') || 'N/A',
        date: formatDate(formData.get('testDriveDate')),
        time: formatTime(formData.get('testDriveTime')),
        location: serviceCenterName,
        message: formData.get('message') || 'N/A'
    };
    
    // Show confirmation modal
    showConfirmationModal(bookingData);
    
    // Reset form
    form.reset();
    document.querySelectorAll('.model-card-select').forEach(card => {
        card.classList.remove('selected');
    });
    document.getElementById('locationDetails').style.display = 'none';
    updateSummary('model', 'Not selected');
    updateSummary('date', 'Not selected');
    updateSummary('time', 'Not selected');
    updateSummary('location', 'Not selected');
}

// Show Confirmation Modal
function showConfirmationModal(bookingData) {
    const modal = document.getElementById('confirmationModal');
    const modalBody = document.getElementById('confirmationDetails');
    
    if (modal && modalBody) {
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
        
        modal.classList.add('show');
        
        // Close on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeConfirmationModal();
            }
        });
    }
}

// Close Confirmation Modal
function closeConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadModels();
    initializeFormListeners();
    
    // Add smooth scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe form sections
    document.querySelectorAll('.form-section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe summary card
    const summaryCard = document.querySelector('.summary-card');
    if (summaryCard) {
        observer.observe(summaryCard);
    }
});


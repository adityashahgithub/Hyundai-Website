/* ============================================
   CONTACT PAGE JAVASCRIPT
   ============================================ */

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    /* ============================================
       FORM ELEMENTS
       ============================================ */
    
    const form = document.getElementById('contactForm');
    const formFields = {
        name: document.getElementById('contactName'),
        email: document.getElementById('contactEmail'),
        phone: document.getElementById('contactPhone'),
        subject: document.getElementById('contactSubject'),
        message: document.getElementById('contactMessage')
    };

    /* ============================================
       REQUIRED FIELD INDICATOR
       ============================================ */
    
    /**
     * Automatically add 'required-field' class to form groups with required inputs
     * This ensures the asterisk appears even in browsers that don't support :has()
     */
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const hasRequired = group.querySelector('input[required], select[required], textarea[required]');
        if (hasRequired) {
            group.classList.add('required-field');
        }
    });

    /* ============================================
       LOCAL STORAGE: AUTOSAVE
       ============================================ */

    // Restore saved form values if available
    if (window.StorageUtil && form) {
        const currentUser = StorageUtil.get('hyundai:currentUser') || 'guest';
        const formStorageKey = `contactForm:${currentUser}`;
        StorageUtil.loadForm('contactForm', formStorageKey);

        // Autosave on input/change
        const saveHandler = () => StorageUtil.saveForm('contactForm', formStorageKey);
        form.addEventListener('input', saveHandler);
        form.addEventListener('change', saveHandler);
    }

    /* ============================================
       SUCCESS MESSAGE
       ============================================ */
    
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = '<strong>✓ Success!</strong> Thank you for contacting us! We will get back to you soon.';
    if (form) {
        form.insertBefore(successMessage, form.firstChild);
    }

    /* ============================================
       VALIDATION FUNCTIONS
       ============================================ */
    
    /**
     * Validate name field
     * @param {string} name - Name to validate
     * @returns {boolean} True if valid (at least 2 characters, letters and spaces only)
     */
    function validateName(name) {
        return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
    }

    /**
     * Validate email field
     * @param {string} email - Email to validate
     * @returns {boolean} True if valid email format
     */
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validate phone field
     * @param {string} phone - Phone number to validate
     * @returns {boolean} True if valid (10-15 digits, optional country code)
     */
    function validatePhone(phone) {
        const trimmed = phone.trim();
        // Remove common separators but keep leading + if present
        const cleaned = trimmed.replace(/[\s\-().]/g, '');
        const digits = cleaned.startsWith('+') ? cleaned.slice(1) : cleaned;
        const onlyDigits = /^\+?\d+$/.test(cleaned);
        return onlyDigits && digits.length >= 10 && digits.length <= 15;
    }

    /**
     * Validate message field
     * @param {string} message - Message to validate
     * @returns {boolean} True if valid (at least 10 characters)
     */
    function validateMessage(message) {
        return message.trim().length >= 10;
    }

    /* ============================================
       VALIDATION UI HELPERS
       ============================================ */
    
    /**
     * Show error state for a form field
     * @param {string} fieldName - Name of the field
     * @param {string} message - Error message to display
     */
    function showError(fieldName, message) {
        const field = formFields[fieldName];
        const formGroup = field.closest('.form-group');
        const errorMsg = formGroup.querySelector('.error-message') || document.createElement('span');
        
        // Create error message element if it doesn't exist
        if (!formGroup.querySelector('.error-message')) {
            errorMsg.className = 'error-message';
            formGroup.appendChild(errorMsg);
        }
        
        errorMsg.textContent = message;
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
    }

    /**
     * Show success state for a form field
     * @param {string} fieldName - Name of the field
     */
    function showSuccess(fieldName) {
        const field = formFields[fieldName];
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        const errorMsg = formGroup.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.style.display = 'none';
        }
    }

    /**
     * Clear validation state for a form field
     * @param {string} fieldName - Name of the field
     */
    function clearValidation(fieldName) {
        const field = formFields[fieldName];
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error', 'success');
        const errorMsg = formGroup.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.style.display = 'none';
        }
    }

    /* ============================================
       REAL-TIME VALIDATION
       ============================================ */
    
    /**
     * Set up real-time validation for all form fields
     * Validates on blur and re-validates on input if field has error
     */
    Object.keys(formFields).forEach(fieldName => {
        const field = formFields[fieldName];
        if (field) {
            // Validate when user leaves the field
            field.addEventListener('blur', function() {
                validateField(fieldName);
            });

            // Re-validate as user types if field has error
            field.addEventListener('input', function() {
                if (field.closest('.form-group').classList.contains('error')) {
                    validateField(fieldName);
                }
            });
        }
    });

    /**
     * Validate a specific form field
     * Shows error or success state based on validation result
     * @param {string} fieldName - Name of the field to validate
     */
    function validateField(fieldName) {
        const field = formFields[fieldName];
        const value = field.value.trim();

        switch(fieldName) {
            case 'name':
                if (!value) {
                    showError(fieldName, 'Name is required');
                } else if (!validateName(value)) {
                    showError(fieldName, 'Please enter a valid name (at least 2 characters)');
                } else {
                    showSuccess(fieldName);
                }
                break;
            case 'email':
                if (!value) {
                    showError(fieldName, 'Email is required');
                } else if (!validateEmail(value)) {
                    showError(fieldName, 'Please enter a valid email address');
                } else {
                    showSuccess(fieldName);
                }
                break;
            case 'phone':
                if (!value) {
                    showError(fieldName, 'Phone number is required');
                } else if (!validatePhone(value)) {
                    showError(fieldName, 'Enter 10-15 digits (country code optional, e.g., +91 98765 43210)');
                } else {
                    showSuccess(fieldName);
                }
                break;
            case 'subject':
                if (!value) {
                    showError(fieldName, 'Please select a subject');
                } else {
                    showSuccess(fieldName);
                }
                break;
            case 'message':
                if (!value) {
                    showError(fieldName, 'Message is required');
                } else if (!validateMessage(value)) {
                    showError(fieldName, 'Message must be at least 10 characters long');
                } else {
                    showSuccess(fieldName);
                }
                break;
        }
    }

    /* ============================================
       FORM SUBMISSION
       ============================================ */
    
    /**
     * Handle form submission
     * Validates all fields, shows errors if invalid, or submits if valid
     */
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields before submission
            let isValid = true;
            Object.keys(formFields).forEach(fieldName => {
                validateField(fieldName);
                const formGroup = formFields[fieldName].closest('.form-group');
                if (formGroup.classList.contains('error')) {
                    isValid = false;
                }
            });

            // If validation fails, scroll to first error
            if (!isValid) {
                const firstError = form.querySelector('.form-group.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.querySelector('input, select, textarea').focus();
                }
                return;
            }

            // Disable form during submission
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Get form data
            const formData = {
                name: formFields.name.value.trim(),
                email: formFields.email.value.trim(),
                phone: formFields.phone.value.trim(),
                subject: formFields.subject.value,
                message: formFields.message.value.trim()
            };
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                successMessage.classList.add('show');
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
                // Reset form after 3 seconds
                setTimeout(() => {
                    form.reset();
                    Object.keys(formFields).forEach(fieldName => {
                        clearValidation(fieldName);
                    });
                    successMessage.classList.remove('show');
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                    // Clear saved draft after successful submission
                    if (window.StorageUtil) {
                        const currentUser = StorageUtil.get('hyundai:currentUser') || 'guest';
                        StorageUtil.remove(`contactForm:${currentUser}`);
                    }
                }, 3000);
            }, 1000);
        });
    }

    /* ============================================
       SCROLL ANIMATIONS
       ============================================ */
    
    /**
     * Animate map section on scroll
     * Map section fades in and slides up when it comes into view
     */
    const mapSection = document.querySelector('.map-section');
    if (mapSection) {
        const mapObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Set initial state (hidden and translated down)
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    
                    // Trigger fade-in and slide-up animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                    mapObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 }); // Trigger when 20% of section is visible

        // Set initial state and observe map section
        mapSection.style.opacity = '0';
        mapSection.style.transform = 'translateY(30px)';
        mapObserver.observe(mapSection);
    }

    /**
     * Animate contact items on scroll
     * Contact items slide in from the left with stagger effect
     */
    const contactItems = document.querySelectorAll('.contact-item');
    const itemObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation with delay based on item index
                setTimeout(() => {
                    // Set initial state (hidden and translated left)
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-20px)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    // Trigger fade-in and slide-right animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, 50);
                }, index * 100); // 100ms delay between each item
                itemObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of item is visible

    // Set initial state and observe all contact items
    contactItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        itemObserver.observe(item);
    });
});


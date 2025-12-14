document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formFields = {
        name: document.getElementById('contactName'),
        email: document.getElementById('contactEmail'),
        phone: document.getElementById('contactPhone'),
        subject: document.getElementById('contactSubject'),
        message: document.getElementById('contactMessage')
    };

    // Automatically add 'required-field' class to form groups with required inputs
    // This ensures the asterisk appears even in browsers that don't support :has()
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const hasRequired = group.querySelector('input[required], select[required], textarea[required]');
        if (hasRequired) {
            group.classList.add('required-field');
        }
    });

    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = '<strong>✓ Success!</strong> Thank you for contacting us! We will get back to you soon.';
    if (form) {
        form.insertBefore(successMessage, form.firstChild);
    }

    // Validation functions
    function validateName(name) {
        return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    function validateMessage(message) {
        return message.trim().length >= 10;
    }

    // Show error for field
    function showError(fieldName, message) {
        const field = formFields[fieldName];
        const formGroup = field.closest('.form-group');
        const errorMsg = formGroup.querySelector('.error-message') || document.createElement('span');
        
        if (!formGroup.querySelector('.error-message')) {
            errorMsg.className = 'error-message';
            formGroup.appendChild(errorMsg);
        }
        
        errorMsg.textContent = message;
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
    }

    // Show success for field
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

    // Clear field validation
    function clearValidation(fieldName) {
        const field = formFields[fieldName];
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error', 'success');
        const errorMsg = formGroup.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.style.display = 'none';
        }
    }

    // Real-time validation
    Object.keys(formFields).forEach(fieldName => {
        const field = formFields[fieldName];
        if (field) {
            field.addEventListener('blur', function() {
                validateField(fieldName);
            });

            field.addEventListener('input', function() {
                if (field.closest('.form-group').classList.contains('error')) {
                    validateField(fieldName);
                }
            });
        }
    });

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
                    showError(fieldName, 'Please enter a valid phone number (10-15 digits)');
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

    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            Object.keys(formFields).forEach(fieldName => {
                validateField(fieldName);
                const formGroup = formFields[fieldName].closest('.form-group');
                if (formGroup.classList.contains('error')) {
                    isValid = false;
                }
            });

            if (!isValid) {
                // Scroll to first error
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
            
                // Reset form after 2 seconds
                setTimeout(() => {
            form.reset();
                    Object.keys(formFields).forEach(fieldName => {
                        clearValidation(fieldName);
                    });
                    successMessage.classList.remove('show');
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                }, 3000);
            }, 1000);
        });
    }

    // Animate map section on scroll
    const mapSection = document.querySelector('.map-section');
    if (mapSection) {
        const mapObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                    mapObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        mapSection.style.opacity = '0';
        mapSection.style.transform = 'translateY(30px)';
        mapObserver.observe(mapSection);
    }

    // Animate contact items
    const contactItems = document.querySelectorAll('.contact-item');
    const itemObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-20px)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, 50);
                }, index * 100);
                itemObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    contactItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        itemObserver.observe(item);
    });
});


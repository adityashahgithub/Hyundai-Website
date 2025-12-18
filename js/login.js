document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const forms = {
        login: document.getElementById('loginForm'),
        signup: document.getElementById('signupForm')
    };
    const errorMessages = {};
    const successMessages = {};

    // ==================== VALIDATION UTILITIES ====================
    const validationRules = {
        email: {
            test: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
            message: 'Please enter a valid email address'
        },
        phone: {
            test: (val) => /^[+]?[\d\s-()]+$/.test(val) && val.replace(/\D/g, '').length >= 10,
            message: 'Please enter a valid phone number (at least 10 digits)'
        },
        password: {
            test: (val) => val.length >= 6,
            message: 'Password must be at least 6 characters'
        },
        passwordStrong: {
            test: (val) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(val),
            message: 'Password must contain uppercase, lowercase, and numbers'
        },
        name: {
            test: (val) => val.trim().length >= 2,
            message: 'Name must be at least 2 characters'
        },
        identifier: {
            test: (val) => {
                const isEmail = validationRules.email.test(val);
                const isPhone = validationRules.phone.test(val);
                return isEmail || isPhone;
            },
            message: 'Please enter a valid email or phone number'
        }
    };

    // Show error message for a field
    const showError = (inputId, message) => {
        const input = document.getElementById(inputId);
        if (!input) return;
        
        input.style.borderColor = '#dc2626';
        input.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.15)';
        
        let errorDiv = document.getElementById(`error-${inputId}`);
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = `error-${inputId}`;
            errorDiv.style.cssText = 'color: #dc2626; font-size: 13px; margin-top: 4px; font-weight: 500;';
            input.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
        errorMessages[inputId] = message;
    };

    // Clear error message for a field
    const clearError = (inputId) => {
        const input = document.getElementById(inputId);
        if (!input) return;
        
        input.style.borderColor = '#e5e7eb';
        input.style.boxShadow = '';
        
        const errorDiv = document.getElementById(`error-${inputId}`);
        if (errorDiv) {
            errorDiv.textContent = '';
        }
        delete errorMessages[inputId];
    };

    // Show success message
    const showSuccess = (formId, message) => {
        const form = document.getElementById(formId);
        if (!form) return;
        
        let successDiv = document.getElementById(`success-${formId}`);
        if (!successDiv) {
            successDiv = document.createElement('div');
            successDiv.id = `success-${formId}`;
            successDiv.style.cssText = 'background: #d1fae5; color: #065f46; padding: 12px 14px; border-radius: 8px; font-size: 14px; margin-bottom: 12px; border: 1px solid #a7f3d0; display: flex; align-items: center; gap: 8px;';
            form.insertBefore(successDiv, form.firstChild);
        }
        successDiv.innerHTML = `<span style="font-weight: 600;">✓</span> ${message}`;
        successDiv.style.display = 'block';
    };

    // Clear success message
    const clearSuccess = (formId) => {
        const successDiv = document.getElementById(`success-${formId}`);
        if (successDiv) {
            successDiv.style.display = 'none';
        }
    };

    // ==================== TAB SWITCHING ====================
    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            tabs.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const target = btn.dataset.tab;
            Object.keys(forms).forEach(key => {
                forms[key].classList.toggle('active', key === target);
            });
            // Clear messages when switching tabs
            clearSuccess('loginForm');
            clearSuccess('signupForm');
        });
    });

    // ==================== REAL-TIME VALIDATION ====================
    const setupFieldValidation = (inputId, validateFn) => {
        const input = document.getElementById(inputId);
        if (!input) return;

        input.addEventListener('blur', () => {
            const value = input.value.trim();
            if (value) {
                const validation = validateFn(value);
                if (!validation.valid) {
                    showError(inputId, validation.message);
                } else {
                    clearError(inputId);
                }
            } else {
                clearError(inputId);
            }
        });

        input.addEventListener('focus', () => {
            clearError(inputId);
        });

        input.addEventListener('input', () => {
            clearError(inputId);
        });
    };

    // Setup validations
    setupFieldValidation('loginEmail', (val) => {
        const valid = validationRules.identifier.test(val);
        return {
            valid,
            message: valid ? '' : validationRules.identifier.message
        };
    });

    setupFieldValidation('loginPassword', (val) => {
        const valid = val.length > 0;
        return {
            valid,
            message: valid ? '' : 'Password is required'
        };
    });

    setupFieldValidation('signupName', (val) => {
        const valid = validationRules.name.test(val);
        return {
            valid,
            message: valid ? '' : validationRules.name.message
        };
    });

    setupFieldValidation('signupEmail', (val) => {
        const valid = validationRules.email.test(val);
        return {
            valid,
            message: valid ? '' : validationRules.email.message
        };
    });

    setupFieldValidation('signupPhone', (val) => {
        const valid = validationRules.phone.test(val);
        return {
            valid,
            message: valid ? '' : validationRules.phone.message
        };
    });

    setupFieldValidation('signupPassword', (val) => {
        const valid = validationRules.password.test(val);
        return {
            valid,
            message: valid ? '' : validationRules.password.message
        };
    });

    setupFieldValidation('signupConfirm', (val) => {
        const password = document.getElementById('signupPassword').value;
        const valid = val === password;
        return {
            valid,
            message: valid ? '' : 'Passwords do not match'
        };
    });

    // Password match check on password input
    document.getElementById('signupPassword')?.addEventListener('input', () => {
        const confirmInput = document.getElementById('signupConfirm');
        if (confirmInput && confirmInput.value) {
            clearError('signupConfirm');
        }
    });

    // ==================== PREFILL DATA ====================
    if (window.StorageUtil) {
        const savedEmail = StorageUtil.get('hyundai:userEmail');
        const savedName = StorageUtil.get('hyundai:userName');
        
        if (savedEmail) {
            const loginInput = document.getElementById('loginEmail');
            if (loginInput) loginInput.value = savedEmail;
            
            const signupInput = document.getElementById('signupEmail');
            if (signupInput) signupInput.value = savedEmail;
        }
        
        if (savedName) {
            const nameInput = document.getElementById('signupName');
            if (nameInput) nameInput.value = savedName;
        }
    }

    // ==================== LOGIN FORM SUBMISSION ====================
    if (forms.login) {
        forms.login.addEventListener('submit', (e) => {
            e.preventDefault();
            clearSuccess('loginForm');

            const identifier = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value.trim();

            // Validate inputs
            let hasErrors = false;

            if (!identifier) {
                showError('loginEmail', 'Email or phone number is required');
                hasErrors = true;
            } else if (!validationRules.identifier.test(identifier)) {
                showError('loginEmail', validationRules.identifier.message);
                hasErrors = true;
            } else {
                clearError('loginEmail');
            }

            if (!password) {
                showError('loginPassword', 'Password is required');
                hasErrors = true;
            } else {
                clearError('loginPassword');
            }

            if (hasErrors) return;

            // Check if user exists in storage
            if (window.StorageUtil) {
                const registeredUsers = StorageUtil.get('hyundai:registeredUsers') || [];
                const userExists = registeredUsers.some(user => 
                    (user.email === identifier || user.phone === identifier) && user.password === password
                );

                if (!userExists) {
                    showError('loginEmail', 'Email/phone or password is incorrect. Please sign up first if you don\'t have an account.');
                    return;
                }

                // Successful login
                const user = registeredUsers.find(u => 
                    (u.email === identifier || u.phone === identifier) && u.password === password
                );
                
                StorageUtil.set('hyundai:currentUser', user.email);
                StorageUtil.set('hyundai:userEmail', identifier);
                StorageUtil.set('hyundai:userName', user.name);
                
                showSuccess('loginForm', `Welcome back, ${user.name}!`);
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }
        });
    }

    // ==================== SIGNUP FORM SUBMISSION ====================
    if (forms.signup) {
        forms.signup.addEventListener('submit', (e) => {
            e.preventDefault();
            clearSuccess('signupForm');

            const name = document.getElementById('signupName').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            const phone = document.getElementById('signupPhone').value.trim();
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirm').value;

            // Validate all fields
            let hasErrors = false;

            if (!validationRules.name.test(name)) {
                showError('signupName', validationRules.name.message);
                hasErrors = true;
            } else {
                clearError('signupName');
            }

            if (!validationRules.email.test(email)) {
                showError('signupEmail', validationRules.email.message);
                hasErrors = true;
            } else {
                clearError('signupEmail');
            }

            if (!validationRules.phone.test(phone)) {
                showError('signupPhone', validationRules.phone.message);
                hasErrors = true;
            } else {
                clearError('signupPhone');
            }

            if (!validationRules.password.test(password)) {
                showError('signupPassword', validationRules.password.message);
                hasErrors = true;
            } else {
                clearError('signupPassword');
            }

            if (password !== confirmPassword) {
                showError('signupConfirm', 'Passwords do not match');
                hasErrors = true;
            } else {
                clearError('signupConfirm');
            }

            if (hasErrors) return;

            // Check if email already exists
            if (window.StorageUtil) {
                const registeredUsers = StorageUtil.get('hyundai:registeredUsers') || [];
                
                if (registeredUsers.some(user => user.email === email)) {
                    showError('signupEmail', 'This email is already registered. Please log in.');
                    return;
                }

                if (registeredUsers.some(user => user.phone === phone)) {
                    showError('signupPhone', 'This phone number is already registered. Please log in.');
                    return;
                }

                // Add new user
                const newUser = { name, email, phone, password };
                registeredUsers.push(newUser);
                StorageUtil.set('hyundai:registeredUsers', registeredUsers);
                StorageUtil.set('hyundai:currentUser', email);
                StorageUtil.set('hyundai:userEmail', email);
                StorageUtil.set('hyundai:userName', name);

                // Show success and switch to login
                showSuccess('signupForm', `Account created successfully! Welcome, ${name}!`);
                
                // Clear form
                forms.signup.reset();
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }
        });
    }

    // ==================== SOCIAL LOGIN BUTTONS ====================
    const altButtons = document.querySelectorAll('.alt-btn');
    altButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const provider = btn.textContent.includes('Google') ? 'Google' : 'Apple';
            alert(`Redirecting to ${provider} sign in...\n\n(This is a demo. Real integration requires OAuth setup.)`);
        });
    });

    // ==================== RESPONSIVE ADJUSTMENTS ====================
    if (window.innerWidth <= 640) {
        const authCard = document.querySelector('.auth-card');
        if (authCard) {
            authCard.style.borderRadius = '16px';
        }
    }
});

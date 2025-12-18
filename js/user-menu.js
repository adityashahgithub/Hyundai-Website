/* ============================================
   USER MENU & AUTHENTICATION MANAGEMENT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const navLogin = document.querySelector('.nav-login');
    const userDropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const userEmailDisplay = document.getElementById('userEmailDisplay');

    // Helper function to get current user
    const getCurrentUser = () => {
        if (typeof StorageUtil !== 'undefined') {
            return StorageUtil.get('hyundai:currentUser');
        }
        return localStorage.getItem('hyundai:currentUser');
    };

    // Helper function to get user info
    const getUserInfo = () => {
        if (typeof StorageUtil !== 'undefined') {
            const email = StorageUtil.get('hyundai:userEmail');
            const name = StorageUtil.get('hyundai:userName');
            return { email, name };
        }
        return {
            email: localStorage.getItem('hyundai:userEmail'),
            name: localStorage.getItem('hyundai:userName')
        };
    };

    // Update dropdown display based on login status
    const updateUserDisplay = () => {
        const currentUser = getCurrentUser();
        
        if (currentUser && userDropdown && userNameDisplay && userEmailDisplay) {
            const userInfo = getUserInfo();
            userNameDisplay.textContent = userInfo.name || 'User';
            userEmailDisplay.textContent = userInfo.email || 'user@example.com';
            navLogin.style.color = 'var(--secondary-color)';
        } else {
            if (userNameDisplay) userNameDisplay.textContent = 'User';
            if (userEmailDisplay) userEmailDisplay.textContent = 'user@example.com';
            if (navLogin) navLogin.style.color = 'var(--primary-color)';
        }
    };

    // Toggle dropdown menu
    if (navLogin) {
        navLogin.addEventListener('click', (e) => {
            const currentUser = getCurrentUser();
            
            // If not logged in, go to login page
            if (!currentUser) {
                window.location.href = 'login.html';
                return;
            }
            
            // If logged in, toggle dropdown
            e.preventDefault();
            userDropdown?.classList.toggle('active');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (userDropdown && !userDropdown.contains(e.target) && !navLogin?.contains(e.target)) {
            userDropdown.classList.remove('active');
        }
    });

    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Capture current user before clearing
            const userId = (typeof StorageUtil !== 'undefined') ? StorageUtil.get('hyundai:currentUser') : localStorage.getItem('hyundai:currentUser');

            // Clear per-user ephemeral data (drafts)
            if (userId) {
                const draftKeys = [
                    `contactForm:${userId}`,
                    `testDriveForm:${userId}`
                ];
                draftKeys.forEach(k => {
                    if (typeof StorageUtil !== 'undefined') {
                        StorageUtil.remove(k);
                    } else {
                        localStorage.removeItem(`hyundai:${k}`);
                    }
                });
            }

            // Clear user identity data
            if (typeof StorageUtil !== 'undefined') {
                StorageUtil.remove('hyundai:currentUser');
                StorageUtil.remove('hyundai:userEmail');
                StorageUtil.remove('hyundai:userName');
            } else {
                localStorage.removeItem('hyundai:currentUser');
                localStorage.removeItem('hyundai:userEmail');
                localStorage.removeItem('hyundai:userName');
            }
            
            // Show logout confirmation
            alert('You have been logged out successfully!');
            
            // Close dropdown
            userDropdown?.classList.remove('active');
            
            // Update display
            updateUserDisplay();
            
            // Redirect to login page
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 500);
        });
    }

    // Update user display on page load
    updateUserDisplay();

    // Listen for storage changes (for syncing across tabs)
    window.addEventListener('storage', () => {
        updateUserDisplay();
    });
});

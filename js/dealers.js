/* ============================================
   DEALERS PAGE JAVASCRIPT
   ============================================ */

/* ============================================
   DEALER DATA
   ============================================ */

/**
 * Dealers Array - Real dealer data from Gujarat
 * Contains minimal information: name, address, phone, city, and state
 */
const dealers = [
    {
        name: 'Downtown Hyundai Nadiad',
        address: 'Nadiad, Gujarat - 387001',
        phone: '+91 2696 223456',
        city: 'Nadiad',
        state: 'Gujarat'
    },
    {
        name: 'Hyundai Advaika Motors - Anand',
        address: 'Anand, Gujarat - 388120',
        phone: '+91 2692 245678',
        city: 'Anand',
        state: 'Gujarat'
    },
    {
        name: 'Hyundai Advaika Motors - Ahmedabad',
        address: 'SG Highway, Ahmedabad, Gujarat - 380054',
        phone: '+91 79 4000 1234',
        city: 'Ahmedabad',
        state: 'Gujarat'
    }
];

/* ============================================
   DOM ELEMENT HELPERS
   ============================================ */

/**
 * Get dealers list container element
 * @returns {HTMLElement|null} The dealers list container
 */
const resultsContainer = () => document.getElementById('dealersList');

/**
 * Get search input field element
 * @returns {HTMLElement|null} The search input field
 */
const searchField = () => document.getElementById('dealerSearch');

/* ============================================
   DEALER RENDERING
   ============================================ */

/**
 * Render dealer cards in the dealers list container
 * Displays dealer information in card format with contact options
 * @param {Array} list - Array of dealer objects to render
 */
function renderDealers(list) {
    const container = resultsContainer();
    if (!container) return;

    // Show "no results" message if list is empty
    if (!list.length) {
        container.innerHTML = '<p style="text-align:center; grid-column:1/-1; padding:2rem; color:var(--text-light);">No dealers match your search. Try another city or state.</p>';
        return;
    }

    // Generate HTML for each dealer card
    container.innerHTML = list.map(dealer => `
        <div class="dealer-card">
            <!-- Dealer Header with Name and State Badge -->
            <div class="dealer-header">
                <h3>${dealer.name}</h3>
                <span class="dealer-badge">${dealer.state || 'Gujarat'}</span>
            </div>
            <!-- Dealer Information -->
            <div class="dealer-info">
                <p class="dealer-address">📍 ${dealer.address}</p>
                <p><strong>City:</strong> ${dealer.city}</p>
                <!-- Clickable Phone Link -->
                <p><strong>📞 Phone:</strong> <a href="tel:${dealer.phone.replace(/\s/g, '')}">${dealer.phone}</a></p>
            </div>
            <!-- Dealer Action Buttons -->
            <div class="dealer-actions">
                <a href="contact.html" class="btn btn-primary">Contact</a>
                <!-- Direct Call Link -->
                <a href="tel:${dealer.phone.replace(/\s/g, '')}" class="btn btn-secondary">Call Now</a>
            </div>
        </div>
    `).join('');
}

/* ============================================
   DEALER FILTERING
   ============================================ */

/**
 * Filter dealers based on search term
 * Searches in dealer name, city, state, and address
 * @param {string} term - Search term to filter by
 * @returns {Array} Filtered array of dealers
 */
function filterDealers(term) {
    const cleaned = term.toLowerCase().trim();
    
    // Return all dealers if search term is empty
    if (!cleaned) {
        return dealers;
    }

    // Filter dealers matching search term in any field
    return dealers.filter(dealer =>
        dealer.name.toLowerCase().includes(cleaned) ||
        dealer.city.toLowerCase().includes(cleaned) ||
        (dealer.state && dealer.state.toLowerCase().includes(cleaned)) ||
        dealer.address.toLowerCase().includes(cleaned)
    );
}

/**
 * Handle dealer search functionality
 * Filters dealers and updates display
 */
function handleDealerSearch() {
    const input = searchField();
    const term = input ? input.value : '';
    const filtered = filterDealers(term);
    
    // Render filtered results and update count
    renderDealers(filtered);
    updateDealerCount(filtered.length);
}

/* ============================================
   UI UPDATES
   ============================================ */

/**
 * Update dealer count in section title
 * Shows total count or filtered count based on search
 * @param {number} count - Number of dealers to display
 */
function updateDealerCount(count) {
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        // Show different text for filtered vs. all results
        const countText = count === dealers.length 
            ? `Authorized Dealers (${count})` 
            : `Authorized Dealers (${count} found)`;
        sectionTitle.textContent = countText;
    }
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

/**
 * Animate dealer cards on scroll
 * Cards fade in and slide up when they come into view
 * Uses Intersection Observer for performance
 */
function animateDealerCards() {
    const cards = document.querySelectorAll('.dealer-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation with delay based on index
                setTimeout(() => {
                    // Set initial state (hidden and translated down)
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    // Trigger fade-in and slide-up animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100); // 100ms delay between each card
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of card is visible

    // Set initial state and observe all dealer cards
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        cardObserver.observe(card);
    });
}

/* ============================================
   INITIALIZATION
   ============================================ */

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Render all dealers initially
    renderDealers(dealers);
    updateDealerCount(dealers.length);
    
    // Animate cards after a short delay to ensure DOM is ready
    setTimeout(animateDealerCards, 100);

    // Get search input and button elements
    const input = searchField();
    const button = document.getElementById('dealerSearchBtn');

    /* ============================================
       SEARCH FUNCTIONALITY
       ============================================ */
    
    /**
     * Search button click handler
     * Triggers search and re-animates cards
     */
    if (button) {
        button.addEventListener('click', () => {
            handleDealerSearch();
            // Re-animate cards after search
            setTimeout(animateDealerCards, 100);
        });
    }

    if (input) {
        /**
         * Enter key handler for search
         * Allows searching by pressing Enter key
         */
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                handleDealerSearch();
                // Re-animate cards after search
                setTimeout(animateDealerCards, 100);
            }
        });

        /**
         * Real-time search on input
         * Filters dealers as user types
         */
        input.addEventListener('input', () => {
            const filtered = filterDealers(input.value);
            renderDealers(filtered);
            updateDealerCount(filtered.length);
            // Re-animate cards after filtering
            setTimeout(animateDealerCards, 100);
        });
    }
});


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

const resultsContainer = () => document.getElementById('dealersList');
const searchField = () => document.getElementById('dealerSearch');

function renderDealers(list) {
    const container = resultsContainer();
    if (!container) return;

    if (!list.length) {
        container.innerHTML = '<p style="text-align:center; grid-column:1/-1; padding:2rem; color:var(--text-light);">No dealers match your search. Try another city or state.</p>';
        return;
    }

    container.innerHTML = list.map(dealer => `
        <div class="dealer-card">
            <div class="dealer-header">
                <h3>${dealer.name}</h3>
                <span class="dealer-badge">${dealer.state || 'Gujarat'}</span>
            </div>
            <div class="dealer-info">
                <p class="dealer-address">📍 ${dealer.address}</p>
                <p><strong>City:</strong> ${dealer.city}</p>
                <p><strong>📞 Phone:</strong> <a href="tel:${dealer.phone.replace(/\s/g, '')}">${dealer.phone}</a></p>
            </div>
            <div class="dealer-actions">
                <a href="contact.html" class="btn btn-primary">Contact</a>
                <a href="tel:${dealer.phone.replace(/\s/g, '')}" class="btn btn-secondary">Call Now</a>
            </div>
        </div>
    `).join('');
}

function filterDealers(term) {
    const cleaned = term.toLowerCase().trim();
    if (!cleaned) {
        return dealers;
    }

    return dealers.filter(dealer =>
        dealer.name.toLowerCase().includes(cleaned) ||
        dealer.city.toLowerCase().includes(cleaned) ||
        (dealer.state && dealer.state.toLowerCase().includes(cleaned)) ||
        dealer.address.toLowerCase().includes(cleaned)
    );
}

function handleDealerSearch() {
    const input = searchField();
    const term = input ? input.value : '';
    const filtered = filterDealers(term);
    renderDealers(filtered);
    updateDealerCount(filtered.length);
}

// Update dealer count display
function updateDealerCount(count) {
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        const countText = count === dealers.length 
            ? `Authorized Dealers (${count})` 
            : `Authorized Dealers (${count} found)`;
        sectionTitle.textContent = countText;
    }
}

// Scroll animations for dealer cards
function animateDealerCards() {
    const cards = document.querySelectorAll('.dealer-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        cardObserver.observe(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderDealers(dealers);
    updateDealerCount(dealers.length);
    setTimeout(animateDealerCards, 100);

    const input = searchField();
    const button = document.getElementById('dealerSearchBtn');

    if (button) {
        button.addEventListener('click', () => {
            handleDealerSearch();
            setTimeout(animateDealerCards, 100);
        });
    }

    if (input) {
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                handleDealerSearch();
                setTimeout(animateDealerCards, 100);
            }
        });

        input.addEventListener('input', () => {
            const filtered = filterDealers(input.value);
            renderDealers(filtered);
            updateDealerCount(filtered.length);
            setTimeout(animateDealerCards, 100);
        });
    }
});


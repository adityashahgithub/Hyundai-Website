let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');

// Hero Slider
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto-advance slider
setInterval(nextSlide, 5000);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Load Featured Models
async function loadFeaturedModels() {
    try {
        const response = await fetch('data/cars.json');
        const data = await response.json();
        const featured = data.cars.slice(0, 6); // Show first 6 models
        const container = document.getElementById('featuredModels');
        
        if (container) {
            container.innerHTML = featured.map(car => `
                <div class="model-card">
                    <img src="${car.image}" alt="${car.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800';">
                    <div class="model-card-content">
                        <h3>${car.name}</h3>
                        <span class="category">${car.category}</span>
                        <div class="price">${car.price}</div>
                        <a href="model-detail.html?id=${car.id}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            `).join('');
            
            // Observe new cards for scroll reveal
            const cards = container.querySelectorAll('.model-card');
            cards.forEach(card => {
                const observer = new IntersectionObserver(function(entries) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('reveal');
                        }
                    });
                }, { threshold: 0.1 });
                observer.observe(card);
            });
        }
    } catch (error) {
        console.error('Error loading featured models:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadFeaturedModels);


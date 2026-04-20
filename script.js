// ====================================
// TESTIMONIAL CAROUSEL
// ====================================

let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonialCards.length;

function showTestimonial(index) {
    // Remove active class from all cards
    testimonialCards.forEach(card => card.classList.remove('active'));

    // Add active class to current card
    if (testimonialCards[index]) {
        testimonialCards[index].classList.add('active');
    }

    // Update indicators
    updateIndicators(index);
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

function updateIndicators(index) {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

// Initialize testimonial carousel
function initTestimonialCarousel() {
    if (testimonialCards.length === 0) return;

    const container = document.getElementById('testimonialIndicators');
    if (!container) return;

    // Create indicators
    for (let i = 0; i < totalTestimonials; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator' + (i === 0 ? ' active' : '');
        indicator.onclick = () => {
            currentTestimonial = i;
            showTestimonial(i);
        };
        container.appendChild(indicator);
    }

    // Show first testimonial
    showTestimonial(0);
}

// Auto-advance testimonials every 5 seconds
setInterval(() => {
    if (document.querySelector('.testimonial-card')) {
        nextTestimonial();
    }
}, 5000);

window.addEventListener('load', initTestimonialCarousel);
document.addEventListener('DOMContentLoaded', initTestimonialCarousel);



// ====================================
// PROPERTY CAROUSEL
// ====================================

let currentProperty = 0;
const propertyCards = document.querySelectorAll('.properties-carousel .property-card');
const totalProperties = propertyCards.length;

function showProperty(index) {
    // Remove active class from all cards
    propertyCards.forEach(card => card.classList.remove('active'));

    // Add active class to current card
    if (propertyCards[index]) {
        propertyCards[index].classList.add('active');
    }

    // Update indicators
    updatePropertyIndicators(index);
}

function nextProperty() {
    currentProperty = (currentProperty + 1) % totalProperties;
    showProperty(currentProperty);
}

function prevProperty() {
    currentProperty = (currentProperty - 1 + totalProperties) % totalProperties;
    showProperty(currentProperty);
}

function updatePropertyIndicators(index) {
    const indicators = document.querySelectorAll('#propertyIndicators .indicator');
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

// Initialize property carousel
function initPropertyCarousel() {
    if (propertyCards.length === 0) return;

    const container = document.getElementById('propertyIndicators');
    if (!container) return;

    // Create indicators
    for (let i = 0; i < totalProperties; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator' + (i === 0 ? ' active' : '');
        indicator.onclick = () => {
            currentProperty = i;
            showProperty(i);
        };
        container.appendChild(indicator);
    }

    // Show first property
    showProperty(0);
}

// Auto-advance properties every 6 seconds
setInterval(() => {
    if (document.querySelector('.properties-carousel')) {
        nextProperty();
    }
}, 6000);

window.addEventListener('load', initPropertyCarousel);
document.addEventListener('DOMContentLoaded', initPropertyCarousel);





const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navMenuHidden = document.getElementById('navMenuHidden');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenuHidden.classList.toggle('active');
    });
}

// Close menu when link is clicked
if (navMenuHidden) {
    navMenuHidden.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenuHidden.classList.remove('active');
        });
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenuHidden?.classList.contains('active') && !e.target.closest('.navbar')) {
        hamburger?.classList.remove('active');
        navMenuHidden.classList.remove('active');
    }
});

// ====================================
// FAQ ACCORDION
// ====================================

document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');

        // Close other items
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
    });
});

// ====================================
// SMOOTH SCROLL
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ====================================
// NAVIGATION HIGHLIGHT ON SCROLL
// ====================================

window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const sectionId = link.getAttribute('href');
        if (sectionId && sectionId !== '#') {
            const section = document.querySelector(sectionId);
            if (section) {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        }
    });
});

// ====================================
// SCROLL ANIMATIONS
// ====================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.property-card, .feature-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ====================================
// PROPERTY SEARCH
// ====================================

const heroSearch = document.getElementById('heroSearch');
const propertyType = document.getElementById('propertyType');
const priceRange = document.getElementById('priceRange');

if (heroSearch) {
    heroSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const location = heroSearch?.value || '';
    const type = propertyType?.value || '';
    const price = priceRange?.value || '';

    // Redirect to properties page with query params
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (type) params.append('type', type);
    if (price) params.append('price', price);

    window.location.href = `properties.html?${params.toString()}`;
}

// ====================================
// ACTIVE NAV LINK ON PAGE LOAD
// ====================================

window.addEventListener('load', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ====================================
// MOBILE RESPONSIVE MENU
// ====================================

const mobileMenu = document.querySelector('.nav-menu');
const mobileMenuHidden = document.querySelector('.nav-menu-hidden');

if (window.innerWidth <= 768) {
    if (mobileMenu) mobileMenu.style.display = 'none';
    if (mobileMenuHidden) mobileMenuHidden.style.display = 'none';
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        if (mobileMenu) mobileMenu.style.display = 'flex';
        if (mobileMenuHidden) mobileMenuHidden.style.display = 'none';
    } else {
        if (mobileMenu) mobileMenu.style.display = 'none';
        if (mobileMenuHidden && !hamburger?.classList.contains('active')) {
            mobileMenuHidden.style.display = 'none';
        }
    }
});

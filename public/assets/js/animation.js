/**
 * Animation - Gère les animations du site
 */

// Intersection Observer pour animations au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer les éléments animables
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.card-hover, .section-title');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Animation des liens de la galerie
document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('#galerie-container > div');
    
    galleryImages.forEach((img, index) => {
        img.style.opacity = '0';
        img.style.animation = `slideInUp 0.6s ease-out forwards`;
        img.style.animationDelay = `${index * 0.1}s`;
    });
});

// Scroll to top avec animation
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'fixed bottom-8 right-8 bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 opacity-0 pointer-events-none z-40';
scrollTopBtn.id = 'scroll-to-top';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', function() {
    const btn = document.getElementById('scroll-to-top');
    if (window.pageYOffset > 300) {
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
    } else {
        btn.style.opacity = '0';
        btn.style.pointerEvents = 'none';
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animation de la section hero au chargement
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.style.animation = 'fadeIn 1s ease-out';
    }
});

// Ajouter les keyframes pour fadeIn
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse-glow {
        0%, 100% {
            box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.7);
        }
        50% {
            box-shadow: 0 0 0 10px rgba(217, 119, 6, 0);
        }
    }
    
    .animate-in {
        animation: slideInUp 0.8s ease-out forwards;
    }
    
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Parallax effect pour hero
window.addEventListener('scroll', function() {
    const heroImage = document.getElementById('heroImage');
    if (heroImage) {
        const scrollPosition = window.scrollY;
        heroImage.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// Compteur pour les statistiques (si nécessaire)
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

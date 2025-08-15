// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Counter animation for hero stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.target);
            animateCounter(counter, target);
            statsObserver.unobserve(counter);
        }
    });
}, observerOptions);

// Observe all stat numbers
document.querySelectorAll('.stat-number').forEach(counter => {
    statsObserver.observe(counter);
});

// Lab card hover effects
document.querySelectorAll('.lab-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// External card hover effects
document.querySelectorAll('.external-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.background = 'white';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.background = 'var(--bg-secondary)';
    });
});

// Scroll progress indicator
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-indicator');
    if (!scrollProgress) {
        // Create scroll indicator if it doesn't exist
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        document.body.appendChild(indicator);
    }
    
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    const indicator = document.querySelector('.scroll-indicator');
    if (indicator) {
        indicator.style.width = progress + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// Typing animation for code block
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize code animation when in view
const codeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const codeLines = entry.target.querySelectorAll('.code-line');
            codeLines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.transform = 'translateX(0)';
                }, index * 200);
            });
            codeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const codeWindow = document.querySelector('.code-window');
if (codeWindow) {
    // Initially hide code lines
    const codeLines = codeWindow.querySelectorAll('.code-line');
    codeLines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        line.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    codeObserver.observe(codeWindow);
}

// Lab status checker (simulated)
function checkLabStatus(labElement) {
    const statusDot = labElement.querySelector('.status-dot');
    const statusText = labElement.querySelector('.status-text');
    
    // Simulate random status check
    const isOnline = Math.random() > 0.1; // 90% chance of being online
    
    if (isOnline) {
        statusDot.className = 'status-dot status-active';
        statusText.textContent = 'Live';
    } else {
        statusDot.className = 'status-dot status-inactive';
        statusText.textContent = 'Offline';
    }
}

// Check status for all labs
document.querySelectorAll('.lab-card').forEach((lab, index) => {
    setTimeout(() => {
        checkLabStatus(lab);
    }, index * 500);
});

// Button click animations
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Particle animation enhancement
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation duration
    particle.style.animationDuration = (3 + Math.random() * 6) + 's';
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 9000);
}

// Add more particles dynamically
const heroBackground = document.querySelector('.hero-background');
if (heroBackground) {
    setInterval(() => {
        if (document.querySelectorAll('.particle').length < 10) {
            createParticle(heroBackground);
        }
    }, 2000);
}

// Lazy loading for images
function lazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoad();

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    updateScrollProgress();
}, 16));

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Skip to main content with Tab key
    if (e.key === 'Tab' && !e.shiftKey) {
        const focusedElement = document.activeElement;
        if (focusedElement === document.body) {
            const firstFocusable = document.querySelector('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    }
    
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Error handling for external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function(e) {
        try {
            // Add noopener for security
            this.rel = 'noopener noreferrer';
        } catch (error) {
            console.warn('External link security enhancement failed:', error);
        }
    });
});

// Console greeting
console.log(`
🔬 Virtual Lab Development
━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Interactive Learning Platform
💻 Built with modern web technologies
🎯 Designed for educational excellence

👨‍💻 Developer: Pankaj Kumar
🌐 Portfolio: https://erpankaj.netlify.app/#resume
📂 GitHub: https://github.com/pankaj-creator
━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Virtual Lab Development - Website Initialized');
    
    // Add loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Initialize scroll progress
    updateScrollProgress();
    
    // Ensure all buttons are properly styled
    initializeButtons();
    
    // Initialize mobile menu if needed
    initializeMobileMenu();
});

// Initialize buttons with proper event listeners
function initializeButtons() {
    document.querySelectorAll('.btn').forEach(btn => {
        // Ensure no duplicate event listeners
        btn.removeEventListener('click', handleButtonClick);
        btn.addEventListener('click', handleButtonClick);
    });
}

// Enhanced button click handler
function handleButtonClick(e) {
    const btn = e.currentTarget;
    
    // Create enhanced ripple effect
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    btn.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
    
    // Add visual feedback
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = '';
    }, 150);
}

// Enhanced mobile menu initialization
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// Add CSS for loaded state
const loadedStyle = document.createElement('style');
loadedStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .status-inactive {
        background: #f56565 !important;
    }
`;
document.head.appendChild(loadedStyle);

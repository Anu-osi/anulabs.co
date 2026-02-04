// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const portfolioContainer = document.querySelector('.portfolio-container');
    
    // Hide loading screen after animation
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.pointerEvents = 'none';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            portfolioContainer.style.display = 'grid';
        }, 500);
    }, 2000);
});

// Animate numbers on scroll
const animateNumbers = () => {
    const numberElements = document.querySelectorAll('.stat-number');
    
    numberElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-target'));
        const suffix = element.textContent.replace(/\d/g, '');
        
        if (!element.classList.contains('animated')) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        element.classList.add('animated');
                        countUp(element, target, suffix);
                        observer.unobserve(element);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(element);
        }
    });
};

// Count up animation
const countUp = (element, target, suffix) => {
    let current = 0;
    const increment = target / 60;
    const duration = 1500;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
            
            // Animate progress circles after numbers
            if (element.closest('.stat-card')) {
                animateProgressCircles();
            }
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, duration / 60);
};

// Animate progress circles
const animateProgressCircles = () => {
    const progressCircles = document.querySelectorAll('.progress-circle');
    
    progressCircles.forEach(circle => {
        const progress = parseInt(circle.getAttribute('data-progress'));
        const deg = (progress / 100) * 360;
        
        // Wait a bit before animating
        setTimeout(() => {
            circle.style.background = `conic-gradient(var(--secondary) ${deg}deg, var(--surface-light) 0deg)`;
        }, 300);
    });
};

// Timeline hover effects
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const year = item.getAttribute('data-year');
        const dot = item.querySelector('.timeline-dot');
        
        // Add pulse animation to dot
        dot.style.animation = 'pulseDot 0.6s ease-in-out 3';
        
        // Highlight timeline track
        const progress = document.querySelector('.timeline-progress');
        progress.style.background = `linear-gradient(to bottom, var(--primary), var(--secondary) ${year === '2026' ? '100%' : '75%'})`;
    });
    
    item.addEventListener('mouseleave', () => {
        const dot = item.querySelector('.timeline-dot');
        dot.style.animation = 'pulseDot 2s infinite';
        
        // Reset timeline track
        const progress = document.querySelector('.timeline-progress');
        progress.style.background = 'linear-gradient(to bottom, var(--primary), var(--secondary))';
    });
});

// Tech stack hover effects
const techItems = document.querySelectorAll('.tech-item');
techItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const skill = item.getAttribute('data-skill');
        const dots = item.querySelectorAll('.dot');
        
        // Animate dots
        dots.forEach((dot, index) => {
            setTimeout(() => {
                if (dot.classList.contains('active')) {
                    dot.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        dot.style.transform = 'scale(1)';
                    }, 200);
                }
            }, index * 100);
        });
    });
});

// Photo modal functionality
const photoModal = document.querySelector('.photo-modal');
const modalClose = document.querySelector('.modal-close');

// Open modal when clicking on name
document.querySelector('.name-animation').addEventListener('click', () => {
    photoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close modal
modalClose.addEventListener('click', () => {
    photoModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
photoModal.addEventListener('click', (e) => {
    if (e.target === photoModal) {
        photoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Contact button animations
const contactButtons = document.querySelectorAll('.contact-btn');
contactButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .contact-btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// Background animation interaction
document.addEventListener('mousemove', (e) => {
    const background = document.querySelector('.background-animation');
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    background.style.backgroundPosition = `${x}% ${y}%`;
});

// Scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.stat-card, .tech-stack, .contact-section');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    // Animate numbers
    setTimeout(() => {
        animateNumbers();
    }, 3000);
    
    // Initialize scroll animations
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
    
    // Add photo click to modal
    const modalPhoto = document.querySelector('.modal-photo');
    if (modalPhoto) {
        modalPhoto.addEventListener('click', (e) => e.stopPropagation());
    }
    
    // Add contact button functionality
    const phoneBtn = document.querySelector('.contact-btn.primary');
    const emailBtn = document.querySelector('.contact-btn.secondary');
    
    if (phoneBtn) {
        phoneBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('tel:0431523847');
        });
    }
    
    if (emailBtn) {
        emailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('mailto:anudeepgoude@gmail.com');
        });
    }
});
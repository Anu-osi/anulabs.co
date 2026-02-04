// Simulator functionality
document.addEventListener('DOMContentLoaded', function() {
    // Troubleshooting simulator
    const nextButtons = document.querySelectorAll('.btn-next');
    const restartButton = document.querySelector('.btn-restart');
    
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.simulator-step');
            const nextStepId = this.getAttribute('data-next');
            const nextStep = document.getElementById(step${nextStepId});
            
            if (currentStep && nextStep) {
                // Hide current step with fade out
                currentStep.style.opacity = '0';
                currentStep.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    currentStep.classList.remove('current');
                    currentStep.style.opacity = '';
                    currentStep.style.transform = '';
                    
                    // Show next step with fade in
                    nextStep.classList.add('current');
                    nextStep.style.opacity = '0';
                    nextStep.style.transform = 'translateY(10px)';
                    
                    setTimeout(() => {
                        nextStep.style.opacity = '1';
                        nextStep.style.transform = 'translateY(0)';
                    }, 50);
                    
                    // If this is the resolution step, animate the skill bars
                    if (nextStepId === '3') {
                        setTimeout(() => {
                            animateSkillBars();
                        }, 500);
                    }
                }, 300);
            }
        });
    });
    
    // Restart simulator
    if (restartButton) {
        restartButton.addEventListener('click', function() {
            const allSteps = document.querySelectorAll('.simulator-step');
            const firstStep = document.querySelector('.simulator-step.current');
            
            // Hide all steps
            allSteps.forEach(step => {
                step.classList.remove('current');
            });
            
            // Show first step
            const initialStep = document.querySelector('.simulator-step:not([id])');
            if (initialStep) {
                initialStep.classList.add('current');
            }
            
            // Reset skill bars animation
            resetSkillBars();
        });
    }
    
    // Skill bars animation
    function animateSkillBars() {
        const skillLevels = document.querySelectorAll('.skill-level');
        
        skillLevels.forEach(level => {
            const width = level.style.width;
            level.style.width = '0';
            
            setTimeout(() => {
                level.style.width = width;
            }, 100);
        });
    }
    
    function resetSkillBars() {
        const skillLevels = document.querySelectorAll('.skill-level');
        
        skillLevels.forEach(level => {
            level.style.width = '0';
        });
    }
    
    // Animate skill bars on page load
    setTimeout(() => {
        animateSkillBars();
    }, 1000);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add hover effect to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add animation to stats in KB section
    const stats = document.querySelectorAll('.stat-value');
    stats.forEach(stat => {
        const originalValue = stat.textContent;
        
        // Only animate if it contains a number
        if (originalValue.match(/\d/)) {
            stat.textContent = '0';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateValue(stat, originalValue);
                        observer.unobserve(stat);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(stat);
        }
    });
    
    function animateValue(element, finalValue) {
        const duration = 1500;
        const startValue = 0;
        const startTime = Date.now();
        
        // Check if value has % or other suffix
        const suffix = finalValue.replace(/\d/g, '');
        const numericValue = parseInt(finalValue);
        
        function update() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out function
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.round(startValue + (numericValue - startValue) * easeProgress);
            
            element.textContent = currentValue + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        update();
    }
    
    // Add click animation to contact buttons
    const contactButtons = document.querySelectorAll('.contact-btn');
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
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
    document.head.appendChild(style);
});

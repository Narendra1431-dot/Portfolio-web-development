/**
 * Portfolio Website - JavaScript
 * Handles form validation, DOM manipulation, and interactivity
 */

// ===========================
// FORM VALIDATION
// ===========================

/**
 * Email validation using regex
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Phone validation (optional field, must be valid if provided)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid phone format or empty
 */
function isValidPhone(phone) {
    if (phone === '') return true; // Optional field
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

/**
 * Validate individual form field
 * @param {HTMLElement} field - Form field element
 * @returns {boolean} - True if field is valid
 */
function validateField(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    let isValid = true;
    let errorMessage = '';

    // Check if field is required and empty
    if (field.hasAttribute('required') && field.value.trim() === '') {
        isValid = false;
        errorMessage = `${field.previousElementSibling.textContent.replace('*', '').trim()} is required.`;
    }

    // Email validation
    if (field.type === 'email' && field.value.trim() !== '') {
        if (!isValidEmail(field.value.trim())) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }

    // Phone validation
    if (field.type === 'tel' && field.value.trim() !== '') {
        if (!isValidPhone(field.value.trim())) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
    }

    // Min length validation for textarea
    if (field.tagName === 'TEXTAREA' && field.value.trim().length < 10) {
        if (field.hasAttribute('required') || field.value.trim() !== '') {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long.';
        }
    }

    // Update UI
    if (isValid) {
        field.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.setAttribute('aria-live', 'off');
        }
    } else {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.setAttribute('aria-live', 'polite');
        }
    }

    return isValid;
}

/**
 * Validate entire form
 * @param {HTMLFormElement} form - Form element to validate
 * @returns {boolean} - True if all fields are valid
 */
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isFormValid = true;

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });

    // Also validate optional but provided fields
    const optionalFields = form.querySelectorAll('input[type="tel"]');
    optionalFields.forEach(field => {
        if (field.value.trim() !== '') {
            if (!validateField(field)) {
                isFormValid = false;
            }
        }
    });

    return isFormValid;
}

// ===========================
// FORM SUBMISSION
// ===========================

/**
 * Handle form submission with AJAX
 * @param {Event} event - Form submission event
 */
function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formMessage = document.getElementById('form-message');

    // Reset message
    formMessage.className = 'form-message';
    formMessage.textContent = '';

    // Validate form
    if (!validateForm(form)) {
        console.log('Form validation failed');
        return;
    }

    // Prepare form data
    const formData = new FormData(form);

    // Send form data via AJAX
    fetch(form.action, {
        method: form.method.toUpperCase(),
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Check if response indicates success
        if (data.includes('Thank you') || data.includes('successfully')) {
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Thank you! Your message has been sent successfully.';
            form.reset();
            
            // Clear error states
            form.querySelectorAll('.error').forEach(field => {
                field.classList.remove('error');
            });

            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        } else {
            formMessage.className = 'form-message error';
            formMessage.textContent = 'An error occurred. Please try again later.';
        }
        console.log('Server response:', data);
    })
    .catch(error => {
        console.error('Form submission error:', error);
        formMessage.className = 'form-message error';
        formMessage.textContent = 'A network error occurred. Please try again.';
    });
}

// ===========================
// REAL-TIME FIELD VALIDATION
// ===========================

/**
 * Add real-time validation listeners to form fields
 */
function attachFieldValidationListeners() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const fields = form.querySelectorAll('input, textarea');

    fields.forEach(field => {
        // Validate on blur
        field.addEventListener('blur', function() {
            validateField(this);
        });

        // Clear error on input
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                const errorElement = document.getElementById(`${this.id}-error`);
                if (errorElement) {
                    errorElement.textContent = '';
                }
                this.classList.remove('error');
            }
        });
    });
}

// ===========================
// SMOOTH SCROLLING ENHANCEMENT
// ===========================

/**
 * Handle smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ===========================
// LAZY LOADING ANIMATION
// ===========================

/**
 * Advanced scroll animations with parallax and stagger effects
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animations = [
                    { name: 'slideInUp', duration: 0.8 },
                    { name: 'fadeInUp', duration: 0.9 },
                    { name: 'slideInLeft', duration: 0.8 },
                    { name: 'slideInRight', duration: 0.8 },
                    { name: 'zoomInScale', duration: 0.7 },
                    { name: 'rotateIn', duration: 0.8 }
                ];
                
                const animationChoice = animations[index % animations.length];
                const delay = index * 0.12;
                
                element.style.animation = `${animationChoice.name} ${animationChoice.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s forwards`;
                element.classList.add('animate-in', 'animated');
                
                // Add parallax effect for certain elements
                if (element.classList.contains('parallax')) {
                    addParallaxEffect(element);
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .skill-card, .highlight-item, .about-content, .service-item, .testimonial, .team-member').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
}

/**
 * Advanced hover animations with ripple effect
 */
function setupHoverAnimations() {
    const cardElements = document.querySelectorAll('.project-card, .skill-card, .service-item, .team-member');
    
    cardElements.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03) rotateX(2deg)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(66, 135, 245, 0.3)';
            this.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            
            // Add ripple effect
            createRippleEffect(this, event);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });

        // Add 3D perspective effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
            this.style.transition = 'none';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            this.style.transition = 'all 0.4s ease-out';
        });
    });

    // Button animations
    setupButtonAnimations();
}

/**
 * Advanced button animations with ripple and glow effects
 */
function setupButtonAnimations() {
    const buttons = document.querySelectorAll('button, a.btn, .button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });

        button.addEventListener('mouseenter', function() {
            this.style.animation = 'buttonGlow 0.6s ease-out';
            this.classList.add('btn-animated');
        });
    });
}

/**
 * Create ripple effect on click
 */
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const x = (event?.clientX || event?.pageX) - rect.left;
    const y = (event?.clientY || event?.pageY) - rect.top;
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (x - size / 2) + 'px';
    ripple.style.top = (y - size / 2) + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

/**
 * Parallax scrolling effect
 */
function addParallaxEffect(element) {
    window.addEventListener('scroll', () => {
        const elementPosition = element.getBoundingClientRect().top;
        const scrollPosition = window.pageYOffset;
        const parallaxValue = elementPosition * 0.5;
        
        element.style.transform = `translateY(${parallaxValue}px)`;
    });
}

/**
 * Text animation with character reveal
 */
function setupTextAnimations() {
    const textElements = document.querySelectorAll('.text-animate, h1, h2.section-title');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        Array.from(text).forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animation = `charSlideIn 0.6s ease-out ${index * 0.05}s forwards`;
            span.style.opacity = '0';
            element.appendChild(span);
        });
    });
}

/**
 * Add counter animation for statistics
 */
function setupCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = 2500;
        const increment = target / (duration / 16);
        let current = 0;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && current === 0) {
                    counter.classList.add('counter-active');
                    const animateCounter = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target;
                            counter.style.animation = 'countPop 0.4s ease-out';
                            clearInterval(animateCounter);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, 16);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

/**
 * Smooth page transitions between sections
 */
function setupPageTransitions() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            if (target === '#') return;
            
            const targetElement = document.querySelector(target);
            if (targetElement) {
                // Add transition animation
                document.body.style.animation = 'pageTransition 0.3s ease-in';
                
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    document.body.style.animation = 'none';
                }, 300);
            }
        });
    });
}

/**
 * Scroll progress indicator animation
 */
function setupScrollProgressBar() {
    const progressBar = document.querySelector('.progress-bar') || createProgressBar();
    
    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / docHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/**
 * Create progress bar if it doesn't exist
 */
function createProgressBar() {
    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    bar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #4287f5, #bb86fc);
        z-index: 1000;
        width: 0%;
        transition: width 0.1s ease;
    `;
    document.body.prepend(bar);
    return bar;
}

/**
 * Cursor animation effect
 */
function setupCursorAnimation() {
    if (window.matchMedia('(hover: hover)').matches) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add glow effect on hover interactive elements
        document.querySelectorAll('button, a, input').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-active');
            });
        });
    }
}

// ===========================
// ACTIVE NAVIGATION LINK
// ===========================

/**
 * Update active navigation link based on scroll position
 */
function setupActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===========================
// PAGE LOAD EFFECTS
// ===========================

/**
 * Add fade-in effect on page load
 */
function setupPageLoadEffect() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
}

// ===========================
// FORM DATA PERSISTENCE
// ===========================

/**
 * Save form data to localStorage before submission
 */
function setupFormDataPersistence() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const fields = form.querySelectorAll('input, textarea');

    // Load saved data on page load
    fields.forEach(field => {
        const savedValue = localStorage.getItem(`form_${field.id}`);
        if (savedValue) {
            field.value = savedValue;
        }

        // Save data on input
        field.addEventListener('input', function() {
            localStorage.setItem(`form_${this.id}`, this.value);
        });
    });

    // Clear saved data on successful submission
    form.addEventListener('submit', function() {
        fields.forEach(field => {
            localStorage.removeItem(`form_${field.id}`);
        });
    });
}

// ===========================
// INITIALIZATION
// ===========================

/**
 * Initialize all functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded successfully');
    
    // Setup form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        attachFieldValidationListeners();
        setupFormDataPersistence();
    }

    // Setup comprehensive animation features
    setupSmoothScrolling();
    setupScrollAnimations();
    setupHoverAnimations();
    setupCounterAnimations();
    setupActiveNavLink();
    setupPageLoadEffect();
    setupTextAnimations();
    setupPageTransitions();
    setupScrollProgressBar();
    setupCursorAnimation();
    setupFloatingParticles();
    setupGradientAnimations();
    setupStaggeredAnimations();

    console.log('All features and animations initialized');
});

// ===========================
// GLOBAL ERROR HANDLING
// ===========================

window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
});

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================

// Debounce scroll events for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Use debounced scroll listener for active nav
const debouncedScroll = debounce(() => {
    setupActiveNavLink();
}, 250);

window.addEventListener('scroll', debouncedScroll);

/**
 * Create floating background particles with enhanced animations
 */
function setupFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);

    // Create different types of particles
    const particleTypes = [
        { count: 30, size: [2, 8], color: 'rgba(52, 152, 219, 0.6)', animation: 'particleFloat' },
        { count: 20, size: [1, 4], color: 'rgba(155, 89, 182, 0.4)', animation: 'gentleFloat' },
        { count: 15, size: [3, 6], color: 'rgba(46, 204, 113, 0.5)', animation: 'floatSlow' }
    ];

    particleTypes.forEach(type => {
        for (let i = 0; i < type.count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * (type.size[1] - type.size[0]) + type.size[0];
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${type.color};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: ${type.animation} ${Math.random() * 15 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 10}s;
                box-shadow: 0 0 ${size * 2}px ${type.color.replace('0.6', '0.3').replace('0.4', '0.2').replace('0.5', '0.25')};
            `;
            particleContainer.appendChild(particle);
        }
    });

    // Add interactive particle effects
    setupInteractiveParticles(particleContainer);
}

/**
 * Add interactive particle effects that respond to mouse movement
 */
function setupInteractiveParticles(container) {
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        const particles = container.querySelectorAll('.particle');
        particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            const particleX = rect.left + rect.width / 2;
            const particleY = rect.top + rect.height / 2;

            const distance = Math.sqrt(
                Math.pow(mouseX - particleX, 2) + Math.pow(mouseY - particleY, 2)
            );

            if (distance < 100) {
                const force = (100 - distance) / 100;
                const angle = Math.atan2(mouseY - particleY, mouseX - particleX);
                const pushX = Math.cos(angle) * force * 20;
                const pushY = Math.sin(angle) * force * 20;

                particle.style.transform = `translate(${pushX}px, ${pushY}px)`;
                particle.style.transition = 'transform 0.3s ease-out';
            } else {
                particle.style.transform = 'translate(0, 0)';
            }
        });
    });
}

/**
 * Add animated gradients to backgrounds
 */
function setupGradientAnimations() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.background = 'linear-gradient(-45deg, #2c3e50, #3498db, #2980b9, #2c3e50)';
        heroSection.style.backgroundSize = '400% 400%';
        heroSection.style.animation = 'gradientShift 15s ease infinite';
    }

    const projectHeaders = document.querySelectorAll('.project-header');
    projectHeaders.forEach(header => {
        header.style.background = 'linear-gradient(-45deg, #2c3e50, #3498db, #2980b9, #2c3e50)';
        header.style.backgroundSize = '400% 400%';
        header.style.animation = 'gradientShift 10s ease infinite';
    });
}

/**
 * Enhanced staggered animations for sections
 */
function setupStaggeredAnimations() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(section);
    });
}

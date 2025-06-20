document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme and mobile menu
    loadTheme();
    setupMobileMenu();
    
    // Initialize all contact page functionality
    setupFormTabs();
    setupFormValidation();
    setupNewsletter();
    setupFAQ();
    setupTestimonials();
    autoSaveForms();
});

// Theme Management
function loadTheme() {
    const savedTheme = localStorage.getItem('arsenalFanHub_theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.querySelector('.theme-toggle').textContent = '☀️ Light';
    }
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        themeToggle.textContent = '☀️ Light';
        localStorage.setItem('arsenalFanHub_theme', 'dark');
    } else {
        themeToggle.textContent = '🌙 Dark';
        localStorage.setItem('arsenalFanHub_theme', 'light');
    }
}

// Mobile Menu
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.getElementById('nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
}

// Form Tabs
function setupFormTabs() {
    const tabs = document.querySelectorAll('.form-tab');
    const forms = document.querySelectorAll('.contact-form');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and forms
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding form
            this.classList.add('active');
            const formId = this.getAttribute('data-form') + '-form';
            document.getElementById(formId).classList.add('active');
            
            // Load saved draft if exists
            loadFormDraft(formId);
        });
    });
}

// Form Validation
function setupFormValidation() {
    // Setup character counters
    setupCharCounter('message', 'message-count', 500);
    setupCharCounter('bug-description', 'bug-description-count', 500);
    setupCharCounter('feature-description', 'feature-description-count', 500);
    setupCharCounter('story-content', 'story-content-count', 1000);
    
    // Setup form validation for each form
    document.getElementById('general-form').addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm(this)) {
            showSuccess('general-form');
        }
    });
    
    document.getElementById('bug-form').addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm(this)) {
            showSuccess('bug-form');
        }
    });
    
    document.getElementById('feature-form').addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm(this)) {
            showSuccess('feature-form');
        }
    });
    
    document.getElementById('story-form').addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm(this)) {
            showSuccess('story-form');
        }
    });
    
    // Real-time validation
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });
    });
}

function setupCharCounter(textareaId, counterId, maxLength) {
    const textarea = document.getElementById(textareaId);
    const counter = document.getElementById(counterId);
    
    if (textarea && counter) {
        textarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            counter.textContent = currentLength;
            
            if (currentLength > maxLength * 0.9) {
                counter.style.color = '#DC143C'; // arsenal-red
            } else {
                counter.style.color = '#7F8C8D'; // text-light
            }
        });
    }
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Special validation for email fields
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (!validateEmail(field.value)) {
            showError(field, 'Please enter a valid email address');
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        showError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && field.value.trim() && !validateEmail(field.value)) {
        showError(field, 'Please enter a valid email address');
        return false;
    }
    
    // Clear any existing error
    hideError(field);
    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(field, message) {
    const errorElement = document.getElementById(`${field.id}-error`);
    field.style.borderColor = '#DC143C'; // arsenal-red
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function hideError(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    field.style.borderColor = '#FFD700'; // arsenal-gold
    
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function showSuccess(formId) {
    // Hide the form
    document.getElementById(formId).style.display = 'none';
    
    // Show success message
    const successMessage = document.getElementById('form-success');
    successMessage.style.display = 'block';
    
    // Save form submission to history
    saveFormSubmission(formId);
}

function resetForm() {
    // Hide success message
    document.getElementById('form-success').style.display = 'none';
    
    // Show the active form again
    const activeForm = document.querySelector('.contact-form.active');
    if (activeForm) {
        activeForm.style.display = 'block';
        activeForm.reset();
    }
}

// Newsletter
function setupNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterSuccess = document.getElementById('newsletter-success');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('newsletter-email').value;
        
        if (!validateEmail(email)) {
            showError(document.getElementById('newsletter-email'), 'Please enter a valid email address');
            return;
        }
        
        // Save subscription
        const preferences = {
            updates: document.getElementById('newsletter-updates').checked,
            news: document.getElementById('newsletter-news').checked,
            events: document.getElementById('newsletter-events').checked
        };
        
        localStorage.setItem('newsletterSubscribed', 'true');
        localStorage.setItem('newsletterPreferences', JSON.stringify(preferences));
        
        // Show success message
        newsletterForm.style.display = 'none';
        newsletterSuccess.style.display = 'block';
    });
}

// FAQ
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqSearch = document.getElementById('faq-search');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            
            if (this.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });
    
    faqSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Testimonials
function setupTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Next/prev buttons
    document.querySelector('.testimonial-next').addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(nextIndex);
    });
    
    document.querySelector('.testimonial-prev').addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(prevIndex);
    });
    
    // Auto-rotate every 5 seconds
    setInterval(() => {
        const nextIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }, 5000);
}

function showTestimonialForm() {
    // Switch to the fan story form
    document.querySelectorAll('.form-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.contact-form').forEach(form => form.classList.remove('active'));
    
    document.querySelector('.form-tab[data-form="story"]').classList.add('active');
    document.getElementById('story-form').classList.add('active');
    
    // Scroll to the form
    document.getElementById('story-form').scrollIntoView({ behavior: 'smooth' });
}

// Form Auto-Save
function autoSaveForms() {
    // Load saved drafts on page load
    document.querySelectorAll('.contact-form').forEach(form => {
        loadFormDraft(form.id);
    });
    
    // Save form data on input
    document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
        input.addEventListener('input', function() {
            saveFormDraft(this.closest('form').id);
        });
    });
}

function saveFormDraft(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const formData = {};
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        if (input.type !== 'file') { // Don't save file inputs
            formData[input.name] = input.value;
        }
    });
    
    localStorage.setItem(`formDraft_${formId}`, JSON.stringify(formData));
}

function loadFormDraft(formId) {
    const savedDraft = localStorage.getItem(`formDraft_${formId}`);
    if (!savedDraft) return;
    
    const formData = JSON.parse(savedDraft);
    const form = document.getElementById(formId);
    
    if (!form) return;
    
    Object.keys(formData).forEach(name => {
        const input = form.querySelector(`[name="${name}"]`);
        if (input) {
            input.value = formData[name];
        }
    });
}

function saveFormSubmission(formId) {
    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    const form = document.getElementById(formId);
    
    if (!form) return;
    
    const submission = {
        formId,
        timestamp: new Date().toISOString(),
        data: {}
    };
    
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.type !== 'file' && input.name) {
            submission.data[input.name] = input.value;
        }
    });
    
    submissions.push(submission);
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));
    
    // Clear the draft for this form
    localStorage.removeItem(`formDraft_${formId}`);
}
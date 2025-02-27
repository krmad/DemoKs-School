// Hamburger menu toggle
document.querySelector('.hamburger-menu').addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementById('main-nav').classList.toggle('active');
});

// Dropdown toggle
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const parent = this.parentElement;
        parent.classList.toggle('active');
    });
});

// Dark mode functionality
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Check for saved theme preference or use preferred color scheme
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-theme');
    darkModeToggle.checked = true;
}

// Toggle theme when checkbox changes
darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    }
});

// Tidio chat initialization
function initTidioChat() {
    // Wait for Tidio to load
    const checkTidio = setInterval(function() {
        if (window.tidioChatApi) {
            window.tidioChatApi.display(true);
            window.tidioChatApi.show();
            clearInterval(checkTidio);
            console.log('Tidio chat initialized');
        }
    }, 100);

    // Timeout after 10 seconds
    setTimeout(function() {
        clearInterval(checkTidio);
        console.warn('Tidio chat failed to load');
    }, 10000);
}

// Initialize Tidio when page loads
window.addEventListener('load', initTidioChat);

// Function to open chat
function openTidioChat() {
    if (window.tidioChatApi) {
        window.tidioChatApi.show();
        window.tidioChatApi.open();
    }
}

// Update the scroll to bottom function
function scrollToBottomAndChat() {
    // Scroll to bottom of page
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
    });
    
    // Close mobile menu if open
    const mainNav = document.getElementById('main-nav');
    if (mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        document.querySelector('.hamburger-menu').classList.remove('active');
    }
    
    // Wait for scroll to complete then open chat
    setTimeout(() => {
        if (window.tidioChatApi) {
            window.tidioChatApi.open();
        }
    }, 800);
}

// Function to scroll to footer
function scrollToFooter() {
    // Close mobile menu if open
    const mainNav = document.getElementById('main-nav');
    if (mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        document.querySelector('.hamburger-menu').classList.remove('active');
    }
    
    // Scroll to footer
    document.getElementById('footer').scrollIntoView({ 
        behavior: 'smooth'
    });
}

// Add global error handling
window.addEventListener('error', function(e) {
    console.error('Global error:', e.message);
    // You could send this to an error tracking service
});

// Add better service worker error handling
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration.scope);
            })
            .catch(error => {
                console.error('SW registration failed:', error);
            });
    });
}

// Add performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const timing = performance.timing;
        const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    });
} 
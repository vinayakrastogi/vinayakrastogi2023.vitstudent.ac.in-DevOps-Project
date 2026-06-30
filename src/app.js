document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger-menu');
    const navLinks = document.querySelector('.nav-links');

    // Toggle Mobile Menu
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Burger Animation
        burger.classList.toggle('toggle');
        const lines = burger.querySelectorAll('div');
        if (navLinks.classList.contains('active')) {
            lines[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        }
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const lines = burger.querySelectorAll('div');
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        });
    });

    // Form submission mock
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const button = form.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        button.style.backgroundColor = '#10b981'; // Success color
        
        setTimeout(() => {
            button.textContent = 'Message Sent!';
            form.reset();
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 3000);
        }, 1500);
    });

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(2, 6, 23, 0.95)';
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(2, 6, 23, 0.8)';
            nav.style.boxShadow = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Typing Animation
    const typewriterElement = document.getElementById('typewriter');
    const roles = ['Web Developer', 'Tech Enthusiast', 'CSE Student'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!typewriterElement) return;
        const currentRole = roles[roleIndex];
        let typeSpeed = isDeleting ? 100 : 200;
        
        typewriterElement.textContent = currentRole.substring(0, charIndex);

        if (!isDeleting && charIndex < currentRole.length) {
            charIndex++;
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }
        
        setTimeout(type, isDeleting && charIndex === currentRole.length ? 1500 : typeSpeed);
    }
    type();

    // Scroll Reveal & Active Nav Link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Update active nav link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Initialize Vanilla Tilt for 3D effect on project cards
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });

    // Mailto Link Fix with Custom Message
    const emailButtons = document.querySelectorAll('a[href^="mailto:"]');
    const messageBox = document.getElementById('message-box');
    
    // Function to show a custom message
    function showMessage(message) {
        if (messageBox) {
            messageBox.textContent = message;
            messageBox.classList.add('show');
            setTimeout(() => {
                messageBox.classList.remove('show');
            }, 5000);
        }
    }

    emailButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            let mailtoOpened = false;
            
            // A small delay to check if the browser handled the mailto link
            const timer = setTimeout(() => {
                if (!mailtoOpened) {
                    event.preventDefault(); // Prevents the default action if not already handled
                    const email = button.getAttribute('href').replace('mailto:', '');
                    const message = `The email client could not be opened. You can copy the email address: ${email}`;
                    showMessage(message);
                }
            }, 500); 

            // Check if the user switches away from the tab, which often happens when a new app opens
            window.addEventListener('blur', () => {
                mailtoOpened = true;
                clearTimeout(timer);
            }, { once: true });
        });
    });
});
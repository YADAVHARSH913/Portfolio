document.addEventListener('DOMContentLoaded', () => {
    
    // --- Selective Blend Cursor ---
    const blendCursor = document.querySelector('.blend-cursor');
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');

    window.addEventListener('mousemove', (e) => {
        blendCursor.style.left = `${e.clientX}px`;
        blendCursor.style.top = `${e.clientY}px`;
    });

    interactiveElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            document.body.classList.add('cursor-active');
            blendCursor.classList.add('active');
        });
        el.addEventListener('mouseout', () => {
            document.body.classList.remove('cursor-active');
            blendCursor.classList.remove('active');
        });
    });

    // --- Hamburger Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // --- Typing Animation ---
    const typewriterElement = document.getElementById('typewriter');
    const roles = ['a Web Developer.', 'a CSE Student.', 'a Tech Enthusiast.'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!typewriterElement) return;
        const currentRole = roles[roleIndex];
        let typeSpeed = isDeleting ? 75 : 150;
        
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
        
        setTimeout(type, isDeleting && charIndex === currentRole.length ? 1200 : typeSpeed);
    }
    type();

    // --- Scroll Reveal & Active Nav Link ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.4 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // --- 3D Tilt Effect ---
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 15, speed: 400, glare: true, "max-glare": 0.5,
    });

});
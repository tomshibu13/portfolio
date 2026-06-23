// Smooth scrolling and active nav highlighting
        const navLinks = document.querySelectorAll('.nav-links a, .nav-item');
        const sections = document.querySelectorAll('section[id]');

        function updateActiveNav() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveNav);

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').slice(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        const html = document.documentElement;
        
        // Check for saved theme preference or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            html.classList.add('light-theme');
            document.body.classList.add('light-theme');
            themeToggle.classList.remove('dark');
        }
        
        themeToggle.addEventListener('click', () => {
            const isLight = html.classList.contains('light-theme');
            
            if (isLight) {
                html.classList.remove('light-theme');
                document.body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
                themeToggle.classList.add('dark');
            } else {
                html.classList.add('light-theme');
                document.body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
                themeToggle.classList.remove('dark');
            }
        });

        // Button interactions
        const buttons = document.querySelectorAll('.btn, .get-in-touch-btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('div');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                button.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.tech-card, .project-card, .stat-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
        

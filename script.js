/**
 * Portfolio Interactive Scripts (Advanced Redesign)
 * Handles SPA Routing, Theme Toggling, Studio Deck Typewriter loops, Project Accordions, and Cursor Glow Spotlight variables.
 */

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. Advanced Cursor Spotlight Tracker
    // ==========================================
    window.addEventListener('mousemove', function (e) {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });


    // ==========================================
    // 2. Scroll-Linked Header Shrink States
    // ==========================================
    const siteHeader = document.querySelector('.site-header');
    
    if (siteHeader) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 40) {
                siteHeader.classList.add('shrunk');
            } else {
                siteHeader.classList.remove('shrunk');
            }
        });
    }


    // ==========================================
    // 3. Single Page Application (SPA) Router
    // ==========================================
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
    const mobileMenu = document.getElementById('mobileMenu');

    function handleRouting() {
        const hash = window.location.hash || '#home';
        let targetSection = document.querySelector(hash);

        // Fallback to home if section doesn't exist
        if (!targetSection) {
            targetSection = document.getElementById('home');
        }

        // Hide other sections, show active section
        sections.forEach(sec => {
            sec.classList.remove('active');
        });
        targetSection.classList.add('active');

        // Update active nav highlights in top header and mobile drawer
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });

        // Auto-close mobile drawer menu on page routing
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }

        // Instant scroll jump back to the top of window viewport
        window.scrollTo({ top: 0, behavior: 'instant' });
        
        // Trigger typewriter sequences if Home page is routed
        if (hash === '#home') {
            runActiveTabAnimation();
        }
    }

    // Bind hash change listener
    window.addEventListener('hashchange', handleRouting);
    // Initial routing on DOM load
    handleRouting();


    // ==========================================
    // 4. Mobile Menu Drawer Toggle
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
        });

        // Clicking outside menu collapses drawer
        document.addEventListener('click', function (e) {
            if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && e.target !== menuToggle) {
                mobileMenu.classList.remove('active');
            }
        });
    }


    // ==========================================
    // 5. Theme Selector (Dark/Light Mode)
    // ==========================================
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const htmlElement = document.documentElement;

    // Check localStorage preference, default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'light') {
        htmlElement.classList.add('light-theme');
        document.body.classList.add('light-theme');
        if (themeToggleBtn) themeToggleBtn.classList.remove('dark');
    } else {
        htmlElement.classList.remove('light-theme');
        document.body.classList.remove('light-theme');
        if (themeToggleBtn) themeToggleBtn.classList.add('dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function () {
            const isCurrentlyLight = htmlElement.classList.contains('light-theme');

            if (isCurrentlyLight) {
                htmlElement.classList.remove('light-theme');
                document.body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.classList.add('dark');
            } else {
                htmlElement.classList.add('light-theme');
                document.body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.classList.remove('dark');
            }
        });
    }


    // ==========================================
    // 6. Showcase Deck Typewriter Terminal Loops
    // ==========================================
    const deckTabs = document.querySelectorAll('.deck-tab');
    const deckContents = document.querySelectorAll('.deck-content');
    let typingTimer = null;

    function runActiveTabAnimation() {
        // Clear any running typewriter loops
        if (typingTimer) clearTimeout(typingTimer);

        const activeContent = document.querySelector('.deck-content.active-content');
        if (!activeContent) return;

        const tabId = activeContent.getAttribute('id');
        
        // Reset element states before printing
        if (tabId === 'deck-profile') {
            const heading = activeContent.querySelector('h4');
            const originalText = "Developing digital systems combining clean logic with spatial layouts.";
            
            heading.textContent = '';
            let charIndex = 0;
            
            function typeHeading() {
                if (charIndex < originalText.length) {
                    heading.textContent += originalText.charAt(charIndex);
                    charIndex++;
                    typingTimer = setTimeout(typeHeading, 15);
                }
            }
            typeHeading();
            
        } else if (tabId === 'deck-tech') {
            const rows = activeContent.querySelectorAll('.tech-row');
            rows.forEach((row, index) => {
                row.style.opacity = '0';
                row.style.transform = 'translateY(6px)';
                row.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                
                setTimeout(() => {
                    row.style.opacity = '1';
                    row.style.transform = 'translateY(0)';
                }, index * 120);
            });
            
        } else if (tabId === 'deck-coords') {
            const items = activeContent.querySelectorAll('.coord-item');
            items.forEach((item, index) => {
                const label = item.querySelector('.coord-lbl');
                const val = item.querySelector('.coord-val');
                
                // Hide values initially
                val.style.opacity = '0';
                val.style.transition = 'opacity 0.3s ease';
                
                // Simulate print sequence
                setTimeout(() => {
                    val.style.opacity = '1';
                }, index * 150 + 100);
            });
        }
    }

    deckTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const tabId = tab.getAttribute('data-tab');

            // Switch active tab highlights
            deckTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Switch display pane
            deckContents.forEach(content => {
                content.classList.remove('active-content');
                if (content.getAttribute('id') === `deck-${tabId}`) {
                    content.classList.add('active-content');
                }
            });

            // Trigger typing/sliding animations for active content
            runActiveTabAnimation();
        });
    });


    // ==========================================
    // 7. Tech Index Grid Filters
    // ==========================================
    const skillFilters = document.querySelectorAll('.skills-editorial-header .filter-btn');
    const techCards = document.querySelectorAll('.tech-index-card');

    skillFilters.forEach(btn => {
        btn.addEventListener('click', function () {
            // Toggle active status
            skillFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedCategory = btn.getAttribute('data-filter');

            // Toggle card visibilities
            techCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 20);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 350);
                }
            });
        });
    });


    // ==========================================
    // 8. Selected Builds Filter
    // ==========================================
    const projectFilters = document.querySelectorAll('.projects-editorial-header .filter-btn');
    const projectCards = document.querySelectorAll('.editorial-project-card');

    projectFilters.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            // Toggle active status
            projectFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedTech = btn.getAttribute('data-filter');

            // Toggle card visibilities
            projectCards.forEach(card => {
                const cardTech = card.getAttribute('data-tech');
                card.classList.remove('expanded'); // Close expansions on filter change

                if (selectedTech === 'all' || cardTech === selectedTech) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 20);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 350);
                }
            });
        });
    });


    // ==========================================
    // 9. Interactive Project Blueprint Accordion
    // ==========================================
    projectCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Ignore if clicked on links, icons, or inside expanded details
            if (e.target.closest('a') || e.target.closest('.project-detail-panel')) {
                return;
            }

            const wasExpanded = card.classList.contains('expanded');

            // Collapse all other project cards
            projectCards.forEach(c => c.classList.remove('expanded'));

            // Toggle active card
            if (!wasExpanded) {
                card.classList.add('expanded');
                
                // Dynamic auto-scrolling: scroll to show the expanded details nicely
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 250);
            }
        });
    });


    // ==========================================
    // 10. Dynamic Minimalist Form Submission Simulation
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('formSubmitBtn');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Set sending loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>SENDING TRANSMISSION...</span><i class="fa-solid fa-spinner fa-spin"></i>`;
            formStatus.className = 'form-status';
            formStatus.style.display = 'none';

            // Simulate server network latency response
            setTimeout(function () {
                // Clear inputs
                contactForm.reset();

                // Revert button state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>SEND TRANSMISSION</span><span class="btn-submit-icon">→</span>`;

                // Display success prompt
                formStatus.innerHTML = `TRANSMISSION SUCCESSFUL. I WILL RESPOND SHORTLY.`;
                formStatus.className = 'form-status success';
                
                // Fade out notification after 5 seconds
                setTimeout(() => {
                    formStatus.style.transition = 'opacity 1s ease';
                    formStatus.style.opacity = '0';
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                        formStatus.style.opacity = '1';
                    }, 1000);
                }, 5000);

            }, 1800); // 1.8s delay
        });
    }

    // Ripple click interaction for standard buttons
    const rippleButtons = document.querySelectorAll('.btn-editorial, .btn-editorial-secondary, .deck-tab, .filter-btn, .btn-editorial-submit');
    rippleButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            
            // Sizing calculations
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Dynamic styling rules for click circle
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.background = 'rgba(226, 92, 56, 0.25)';
            ripple.style.animation = 'ripple-click-effect 0.5s ease-out';
            ripple.style.pointerEvents = 'none';

            button.appendChild(ripple);

            // Cleanup DOM
            setTimeout(() => {
                ripple.remove();
            }, 550);
        });
    });
});

// Inject click effect dynamic animation keyframe
const styleTag = document.createElement('style');
styleTag.innerHTML = `
    @keyframes ripple-click-effect {
        to {
            transform: scale(2.8);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleTag);

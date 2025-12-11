/**
 * =============================================
 * RAMADAN GIVING - Main JavaScript
 * Enhanced UI/UX with amCharts World Map
 * =============================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initParticles();
    initScrollAnimations();
    initDonationButtons();
    initWorldMap();
    initSlideshow();
    initCursorGlow();
    initSmoothScroll();
});

/**
 * Navigation & Mobile Menu
 */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    const navbar = document.querySelector('.navbar');

    // Toggle Mobile Menu
    hamburger?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Animate Links with stagger effect
        navItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.2}s`;
            }
        });
    });

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                navItems.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });

    // Navbar Scroll Effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/**
 * Particles.js Configuration
 * Themed for Ramadan Giving with emerald and gold colors
 */
function initParticles() {
    if (!document.getElementById('particles-js') || typeof particlesJS === 'undefined') return;

    particlesJS("particles-js", {
        particles: {
            number: {
                value: 60,
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: ["#2D6E7A", "#D4AF37", "#3D8A99"]
            },
            shape: {
                type: ["circle", "triangle"],
                stroke: {
                    width: 0,
                    color: "#000000"
                }
            },
            opacity: {
                value: 0.3,
                random: true,
                anim: {
                    enable: true,
                    speed: 0.5,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 4,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.5,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 180,
                color: "#2D6E7A",
                opacity: 0.15,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 200,
                    line_linked: {
                        opacity: 0.4
                    }
                },
                bubble: {
                    distance: 400,
                    size: 8,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3
                },
                repulse: {
                    distance: 150,
                    duration: 0.4
                },
                push: {
                    particles_nb: 3
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

/**
 * Scroll Animations with Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for grouped elements
                setTimeout(() => {
                entry.target.classList.add('fade-in');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll(`
        .section-header,
        .about-text,
        .stat-card,
        .timeline-row,
        .team-card,
        .involvement-card,
        .gallery-item
    `);

    animatedElements.forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });
}

/**
 * Donation Buttons
 */
function initDonationButtons() {
    const donationBtns = document.querySelectorAll('.donation-btn');

    donationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            donationBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Haptic-like feedback animation
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
        });
    });
}

/**
 * amCharts 5 World Map
 * Shows Toronto and Cairo locations
 */
function initWorldMap() {
    const mapContainer = document.getElementById('worldmap');
    if (!mapContainer) return;

    // Wait for all amCharts dependencies to load
    if (typeof am5 === 'undefined' || typeof am5map === 'undefined' || typeof am5geodata_worldLow === 'undefined') {
        console.log("Waiting for amCharts to load...");
        setTimeout(initWorldMap, 200);
        return;
    }

    // Dispose existing root if any
    am5.array.each(am5.registry.rootElements, function (root) {
        if (root.dom.id === "worldmap") {
            root.dispose();
        }
    });

    try {
        const root = am5.Root.new("worldmap");

        root.setThemes([am5themes_Animated.new(root)]);

        const chart = root.container.children.push(
            am5map.MapChart.new(root, {
                panX: "rotateX",
                panY: "translateY",
                wheelY: "zoom",
                projection: am5map.geoNaturalEarth1(),
                homeGeoPoint: { longitude: -20, latitude: 25 },
                homeZoomLevel: 1.2
            })
        );
        
        // Add zoom control
        const zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {
            x: am5.p100,
            centerX: am5.p100,
            y: am5.p100,
            centerY: am5.p100,
            marginRight: 20,
            marginBottom: 20
        }));
        zoomControl.homeButton.set("visible", true);

        // Add background for oceans
        const backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
        backgroundSeries.mapPolygons.template.setAll({
            fill: am5.color(0xDCE8E8),
            stroke: am5.color(0xDCE8E8),
            strokeWidth: 0
        });
        backgroundSeries.data.push({
            geometry: am5map.getGeoRectangle(90, 180, -90, -180)
        });

        // Add countries
        const polygonSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: am5geodata_worldLow,
                exclude: ["AQ"]
            })
        );

        polygonSeries.mapPolygons.template.setAll({
            fill: am5.color(0x3D8A99),
            stroke: am5.color(0xF7F7F4),
            strokeWidth: 1,
            tooltipText: "{name}",
            interactive: true,
            templateField: "polygonSettings"
        });

        polygonSeries.mapPolygons.template.states.create("hover", {
            fill: am5.color(0x2D6E7A)
        });
        
        // Highlight Canada and Egypt
        polygonSeries.data.setAll([
            { id: "CA", polygonSettings: { fill: am5.color(0x2D6E7A) } },
            { id: "EG", polygonSettings: { fill: am5.color(0x2D6E7A) } }
        ]);

        // Add point series for markers
        const pointSeries = chart.series.push(
            am5map.MapPointSeries.new(root, {})
        );

        pointSeries.bullets.push(function () {
            const container = am5.Container.new(root, {});

            const circle = container.children.push(am5.Circle.new(root, {
                radius: 5,
                fill: am5.color(0xD4AF37),
                stroke: am5.color(0xFFFFFF),
                strokeWidth: 2,
                tooltipText: "{name}"
            }));

            const circle2 = container.children.push(am5.Circle.new(root, {
                radius: 5,
                fill: am5.color(0xD4AF37),
                opacity: 0.5
            }));

            circle2.animate({
                key: "scale",
                from: 1,
                to: 3,
                duration: 2000,
                easing: am5.ease.out(am5.ease.cubic),
                loops: Infinity
            });

            circle2.animate({
                key: "opacity",
                from: 0.5,
                to: 0,
                duration: 2000,
                easing: am5.ease.out(am5.ease.cubic),
                loops: Infinity
            });

            return am5.Bullet.new(root, { sprite: container });
        });

        pointSeries.data.setAll([
            { name: "Toronto 🇨🇦", geometry: { type: "Point", coordinates: [-79.3832, 43.6532] } },
            { name: "Cairo 🇪🇬", geometry: { type: "Point", coordinates: [31.2357, 30.0444] } }
        ]);

        chart.appear(1000, 100);
        console.log("Map initialized successfully");

    } catch (error) {
        console.error("Map error:", error);
    }
}

/**
 * Image Slideshow - Dynamically loads all images from assets/events/images.json
 */
function initSlideshow() {
    const wrapper = document.getElementById('slideshow-wrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // New modular controls
    const currentNumEl = document.getElementById('slideCurrentNum');
    const totalNumEl = document.getElementById('slideTotalNum');
    const progressBar = document.getElementById('slideProgressBar');
    const progressContainer = document.getElementById('slideProgress');
    const playPauseBtn = document.getElementById('slidePlayPause');

    if (!wrapper) {
        console.error("Slideshow wrapper not found");
        return;
    }

    // Dynamically load images from JSON file
    fetch('assets/events/images.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load images.json');
            return response.json();
        })
        .then(images => {
            // Filter to only include .jpg files and shuffle for variety
            const jpgImages = images.filter(img => img.endsWith('.jpg'));
            // Shuffle array for variety
            const shuffled = jpgImages.sort(() => Math.random() - 0.5);
            console.log(`Loaded ${shuffled.length} images for slideshow`);
            setupSlideshow(shuffled, wrapper, prevBtn, nextBtn, currentNumEl, totalNumEl, progressBar, progressContainer, playPauseBtn);
        })
        .catch(error => {
            console.error('Error loading images:', error);
            wrapper.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;font-size:1.1rem;">Unable to load images</div>';
        });
}

function setupSlideshow(images, wrapper, prevBtn, nextBtn, currentNumEl, totalNumEl, progressBar, progressContainer, playPauseBtn) {

    let currentIndex = 0;
    let autoPlayInterval;
    let isPlaying = true;

    // Set total count
    if (totalNumEl) totalNumEl.textContent = images.length;

    // Create slides
    images.forEach((img, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        const image = document.createElement('img');
        image.src = `assets/events/${img}`;
        image.alt = `Ramadan Giving Event ${index + 1}`;
        image.loading = index < 3 ? "eager" : "lazy";
        slide.appendChild(image);
        wrapper.appendChild(slide);
    });

    function updateSlide() {
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update counter
        if (currentNumEl) currentNumEl.textContent = currentIndex + 1;
        
        // Update progress bar
        if (progressBar) {
            const progress = ((currentIndex + 1) / images.length) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, images.length - 1));
        updateSlide();
        if (isPlaying) resetAutoPlay();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlide();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlide();
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    function togglePlayPause() {
        isPlaying = !isPlaying;
        const pauseIcon = playPauseBtn?.querySelector('.pause-icon');
        const playIcon = playPauseBtn?.querySelector('.play-icon');
        
        if (isPlaying) {
            startAutoPlay();
            if (pauseIcon) pauseIcon.style.display = 'block';
            if (playIcon) playIcon.style.display = 'none';
            playPauseBtn?.setAttribute('aria-label', 'Pause slideshow');
        } else {
            stopAutoPlay();
            if (pauseIcon) pauseIcon.style.display = 'none';
            if (playIcon) playIcon.style.display = 'block';
            playPauseBtn?.setAttribute('aria-label', 'Play slideshow');
        }
    }

    // Event listeners
    nextBtn?.addEventListener('click', () => {
        nextSlide();
        if (isPlaying) resetAutoPlay();
    });

    prevBtn?.addEventListener('click', () => {
        prevSlide();
        if (isPlaying) resetAutoPlay();
    });

    playPauseBtn?.addEventListener('click', togglePlayPause);

    // Click on progress bar to seek
    progressContainer?.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;
        const targetIndex = Math.floor(clickPosition * images.length);
        goToSlide(targetIndex);
    });

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            if (isPlaying) resetAutoPlay();
        }
    }

    // Keyboard navigation (only when slideshow is in view)
    document.addEventListener('keydown', (e) => {
        const slideshowRect = wrapper.getBoundingClientRect();
        const inView = slideshowRect.top < window.innerHeight && slideshowRect.bottom > 0;
        
        if (inView) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                if (isPlaying) resetAutoPlay();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                if (isPlaying) resetAutoPlay();
            } else if (e.key === ' ') {
                e.preventDefault();
                togglePlayPause();
            }
        }
    });

    // Initialize first slide
    updateSlide();

    // Start autoplay
    startAutoPlay();

    // Pause on hover (optional UX improvement)
    wrapper.addEventListener('mouseenter', () => {
        if (isPlaying) stopAutoPlay();
    });
    wrapper.addEventListener('mouseleave', () => {
        if (isPlaying) startAutoPlay();
    });
}

/**
 * Cursor Glow Effect
 */
function initCursorGlow() {
    const glow = document.querySelector('.cursor-glow');
    if (!glow || window.matchMedia('(max-width: 768px)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        // Smooth follow effect
        const speed = 0.1;
        glowX += (mouseX - glowX) * speed;
        glowY += (mouseY - glowY) * speed;

        glow.style.left = `${glowX}px`;
        glow.style.top = `${glowY}px`;

        requestAnimationFrame(animate);
    }

    animate();
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Utility: Debounce function
 */
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

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

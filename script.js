document.addEventListener('DOMContentLoaded', function() {
    // Simulate terminal loading
    setTimeout(function() {
        document.querySelector('.terminal-loader').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.terminal-loader').style.display = 'none';
            document.querySelector('.main-content').style.display = 'block';
            
            // Initialize all animations and effects after loading
            initPortfolio();
        }, 500);
    }, 3000);
});

function initPortfolio() {
    // Matrix Effect
    initMatrixEffect();
    
    // Skills Radar Chart
    initSkillsRadar();
    
    // Form Submission
    setupContactForm();
    
    // Scroll Animations
    setupScrollAnimations();
    
    // Navigation Dots
    setupNavDots();
    
    // Project Hover Effects
    setupProjectHovers();
    
    // Tooltips
    setupTooltips();
}

function initMatrixEffect() {
    const canvas = document.createElement('canvas');
    const container = document.querySelector('.matrix-canvas');
    container.appendChild(canvas);
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    
    // Set canvas size
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    
    const ctx = canvas.getContext('2d');
    
    // Matrix characters - taken from Katakana and Latin characters
    const matrixChars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Array of drops - one per column
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // Random start position above the canvas
    }
    
    // Drawing the characters
    function draw() {
        // Black background with opacity for the trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff9d'; // Green text
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
            
            // x = i * fontSize, y = drops[i] * fontSize
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Reset drop to top when it reaches the bottom
            // Add randomness to the reset
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Increment Y coordinate
            drops[i]++;
        }
    }
    
    // Adjust canvas size on window resize
    window.addEventListener('resize', function() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    });
    
    // Start the animation
    setInterval(draw, 33);
}

function initSkillsRadar() {
    const ctx = document.getElementById('skillsRadar').getContext('2d');
    
    const data = {
        labels: ['Networking', 'Security', 'Systems', 'Troubleshooting', 'Analysis', 'Teamwork'],
        datasets: [{
            label: 'Skill Level',
            data: [85, 80, 70, 90, 75, 80],
            backgroundColor: 'rgba(0, 255, 157, 0.2)',
            borderColor: 'rgba(0, 255, 157, 1)',
            pointBackgroundColor: 'rgba(0, 255, 157, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(0, 255, 157, 1)',
            borderWidth: 2,
            pointRadius: 5
        }]
    };
    
    const config = {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: '#fff',
                        font: {
                            family: "'Orbitron', sans-serif",
                            size: 12
                        }
                    },
                    ticks: {
                        display: false,
                        backdropColor: 'transparent',
                        min: 0,
                        max: 100,
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            elements: {
                line: {
                    tension: 0.1
                }
            }
        }
    };
    
    new Chart(ctx, config);
}

function setupContactForm() {
    const form = document.getElementById('messageForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Open mail client with pre-filled email
        const mailtoLink = `mailto:Boniphas3@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoLink;
        
        // Reset form
        form.reset();
        
        // Show success message
        alert('Your email client will open with the message ready to send. Thank you for reaching out!');
    });
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe all project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe all timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
}

function setupNavDots() {
    const sections = document.querySelectorAll('section');
    const navDots = document.querySelectorAll('.nav-dot');
    
    // Highlight active section in nav dots
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('href') === `#${current}`) {
                dot.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for nav dots
    navDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
}

function setupProjectHovers() {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        project.addEventListener('mousemove', function(e) {
            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;
            
            const centerX = this.offsetWidth / 2;
            const centerY = this.offsetHeight / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
        });
        
        project.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
        });
    });
}

function setupTooltips() {
    // Initialize tooltips for elements with data-tooltip attribute
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            
            this.tooltip = tooltip;
        });
        
        el.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                document.body.removeChild(this.tooltip);
                this.tooltip = null;
            }
        });
    });
}
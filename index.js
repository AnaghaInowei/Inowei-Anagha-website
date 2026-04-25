 
    // ==========================================
    // UTILITY: Debounce
    // ==========================================
    function debounce(fn, ms = 100) {
      let timer;
      return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
    }

    // ==========================================
    // NAV SCROLL EFFECT
    // ==========================================
    const nav = document.getElementById('nav');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      nav.classList.toggle('scrolled', y > 50);
      // Hide nav on scroll down, show on scroll up (desktop only)
      if (window.innerWidth > 768) {
        if (y > lastScroll && y > 400) {
          nav.style.transform = 'translateY(-100%)';
        } else {
          nav.style.transform = 'translateY(0)';
        }
      }
      lastScroll = y;
    });
    nav.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

    // ==========================================
    // MOBILE MENU
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
      if (mobileMenu.classList.contains('active')) {
        anime({
          targets: '.mobile-menu a',
          opacity: [0, 1],
          translateY: [40, 0],
          delay: anime.stagger(80, { start: 100 }),
          duration: 600,
          easing: 'easeOutCubic'
        });
      }
    });

    function closeMobileMenu() {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }

    // ==========================================
    // TEXT SPLIT UTILITY
    // ==========================================
    function splitText(el) {
      const text = el.textContent;
      el.innerHTML = '';
      return [...text].map(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(40px) rotateX(-40deg)';
        el.appendChild(span);
        return span;
      });
    }

    // ==========================================
    // HERO ANIMATION (Anime.js)
    // ==========================================
    document.addEventListener('DOMContentLoaded', () => {
      // Split the heading into characters
      const headingChars = splitText(document.querySelector('.hero-heading'));

      // Hero timeline
      const heroTl = anime.timeline({ easing: 'easeOutCubic' });

      heroTl
        // Tagline slides in
        .add({
          targets: '.hero-tagline',
          opacity: [0, 1],
          translateX: [-30, 0],
          duration: 700,
        }, 300)
        // Heading characters stagger in
        .add({
          targets: headingChars,
          opacity: [0, 1],
          translateY: [40, 0],
          rotateX: [-40, 0],
          delay: anime.stagger(25, { start: 200 }),
          duration: 600,
        }, 500)
        // Description fades up
        .add({
          targets: '.hero-description',
          opacity: [0, 1],
          translateY: [25, 0],
          duration: 700,
        }, 1000)
        // CTAs stagger in
        .add({
          targets: '.hero-ctas',
          opacity: [0, 1],
          translateY: [25, 0],
          duration: 700,
        }, 1200)
        // Photo enters with scale + rotation
        .add({
          targets: '.hero-photo-wrapper',
          opacity: [0, 1],
          scale: [0.85, 1],
          rotate: [-3, 0],
          duration: 1000,
          easing: 'easeOutElastic(1, 0.8)',
        }, 800)
        // Scroll indicator
        .add({
          targets: '.hero-scroll',
          opacity: [0, 0.6],
          translateY: [20, 0],
          duration: 600,
        }, 1600);

      // Set initial opacity for elements that anime will animate
      anime.set('.hero-tagline, .hero-description, .hero-ctas, .hero-photo-wrapper', { opacity: 0 });
    });

    // ==========================================
    // SCROLL REVEAL (IntersectionObserver + Anime)
    // ==========================================
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;

          // Different animations based on element type
          if (el.classList.contains('service-card')) {
            const cards = [...document.querySelectorAll('.service-card')];
            const idx = cards.indexOf(el);
            anime({
              targets: el,
              opacity: [0, 1],
              translateY: [50, 0],
              scale: [0.95, 1],
              delay: idx * 150,
              duration: 800,
              easing: 'easeOutCubic'
            });
          } else if (el.classList.contains('step')) {
            const steps = [...document.querySelectorAll('.step')];
            const idx = steps.indexOf(el);
            anime({
              targets: el,
              opacity: [0, 1],
              translateY: [40, 0],
              delay: idx * 200,
              duration: 700,
              easing: 'easeOutCubic',
              complete: () => {
                el.classList.add('active');
                // Animate the step number ring
                anime({
                  targets: el.querySelector('.step-number'),
                  scale: [1, 1.1, 1],
                  duration: 400,
                  easing: 'easeOutElastic(1, 0.6)'
                });
              }
            });
            // Animate connecting line after all steps
            if (idx === steps.length - 1) {
              setTimeout(() => {
                anime({
                  targets: '.line-fill',
                  width: ['0%', '100%'],
                  duration: 1200,
                  easing: 'easeInOutCubic'
                });
              }, 600);
            }
          } else if (el.classList.contains('project')) {
            anime({
              targets: el,
              opacity: [0, 1],
              translateY: [60, 0],
              duration: 900,
              easing: 'easeOutCubic'
            });
            // Stagger the inner elements
            const inner = el.querySelectorAll('.project-name, .project-type, .project-description, .project-details, .project-tech, .project-links');
            anime({
              targets: inner,
              opacity: [0, 1],
              translateY: [20, 0],
              delay: anime.stagger(80, { start: 300 }),
              duration: 600,
              easing: 'easeOutCubic'
            });
          } else if (el.classList.contains('contact-item')) {
            const items = [...document.querySelectorAll('.contact-item')];
            const idx = items.indexOf(el);
            anime({
              targets: el,
              opacity: [0, 1],
              translateX: [-40, 0],
              delay: idx * 120,
              duration: 700,
              easing: 'easeOutCubic'
            });
          } else if (el.classList.contains('contact-form')) {
            anime({
              targets: el,
              opacity: [0, 1],
              translateX: [40, 0],
              duration: 800,
              easing: 'easeOutCubic'
            });
          } else {
            anime({
              targets: el,
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              easing: 'easeOutCubic'
            });
          }

          revealObserver.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    // Observe all reveal elements
    document.querySelectorAll('.reveal, .project, .step, .service-card, .contact-item, .contact-form').forEach(el => {
      anime.set(el, { opacity: 0 });
      revealObserver.observe(el);
    });

    // ==========================================
    // PROJECT IMAGE PARALLAX (Anime.js scroll)
    // ==========================================
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          document.querySelectorAll('.project-image-wrapper').forEach(wrapper => {
            const rect = wrapper.getBoundingClientRect();
            const viewH = window.innerHeight;
            if (rect.top < viewH && rect.bottom > 0) {
              const progress = (viewH - rect.top) / (viewH + rect.height);
              const offset = (progress - 0.5) * 30;
              const preview = wrapper.querySelector('.project-preview');
              if (preview) {
                preview.style.transform = `translateY(${offset}px) scale(1.02)`;
              }
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    });

    // ==========================================
    // MAGNETIC BUTTON EFFECT
    // ==========================================
    document.querySelectorAll('.btn-primary, .btn-outline, .nav-cta').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        anime({
          targets: btn,
          translateX: x * 0.15,
          translateY: y * 0.15,
          duration: 300,
          easing: 'easeOutCubic'
        });
      });

      btn.addEventListener('mouseleave', () => {
        anime({
          targets: btn,
          translateX: 0,
          translateY: 0,
          duration: 500,
          easing: 'easeOutElastic(1, 0.5)'
        });
      });
    });

    // ==========================================
    // MAGNETIC SOCIAL LINKS
    // ==========================================
    document.querySelectorAll('.footer-socials a').forEach(link => {
      link.addEventListener('mousemove', (e) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        anime({
          targets: link,
          translateX: x * 0.3,
          translateY: y * 0.3,
          scale: 1.2,
          duration: 200,
          easing: 'easeOutCubic'
        });
      });

      link.addEventListener('mouseleave', () => {
        anime({
          targets: link,
          translateX: 0,
          translateY: 0,
          scale: 1,
          duration: 400,
          easing: 'easeOutElastic(1, 0.5)'
        });
      });
    });

    // ==========================================
    // SERVICE CARD TILT EFFECT
    // ==========================================
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        anime({
          targets: card,
          rotateX: y * -8,
          rotateY: x * 8,
          duration: 300,
          easing: 'easeOutCubic'
        });
      });

      card.addEventListener('mouseleave', () => {
        anime({
          targets: card,
          rotateX: 0,
          rotateY: 0,
          duration: 500,
          easing: 'easeOutElastic(1, 0.6)'
        });
      });
    });

    // ==========================================
    // TECH BADGE HOVER ANIMATION
    // ==========================================
    document.querySelectorAll('.tech-badge').forEach(badge => {
      badge.addEventListener('mouseenter', () => {
        anime({
          targets: badge,
          scale: [1, 1.08],
          duration: 200,
          easing: 'easeOutCubic'
        });
      });
      badge.addEventListener('mouseleave', () => {
        anime({
          targets: badge,
          scale: 1,
          duration: 400,
          easing: 'easeOutElastic(1, 0.5)'
        });
      });
    });

    // ==========================================
    // SECTION HEADING — WORD SLIDE-IN
    // ==========================================
    document.querySelectorAll('.section-heading').forEach(heading => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const originalText = heading.textContent;
            const words = originalText.split(' ');
            heading.innerHTML = words.map(w => `<span class="word-wrap"><span class="word">${w}</span></span>`).join(' ');
            heading.querySelectorAll('.word').forEach(w => {
              w.style.display = 'inline-block';
              w.style.opacity = '0';
              w.style.transform = 'translateY(100%)';
            });
            anime({
              targets: heading.querySelectorAll('.word'),
              opacity: [0, 1],
              translateY: ['100%', '0%'],
              delay: anime.stagger(60),
              duration: 700,
              easing: 'easeOutCubic'
            });
            observer.unobserve(heading);
          }
        });
      }, { threshold: 0.3 });
      observer.observe(heading);
    });

    // ==========================================
    // PROJECT LINK ARROW ANIMATION
    // ==========================================
    document.querySelectorAll('.project-link').forEach(link => {
      link.addEventListener('mouseenter', () => {
        anime({
          targets: link.querySelector('svg'),
          translateX: [0, 4],
          translateY: [0, -4],
          duration: 300,
          easing: 'easeOutCubic'
        });
      });
      link.addEventListener('mouseleave', () => {
        anime({
          targets: link.querySelector('svg'),
          translateX: 0,
          translateY: 0,
          duration: 400,
          easing: 'easeOutElastic(1, 0.5)'
        });
      });
    });

    // ==========================================
    // CONTACT FORM — SUBMIT ANIMATION
    // ==========================================
    async function handleSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const btn = form.querySelector('.form-submit');
      const originalText = btn.textContent;

      btn.textContent = 'Sending...';

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('https://api.staticforms.xyz/submit', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          anime({
            targets: btn,
            scale: [1, 0.95],
            duration: 100,
            easing: 'easeOutCubic',
            complete: () => {
              btn.textContent = '✓ Sent!';
              btn.style.background = 'var(--emerald)';
              anime({
                targets: btn,
                scale: [0.95, 1],
                duration: 400,
                easing: 'easeOutElastic(1, 0.6)'
              });
              // Pulse the form
              anime({
                targets: '.contact-form',
                boxShadow: ['0 0 0 0 rgba(16, 185, 129, 0)', '0 0 40px 0 rgba(16, 185, 129, 0.15)', '0 0 0 0 rgba(16, 185, 129, 0)'],
                duration: 1000,
                easing: 'easeOutCubic'
              });
              setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                form.reset();
              }, 3000);
            }
          });
        } else {
          throw new Error('Failed to send message');
        }
      } catch (err) {
        console.error(err);
        btn.textContent = 'Error!';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 3000);
      }
    }

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          // Anime.js smooth scroll
          anime({
            targets: { scrollY: window.scrollY },
            scrollY: top,
            duration: 1000,
            easing: 'easeInOutCubic',
            update: (anim) => {
              window.scrollTo(0, anim.animations[0].currentValue);
            }
          });
        }
      });
    });

    // ==========================================
    // ACTIVE NAV LINK ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current) {
          link.style.color = 'var(--text-primary)';
        }
      });
    });

    // ==========================================
    // CURSOR GLOW (desktop only)
    // ==========================================
    if (window.innerWidth > 768) {
      const glow = document.createElement('div');
      glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;
      `;
      document.body.appendChild(glow);

      document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
      });
    }

    // ==========================================
    // NUMBER COUNTER ANIMATION (process steps)
    // ==========================================
    document.querySelectorAll('.step-number').forEach(num => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: num,
              scale: [0, 1],
              rotate: [-90, 0],
              duration: 600,
              easing: 'easeOutElastic(1, 0.6)'
            });
            observer.unobserve(num);
          }
        });
      }, { threshold: 0.5 });
      observer.observe(num);
    });

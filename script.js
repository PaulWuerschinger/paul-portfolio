/* ========================================
   Paul Wurschinger — Cinematic Portfolio
   ======================================== */

(function () {
  'use strict';

  // =====================
  // PRELOADER
  // =====================
  const preloader = document.getElementById('preloader');
  const preloaderFill = document.getElementById('preloaderFill');

  function runPreloader() {
    let fakeProgress = 0;
    const interval = setInterval(() => {
      fakeProgress += Math.random() * 12 + 3;
      if (fakeProgress >= 85) { clearInterval(interval); }
      preloaderFill.style.width = Math.min(fakeProgress, 85) + '%';
    }, 80);
    Promise.all([
      document.fonts.ready,
      new Promise(resolve => {
        if (document.readyState === 'complete') resolve();
        else window.addEventListener('load', resolve);
      })
    ]).then(() => {
      clearInterval(interval);
      preloaderFill.style.width = '100%';
      setTimeout(() => {
        preloader.classList.add('done');
        document.body.classList.add('loaded');
        triggerHeroReveal();
      }, 400);
    });
  }

  runPreloader();

  // =====================
  // HERO REVEAL (after preloader)
  // =====================
  function triggerHeroReveal() {
    const heroElements = document.querySelectorAll('#hero .reveal-up');
    heroElements.forEach((el) => {
      const delay = parseFloat(el.dataset.delay || 0) * 1000;
      setTimeout(() => el.classList.add('visible'), delay * 0.6);
    });
  }

  // =====================
  // CUSTOM CURSOR
  // =====================
  const cursorDot = document.querySelector('.cursor__dot');
  const cursorRing = document.querySelector('.cursor__ring');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice && cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover state for interactive elements
    const interactiveSelectors = 'a, button, .btn, .work__card, .skill-pill, .social-link, .magnetic';
    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // =====================
  // MAGNETIC HOVER EFFECT
  // =====================
  if (!isTouchDevice) {
    document.querySelectorAll('.magnetic').forEach((el) => {
      const strength = parseFloat(el.dataset.strength) || 15;

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => { el.style.transition = ''; }, 400);
      });
    });
  }

  // =====================
  // SCROLL REVEAL (Intersection Observer)
  // =====================
  // Standard reveal-up elements (not inside text-line, not in hero)
  const revealElements = document.querySelectorAll('.reveal-up:not(#hero .reveal-up):not(.text-line .reveal-up)');
  // Text-line parents — observe the parent, reveal the child
  const textLines = document.querySelectorAll('.text-line:not(#hero .text-line)');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            // If it's a text-line, reveal its child .reveal-up
            const revealChild = target.classList.contains('text-line')
              ? target.querySelector('.reveal-up')
              : target;
            if (revealChild) {
              const delay = parseFloat(revealChild.dataset.delay || 0) * 1000;
              setTimeout(() => revealChild.classList.add('visible'), delay);
              const counter = revealChild.closest('.metric')?.querySelector('[data-count]');
              if (counter) {
                setTimeout(() => animateCounter(counter), delay + 200);
              }
            }
            revealObserver.unobserve(target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
    textLines.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
    textLines.forEach((el) => {
      const child = el.querySelector('.reveal-up');
      if (child) child.classList.add('visible');
    });
  }

  // =====================
  // SCROLL PROGRESS BAR
  // =====================
  const scrollProgressEl = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY / scrollHeight;
    scrollProgressEl.style.width = (scrolled * 100) + '%';
  }

  // =====================
  // NAV SCROLL BEHAVIOR
  // =====================
  const nav = document.getElementById('nav');

  function handleScroll() {
    nav.classList.toggle('nav--scrolled', window.scrollY > 80);
    updateScrollProgress();
    updateSectionDots();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // =====================
  // SECTION DOTS
  // =====================
  const sectionDots = document.querySelectorAll('.section-dot');
  const sections = document.querySelectorAll('[data-section]');

  function updateSectionDots() {
    const scrollY = window.scrollY + window.innerHeight / 2;
    let activeId = 'hero';

    sections.forEach((section) => {
      if (scrollY >= section.offsetTop) {
        activeId = section.id;
      }
    });

    sectionDots.forEach((dot) => {
      dot.classList.toggle('active', dot.dataset.section === activeId);
    });
  }

  sectionDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const target = document.getElementById(dot.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // =====================
  // MOBILE MENU
  // =====================
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.mobile-menu__link').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // =====================
  // COUNTER ANIMATION
  // =====================
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1500;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  // =====================
  // HORIZONTAL SCROLL (Drag to scroll)
  // =====================
  const trackWrap = document.querySelector('.work__track-wrap');

  if (trackWrap) {
    let isDragging = false;
    let startX, scrollLeft;

    trackWrap.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - trackWrap.offsetLeft;
      scrollLeft = trackWrap.scrollLeft;
      trackWrap.style.cursor = 'grabbing';
    });

    trackWrap.addEventListener('mouseleave', () => {
      isDragging = false;
      trackWrap.style.cursor = 'grab';
    });

    trackWrap.addEventListener('mouseup', () => {
      isDragging = false;
      trackWrap.style.cursor = 'grab';
    });

    trackWrap.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - trackWrap.offsetLeft;
      const walk = (x - startX) * 1.5;
      trackWrap.scrollLeft = scrollLeft - walk;
    });

    // Wheel → horizontal scroll
    trackWrap.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        trackWrap.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }

  // =====================
  // SMOOTH ANCHOR SCROLL
  // =====================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const overlay = document.getElementById('transitionOverlay');
        if (overlay) {
          overlay.classList.add('flash');
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            overlay.classList.remove('flash');
          }, 120);
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // =====================
  // PARALLAX BLOBS (subtle mouse movement)
  // =====================
  if (!isTouchDevice) {
    const blobs = document.querySelectorAll('.blob');

    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      blobs.forEach((blob, i) => {
        const speed = (i + 1) * 6;
        blob.style.setProperty('--parallax-x', (x * speed) + 'px');
        blob.style.setProperty('--parallax-y', (y * speed) + 'px');
      });
    });
  }

  // =====================
  // PARTICLE SYSTEM
  // =====================
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let particleMouseX = 0, particleMouseY = 0;

    function resizeCanvas() {
      const hero = document.getElementById('hero');
      if (!hero) return;
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse repulsion
        const dx = this.x - particleMouseX;
        const dy = this.y - particleMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x += (dx / dist) * force * 1.5;
          this.y += (dy / dist) * force * 1.5;
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create particles
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    document.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      particleMouseX = e.clientX - rect.left;
      particleMouseY = e.clientY - rect.top;
    });

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Activate glow ring after preloader
    const heroGlow = document.getElementById('heroGlow');
    if (heroGlow) {
      setTimeout(() => heroGlow.classList.add('active'), 1500);
    }
  }

  // =====================
  // HERO 3D TILT
  // =====================
  const heroContent = document.getElementById('heroContent');
  if (heroContent && !isTouchDevice) {
    document.getElementById('hero')?.addEventListener('mousemove', (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroContent.style.transform = `perspective(1000px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg)`;
    });
    document.getElementById('hero')?.addEventListener('mouseleave', () => {
      heroContent.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
      heroContent.style.transition = 'transform 0.5s var(--ease-out)';
      setTimeout(() => { heroContent.style.transition = ''; }, 500);
    });
  }

})();

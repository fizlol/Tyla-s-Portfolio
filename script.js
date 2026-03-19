/* ═══════════════════════════════════════════════════════════
   Portfolio Script — Minimal & Elegant
═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Custom Cursor ──────────────────────────────────────────
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  // ── Navbar Scroll Effect ───────────────────────────────────
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ── Hamburger Mobile Menu ──────────────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // ── Scroll Reveal ──────────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

  // ── Competency Bar Animations ──────────────────────────────
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const rows = entry.target.querySelectorAll('.comp-row');
        rows.forEach((row, i) => {
          const pct  = row.getAttribute('data-pct');
          const fill = row.querySelector('.comp-fill');
          setTimeout(() => {
            fill.style.width = pct + '%';
          }, i * 120);
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const barsSection = document.querySelector('.competency-bars');
  if (barsSection) barObserver.observe(barsSection);

  // ── Active Nav Link Highlight ──────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link-item');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--gold)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  // ── Typed Greeting in Hero ─────────────────────────────────
  // Subtle: makes the status tag cycle through greetings
  const greetings = [
    'Available for University Intake 2025',
    'Aspiring Fintech Engineer',
    'Open to Collaborations',
    'Based in Singapore 🇸🇬'
  ];
  let gIdx = 0;
  const statusTag = document.querySelector('.hero-tag');

  if (statusTag) {
    setInterval(() => {
      gIdx = (gIdx + 1) % greetings.length;
      statusTag.style.opacity = '0';
      statusTag.style.transform = 'translateY(6px)';
      setTimeout(() => {
        const dot = statusTag.querySelector('.status-dot');
        statusTag.innerHTML = '';
        if (dot) statusTag.appendChild(dot);
        statusTag.appendChild(document.createTextNode(' ' + greetings[gIdx]));
        statusTag.style.opacity = '1';
        statusTag.style.transform = 'translateY(0)';
      }, 350);
    }, 3200);

    statusTag.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
  }

  // ── Skill Pill Hover Sound-Visual Effect ───────────────────
  document.querySelectorAll('.skill-pill').forEach(pill => {
    pill.addEventListener('mouseenter', () => {
      pill.style.transform = 'scale(1.04)';
    });
    pill.addEventListener('mouseleave', () => {
      pill.style.transform = '';
    });
  });

  // ── Project Card Spotlight Effect ─────────────────────────
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.background = `radial-gradient(circle at ${x}% ${y}%, #1a1710 0%, var(--bg-3) 60%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

  // ── Contact Form ───────────────────────────────────────────
  window.handleFormSubmit = function () {
    const name  = document.getElementById('fName').value.trim();
    const email = document.getElementById('fEmail').value.trim();
    const msg   = document.getElementById('fMsg').value.trim();
    const note  = document.getElementById('formNote');

    if (!name || !email || !msg) {
      note.textContent = '⚠ Please fill in all fields.';
      note.style.color = '#e07070';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      note.textContent = '⚠ Please enter a valid email.';
      note.style.color = '#e07070';
      return;
    }

    // In production: replace with EmailJS / Formspree / backend call
    note.textContent = '✓ Message received — I\'ll get back to you soon.';
    note.style.color = 'var(--gold)';
    document.getElementById('fName').value  = '';
    document.getElementById('fEmail').value = '';
    document.getElementById('fMsg').value   = '';
  };

  // ── Keyboard Shortcut: Press 'R' → open resume ─────────────
  document.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'r' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
      window.open('resume.pdf', '_blank');
    }
  });

  // ── Console Easter Egg ─────────────────────────────────────
  console.log('%c👋 Hey there, fellow developer!', 'font-size:18px; font-family:monospace; color:#c8a96e;');
  console.log('%cThanks for inspecting my portfolio. Let\'s connect!', 'font-size:13px; color:#b8b2a8; font-family:monospace;');
  console.log('%c→ github.com/yourusername', 'font-size:12px; color:#7eafc8; font-family:monospace;');

});

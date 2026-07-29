/* ============================================================
   main.js – Progressive enhancement for the academic site
   ============================================================ */

(function () {
  'use strict';

  // ── Sticky header shadow ──────────────────────────────────────────────────
  var header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ── Mobile navigation toggle ──────────────────────────────────────────────
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks  = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Active navigation highlighting on scroll ──────────────────────────────
  var sections = document.querySelectorAll('section[id]');
  var navItems = document.querySelectorAll('.nav-links a');

  function setActiveLink() {
    var scrollY = window.scrollY + 100;

    sections.forEach(function (section) {
      var sectionTop    = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId     = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navItems.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  // ── Scroll-triggered fade-in animations ───────────────────────────────────
  var fadeEls = document.querySelectorAll(
    '.card, .pub-item, .timeline-item, .about-bio p, .about-interests, .contact-info, .contact-form'
  );

  fadeEls.forEach(function (el) {
    el.classList.add('fade-in');
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: make everything visible immediately
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ── Footer – dynamic year ─────────────────────────────────────────────────
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ── Contact form – basic client-side feedback ─────────────────────────────
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      var name    = contactForm.querySelector('#name');
      var email   = contactForm.querySelector('#email');
      var message = contactForm.querySelector('#message');
      var valid   = true;

      [name, email, message].forEach(function (field) {
        if (field && !field.value.trim()) {
          field.style.borderColor = '#ef4444';
          valid = false;
        } else if (field) {
          field.style.borderColor = '';
        }
      });

      if (!valid) {
        e.preventDefault();
        return;
      }

      // Simple email format check
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.style.borderColor = '#ef4444';
        e.preventDefault();
      }
    });
  }

})();

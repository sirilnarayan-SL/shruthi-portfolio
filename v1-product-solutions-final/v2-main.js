// ============================================
// SHRUTHI L V2 — main.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ===== CUSTOM CURSOR =====
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    if (cursor) {
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    }
  });

  function animateTrail() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    if (trail) {
      trail.style.left = trailX + 'px';
      trail.style.top = trailY + 'px';
    }
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // ===== NAV SCROLL =====
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 20);
  });

  // ===== HAMBURGER =====
  const menuBtn = document.getElementById('menuBtn');
  const mobOverlay = document.getElementById('mobOverlay');
  menuBtn?.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    mobOverlay?.classList.toggle('open');
    document.body.style.overflow = mobOverlay?.classList.contains('open') ? 'hidden' : '';
  });
  mobOverlay?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menuBtn?.classList.remove('open');
      mobOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ===== ROTATING WORDS =====
  const words = document.querySelectorAll('.rw');
  if (words.length > 0) {
    let current = 0;
    setInterval(() => {
      words[current].classList.remove('active');
      current = (current + 1) % words.length;
      words[current].classList.add('active');
    }, 2200);
  }

  // ===== SCROLL REVEAL =====
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => revealObserver.observe(el));

  // ===== BENTO CARD TILT =====
  document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
    });
  });

  // ===== PARALLAX FLOATING TAGS =====
  const floatTags = document.querySelectorAll('.float-tag');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    floatTags.forEach(tag => {
      const speed = parseFloat(tag.dataset.speed || 0.3);
      tag.style.transform = `translateY(${scrollY * speed * -0.5}px)`;
    });
  });

  // ===== COLLAGE HOVER =====
  document.querySelectorAll('.collage-img').forEach((img, i) => {
    const rotations = [-2, 3, -1.5];
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'rotate(0deg) scale(1.03)';
      img.style.zIndex = '10';
      img.style.transition = 'transform 0.3s ease, z-index 0s';
    });
    img.addEventListener('mouseleave', () => {
      img.style.transform = `rotate(${rotations[i]}deg) scale(1)`;
      img.style.zIndex = '';
    });
  });

  // ===== CONTACT FORM =====
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const message = document.getElementById('message')?.value || '';
    const topicEl = form.querySelector('input[name="topic"]:checked');
    const topic = topicEl ? topicEl.value : 'Portfolio Inquiry';
    const mailto = `mailto:siri.lnarayan@gmail.com?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(`Hi Shruthi,\n\n${message}\n\n— ${name}\n${email}`)}`;
    window.location.href = mailto;
    const note = document.getElementById('formNote');
    if (note) { note.textContent = '✓ Opening your mail app...'; setTimeout(() => note.textContent = '', 4000); }
  });

  // ===== CERT SCROLL PAUSE ON HOVER =====
  const certTrack = document.querySelector('.cert-scroll-inner');
  certTrack?.addEventListener('mouseenter', () => certTrack.style.animationPlayState = 'paused');
  certTrack?.addEventListener('mouseleave', () => certTrack.style.animationPlayState = 'running');

  // ===== IMAGE LAZY LOAD FADE =====
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', () => img.style.opacity = '1');
    }
  });

});

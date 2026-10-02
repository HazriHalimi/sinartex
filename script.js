if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}

const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  const showHeroPoster = () => heroVideo.classList.add('is-unavailable');
  heroVideo.addEventListener('error', showHeroPoster);
  heroVideo.play().catch(showHeroPoster);
}

const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', isOpen);
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    menuButton.innerHTML = `<i data-lucide="${isOpen ? 'x' : 'menu'}"></i>`;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  });

  mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    menuButton.innerHTML = '<i data-lucide="menu"></i>';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }));
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { 
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); 
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}

// Seamless AJAX Enquiry Submission
document.querySelectorAll('.contact-form').forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const statusEl = form.querySelector('.form-status');
    const originalBtnText = btn ? btn.innerHTML : '';

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = 'Sending...';
    }
    if (statusEl) {
      statusEl.textContent = 'Transmitting your enquiry...';
      statusEl.style.color = '#123e6a';
    }

    try {
      const formData = new FormData(form);
      if (!formData.has('action')) {
        formData.append('action', 'submit_contact');
      }

      const postUrl = form.getAttribute('action') || window.location.href;
      const response = await fetch(postUrl, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        if (statusEl) {
          statusEl.textContent = 'Thank you! Your enquiry has been received by Sinar Tex.';
          statusEl.style.color = '#059669';
        }
        form.reset();
      } else {
        if (statusEl) {
          statusEl.textContent = 'Submission error. Please email us directly.';
          statusEl.style.color = '#d72638';
        }
      }
    } catch (err) {
      if (statusEl) {
        statusEl.textContent = 'Network connection error. Please try again.';
        statusEl.style.color = '#d72638';
      }
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalBtnText;
      }
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }
  });
});

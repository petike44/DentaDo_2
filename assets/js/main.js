// DentaDo main interactions
(function(){
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('[data-nav]');
  const modeToggle = document.querySelector('.mode-toggle');
  const yearSpan = document.getElementById('year');
  const testimonialList = document.getElementById('testimonial-list');
  const bookingForm = document.getElementById('booking-form');
  const toastContainer = document.getElementById('toast-container');

  yearSpan.textContent = new Date().getFullYear();

  // Mobile nav toggle
  navToggle && navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close nav on link click (mobile)
  navMenu.addEventListener('click', (e) => {
    if(e.target.tagName === 'A' && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Dark mode toggle with persistence
  const storedTheme = localStorage.getItem('dentado-theme');
  if(storedTheme === 'dark') document.body.classList.add('dark');
  modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('dentado-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    modeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  });
  modeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';

  // Intersection observer for reveal animations
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.22 });
  revealEls.forEach(el => io.observe(el));

  // Load testimonials
  fetch('assets/data/testimonials.json')
    .then(r => r.json())
      .then(data => {
        testimonialList.setAttribute('aria-busy','false');
        testimonialList.innerHTML = data.map(t => `\n        <article class="testimonial reveal" tabindex="0">\n          <div class="testimonial-header">\n            <img class="testimonial-avatar" src="${t.image}" alt="Photo of ${t.author}" loading="lazy"/>\n            <div><p class="quote">“${t.quote}”</p></div>\n          </div>\n          <div class="author">${t.author} • ${t.service}</div>\n        </article>`).join('');
        testimonialList.querySelectorAll('.testimonial').forEach(el => io.observe(el));
      })
    .catch(err => {
      testimonialList.setAttribute('aria-busy','false');
      testimonialList.innerHTML = '<p>Unable to load testimonials.</p>';
      console.error('Testimonials error', err);
    });

  // Form validation and fake submission
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(bookingForm);
    const errors = [];
    ['name','email','phone','date','service'].forEach(field => {
      if(!formData.get(field)) errors.push(field);
    });
    // Basic email check
    const email = formData.get('email');
    if(email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push('email');

    if(errors.length){
      showToast('Please correct highlighted fields.', 'error');
      errors.forEach(f => {
        const input = bookingForm.querySelector(`[name="${f}"]`);
        if(input){
          input.classList.add('input-error');
          setTimeout(()=> input.classList.remove('input-error'), 2400);
        }
      });
      return;
    }

    // Simulate sending
    bookingForm.querySelector('button[type="submit"]').disabled = true;
    setTimeout(() => {
      bookingForm.reset();
      bookingForm.querySelector('button[type="submit"]').disabled = false;
      showToast('Appointment request submitted!', 'success');
    }, 900);
  });

  function showToast(message, type='info'){
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<span>${message}</span>`;
    toastContainer.appendChild(el);
    setTimeout(()=> {
      el.style.opacity = '0';
      el.style.transform = 'translateY(6px)';
      setTimeout(()=> el.remove(), 420);
    }, 3400);
  }

  // Fallback for team images if broken
  document.querySelectorAll('.person-card img').forEach(img => {
    img.addEventListener('error', () => {
      const fallback = img.getAttribute('data-fallback');
      if(fallback && img.src !== fallback){
        img.src = fallback;
      }
    });
  });

})();

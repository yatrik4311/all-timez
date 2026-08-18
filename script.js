const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

const animateCount = (counter) => {
  const target = Number(counter.dataset.target || 0);
  const suffix = counter.dataset.suffix || '';
  let current = 0;
  const steps = 42;
  const increment = Math.max(target / steps, 1);

  const tick = () => {
    current = Math.min(target, current + increment);
    counter.textContent = `${Math.floor(current)}${suffix}`;

    if (current < target) {
      requestAnimationFrame(tick);
    }
  };

  tick();
};

if ('IntersectionObserver' in window) {
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.querySelectorAll('.count').forEach(animateCount);
    observer.unobserve(entry.target);
    });
  }, { threshold: 0.35 });

  const statsSection = document.querySelector('#skills');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }
} else {
  document.querySelectorAll('.count').forEach(animateCount);
}

document.querySelector('#lead-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const message = [
    'Hi All Timez, I have a kidswear wholesale enquiry.',
    `Name: ${formData.get('name') || ''}`,
    `Email: ${formData.get('email') || ''}`,
    `Phone: ${formData.get('phone') || ''}`,
    `Business Name: ${formData.get('business') || ''}`,
    `Address: ${formData.get('address') || ''}`,
    `Remarks: ${formData.get('remarks') || ''}`,
  ].join('\n');

  window.open(`https://wa.me/919167599272?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

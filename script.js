const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

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

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

const leadForm = document.querySelector('#lead-form');
const showFieldError = (field, message) => {
  const label = field.closest('label');
  let error = label.querySelector('.validation-message');

  if (!error) {
    error = document.createElement('small');
    error.className = 'validation-message';
    label.append(error);
  }

  error.textContent = message;
};

const clearFieldError = (field) => {
  field.closest('label')?.querySelector('.validation-message')?.remove();
};

leadForm?.querySelectorAll('input, textarea').forEach((field) => {
  field.addEventListener('input', () => {
    field.setCustomValidity('');
    clearFieldError(field);
  });
});

leadForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const fields = [...form.querySelectorAll('input, textarea')];

  fields.forEach((field) => {
    field.setCustomValidity('');
    clearFieldError(field);
  });

  const email = form.elements.email.value.trim();
  const phone = form.elements.phone.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d{10}$/;

  if (!emailPattern.test(email)) {
    form.elements.email.setCustomValidity('Please enter a valid email address.');
  }

  if (!phonePattern.test(phone)) {
    form.elements.phone.setCustomValidity('Please enter exactly 10 digits.');
  }

  fields.forEach((field) => {
    if (!field.validity.valid) {
      showFieldError(field, field.validationMessage);
    }
  });

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
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

window.addEventListener('load', () => {
  /*
   * The website is now fully loaded.
   * Start the zipper animation.
   */
  document.body.classList.add('loader-ready');
});
/* =========================================================
   GOOGLE TRANSLATE
   ========================================================= */

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'en',

      includedLanguages:
        'en,hi,gu,mr,bn,ta,te,kn,ml,pa,ur,as,or,sa,ne,sd,kok,mai,doi,brx,mni',

      autoDisplay: false
    },

    'google_translate_element'
  );
}
/* =========================================================
   LOCAL LANGUAGE NAMES
   ========================================================= */

const indianLanguageNames = {
  en: 'English',

  hi: 'हिन्दी',
  gu: 'ગુજરાતી',
  mr: 'मराठी',
  bn: 'বাংলা',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  kn: 'ಕನ್ನಡ',
  ml: 'മലയാളം',
  pa: 'ਪੰਜਾਬੀ',
  ur: 'اردو',
  as: 'অসমীয়া',
  or: 'ଓଡ଼ିଆ',
  sa: 'संस्कृतम्',
  ne: 'नेपाली',
  sd: 'سنڌي',
  kok: 'कोंकणी',
  mai: 'मैथिली',
  doi: 'डोगरी',
  brx: 'बड़ो',
  mni: 'মৈতৈলোন'
};


function localizeGoogleLanguages() {

  const select =
    document.querySelector(
      '#google_translate_element select.goog-te-combo'
    );

  if (!select) return;

  [...select.options].forEach((option) => {

    const code = option.value;

    if (indianLanguageNames[code]) {
      option.textContent =
        indianLanguageNames[code];
    }

  });
}
const googleTranslateObserver =
  new MutationObserver(() => {

    localizeGoogleLanguages();

  });

googleTranslateObserver.observe(
  document.body,
  {
    childList: true,
    subtree: true
  }
);


/* Initial attempts */
setTimeout(localizeGoogleLanguages, 500);
setTimeout(localizeGoogleLanguages, 1000);
setTimeout(localizeGoogleLanguages, 2000);
/* =========================================================
   REMOVE GOOGLE TRANSLATE TOP BAR
   ========================================================= */

function removeGoogleTranslateBar() {

  /* Remove the Google banner iframe */
  document
    .querySelectorAll(
      'iframe.goog-te-banner-frame, .goog-te-banner-frame'
    )
    .forEach((element) => {

      element.remove();

    });


  /* Google sometimes creates a skiptranslate wrapper */
  document
    .querySelectorAll(
      'body > .skiptranslate'
    )
    .forEach((element) => {

      if (
        element.querySelector(
          'iframe.goog-te-banner-frame'
        )
      ) {
        element.remove();
      }

    });


  /* Google moves body down using inline style */
  document.body.style.setProperty(
    'top',
    '0px',
    'important'
  );

  document.body.style.setProperty(
    'margin-top',
    '0px',
    'important'
  );

  document.body.style.setProperty(
    'position',
    'static',
    'important'
  );
}
const googleBarObserver =
  new MutationObserver(() => {

    removeGoogleTranslateBar();

  });

googleBarObserver.observe(
  document.documentElement,
  {
    childList: true,
    subtree: true,
    attributes: true
  }
);


/* Keep checking after Google translation */
removeGoogleTranslateBar();

setTimeout(removeGoogleTranslateBar, 100);
setTimeout(removeGoogleTranslateBar, 500);
setTimeout(removeGoogleTranslateBar, 1000);
setTimeout(removeGoogleTranslateBar, 2000);
setTimeout(removeGoogleTranslateBar, 4000);

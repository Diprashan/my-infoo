// ============== NAVBAR ==============
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section');
const header = document.querySelector('.header');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

navLinks.forEach(link => {
    link.onclick = () => {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    }
});

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
        }
    });

    header.classList.toggle('sticky', window.scrollY > 100);
};

// ============== EMAILJS ==============
const EMAILJS_PUBLIC_KEY  = 'nVxlGY3HF_qznfaPa';
const EMAILJS_SERVICE_ID  = 'service_zgo24dd';
const EMAILJS_TEMPLATE_ID = 'template_6k52zwk';

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const phone   = document.getElementById('phone').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const errorEl = document.getElementById('error-msg');

  if (!name || !email || !phone || !subject || !message) {
    errorEl.style.color = 'red';
    errorEl.textContent = 'Please fill in all fields.';
    return;
  }

  const submitBtn = document.querySelector('input[type="submit"]');
  submitBtn.value    = 'Sending...';
  submitBtn.disabled = true;
  errorEl.textContent = '';

  const templateParams = {
    from_name:  name,
    from_email: email,
    phone:      phone,
    subject:    subject,
    message:    message,
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      errorEl.style.color = 'green';
      errorEl.textContent = '✅ Message sent! I\'ll get back to you soon.';
      submitBtn.value     = 'Send Message';
      submitBtn.disabled  = false;
      document.getElementById('contactForm').reset();
    })
    .catch((err) => {
      console.error('EmailJS Error:', err);
      errorEl.style.color = 'red';
      errorEl.textContent = '❌ Something went wrong. Please try again.';
      submitBtn.value     = 'Send Message';
      submitBtn.disabled  = false;
    });
});


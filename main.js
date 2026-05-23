navLinks.forEach(link => {
    link.onclick = () => {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    }
});
let offset = sec.offsetTop - 100;
// ============================================================
// STEP 1: Paste this <script> tag in your HTML <head>
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
//
// STEP 2: Replace the 3 values below with your EmailJS credentials
// ============================================================

const EMAILJS_PUBLIC_KEY  = 'nVxlGY3HF_qznfaPa';    // Account tab on emailjs.com
const EMAILJS_SERVICE_ID  = 'service_zgo24dd';    // Email Services tab
const EMAILJS_TEMPLATE_ID = 'template_6k52zwk';  // Email Templates tab

// ============================================================

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const phone   = document.getElementById('phone').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const errorEl = document.getElementById('error-msg');

  // Basic validation
  if (!name || !email || !phone || !subject || !message) {
    errorEl.style.color = 'red';
    errorEl.textContent = 'Please fill in all fields.';
    return;
  }

  const submitBtn = document.querySelector('input[type="submit"]');
  submitBtn.value    = 'Sending...';
  submitBtn.disabled = true;
  errorEl.textContent = '';

  // These variable names must match your EmailJS template
  const templateParams = {
    from_name:  name,
    from_email: email,
    phone:      phone,
    subject:    subject,
    message:    message,
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      errorEl.style.color   = 'green';
      errorEl.textContent   = '✅ Message sent! I\'ll get back to you soon.';
      submitBtn.value       = 'Send Message';
      submitBtn.disabled    = false;
      document.getElementById('contactForm').reset();
    })
    .catch((err) => {
      console.error('EmailJS Error:', err);
      errorEl.style.color   = 'red';
      errorEl.textContent   = '❌ Something went wrong. Please try again.';
      submitBtn.value       = 'Send Message';
      submitBtn.disabled    = false;
    });
});

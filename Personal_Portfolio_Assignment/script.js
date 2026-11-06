// Mobile navigation, scroll reveal, active links and demo contact form.
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

// Reveal sections gently as they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));

// Highlight the navigation link for the current section.
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(anchor => {
        anchor.classList.toggle('active', anchor.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => sectionObserver.observe(section));

document.getElementById('year').textContent = new Date().getFullYear();

// This assignment form is front-end only. It opens the visitor's email app.
document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value;
  const message = form.message.value.trim();
  const recipient = 'your.email@example.com'; // Replace with your real email.
  const body = `Name: ${name}%0AEmail: ${email}%0ATopic: ${subject}%0A%0A${encodeURIComponent(message)}`;
  document.getElementById('formHint').textContent = 'Your email app should open. Replace the demo email address in script.js with your own.';
  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent('Portfolio enquiry: ' + subject)}&body=${body}`;
});

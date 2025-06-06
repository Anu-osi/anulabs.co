const typed = new Typed('#typed-text', {
  strings: [
    "Cybersecurity Professional",
    "IT Support Expert",
    "IoT Intern - Virus Mitigation",
    "TryHackMe Top 1.5%",
    "Future AI-infused Security Founder"
  ],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true
});
// Typed.js already here

// Toggle Mode
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('mode-toggle');
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    toggle.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
  });
});

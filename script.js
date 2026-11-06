const menu = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');

const closeMenu = () => { navbar.classList.remove('active'); menu.setAttribute('aria-expanded', 'false'); menu.className = 'fa-solid fa-bars'; };
menu.onclick = () => {
  const open = navbar.classList.toggle('active');
  menu.setAttribute('aria-expanded', open);
  menu.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
};
navbar.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

// header shadow + active link
const links = [...navbar.querySelectorAll('a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
addEventListener('scroll', () => {
  header.classList.toggle('scrolled', scrollY > 20);
  const y = scrollY + innerHeight * 0.35;
  sections.forEach((s, i) => links[i].classList.toggle('current', s.offsetTop <= y && s.offsetTop + s.offsetHeight > y));
}, { passive: true });

if (window.Typed) new Typed('.multiple-text', { strings: ['smart.', 'safe.', 'with us.'], typeSpeed: 80, backSpeed: 60, backDelay: 1200, loop: true });

// Paste your Google Apps Script "Web app URL" here (ends with /exec)
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzKAwEzPprPq1NzXgjbX9_dUyVUizJnHD_L7ipaebjpAonx9IcKdk5mzY9yrS_X9Wk/exec';

const form = document.querySelector('#registrationForm');
const status = document.querySelector('#formStatus');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button'); btn.disabled = true;
  status.className = 'form-status';
  try {
    if (SHEET_URL.includes('PASTE_YOUR')) throw new Error('Google Sheets URL not set in script.js');
    // no-cors: Google doesn't let the browser read its reply, so we can only confirm the request was sent
    await fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(new FormData(form)) });
    status.textContent = "You're registered. We'll call you soon.";
    status.classList.add('ok'); form.reset();
  } catch (err) { status.textContent = String(err.message).includes('URL not set') ? 'Form not connected yet: add your Google Sheets URL in script.js.' : 'Could not send. Check your connection and try again.'; status.classList.add('err'); }
  btn.disabled = false;
});

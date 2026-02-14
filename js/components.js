/* ===== DYNAMIC COMPONENT LOADER ===== */

document.addEventListener('DOMContentLoaded', () => {
  loadComponent('header-placeholder', 'components/header.html', setActiveNav);
  loadComponent('footer-placeholder', 'components/footer.html');
  initHeaderScroll();
});

function loadComponent(placeholderId, url, callback) {
  const el = document.getElementById(placeholderId);
  if (!el) return;
  fetch(url)
    .then(res => res.text())
    .then(html => {
      el.innerHTML = html;
      if (callback) callback();
    })
    .catch(err => console.warn('Component load error:', err));
}

function setActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  const pageName = path.replace('.html', '') || 'index';
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    const linkPage = link.getAttribute('data-page');
    if (linkPage === pageName) {
      link.classList.add('active');
    }
  });
}

function initHeaderScroll() {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const header = document.getElementById('site-header');
        if (header) {
          header.classList.toggle('scrolled', window.scrollY > 50);
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

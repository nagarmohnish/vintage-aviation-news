// ===== Mobile Navigation Toggle =====
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', navList.classList.contains('active'));
    });
  }

  // Close mobile nav when clicking outside
  document.addEventListener('click', (e) => {
    if (navList && navList.classList.contains('active') && !e.target.closest('.main-nav')) {
      navList.classList.remove('active');
    }
  });

  // ===== Back to Top Button =====
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== News Ticker Animation =====
  const tickerContent = document.querySelector('.ticker-content');
  if (tickerContent) {
    const headlines = [
      'The Persistent Dream of Victory from the Air: From Giulio Douhet to the Modern Era',
      'Today In Aviation History: First Flight of the Temco TT Pinto',
      'Lockheed VC-121A "MacArthur Bataan" to Join SUN \'n FUN',
      'Behind the Hangar Doors: Exploring Shuttleworth\'s Engineering Open Workshop'
    ];
    let currentIndex = 0;

    setInterval(() => {
      currentIndex = (currentIndex + 1) % headlines.length;
      tickerContent.style.opacity = '0';
      setTimeout(() => {
        const link = tickerContent.querySelector('a');
        if (link) {
          link.textContent = headlines[currentIndex];
        }
        tickerContent.style.opacity = '1';
      }, 300);
    }, 5000);

    tickerContent.style.transition = 'opacity 0.3s';
  }

  // ===== Active Nav Highlighting =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-list > li > a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || (currentPage === 'index.html' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  // ===== Search Form =====
  const searchForms = document.querySelectorAll('.header-search, .search-widget');
  searchForms.forEach(form => {
    const input = form.querySelector('input');
    const button = form.querySelector('button');
    if (input && button) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        if (input.value.trim()) {
          alert('Search for: ' + input.value.trim() + '\n(Search functionality would connect to a backend)');
        }
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          button.click();
        }
      });
    }
  });
});

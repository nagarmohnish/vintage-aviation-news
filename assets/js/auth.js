// ===== Auth State Management =====
const AUTH_KEY = 'stb_user';

function getUser() {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function setUser(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = getBasePath() + 'index.html';
}

function isLoggedIn() {
  return getUser() !== null;
}

function getBasePath() {
  const path = window.location.pathname;
  if (path.includes('/pages/')) {
    return '../';
  }
  return '';
}

function demoLogin(name, email) {
  const user = {
    name: name || 'Demo User',
    email: email || 'demo@example.com',
    plan: 'free',
    price: '$0',
    billingCycle: 'N/A',
    nextBilling: 'N/A',
    memberSince: new Date().toISOString(),
    paymentMethod: 'None'
  };
  setUser(user);
  return user;
}

function subscribeToPlan(planName, price) {
  const user = getUser();
  if (!user) return false;

  const now = new Date();
  const nextBilling = new Date(now);
  nextBilling.setMonth(nextBilling.getMonth() + 1);

  user.plan = planName.toLowerCase();
  user.price = price;
  user.billingCycle = 'Monthly';
  user.nextBilling = nextBilling.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  user.paymentMethod = 'Visa ending in 4242';
  setUser(user);
  return true;
}

function cancelSubscription() {
  const user = getUser();
  if (!user) return false;

  user.plan = 'cancelled';
  user.price = '$0';
  user.billingCycle = 'N/A';
  user.nextBilling = 'N/A';
  user.paymentMethod = 'None';
  setUser(user);
  return true;
}

function requireAuth() {
  if (!isLoggedIn()) {
    const base = getBasePath();
    const currentPage = encodeURIComponent(window.location.href);
    window.location.href = base + 'pages/login.html?redirect=' + currentPage;
    return false;
  }
  return true;
}

function getRedirectUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('redirect') || (getBasePath() + 'index.html');
}

function getUserInitial(user) {
  if (!user || !user.name) return '?';
  return user.name.charAt(0).toUpperCase();
}

// ===== Dynamic Nav Auth UI Injection =====
function initAuthUI() {
  const navList = document.querySelector('.nav-list');
  if (!navList) return;

  // Remove any existing auth items
  const existing = navList.querySelectorAll('.nav-auth-item');
  existing.forEach(el => el.remove());

  const user = getUser();
  const base = getBasePath();

  if (!user) {
    // Logged out state
    const signInLi = document.createElement('li');
    signInLi.className = 'nav-auth-item';
    signInLi.innerHTML = `<a href="${base}pages/login.html" class="nav-auth-btn nav-signin">Sign In</a>`;

    const subscribeLi = document.createElement('li');
    subscribeLi.className = 'nav-auth-item';
    subscribeLi.innerHTML = `<a href="${base}pages/subscribe.html" class="nav-auth-btn nav-subscribe">Subscribe</a>`;

    navList.appendChild(signInLi);
    navList.appendChild(subscribeLi);
  } else {
    // Logged in state
    const userLi = document.createElement('li');
    userLi.className = 'nav-auth-item nav-user-menu';
    userLi.innerHTML = `
      <button class="nav-user-toggle" aria-expanded="false">
        <span class="nav-avatar">${getUserInitial(user)}</span>
        <span class="nav-username">${user.name}</span>
        <span class="arrow">&#9662;</span>
      </button>
      <div class="dropdown nav-user-dropdown">
        <a href="${base}pages/subscription.html">
          <i class="fas fa-credit-card"></i> My Subscription
        </a>
        <a href="#" onclick="logout(); return false;">
          <i class="fas fa-sign-out-alt"></i> Sign Out
        </a>
      </div>
    `;
    navList.appendChild(userLi);

    // Toggle dropdown
    const toggle = userLi.querySelector('.nav-user-toggle');
    const dropdown = userLi.querySelector('.nav-user-dropdown');
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('show');
      dropdown.classList.toggle('show');
      toggle.setAttribute('aria-expanded', !isOpen);
    });

    document.addEventListener('click', () => {
      dropdown.classList.remove('show');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }
}

// Auto-init on DOM ready
document.addEventListener('DOMContentLoaded', initAuthUI);

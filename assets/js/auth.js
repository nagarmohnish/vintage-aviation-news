// ===== Auth State Management =====
const AUTH_KEY = 'van_user';
const SSO_SHOWN_KEY = 'van_sso_shown';

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
  window.location.reload();
}

function isLoggedIn() {
  return getUser() !== null;
}

function getBasePath() {
  const path = window.location.pathname;
  if (path.includes('/pages/')) return '../';
  return '';
}

function getUserInitial(user) {
  if (!user || !user.name) return '?';
  return user.name.charAt(0).toUpperCase();
}

// ===== SSO Popup =====
var ssoBackdrop = null;

function openSSOPopup() {
  if (ssoBackdrop) return;
  ssoBackdrop = document.createElement('div');
  ssoBackdrop.className = 'van-sso-backdrop';
  ssoBackdrop.innerHTML = `
    <div class="van-sso-popup">
      <button class="van-sso-close" id="vanSsoClose">&times;</button>
      <div class="van-sso-logo">
        <svg width="46" height="46" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
      </div>
      <h2 class="van-sso-title">Sign in to continue</h2>
      <p class="van-sso-subtitle">Choose your Google account</p>
      <div class="van-sso-accounts" id="vanSsoAccounts">
        <button class="van-sso-account" data-name="Mohnish Nagar" data-email="mohnish.nagar@gmail.com">
          <span class="van-sso-avatar" style="background:#4285f4;">M</span>
          <div class="van-sso-account-info">
            <span class="van-sso-account-name">Mohnish Nagar</span>
            <span class="van-sso-account-email">mohnish.nagar@gmail.com</span>
          </div>
          <span class="van-sso-arrow">&#8250;</span>
        </button>
        <button class="van-sso-account" data-name="Mohnish" data-email="mohnish@getmega.com">
          <span class="van-sso-avatar" style="background:#EA4335;">M</span>
          <div class="van-sso-account-info">
            <span class="van-sso-account-name">Mohnish</span>
            <span class="van-sso-account-email">mohnish@getmega.com</span>
          </div>
          <span class="van-sso-arrow">&#8250;</span>
        </button>
      </div>
      <div class="van-sso-divider"><span>Use email instead</span></div>
      <button class="van-sso-email-btn" id="vanSsoEmailBtn">Continue with email</button>
    </div>
  `;
  document.body.appendChild(ssoBackdrop);
  document.body.style.overflow = 'hidden';

  // Close on backdrop click
  ssoBackdrop.addEventListener('click', function(e) {
    if (e.target === ssoBackdrop) closeSSOPopup();
  });

  // Close button
  ssoBackdrop.querySelector('#vanSsoClose').addEventListener('click', closeSSOPopup);

  // Account selection
  ssoBackdrop.querySelectorAll('.van-sso-account').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var name = btn.getAttribute('data-name');
      var email = btn.getAttribute('data-email');
      ssoLogin(name, email);
    });
  });

  // Email button -> navigate to login page
  ssoBackdrop.querySelector('#vanSsoEmailBtn').addEventListener('click', function() {
    closeSSOPopup();
    window.location.href = getBasePath() + 'pages/login.html';
  });
}

function closeSSOPopup() {
  if (!ssoBackdrop) return;
  ssoBackdrop.remove();
  ssoBackdrop = null;
  document.body.style.overflow = '';
}

function ssoLogin(name, email) {
  var user = {
    name: name,
    email: email,
    plan: 'free',
    price: '$0',
    billingCycle: 'N/A',
    nextBilling: 'N/A',
    memberSince: new Date().toISOString(),
    paymentMethod: 'Google SSO'
  };
  setUser(user);
  closeSSOPopup();
  initAuthUI();
}

// Close SSO on Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeSSOPopup();
});

// ===== Support Button -> Navigate to Support Landing Page =====
function openSupportPage() {
  var base = window.location.pathname;
  if (base.includes('/pages/')) {
    window.location.href = '../support/';
  } else {
    window.location.href = 'support/';
  }
}

// ===== Dynamic Nav Auth UI Injection =====
function initAuthUI() {
  const navList = document.querySelector('.nav-list');
  if (!navList) return;

  // Remove any existing auth items
  const existing = navList.querySelectorAll('.nav-auth-item');
  existing.forEach(el => el.remove());

  const user = getUser();

  if (!user) {
    // Sign In button
    const signInLi = document.createElement('li');
    signInLi.className = 'nav-auth-item';
    signInLi.innerHTML = '<a href="#" class="nav-auth-btn nav-signin" id="navSignIn">Sign In</a>';
    navList.appendChild(signInLi);
    signInLi.querySelector('#navSignIn').addEventListener('click', function(e) {
      e.preventDefault();
      openSSOPopup();
    });

    // Support button
    const supportLi = document.createElement('li');
    supportLi.className = 'nav-auth-item';
    supportLi.innerHTML = '<a href="#" class="nav-auth-btn nav-subscribe" id="navSupport">Support</a>';
    navList.appendChild(supportLi);
    supportLi.querySelector('#navSupport').addEventListener('click', function(e) {
      e.preventDefault();
      openSupportPage();
    });
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
        <a href="#" id="navSupportLoggedIn">
          <i class="fas fa-heart"></i> Support VAN
        </a>
        <a href="${getBasePath()}pages/subscription.html">
          <i class="fas fa-credit-card"></i> My Subscription
        </a>
        <a href="#" id="navLogout">
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
      dropdown.classList.toggle('show');
      toggle.setAttribute('aria-expanded', dropdown.classList.contains('show'));
    });

    document.addEventListener('click', () => {
      dropdown.classList.remove('show');
      toggle.setAttribute('aria-expanded', 'false');
    });

    // Support link in dropdown
    userLi.querySelector('#navSupportLoggedIn').addEventListener('click', function(e) {
      e.preventDefault();
      dropdown.classList.remove('show');
      openSupportPage();
    });

    // Logout
    userLi.querySelector('#navLogout').addEventListener('click', function(e) {
      e.preventDefault();
      logout();
    });
  }
}

// ===== Auto-show SSO popup after 3.5 seconds (once per session) =====
function maybeShowSSOPopup() {
  if (isLoggedIn()) return;
  if (sessionStorage.getItem(SSO_SHOWN_KEY)) return;
  sessionStorage.setItem(SSO_SHOWN_KEY, '1');
  setTimeout(function() {
    if (!isLoggedIn() && !ssoBackdrop) {
      openSSOPopup();
    }
  }, 3500);
}

// ===== Legacy helpers for login page =====
function demoLogin(name, email) {
  ssoLogin(name || 'Demo User', email || 'demo@example.com');
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
  user.nextBilling = nextBilling.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
    openSSOPopup();
    return false;
  }
  return true;
}

function getRedirectUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('redirect') || (getBasePath() + 'index.html');
}

// Auto-init on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  initAuthUI();
  maybeShowSSOPopup();
});

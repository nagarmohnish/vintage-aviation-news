const fs = require('fs');

const css1 = fs.readFileSync('assets/css/style.css', 'utf8');
const css2 = fs.readFileSync('assets/css/auth-styles.css', 'utf8');
const goAdFreeJS = fs.readFileSync('assets/js/go-ad-free.js', 'utf8');

const b = (c, t) => `<span class="category-badge badge-${c}">${t}</span>`;
const card = (i, cats, title) => `<a href="#" class="card"><div class="card-img"><div class="placeholder-img img-${i}"></div><div class="categories">${cats}</div></div><div class="card-body"><h4>${title}</h4></div></a>`;
const ai = (i, cats, title, ex, auth, dt) => `<div class="article-item"><div class="article-thumb"><div class="placeholder-img img-${i}"></div></div><div class="article-content"><div class="categories">${cats}</div><h3>${title}</h3><p class="excerpt">${ex}</p><div class="meta"><span>${auth}</span><span class="dot"></span><span>${dt}</span></div></div></div>`;

let out = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Vintage Aviation News - Complete</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<style>
${css1}
${css2}
.tab-bar{background:#1a1a1a;position:sticky;top:0;z-index:2000;overflow-x:auto;white-space:nowrap}
.tab-buttons{display:flex;max-width:1280px;margin:0 auto;padding:0 10px}
.tab-btn{background:none;border:none;color:#aaa;padding:12px 16px;font-family:'Inter',sans-serif;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;transition:all .2s;border-bottom:2px solid transparent}
.tab-btn:hover{color:#fff}.tab-btn.active{color:#fff;border-bottom-color:#c0392b}
.tab-view{display:none}.tab-view.active{display:block}
.contact-form{max-width:600px}.contact-form .form-group{margin-bottom:20px}
.contact-form label{display:block;font-weight:600;margin-bottom:6px;font-size:14px}
.contact-form input,.contact-form textarea,.contact-form select{width:100%;padding:12px 16px;border:1px solid var(--border);border-radius:4px;font-family:var(--font-main);font-size:14px;outline:none}
.contact-form textarea{min-height:150px;resize:vertical}
.contact-form button[type=submit]{background:var(--primary);color:#fff;border:none;padding:12px 30px;font-size:15px;font-weight:600;border-radius:4px;cursor:pointer}
.sf-auth-area{display:flex;align-items:center;gap:10px}
</style>
</head>
<body>

<div class="tab-bar"><div class="tab-buttons">
<button class="tab-btn active" data-tab="home">Home</button>
<button class="tab-btn" data-tab="restorations">Restorations</button>
<button class="tab-btn" data-tab="warbirds">Warbirds News</button>
<button class="tab-btn" data-tab="vintage">Vintage</button>
<button class="tab-btn" data-tab="articles">Articles</button>
<button class="tab-btn" data-tab="museum">Museum News</button>
<button class="tab-btn" data-tab="login">Login</button>
<button class="tab-btn" data-tab="subscribe">Subscribe</button>
<button class="tab-btn" data-tab="subscription">Subscription</button>
<button class="tab-btn" data-tab="contact">Contact</button>
</div></div>

<header class="site-header"><div class="container header-top">
<div class="social-icons"><a href="#"><i class="fab fa-facebook-f"></i></a><a href="#"><i class="fab fa-twitter"></i></a><a href="#"><i class="fab fa-youtube"></i></a><a href="#"><i class="fab fa-instagram"></i></a></div>
<div class="site-logo"><a href="#" onclick="switchTab('home');return false;"><div class="logo-text"><span class="vintage">Vintage</span><span class="aviation">Aviation</span><span class="news">News</span></div></a></div>
<div class="sf-auth-area" id="sfAuthArea"></div>
<div class="header-search"><input type="text" placeholder="Search Headlines, News..."><button><i class="fas fa-arrow-circle-right"></i></button></div>
</div></header>

<div class="news-ticker"><div class="container ticker-inner">
<div class="ticker-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> Latest News</div>
<div class="ticker-content"><a href="#">The Persistent Dream of Victory from the Air: From Giulio Douhet to the Modern Era</a></div>
<span class="ticker-arrow">&rarr;</span>
<div class="ticker-links"><a href="#">Youtube</a><span>-</span><a href="#">Newsletter</a><span>-</span><a href="#">Events</a></div>
</div></div>

<!-- HOME -->
<div class="tab-view active" id="tab-home">
<section class="hero-section"><div class="container"><div class="hero-grid">
<a href="#" class="hero-main"><div class="placeholder-img img-1">Douhet</div><div class="overlay"><div class="categories">${b('articles','Articles')}${b('aviation-history','Aviation History')}</div><h2>The Persistent Dream of Victory from the Air: From Giulio Douhet to the Modern Era</h2><p class="excerpt">The theory of victory through airpower dates back to Giulio Douhet in 1921.</p><div class="meta"><span>Kevin Wilkins</span><span class="dot"></span><span>March 27, 2026</span></div></div></a>
<a href="#" class="hero-side"><div class="placeholder-img img-2">TT Pinto</div><div class="overlay"><div class="categories">${b('articles','Articles')}${b('today-history','Today in Aviation History')}</div><h3>Today In Aviation History: First Flight of the Temco TT Pinto</h3><div class="meta" style="color:rgba(255,255,255,0.8)"><span>Austin Hancock</span><span class="dot"></span><span>March 26, 2026</span></div></div></a>
</div></div></section>
<section class="featured-row"><div class="container"><div class="featured-grid">
<a href="#" class="featured-card"><div class="placeholder-img img-3">VC-121A</div><div class="overlay"><div class="categories">${b('airshow','Airshow')}${b('warbirds','Warbirds')}</div><h4>Lockheed VC-121A MacArthur Bataan to Join SUN n FUN</h4></div></a>
<a href="#" class="featured-card"><div class="placeholder-img img-4">Gatow</div><div class="overlay"><div class="categories">${b('museum','Museum News')}</div><h4>Berlin-Gatow Aviation Museum</h4></div></a>
<a href="#" class="featured-card"><div class="placeholder-img img-5">T-34C</div><div class="overlay"><div class="categories">${b('flight-test','Flight Test')}</div><h4>Flight Test: T-34C Mentor</h4></div></a>
<a href="#" class="featured-card"><div class="placeholder-img img-8">Ryan</div><div class="overlay"><div class="categories">${b('vintage','Vintage')}</div><h4>Randy Vintage Profiles: Ryan ST-A</h4></div></a>
</div></div></section>
<div class="container"><div class="ad-row"><div class="ad-banner"><div class="ad-banner-placeholder">GOSSHAWK UNLIMITED</div></div><div class="ad-banner"><div class="ad-banner-placeholder">FUEL THE FUTURE</div></div></div></div>
<section class="section"><div class="container">
<div class="section-header"><h2>Restorations</h2><div class="line"></div></div>
<div class="card-grid-5">${card('3',b('restorations','Restorations'),'S-3B Viking for Static Display')}${card('4',b('restorations','Restorations'),'Vintage Flying Museum Workday')}${card('5',b('restorations','Restorations'),'Piper L-4H Restoration Report')}${card('9',b('restorations','Restorations'),'CF-104 Starfighter')}${card('10',b('restorations','Restorations'),'B-17 Restoration in Oregon')}</div>
<div class="section-header"><h2>Aviation Museum News</h2><div class="line"></div></div>
<div class="card-grid-5">${card('4',b('museum','Museum'),'Berlin-Gatow Cold War Airfield')}${card('5',b('museum','Museum'),'Mighty Eighth Reaches $18.3M')}${card('9',b('museum','Museum'),'Warbird Fly-In Chipmunk')}${card('1',b('museum','Museum'),'Air Zoo Spring Break Programs')}${card('2',b('museum','Museum'),'RAAF P-3 Orion Evans Head')}</div>
<div class="section-header"><h2>Today in Aviation History</h2><div class="line"></div></div>
<div class="card-grid-5">${card('2',b('today-history','Today'),'First Flight: Temco TT Pinto')}${card('3',b('today-history','Today'),'First Flight: Ilyushin IL-76')}${card('6',b('today-history','Today'),'Capt Trollope: 6 Aircraft in One Day')}${card('7',b('today-history','Today'),'Launch of Gemini III')}${card('8',b('today-history','Today'),'Valmet PIK-23 Towmaster')}</div>
</div></section></div>

<!-- RESTORATIONS -->
<div class="tab-view" id="tab-restorations">
<div class="page-header"><div class="container"><div class="breadcrumb">Home &gt; Restorations</div><h1>Restorations</h1><p>Explore the latest vintage aircraft restorations from around the world.</p></div></div>
<section class="section"><div class="container"><div class="article-list">
${ai('3',b('restorations','Restorations'),'S-3B Viking for Static Display','The National POW/MIA Memorial has unveiled a restored S-3B Viking...','Guest Author','March 19, 2026')}
${ai('5',b('restorations','Restorations'),'Piper L-4H Restoration Report','AirCorps Aviation continues restoration work...','Richard Mallory Allnutt','March 18, 2026')}
${ai('9',b('restorations','Restorations'),'CF-104 Starfighter','The KF Centre for Excellence...','Stephen Chapis','March 16, 2026')}
</div><div class="pagination"><span class="active">1</span><a href="#">2</a><span class="dots">...</span><a href="#">81</a></div></div></section></div>

<!-- WARBIRDS -->
<div class="tab-view" id="tab-warbirds">
<div class="page-header"><div class="container"><div class="breadcrumb">Home &gt; Warbirds News</div><h1>Warbirds News</h1><p>Updates on classic aircraft and flying collections.</p></div></div>
<section class="section"><div class="container"><div class="article-list">
${ai('3',b('airshow','Airshow')+b('warbirds','Warbirds'),'VC-121A MacArthur Bataan to Join SUN n FUN','One of only two airworthy Constellations...','Moreno Aguiari','March 26, 2026')}
${ai('5',b('warbirds','Warbirds'),'B-29 DOC Returns to St. Louis Air Show','Will return to the Spirit of St. Louis Air Show...','Amreetam Basu','March 25, 2026')}
${ai('9',b('warbirds','Warbirds'),'CAC Boomerang A46-54 Flies Again After 81 Years','Returned to flight after 81 years...','John Parker','March 23, 2026')}
</div><div class="pagination"><span class="active">1</span><a href="#">2</a><span class="dots">...</span><a href="#">182</a></div></div></section></div>

<!-- VINTAGE -->
<div class="tab-view" id="tab-vintage">
<div class="page-header"><div class="container"><div class="breadcrumb">Home &gt; Vintage Aviation</div><h1>Vintage Aviation</h1><p>Updates on antique aircraft and classic airplanes.</p></div></div>
<section class="cat-featured"><div class="container"><div class="cat-featured-grid">
<a href="#" class="cat-featured-main"><div class="placeholder-img img-9">Shuttleworth</div><div class="overlay"><div class="categories">${b('vintage','Vintage')}</div><h3>Behind the Hangar Doors: Shuttleworth Engineering Workshop</h3><div class="meta" style="color:rgba(255,255,255,0.8)"><span>Moreno Aguiari</span><span class="dot"></span><span>March 27, 2026</span></div></div></a>
<div class="cat-featured-side"><div class="card-img"><div class="placeholder-img img-8"></div></div><div class="card-body"><div class="categories">${b('vintage','Vintage')}</div><h4>Randy Vintage Profiles: Ryan ST-A Special</h4><div class="meta"><span>March 25, 2026</span></div></div></div>
<div class="cat-featured-side"><div class="card-img"><div class="placeholder-img img-2"></div></div><div class="card-body"><div class="categories">${b('vintage','Vintage')}</div><h4>Last Captain of a VIP Boeing 727</h4><div class="meta"><span>March 19, 2026</span></div></div></div>
</div></div></section></div>

<!-- ARTICLES -->
<div class="tab-view" id="tab-articles">
<div class="page-header"><div class="container"><div class="breadcrumb">Home &gt; Articles</div><h1>Articles</h1><p>In-depth articles on aviation history and legendary aircraft.</p></div></div>
<section class="section"><div class="container"><div class="article-list">
${ai('1',b('articles','Articles')+b('aviation-history','History'),'Persistent Dream of Victory from the Air','Theory of victory through airpower dates back to 1921...','Kevin Wilkins','March 27, 2026')}
${ai('5',b('flight-test','Flight Test')+b('articles','Articles'),'Flight Test: T-34C Mentor','Rugged bridge to the jet age...','Kapil Kajal','March 23, 2026')}
${ai('7',b('grounded','Grounded Dreams')+b('articles','Articles'),'Saab 210 Lilldraken: 70% Scale Proof of Concept','Tested double-delta wing design...','Kapil Kajal','March 23, 2026')}
</div><div class="pagination"><span class="active">1</span><a href="#">2</a><span class="dots">...</span><a href="#">108</a></div></div></section></div>

<!-- MUSEUM -->
<div class="tab-view" id="tab-museum">
<div class="page-header"><div class="container"><div class="breadcrumb">Home &gt; Museum News</div><h1>Aviation Museum News</h1><p>Latest news from aviation museums worldwide.</p></div></div>
<section class="section"><div class="container"><div class="article-list">
${ai('4',b('museum','Museum'),'Berlin-Gatow: Cold War Airfield Museum','Historic Cold War airfield...','Staff','March 26, 2026')}
${ai('1',b('museum','Museum'),'Air Zoo Spring Break Family Programs','Special programs for families...','Staff','March 23, 2026')}
</div></div></section></div>

<!-- LOGIN -->
<div class="tab-view" id="tab-login">
<section class="auth-page"><div class="auth-card">
<div class="auth-logo"><div class="logo-text" style="width:70px;height:70px;margin:0 auto"><span class="vintage" style="font-size:7px">Vintage</span><span class="aviation" style="font-size:16px">Aviation</span><span class="news" style="font-size:8px">News</span></div></div>
<h2>Welcome Back</h2><p class="auth-subtitle">Sign in to access your subscription</p>
<div class="sso-buttons" id="sfSso">
<button class="sso-btn google-btn" onclick="sfLogin('Google User','user@gmail.com')"><span class="sso-icon"><svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg></span> Continue with Google</button>
<button class="sso-btn facebook-btn" onclick="sfLogin('Facebook User','user@facebook.com')"><span class="sso-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></span> Continue with Facebook</button>
</div>
<div class="auth-divider" id="sfDiv"><div class="line"></div><span>or sign in with email</span><div class="line"></div></div>
<div class="magic-link-form" id="sfMagic"><label>Full Name</label><input type="text" id="sfName" placeholder="John Doe"><label>Email</label><input type="email" id="sfEmail" placeholder="you@example.com"><button class="magic-link-btn" onclick="sfMagicLink()"><i class="fas fa-paper-plane"></i> Send Magic Link</button></div>
<div class="auth-success" id="sfSuccess"><div class="check-icon"><i class="fas fa-check"></i></div><h3>Signed in!</h3><p>Use tabs to navigate.</p></div>
<div class="auth-footer" id="sfFooter">No account? <a href="#" onclick="switchTab('subscribe');return false;">Subscribe</a></div>
</div></section></div>

<!-- SUBSCRIBE -->
<div class="tab-view" id="tab-subscribe">
<section class="pricing-section"><div class="container">
<div class="pricing-header"><h1>Choose Your Plan</h1><p>Support Vintage Aviation News with exclusive content access.</p></div>
<div class="pricing-grid">
<div class="pricing-card"><h3>Free</h3><div class="price">$0<span>/mo</span></div><div class="price-note">Free forever</div><ul class="pricing-features"><li><span class="check"><i class="fas fa-check"></i></span> All articles</li><li><span class="check"><i class="fas fa-check"></i></span> Newsletter</li><li class="disabled"><span class="cross"><i class="fas fa-times"></i></span> Ad-free</li><li class="disabled"><span class="cross"><i class="fas fa-times"></i></span> Exclusive content</li></ul><button class="pricing-btn pricing-btn-outline" onclick="sfSubscribe('Free','$0')">Get Started</button></div>
<div class="pricing-card featured"><span class="popular-badge">Most Popular</span><h3>Pro</h3><div class="price">$9.99<span>/mo</span></div><div class="price-note">Billed monthly</div><ul class="pricing-features"><li><span class="check"><i class="fas fa-check"></i></span> Everything in Free</li><li><span class="check"><i class="fas fa-check"></i></span> Ad-free reading</li><li><span class="check"><i class="fas fa-check"></i></span> Pilot interviews</li><li><span class="check"><i class="fas fa-check"></i></span> Photo galleries</li><li><span class="check"><i class="fas fa-check"></i></span> Wallpapers</li></ul><button class="pricing-btn pricing-btn-primary" onclick="sfSubscribe('Pro','$9.99')">Subscribe Pro</button></div>
<div class="pricing-card"><h3>Enterprise</h3><div class="price">$24.99<span>/mo</span></div><div class="price-note">Organizations</div><ul class="pricing-features"><li><span class="check"><i class="fas fa-check"></i></span> Everything in Pro</li><li><span class="check"><i class="fas fa-check"></i></span> Commercial license</li><li><span class="check"><i class="fas fa-check"></i></span> Team access (10)</li><li><span class="check"><i class="fas fa-check"></i></span> API access</li><li><span class="check"><i class="fas fa-check"></i></span> Priority support</li></ul><button class="pricing-btn pricing-btn-dark" onclick="sfSubscribe('Enterprise','$24.99')">Contact Sales</button></div>
</div>
<div class="faq-section"><h2>FAQ</h2>
<div class="faq-item"><button class="faq-question" onclick="toggleFaq(this)">Can I cancel anytime?<span class="faq-icon">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Yes. Cancel from Subscription page. Access continues until billing period ends.</div></div></div>
<div class="faq-item"><button class="faq-question" onclick="toggleFaq(this)">Payment methods?<span class="faq-icon">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Visa, Mastercard, AmEx, PayPal, Apple Pay.</div></div></div>
<div class="faq-item"><button class="faq-question" onclick="toggleFaq(this)">Free trial?<span class="faq-icon">+</span></button><div class="faq-answer"><div class="faq-answer-inner">14-day Pro trial, 30-day Enterprise. No card required.</div></div></div>
<div class="faq-item"><button class="faq-question" onclick="toggleFaq(this)">Switch plans?<span class="faq-icon">+</span></button><div class="faq-answer"><div class="faq-answer-inner">Yes! Upgrade instantly, downgrade at next billing cycle.</div></div></div>
</div></div></section></div>

<!-- SUBSCRIPTION -->
<div class="tab-view" id="tab-subscription">
<section class="subscription-page"><div class="container">
<div class="sub-header"><div class="breadcrumb">Home &gt; My Subscription</div><h1>My Subscription</h1><p>Manage plan, billing, payment.</p></div>
<div class="plan-card"><div class="plan-card-header"><h2>Current Plan: <span id="sfPN">--</span></h2><span class="plan-badge" id="sfPB">--</span></div>
<div class="plan-details-grid"><div class="plan-detail"><div class="detail-label">Plan</div><div class="detail-value" id="sfDP">--</div></div><div class="plan-detail"><div class="detail-label">Price</div><div class="detail-value" id="sfDPr">--</div></div><div class="plan-detail"><div class="detail-label">Billing</div><div class="detail-value" id="sfDC">--</div></div><div class="plan-detail"><div class="detail-label">Next Billing</div><div class="detail-value" id="sfDN">--</div></div><div class="plan-detail"><div class="detail-label">Member Since</div><div class="detail-value" id="sfDS">--</div></div><div class="plan-detail"><div class="detail-label">Payment</div><div class="detail-value" id="sfDPy">--</div></div></div>
<div class="plan-actions"><button class="plan-action-btn btn-change-plan" onclick="switchTab('subscribe')"><i class="fas fa-exchange-alt"></i> Change Plan</button><button class="plan-action-btn btn-update-payment" onclick="alert('Demo')"><i class="fas fa-credit-card"></i> Update Payment</button><button class="plan-action-btn btn-cancel" id="sfCB" onclick="document.getElementById('sfCM2').classList.add('active')"><i class="fas fa-times-circle"></i> Cancel</button></div></div>
<div class="billing-section"><h2>Billing History</h2><table class="billing-table"><thead><tr><th>Date</th><th>Description</th><th>Amount</th><th>Status</th></tr></thead><tbody id="sfBH"><tr><td colspan="4" style="text-align:center;color:#999;padding:30px">Sign in first.</td></tr></tbody></table></div>
</div></section></div>

<!-- CONTACT -->
<div class="tab-view" id="tab-contact">
<div class="page-header"><div class="container"><div class="breadcrumb">Home &gt; Contact</div><h1>Contact Us</h1><p>Story tip, press release, or question? We would love to hear from you.</p></div></div>
<section class="section"><div class="container"><div class="contact-form"><form onsubmit="event.preventDefault();alert('Thank you! (Demo)')"><div class="form-group"><label>Name</label><input type="text" placeholder="Your name" required></div><div class="form-group"><label>Email</label><input type="email" placeholder="you@email.com" required></div><div class="form-group"><label>Subject</label><select><option>General Inquiry</option><option>Story Tip</option><option>Advertising</option></select></div><div class="form-group"><label>Message</label><textarea placeholder="Your message..." required></textarea></div><button type="submit">Send Message</button></form></div></div></section></div>

<!-- MODALS -->
<div class="modal-overlay confirm-modal" id="sfCM1"><div class="modal"><div class="modal-icon success"><i class="fas fa-check"></i></div><h3 id="sfCT">Confirmed!</h3><p id="sfCMsg">Welcome!</p><div class="modal-actions"><button class="modal-btn modal-btn-success" onclick="document.getElementById('sfCM1').classList.remove('active');switchTab('subscription');">View Subscription</button></div></div></div>
<div class="modal-overlay confirm-modal" id="sfCM2"><div class="modal"><div class="modal-icon warning"><i class="fas fa-exclamation-triangle"></i></div><h3>Cancel Subscription?</h3><p>You will lose premium features at end of billing period.</p><div class="modal-actions"><button class="modal-btn modal-btn-cancel" onclick="document.getElementById('sfCM2').classList.remove('active')">Keep Plan</button><button class="modal-btn modal-btn-danger" onclick="sfCancel()">Yes, Cancel</button></div></div></div>

<!-- FOOTER -->
<footer class="site-footer"><div class="container">
<div class="footer-top-row"><div class="footer-brand"><div class="footer-logo"><div class="logo-text" style="width:70px;height:70px"><span class="vintage" style="font-size:7px">Vintage</span><span class="aviation" style="font-size:16px">Aviation</span><span class="news" style="font-size:8px">News</span></div></div></div><div class="footer-social"><a href="#"><i class="fab fa-facebook-f"></i></a><a href="#"><i class="fab fa-twitter"></i></a><a href="#"><i class="fab fa-youtube"></i></a><a href="#"><i class="fab fa-instagram"></i></a></div></div>
<div class="footer-grid"><div class="footer-brand"><p><em>Vintage Aviation News preserves aviation heritage through digital media.</em></p></div><div class="footer-links"><ul><li><a href="#" onclick="switchTab('home');return false;">Home</a></li><li><a href="#" onclick="switchTab('restorations');return false;">Restorations</a></li><li><a href="#" onclick="switchTab('vintage');return false;">Vintage</a></li><li><a href="#" onclick="switchTab('articles');return false;">Articles</a></li></ul></div><div class="footer-links"><ul><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms of Service</a></li><li><a href="#" onclick="switchTab('contact');return false;">Contact Us</a></li></ul></div></div>
</div></footer>
<button class="back-to-top" onclick="window.scrollTo({top:0,behavior:'smooth'})"><i class="fas fa-chevron-up"></i></button>
`;

out += `
<script>
var AK='stb_user';
function getU(){try{return JSON.parse(localStorage.getItem(AK))}catch(e){return null}}
function setU(u){localStorage.setItem(AK,JSON.stringify(u))}
function isAuth(){return getU()!==null}
function switchTab(id){document.querySelectorAll('.tab-view').forEach(function(v){v.classList.remove('active')});document.querySelectorAll('.tab-btn').forEach(function(b){b.classList.remove('active')});var v=document.getElementById('tab-'+id);if(v)v.classList.add('active');document.querySelectorAll('.tab-btn').forEach(function(b){if(b.dataset.tab===id)b.classList.add('active')});window.scrollTo({top:0,behavior:'smooth'});if(id==='subscription')renderSub();}
document.querySelectorAll('.tab-btn').forEach(function(b){b.addEventListener('click',function(){switchTab(this.dataset.tab)})});
function sfLogin(n,e){setU({name:n,email:e,plan:'free',price:'$0',billingCycle:'N/A',nextBilling:'N/A',memberSince:new Date().toISOString(),paymentMethod:'None'});document.getElementById('sfSso').style.display='none';document.getElementById('sfDiv').style.display='none';document.getElementById('sfMagic').style.display='none';document.getElementById('sfFooter').style.display='none';document.getElementById('sfSuccess').style.display='block';updateAuth();}
function sfMagicLink(){var n=document.getElementById('sfName').value.trim(),e=document.getElementById('sfEmail').value.trim();if(!n||!e){alert('Enter name and email.');return;}sfLogin(n,e);}
function sfLogout(){localStorage.removeItem(AK);['sfSso','sfDiv','sfMagic','sfFooter'].forEach(function(id){document.getElementById(id).style.display=''});document.getElementById('sfSuccess').style.display='none';updateAuth();switchTab('home');}
function sfSubscribe(p,pr){if(!isAuth()){switchTab('login');return;}var u=getU(),now=new Date(),nb=new Date(now);nb.setMonth(nb.getMonth()+1);u.plan=p.toLowerCase();u.price=pr;u.billingCycle='Monthly';u.nextBilling=nb.toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});u.paymentMethod='Visa ending in 4242';setU(u);document.getElementById('sfCT').textContent=p==='Free'?'Welcome!':'Subscribed to '+p+'!';document.getElementById('sfCMsg').textContent=p==='Free'?'Free plan active.':p+' at '+pr+'/mo.';document.getElementById('sfCM1').classList.add('active');updateAuth();}
function sfCancel(){var u=getU();if(!u)return;u.plan='cancelled';u.price='$0';u.billingCycle='N/A';u.nextBilling='N/A';u.paymentMethod='None';setU(u);document.getElementById('sfCM2').classList.remove('active');renderSub();updateAuth();}
function renderSub(){var u=getU();if(!u){document.getElementById('sfPN').textContent='Not signed in';document.getElementById('sfPB').textContent='--';document.getElementById('sfPB').className='plan-badge';['sfDP','sfDPr','sfDC','sfDN','sfDS','sfDPy'].forEach(function(id){document.getElementById(id).textContent='--'});document.getElementById('sfCB').style.display='none';document.getElementById('sfBH').innerHTML='<tr><td colspan=4 style="text-align:center;color:#999;padding:30px">Sign in first.</td></tr>';return;}var p=u.plan||'free',cap=p.charAt(0).toUpperCase()+p.slice(1);document.getElementById('sfPN').textContent=cap;var bg=document.getElementById('sfPB');bg.textContent=p==='cancelled'?'Cancelled':p==='free'?'Free':'Active';bg.className='plan-badge '+(p==='cancelled'?'badge-cancelled':p==='free'?'badge-free':'badge-active');document.getElementById('sfDP').textContent=cap;document.getElementById('sfDPr').textContent=u.price||'$0';document.getElementById('sfDC').textContent=u.billingCycle||'N/A';document.getElementById('sfDN').textContent=u.nextBilling||'N/A';document.getElementById('sfDPy').textContent=u.paymentMethod||'None';if(u.memberSince)document.getElementById('sfDS').textContent=new Date(u.memberSince).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});document.getElementById('sfCB').style.display=(p==='free'||p==='cancelled')?'none':'';var tb=document.getElementById('sfBH');if(p==='free'){tb.innerHTML='<tr><td colspan=4 style="text-align:center;color:#999;padding:30px">No billing history.</td></tr>';return;}var now=new Date(),rows=[];for(var i=0;i<3;i++){var d=new Date(now);d.setMonth(d.getMonth()-i);rows.push('<tr><td>'+d.toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})+'</td><td>'+cap+' Plan</td><td>'+(u.price||'$9.99')+'</td><td class="status-paid">Paid</td></tr>');}tb.innerHTML=rows.join('');}
function updateAuth(){var a=document.getElementById('sfAuthArea'),u=getU();if(u){a.innerHTML='<span style="width:32px;height:32px;border-radius:50%;background:#c0392b;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:14px">'+u.name.charAt(0).toUpperCase()+'</span> <span style="font-size:13px;font-weight:500">'+u.name+'</span> <button onclick="sfLogout()" style="background:none;border:1px solid #e0e0e0;padding:5px 12px;border-radius:4px;cursor:pointer;font-size:12px">Sign Out</button>';}else{a.innerHTML='<button onclick="switchTab(\\x27login\\x27)" style="background:none;border:1px solid #c0392b;color:#c0392b;padding:6px 16px;border-radius:4px;cursor:pointer;font-size:12px;font-weight:600">Sign In</button> <button onclick="switchTab(\\x27subscribe\\x27)" style="background:#c0392b;border:none;color:#fff;padding:6px 16px;border-radius:4px;cursor:pointer;font-size:12px;font-weight:600">Subscribe</button>';}}
function toggleFaq(btn){var item=btn.parentElement,was=item.classList.contains('active');document.querySelectorAll('.faq-item').forEach(function(f){f.classList.remove('active');f.querySelector('.faq-answer').style.maxHeight='0'});if(!was){item.classList.add('active');item.querySelector('.faq-answer').style.maxHeight=item.querySelector('.faq-answer').scrollHeight+'px';}}
document.querySelectorAll('.modal-overlay').forEach(function(o){o.addEventListener('click',function(e){if(e.target===o)o.classList.remove('active')})});
window.addEventListener('scroll',function(){var b=document.querySelector('.back-to-top');if(b)b.classList.toggle('visible',window.scrollY>400)});
updateAuth();
</script>
<script>
${goAdFreeJS}
</script>
</body></html>`;

fs.writeFileSync('vintage-aviation-news-complete.html', out);
const s = fs.statSync('vintage-aviation-news-complete.html');
console.log('Done:', Math.round(s.size / 1024) + 'KB');

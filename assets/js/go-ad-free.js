(function () {
  // ===== CONFIGURATION =====
  var SCRIPT = document.currentScript || document.querySelector('script[src*="go-ad-free"]');
  var CFG = {
    delay: parseInt(attr("data-delay", "1500"), 10),
    poll: parseInt(attr("data-poll", "3000"), 10),
    extraSelectors: attr("data-selectors", ""),
  };
  function attr(name, fallback) {
    return SCRIPT && SCRIPT.getAttribute(name) || fallback;
  }

  // ===== BRAND THEMING =====
  var P = "#c0392b";
  var PD = "#a93226";
  var PL = "#fdf2f2";
  var PT = "rgba(192,57,43,0.25)";
  var SITE_NAME = "Vintage Aviation News";
  var SITE_CAUSE = "aviation heritage preservation";
  var SITE_AUDIENCE = "aviation enthusiasts worldwide";
  var SITE_TITLE = "Support Aviation Heritage";

  // ===== PRESETS =====
  var PRESETS = [5, 10, 25, 50];
  var POPULAR = 25;
  var FREQS = [
    { key: "one-time", label: "One-time", per: null },
    { key: "monthly", label: "Monthly", per: 30 },
    { key: "quarterly", label: "Quarterly", per: 90 },
    { key: "yearly", label: "Yearly", per: 365 },
  ];
  var FREQ_LABELS = { "one-time": "", monthly: " / month", quarterly: " / quarter", yearly: " / year" };

  // ===== WITTY COPY =====
  var wideCopy = [
    "Tired of ads? Read without distractions.",
    "Plot twist: this ad vanishes when you subscribe.",
    "Imagine this space \u2014 completely yours.",
    "Fun fact: subscribers never see this.",
    "Support aviation heritage. Lose the ads.",
    "Less noise. More warbirds.",
  ];
  var narrowCopy = ["No more ads?", "Go clean", "Lose the ads", "Distraction-free"];
  var copyIdx = 0;

  // ===== MARKER =====
  var MARKER = "data-gaf-processed";

  // ===== INJECT CSS =====
  var styleEl = document.createElement("style");
  styleEl.textContent = `
@keyframes gafFadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
@keyframes gafPopIn{from{opacity:0;transform:scale(.94) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}

/* === Wrapper for each ad banner === */
.gaf-ad-wrapper{
  flex:1;max-width:600px;display:flex;flex-direction:column;min-width:0;
}
.gaf-ad-wrapper .ad-banner{
  flex:unset;max-width:unset;width:100%;
}

/* === Badge above ad unit, right-aligned === */
.gaf-above-badge{
  display:flex;justify-content:flex-end;margin-bottom:1px;
  cursor:pointer;animation:gafFadeIn .35s ease-out;
}

/* === CTA button === */
.gaf-cta-pill{
  display:inline-flex;align-items:center;gap:3px;
  padding:3px 10px;border-radius:3px;
  background:${P};
  color:#fff;font:700 9px/1 'Inter',sans-serif;
  text-transform:uppercase;letter-spacing:0.5px;
  white-space:nowrap;
  transition:background .15s;
}
.gaf-cta-pill:hover{background:${PD};}
.gaf-cta-pill .gaf-arrow{display:inline-block;transition:transform .15s;}
.gaf-cta-pill:hover .gaf-arrow{transform:translateX(2px);}

/* === STICKY BOTTOM BANNER === */
.gaf-sticky{
  position:fixed;bottom:0;left:0;right:0;z-index:99999;
  background:#1a2332;color:#fff;
  display:flex;align-items:center;justify-content:center;gap:16px;
  padding:12px 20px;
  font:400 14px/1.4 'Inter',sans-serif;
  box-shadow:0 -4px 20px rgba(0,0,0,.25);
  animation:gafFadeIn .4s ease-out;
}
.gaf-sticky-text{color:rgba(255,255,255,.85);}
.gaf-sticky-cta{
  display:inline-flex;align-items:center;gap:6px;
  padding:8px 22px;border-radius:6px;border:none;
  background:${P};color:#fff;
  font:600 13px/1 'Inter',sans-serif;
  cursor:pointer;transition:background .15s;
}
.gaf-sticky-cta:hover{background:${PD};}
.gaf-sticky-close{
  background:none;border:none;color:rgba(255,255,255,.5);
  font-size:18px;cursor:pointer;padding:4px 8px;line-height:1;
  transition:color .15s;
}
.gaf-sticky-close:hover{color:#fff;}

/* === POPUP === */
.gaf-backdrop{position:fixed;inset:0;z-index:9999999;background:rgba(0,0,0,.45);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;}
.gaf-popup{width:440px;max-width:100%;max-height:90vh;overflow-y:auto;border-radius:20px;background:#fff;box-shadow:0 24px 80px rgba(0,0,0,.2);animation:gafPopIn .3s ease-out;position:relative;padding:28px 24px;}
.gaf-popup *{box-sizing:border-box;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;}
.gaf-close{position:absolute;top:12px;right:16px;background:none;border:none;font-size:22px;color:#999;cursor:pointer;padding:4px;line-height:1;}
.gaf-close:hover{color:#333;}

/* Screen 1 */
.gaf-title{font-size:1.35em;font-weight:800;text-align:center;color:#1a1a1a;margin-bottom:16px;}
.gaf-freq-wrap{position:relative;margin-bottom:16px;}
.gaf-freq{width:100%;padding:10px 36px 10px 14px;border:1.5px solid #e0e0e0;border-radius:10px;font-size:14px;font-weight:500;color:#333;background:#fff;appearance:none;-webkit-appearance:none;cursor:pointer;outline:none;}
.gaf-freq:focus{border-color:${P};}
.gaf-freq-arrow{position:absolute;right:14px;top:50%;transform:translateY(-50%);pointer-events:none;color:#999;font-size:12px;}
.gaf-amount-box{display:flex;align-items:center;border:1.5px solid #e0e0e0;border-radius:12px;padding:12px 16px;margin-bottom:14px;gap:8px;}
.gaf-amount-box:focus-within{border-color:${P};}
.gaf-amount-sign{font-size:2em;font-weight:800;color:#1a1a1a;}
.gaf-amount-input{flex:1;font-size:2em;font-weight:800;color:#1a1a1a;border:none;outline:none;background:none;width:60px;min-width:0;}
.gaf-amount-per{font-size:12px;color:#999;text-align:right;white-space:nowrap;}
.gaf-presets{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px;}
.gaf-preset{position:relative;padding:10px 4px;border:1.5px solid #e0e0e0;border-radius:10px;background:#fff;font-size:14px;font-weight:600;color:#333;cursor:pointer;text-align:center;transition:all .15s;}
.gaf-preset:hover{border-color:#ccc;background:#fafafa;}
.gaf-preset.active{border-color:${P};background:${PL};color:${P};}
.gaf-preset-pop{position:absolute;top:-8px;left:50%;transform:translateX(-50%);font-size:9px;font-weight:700;color:${P};background:${PL};padding:1px 6px;border-radius:8px;white-space:nowrap;}
.gaf-perk{text-align:center;font-size:13px;color:${P};font-weight:500;margin-bottom:16px;}
.gaf-cta{width:100%;padding:15px;border:none;border-radius:12px;background:${P};color:#fff;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px ${PT};transition:background .15s;}
.gaf-cta:hover{background:${PD};}
.gaf-cta.processing{background:${PD};opacity:.7;cursor:default;}
.gaf-trust{text-align:center;font-size:11px;color:#999;margin-top:12px;}
.gaf-trust2{text-align:center;font-size:10.5px;color:#bbb;margin-top:8px;}

/* Screen 2 */
.gaf-summary{text-align:center;margin-bottom:18px;}
.gaf-summary-label{font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px;}
.gaf-summary-amount{font-size:2em;font-weight:800;color:#1a1a1a;margin:4px 0;}
.gaf-summary-cause{font-size:13px;color:${P};font-weight:500;}
.gaf-input-group{margin-bottom:14px;}
.gaf-input-group label{display:block;font-size:12px;font-weight:600;color:#555;margin-bottom:4px;}
.gaf-input{width:100%;padding:10px 14px;border:1.5px solid #e0e0e0;border-radius:10px;font-size:14px;outline:none;color:#333;background:#fff;}
.gaf-input:focus{border-color:${P};}
.gaf-method-card{border:1.5px solid #e0e0e0;border-radius:12px;margin-bottom:10px;overflow:hidden;cursor:pointer;transition:border-color .15s;}
.gaf-method-card.active{border-color:${P};background:${PL};}
.gaf-method-header{display:flex;align-items:center;gap:10px;padding:12px 14px;}
.gaf-method-icon{font-size:20px;}
.gaf-method-info{flex:1;}
.gaf-method-name{font-size:14px;font-weight:600;color:#333;}
.gaf-method-sub{font-size:11px;color:${P};}
.gaf-method-body{padding:0 14px 14px;display:none;}
.gaf-method-card.active .gaf-method-body{display:block;}
.gaf-method-body .gaf-input{margin-bottom:8px;}
.gaf-method-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.gaf-express-label{text-align:center;font-size:11px;color:#bbb;margin:14px 0 10px;text-transform:uppercase;letter-spacing:1px;}
.gaf-express-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px;}
.gaf-express-btn{padding:10px 4px;border:1.5px solid #e0e0e0;border-radius:10px;background:#fff;font-size:11px;font-weight:600;color:#333;cursor:pointer;text-align:center;transition:border-color .15s;}
.gaf-express-btn:hover{border-color:#999;}
.gaf-secure{text-align:center;font-size:11px;color:#999;margin-bottom:14px;}

/* Screen 3 */
.gaf-success-header{text-align:center;margin-bottom:20px;}
.gaf-check-circle{width:48px;height:48px;border-radius:50%;border:3px solid ${P};display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:22px;color:${P};}
.gaf-success-text{font-size:14px;color:#555;line-height:1.5;margin-bottom:10px;}
.gaf-badge-pill{display:inline-flex;align-items:center;gap:4px;padding:6px 14px;border:1.5px solid ${P};border-radius:20px;background:${PL};font-size:12px;font-weight:600;color:${P};}
.gaf-cert{background:#fff;border:1px solid #e8e8e8;border-radius:14px;padding:24px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,.04);position:relative;}
.gaf-cert-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;}
.gaf-cert-share-icon{cursor:pointer;font-size:16px;color:#999;}.gaf-cert-share-icon:hover{color:${P};}
.gaf-cert-label{font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#999;text-align:center;margin-bottom:10px;}
.gaf-cert-divider{height:1px;background:#e8e8e8;margin:12px 0;}
.gaf-cert-certifies{text-align:center;font-size:12px;color:#999;margin-bottom:4px;}
.gaf-cert-name{text-align:center;font-size:1.4em;font-weight:800;color:#1a1a1a;margin-bottom:4px;}
.gaf-cert-of{text-align:center;font-size:12px;color:#999;margin-bottom:10px;}
.gaf-cert-logo{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:12px;}
.gaf-cert-logo-circle{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#1a3a5c,#2c5f8a);display:flex;align-items:center;justify-content:center;font-size:9px;color:#e67e22;font-weight:700;font-style:italic;}
.gaf-cert-logo-text{font-size:14px;font-weight:700;color:#1a1a1a;}
.gaf-cert-cause{text-align:center;font-size:12px;font-style:italic;color:#777;margin-bottom:10px;}
.gaf-cert-amount{text-align:center;font-size:15px;font-weight:700;color:#1a1a1a;}
.gaf-cert-date{text-align:center;font-size:11px;color:#999;margin-top:2px;}
.gaf-cert-perk{background:${PL};border-radius:10px;padding:12px;text-align:center;font-size:12px;color:${P};font-weight:500;margin-top:16px;}
.gaf-social-label{text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#999;margin-bottom:10px;}
.gaf-social-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px;}
.gaf-social-btn{padding:10px;border-radius:10px;border:none;color:#fff;font-size:12px;font-weight:600;cursor:pointer;text-align:center;transition:opacity .15s;text-decoration:none;display:block;}
.gaf-social-btn:hover{opacity:.85;color:#fff;}
.gaf-social-x{background:#1a1a1a;}.gaf-social-li{background:#0077b5;}.gaf-social-wa{background:#25d366;}
.gaf-footer-links{text-align:center;font-size:11px;color:#999;}
.gaf-footer-links a{color:${P};text-decoration:none;font-weight:500;}
.gaf-footer-links a:hover{text-decoration:underline;}
.gaf-footer-email{text-align:center;font-size:11px;color:#bbb;margin-top:6px;}

@media(max-width:480px){
  .gaf-sticky{flex-wrap:wrap;gap:8px;padding:10px 16px;font-size:12px;}
  .gaf-popup{padding:20px 16px;}
}
`;
  document.head.appendChild(styleEl);

  // ===== STATE =====
  var S = { screen: 1, freq: "quarterly", preset: POPULAR, custom: "", isCustom: false, method: "", name: "", email: "" };

  function getAmount() { return S.isCustom ? (parseInt(S.custom, 10) || 0) : S.preset; }
  function getFreqLabel() { return FREQ_LABELS[S.freq] || ""; }
  function getPerDay() {
    var f = FREQS.find(function (x) { return x.key === S.freq; });
    if (!f || !f.per) return "";
    var amt = getAmount();
    return amt ? "$" + (amt / f.per).toFixed(2) + "/day" : "";
  }

  // ===== AD SCANNING =====
  // Wrap every .ad-banner in a wrapper div with a badge above it
  function scanAds() {
    document.querySelectorAll(".ad-banner").forEach(function (banner) {
      if (banner.hasAttribute(MARKER)) return;
      banner.setAttribute(MARKER, "1");

      // Create wrapper: badge + banner together
      var wrapper = document.createElement("div");
      wrapper.className = "gaf-ad-wrapper";
      // Full-width banners (e.g. style="max-width: 100%")
      if (banner.style.maxWidth === "100%") {
        wrapper.style.maxWidth = "100%";
      }
      banner.parentNode.insertBefore(wrapper, banner);
      wrapper.appendChild(makeAdBadge());
      wrapper.appendChild(banner);
    });
  }

  function getSupportUrl() {
    var path = window.location.pathname;
    if (path.includes('/pages/')) return '../support/';
    return 'support/';
  }

  function makeAdBadge() {
    var badge = document.createElement("div");
    badge.className = "gaf-above-badge";
    badge.innerHTML = '<span class="gaf-cta-pill">Go Ads-Free <span class="gaf-arrow">\u2192</span></span>';
    badge.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); window.location.href = getSupportUrl(); });
    return badge;
  }

  // Sticky bottom banner removed
  function injectStickyBanner() {}

  // ===== POPUP =====
  var backdrop = null;

  function openPopup() {
    if (backdrop) return;
    S.screen = 1; S.method = "";
    backdrop = document.createElement("div");
    backdrop.className = "gaf-backdrop";
    backdrop.innerHTML = '<div class="gaf-popup" id="gafPopup"></div>';
    document.body.appendChild(backdrop);
    document.body.style.overflow = "hidden";
    backdrop.addEventListener("click", function (e) { if (e.target === backdrop) closePopup(); });
    renderScreen();
  }

  function closePopup() {
    if (!backdrop) return;
    backdrop.remove(); backdrop = null;
    document.body.style.overflow = "";
  }

  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closePopup(); });

  function renderScreen() {
    var popup = document.getElementById("gafPopup");
    if (!popup) return;
    popup.innerHTML = '<button class="gaf-close" id="gafClose">&times;</button>' +
      (S.screen === 1 ? renderScreen1() : S.screen === 2 ? renderScreen2() : renderScreen3());
  }

  // ===== SCREEN 1 =====
  function renderScreen1() {
    var amt = getAmount(), perDay = getPerDay(), freqLabel = getFreqLabel();
    var freqOpts = FREQS.map(function (f) {
      return '<option value="' + f.key + '"' + (S.freq === f.key ? " selected" : "") + '>' + f.label + '</option>';
    }).join("");
    var presetBtns = PRESETS.map(function (p) {
      var active = !S.isCustom && S.preset === p ? " active" : "";
      var pop = p === POPULAR ? '<span class="gaf-preset-pop">Popular</span>' : "";
      return '<button class="gaf-preset' + active + '" data-gaf-preset="' + p + '">' + pop + '$' + p + '</button>';
    }).join("");
    return '<div class="gaf-title">' + SITE_TITLE + '</div>' +
      '<div class="gaf-freq-wrap"><select class="gaf-freq" id="gafFreq">' + freqOpts + '</select><span class="gaf-freq-arrow">\u25BE</span></div>' +
      '<div class="gaf-amount-box"><span class="gaf-amount-sign">$</span><input class="gaf-amount-input" id="gafAmount" type="text" inputmode="numeric" value="' + amt + '">' +
        (perDay ? '<span class="gaf-amount-per">' + perDay + '</span>' : '') + '</div>' +
      '<div class="gaf-presets">' + presetBtns + '</div>' +
      '<div class="gaf-perk">\u2714 Includes ads-free experience</div>' +
      '<button class="gaf-cta" id="gafCta1">Continue with $' + amt + freqLabel + '</button>' +
      '<div class="gaf-trust">\uD83D\uDD12 Secure payment &nbsp;|&nbsp; ApplePay \u00B7 Visa \u00B7 MC</div>' +
      '<div class="gaf-trust2">Secure &amp; encrypted \u00B7 Cancel anytime \u00B7 Takes &lt;10 seconds</div>';
  }

  // ===== SCREEN 2 =====
  function renderScreen2() {
    var amt = getAmount(), freqLabel = getFreqLabel();
    return '<div class="gaf-summary">' +
        '<div class="gaf-summary-label">You\u2019re supporting</div>' +
        '<div class="gaf-summary-amount">$' + amt + freqLabel + '</div>' +
        '<div class="gaf-summary-cause">Helping preserve ' + SITE_CAUSE + ' every day</div></div>' +
      '<div class="gaf-input-group"><label>Email address</label><input class="gaf-input" id="gafEmail" type="email" placeholder="you@example.com" value="' + esc(S.email) + '"></div>' +
      '<div style="font-size:13px;font-weight:600;color:#333;margin-bottom:10px;">Select payment method</div>' +
      '<div class="gaf-method-card' + (S.method === "bank" ? " active" : "") + '" data-gaf-method="bank"><div class="gaf-method-header"><span class="gaf-method-icon">\uD83C\uDFE6</span><div class="gaf-method-info"><div class="gaf-method-name">Direct Bank Transfer (ACH)</div><div class="gaf-method-sub">Best for long-term support</div></div></div><div class="gaf-method-body"><input class="gaf-input" placeholder="Routing number"><input class="gaf-input" placeholder="Account number"></div></div>' +
      '<div class="gaf-express-label">Express checkout</div>' +
      '<div class="gaf-express-grid"><button class="gaf-express-btn">\uF8FF Pay</button><button class="gaf-express-btn">G Pay</button><button class="gaf-express-btn">PayPal</button><button class="gaf-express-btn">Venmo</button></div>' +
      '<div class="gaf-method-card' + (S.method === "card" ? " active" : "") + '" data-gaf-method="card"><div class="gaf-method-header"><span class="gaf-method-icon">\uD83D\uDCB3</span><div class="gaf-method-info"><div class="gaf-method-name">Credit or Debit Card</div><div class="gaf-method-sub">Visa, Mastercard, Amex</div></div></div><div class="gaf-method-body"><input class="gaf-input" id="gafCardName" placeholder="Name on card" value="' + esc(S.name) + '"><input class="gaf-input" placeholder="Card number" maxlength="19"><div class="gaf-method-row"><input class="gaf-input" placeholder="MM / YY" maxlength="5"><input class="gaf-input" placeholder="CVC" maxlength="4"></div></div></div>' +
      '<div class="gaf-secure">\uD83D\uDD12 Secure payment \u2022 Powered by Stripe</div>' +
      '<button class="gaf-cta" id="gafCta2">Complete Payment \u2014 $' + amt + freqLabel + '</button>';
  }

  // ===== SCREEN 3 =====
  function renderScreen3() {
    var amt = getAmount();
    var freqText = S.freq === "one-time" ? "" : S.freq === "monthly" ? "every month" : S.freq === "quarterly" ? "every quarter" : "every year";
    var displayName = S.name || S.email || "Supporter";
    var today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    var shareText = encodeURIComponent("I just became an official supporter of " + SITE_NAME + "! Helping keep " + SITE_CAUSE + " free for everyone. \u2708\uFE0F");
    var shareUrl = encodeURIComponent(window.location.origin);
    return '<div class="gaf-success-header">' +
        '<div class="gaf-check-circle">\u2713</div>' +
        '<div class="gaf-success-text">Your <strong>$' + amt + ' ' + freqText + '</strong> support is confirmed.</div>' +
        '<div class="gaf-success-text">You\u2019re now one of us \u2014 helping keep ' + SITE_CAUSE + ' free for ' + SITE_AUDIENCE + '.</div>' +
        '<span class="gaf-badge-pill">\uD83D\uDC99 Official Supporter of ' + SITE_NAME + '</span></div>' +
      '<div class="gaf-cert"><div class="gaf-cert-top"><span>\u2764\uFE0F</span><span class="gaf-cert-share-icon" title="Share">\uD83D\uDD17</span></div>' +
        '<div class="gaf-cert-label">CERTIFICATE OF SUPPORT</div><div class="gaf-cert-divider"></div>' +
        '<div class="gaf-cert-certifies">This certifies that</div>' +
        '<div class="gaf-cert-name">' + esc(displayName) + '</div>' +
        '<div class="gaf-cert-of">is a proud supporter of</div>' +
        '<div class="gaf-cert-logo"><div class="gaf-cert-logo-circle">VA</div><span class="gaf-cert-logo-text">' + SITE_NAME + '</span></div>' +
        '<div class="gaf-cert-divider"></div>' +
        '<div class="gaf-cert-cause">For keeping ' + SITE_CAUSE + ' free &amp; accessible for everyone</div>' +
        '<div class="gaf-cert-amount">$' + amt + ' ' + freqText + '</div>' +
        '<div class="gaf-cert-date">' + today + '</div>' +
        '<div class="gaf-cert-perk">\u2714 Your ' + SITE_NAME + ' experience will be <strong>ads-free</strong> while your support is active.</div></div>' +
      '<div class="gaf-social-label">SHOW OTHERS YOU SUPPORT AVIATION HERITAGE</div>' +
      '<div class="gaf-social-grid">' +
        '<a class="gaf-social-btn gaf-social-x" href="https://twitter.com/intent/tweet?text=' + shareText + '&url=' + shareUrl + '" target="_blank" rel="noopener">X</a>' +
        '<a class="gaf-social-btn gaf-social-li" href="https://www.linkedin.com/sharing/share-offsite/?url=' + shareUrl + '" target="_blank" rel="noopener">LinkedIn</a>' +
        '<a class="gaf-social-btn gaf-social-wa" href="https://wa.me/?text=' + shareText + '%20' + shareUrl + '" target="_blank" rel="noopener">WhatsApp</a></div>' +
      '<div class="gaf-footer-links"><a href="#">Manage your support</a></div>' +
      '<div class="gaf-footer-email">\u2709 Certificate and invoice sent to your email</div>';
  }

  function esc(s) { return (s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  // ===== EVENT DELEGATION =====
  document.addEventListener("click", function (e) {
    var t = e.target;

    // Close popup
    if (t.id === "gafClose" || (t.closest && t.closest("#gafClose"))) { closePopup(); return; }

    // Sticky banner CTA
    if (t.id === "gafStickyCta" || (t.closest && t.closest("#gafStickyCta"))) { window.location.href = getSupportUrl(); return; }

    // Sticky banner close
    if (t.id === "gafStickyClose" || (t.closest && t.closest("#gafStickyClose"))) {
      var sticky = document.getElementById("gafSticky");
      if (sticky) sticky.remove();
      return;
    }

    // Preset buttons
    var presetBtn = t.closest ? t.closest("[data-gaf-preset]") : null;
    if (presetBtn) {
      S.preset = parseInt(presetBtn.getAttribute("data-gaf-preset"), 10);
      S.isCustom = false; S.custom = "";
      renderScreen(); return;
    }

    // Method cards
    var methodCard = t.closest ? t.closest("[data-gaf-method]") : null;
    if (methodCard) {
      var m = methodCard.getAttribute("data-gaf-method");
      S.method = S.method === m ? "" : m;
      renderScreen(); return;
    }

    // Screen 1 CTA
    if (t.id === "gafCta1") { if (getAmount() > 0) { S.screen = 2; renderScreen(); } return; }

    // Screen 2 CTA
    if (t.id === "gafCta2") {
      var emailEl = document.getElementById("gafEmail");
      var nameEl = document.getElementById("gafCardName");
      if (emailEl) S.email = emailEl.value.trim();
      if (nameEl) S.name = nameEl.value.trim();
      t.classList.add("processing"); t.textContent = "Processing\u2026";
      setTimeout(function () { S.screen = 3; renderScreen(); }, 1800);
      return;
    }

    // Express checkout
    if (t.closest && t.closest(".gaf-express-btn")) {
      var emailEl2 = document.getElementById("gafEmail");
      if (emailEl2) S.email = emailEl2.value.trim();
      S.name = S.email.split("@")[0] || "Supporter";
      S.screen = 3; renderScreen(); return;
    }
  });

  // Amount input
  document.addEventListener("input", function (e) {
    if (e.target.id === "gafAmount") {
      var v = e.target.value.replace(/[^0-9]/g, "");
      S.isCustom = true; S.custom = v;
      var cta = document.getElementById("gafCta1");
      if (cta) cta.textContent = "Continue with $" + (parseInt(v, 10) || 0) + getFreqLabel();
      document.querySelectorAll(".gaf-preset").forEach(function (b) { b.classList.remove("active"); });
      var perEl = e.target.parentNode.querySelector(".gaf-amount-per");
      if (perEl) perEl.textContent = getPerDay();
    }
  });

  // Frequency change
  document.addEventListener("change", function (e) {
    if (e.target.id === "gafFreq") { S.freq = e.target.value; renderScreen(); }
  });

  // ===== INIT =====
  function init() {
    setTimeout(function () {
      scanAds();
      injectStickyBanner();
      if (CFG.poll > 0) setInterval(scanAds, CFG.poll);
      if (typeof MutationObserver !== "undefined") {
        new MutationObserver(function (mutations) {
          var shouldScan = false;
          mutations.forEach(function (m) { if (m.addedNodes.length) shouldScan = true; });
          if (shouldScan) scanAds();
        }).observe(document.body, { childList: true, subtree: true });
      }
    }, CFG.delay);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

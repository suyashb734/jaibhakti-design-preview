/* Discovery screen designs. Shared helpers come from components.js; samples from fixtures.js. */
(() => {
  "use strict";
  const {
    icon,
    esc,
    shortDate,
    badge,
    button,
    page,
    action,
  } = window.JBDesign;

  function home() {
    return `<div class="screen"><header class="home-header"><button type="button" class="circle-button" data-action="navigation" aria-label="Open navigation">${icon("menu")}</button><div class="home-brand jb-brand" aria-label="Jai Bhakti"><img src="../../../assets/brand/temple-mark.svg" alt=""/><span lang="hi">जय भक्ति</span></div><a href="#bookings/nirantar" class="home-bookings">${icon("receipt")}My Bookings</a></header><div class="body"><section class="hero-panel"><p class="eyebrow">Shukravar special</p><h1>Maa Gajalakshmi</h1><p>A weekly offering of devotion<br>Kumkum arpan at Ujjain</p><span class="hero-place">Gajalakshmi Mata Mandir, Ujjain</span>${icon("temple", "hero-temple")}</section><p class="trust-line">${icon("shield")}Vedic rituals by authorised pandits</p><h2 class="home-section-title">Sacred sevas at the<br>temples of Bharat</h2><article class="card home-offering"><div class="offering-banner">${icon("temple")}<div><strong>Gajalakshmi<br>Mata Mandir</strong><span>Shukravar special · Ujjain</span></div></div><div class="offering-body"><h3>Maa Gajalakshmi Kumkum Arpan Seva</h3><div class="type-row">${badge("Nirantar Daan Seva", "brown")}${badge("Weekly")}</div><p class="small muted">Every Friday · Next seva ${esc(shortDate("2026-11-13"))} 2026</p><div class="price-block"><div class="price-line"><strong>₹51</strong><span>for your first Daan Seva</span></div><p>Then <b>₹101 every Friday</b> until cancelled in your UPI app.</p></div>${button("Book This Seva", "details", "", "arrow")}</div></article><p class="list-end">Seva for you and your loved ones.</p></div></div>`;
  }
  function profile() {
    const item = (ico, title, sub, href, featured = false) =>
      `<a class="menu-item ${featured ? "featured" : ""}" href="#${href}"><span class="menu-icon">${icon(ico)}</span><span class="menu-content"><strong>${title}</strong><small>${sub}</small></span>${icon("arrow", "arrow")}</a>`;
    return page(
      "Profile",
      `<section class="profile-hero"><div class="avatar">RS</div><div><h2>Rohit Sharma</h2><p>+91 ••••• ••210</p>${badge("Kashyap · Profile gotra")}</div></section><div class="menu-list">${item("receipt", "My Bookings", "Track your Daan Sevas,<br>certificates and videos", "bookings/nirantar", true)}${item("pin", "Saved addresses", "For prasad delivery", "support/profile")}${item("globe", "App language", "English · Tap for हिंदी", "support/profile")}${item("chat", "Help and support", "Support for your bookings", "support/profile")}</div>${action("Log out", "demo-feedback", "secondary", 'data-message="Log out is shown as a design reference."')}`,
      { back: "home" },
    );
  }

  Object.assign(window.JBDesign, {
    home,
    profile,
  });
})();

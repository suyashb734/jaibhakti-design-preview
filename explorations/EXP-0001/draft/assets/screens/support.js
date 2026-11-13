/* Support screen designs. Shared helpers come from components.js; samples from fixtures.js. */
(() => {
  "use strict";
  const {
    plans,
    page,
    esc,
    beneficiary,
    notice,
    action,
  } = window.JBDesign;

  function supportPage(id) {
    const p = plans[id],
      ref = p ? p.ref : id === "profile" ? "Your account" : id;
    return page(
      "Help and Support",
      `<h2 class="subheading">How can we help?</h2><p class="subtext">Support for your Daan Seva and booking details.</p><div class="card"><p class="info-label">Reference to include</p><p class="value">${esc(ref)}</p>${p ? beneficiary(p) : ""}</div>${notice("Keep your booking reference handy", "Share the seva date and reference so we can help with the right booking.", "", "receipt")}<div class="card"><h3 class="value">Contact support</h3><p class="small muted spaced">For beneficiary changes, payment queries and seva evidence.</p>${action("WhatsApp Support", "support-demo", "green spaced", 'data-channel="WhatsApp"', "chat")}${action("Email Support", "support-demo", "secondary spaced", 'data-channel="email"', "mail")}${action("Call Support", "support-demo", "secondary spaced", 'data-channel="phone"', "phone")}</div>`,
      { back: p ? `plan/${p.id}` : "bookings/nirantar" },
    );
  }

  Object.assign(window.JBDesign, {
    supportPage,
  });
})();

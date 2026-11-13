/* Beneficiary screen designs. Shared helpers come from components.js; samples from fixtures.js. */
(() => {
  "use strict";
  const {
    plans,
    getPlan,
    esc,
    icon,
    badge,
    page,
    notice,
    support,
  } = window.JBDesign;

  function beneficiaryPage(mode, owner = "N1") {
    const locked = mode === "locked",
      error = mode === "error",
      targetOwner = owner === "checkout" ? "checkout" : "new",
      p = locked ? plans[owner] || plans.N1 : getPlan(targetOwner);
    const fields = locked
      ? `<div class="field"><label class="form-label" for="locked-name">Beneficiary name</label><input id="locked-name" value="${esc(p.beneficiary)}" readonly></div><div class="field"><label class="form-label" for="locked-gotra">Gotra</label><input id="locked-gotra" value="${esc(p.gotra)}" readonly></div>`
      : `<form id="beneficiary-form" data-owner="${targetOwner}" novalidate><div class="field"><label class="form-label" for="edit-name">Beneficiary name</label><input id="edit-name" name="beneficiary" value="${esc(error ? "" : p.beneficiary)}" autocomplete="name" ${error ? 'aria-invalid="true" aria-describedby="edit-name-error"' : ""}>${error ? '<p class="error" id="edit-name-error">Enter the beneficiary’s full name.</p>' : ""}</div><div class="field"><label class="form-label" for="edit-gotra">Gotra</label><input id="edit-gotra" name="gotra" value="${esc(p.gotra)}"></div><button type="submit" class="button">Save Beneficiary Details</button><p id="edit-feedback" class="feedback-inline" role="alert"></p></form>`;
    return page(
      "Beneficiary Details",
      `<div class="type-row">${locked ? `<span class="lock">${icon("lock")}Locked after first seva</span>` : badge("Editable before first seva", "green", "edit")}</div><h2 class="subheading spaced">${locked ? "Details used for your seva" : "Who is this seva for?"}</h2><p class="subtext">${esc(p.name)}</p><div class="card">${fields}</div>${locked ? notice("Your first seva has been performed", "Beneficiary details can no longer be edited. Contact support to request a change for future sevas.", "", "lock") : notice("Applies to your first and future sevas", "These details can be changed until your first seva is performed. Review the name and gotra before saving.", "", "info")}${locked ? `<p class="micro muted">Past certificates and bills retain the beneficiary details used for that date.</p>${support(p.ref)}` : ""}`,
      { back: locked ? `plan/${p.id}` : `plan/${targetOwner}` },
    );
  }

  Object.assign(window.JBDesign, {
    beneficiaryPage,
  });
})();

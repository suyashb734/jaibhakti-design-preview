/* Occurrence screen designs. Shared helpers come from components.js; samples from fixtures.js. */
(() => {
  "use strict";
  const {
    getOccurrence,
    page,
    dateRail,
    badge,
    identity,
    beneficiary,
    esc,
    date,
    notice,
    timeline,
    instructions,
    assetSections,
    bill,
    rating,
    support,
  } = window.JBDesign;

  function occurrenceDetail(id) {
    const o = getOccurrence(id);
    return page(
      "Daan Seva Details",
      `${dateRail(o)}<section class="detail-hero"><div class="type-row"><span class="type-label">${o.parent ? "Nirantar" : "One time"}</span>${badge(o.status, o.status === "Performed" ? "green" : o.status === "Discontinued" ? "red" : "")}</div>${identity(o, { large: true })}${beneficiary(o)}<p class="occurrence-date">${esc(date(o.date))}</p><p class="offering">${esc(o.offering)}</p><p class="ref">Seva reference ${esc(o.ref)}</p></section>${o.status === "Discontinued" ? notice("This date was not performed", "A successful payment retry will register the next eligible seva. This missed occurrence will remain discontinued.", "red", "alert") : ""}<section class="detail-section"><h2>Seva progress</h2>${timeline(o)}</section>${o.status !== "Discontinued" ? instructions(o) : ""}${assetSections(o)}<section class="detail-section"><h2>Payment details</h2>${bill(o)}</section>${rating(o)}${support(o.ref)}`,
      {
        back:
          o.status === "Performed"
            ? "bookings/completed"
            : o.status === "Discontinued"
              ? "history/N3"
              : "bookings/upcoming",
      },
    );
  }

  Object.assign(window.JBDesign, {
    occurrenceDetail,
  });
})();

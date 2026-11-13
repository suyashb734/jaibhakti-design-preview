/* Examples screen designs. Shared helpers come from components.js; samples from fixtures.js. */
(() => {
  "use strict";
  const {
    plans,
    page,
    planCard,
    action,
  } = window.JBDesign;

  function cadencePage(longNames = false) {
    const examples = longNames
      ? [
          {
            ...plans.N1,
            id: "N1",
            beneficiary: "Venkata Subramanian Chandrasekhar Sharma",
            gotra: "Bharadwaj",
            name: "Mangalvar Sankat Mochan Laddoo Churma Daan Seva for Family Wellbeing",
          },
          {
            ...plans.N1,
            id: "N1",
            beneficiary: "Venkata Subramanian Chandrasekhar Sharma",
            gotra: "Kashyap",
          },
        ]
      : [
          plans.N1,
          {
            ...plans.N1,
            id: "N1",
            cadence: "Monthly",
            schedule: "On the 15th of each month",
            completed: 2,
            target: 6,
            unit: "sevas",
            next: "2026-11-15",
            chargeDate: "2026-11-14",
            charge: 121,
            regular: 121,
          },
          {
            ...plans.N1,
            id: "N1",
            cadence: "Every Amavasya",
            schedule: "Every Amavasya",
            completed: 3,
            target: 7,
            unit: "sevas",
            next: null,
            chargeDate: null,
            charge: 151,
            regular: 151,
          },
          {
            ...plans.N1,
            id: "N1",
            cadence: "Every Ekadashi",
            schedule: "Every Ekadashi",
            completed: 4,
            target: 7,
            unit: "sevas",
            next: null,
            chargeDate: null,
            charge: 101,
            regular: 101,
          },
        ];
    return page(
      longNames ? "Beneficiary Identification" : "Nirantar Cadences",
      `<p class="list-intro">${longNames ? "Names wrap without clipping. Gotra distinguishes beneficiaries with the same name." : "Supported schedule variants. Lunar dates appear as Gregorian dates once confirmed."}</p>${examples
        .map((p) => {
          let card = planCard(p);
          if (!p.next)
            card = card
              .replace("No upcoming seva registered", "Date being confirmed")
              .replace(
                "</article>",
                `<p class="micro muted spaced">Next seva and charge dates will be shown after confirmation. Regular amount ₹${p.regular}.</p></article>`,
              );
          if (longNames || p.cadence !== "Weekly")
            card = card.replace(
              /<a class="button[^"]*" href="#plan\/N1">[\s\S]*?<\/a>/,
              action(
                "View Details",
                "demo-feedback",
                "",
                'data-message="This is a reusable card sample. Use the main booking screens to review the connected detail flow."',
                "arrow",
              ),
            );
          return card;
        })
        .join("")}`,
      { back: "bookings/nirantar" },
    );
  }

  Object.assign(window.JBDesign, {
    cadencePage,
  });
})();

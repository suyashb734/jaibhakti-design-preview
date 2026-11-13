/* Shared design primitives and cards. Changes can affect multiple screen families. */
(() => {
  "use strict";
  const {
    historyItems,
    state,
  } = window.JBDesign;

  const esc = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const paths = {
    back: '<path d="m15 5-7 7 7 7"/>',
    arrow: '<path d="m9 5 7 7-7 7"/>',
    down: '<path d="m5 9 7 7 7-7"/>',
    menu: '<path d="M5 7h14M5 12h14M5 17h14"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    temple:
      '<path d="M4 21h16M5 18h14M6 8h12L12 3 6 8ZM8 11v7m4-7v7m4-7v7M12 3V1m0 0h4"/>',
    receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3ZM9 7h6M9 11h6M9 15h3"/>',
    repeat:
      '<path d="m17 2 4 4-4 4M3 10V8a2 2 0 0 1 2-2h16M7 22l-4-4 4-4m14 0v2a2 2 0 0 1-2 2H3"/>',
    calendar:
      '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 2v6M17 2v6M3 11h18M7 15h3m4 0h3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    alert: '<path d="m12 3 10 18H2L12 3Z"/><path d="M12 9v5m0 3h.01"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
    chat: '<path d="M21 11.5a9 9 0 0 1-13.5 7.8L3 21l1.7-4.5A9 9 0 1 1 21 11.5Z"/><path d="M8 8c1 4 2 5 6 6"/>',
    phone:
      '<path d="m8 3 3 5-2 2c1 3 2 4 5 5l2-2 5 3c-1 5-4 5-9 2S3 10 3 6c0-2 2-3 5-3Z"/>',
    video:
      '<rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 10 5-3v10l-5-3"/>',
    play: '<path d="m9 5 10 7-10 7V5Z" fill="currentColor" stroke="none"/>',
    certificate:
      '<path d="M14 21H5V3h14v10M8 7h8M8 11h6"/><circle cx="17" cy="16" r="3"/><path d="m15 19-1 3 3-1 3 1-1-3"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
    share:
      '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m9 10 6-3M9 14l6 3"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 18l-6.2 3.1L7 14.2l-5-4.9 6.9-1L12 2Z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
    pin: '<path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    globe:
      '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z"/>',
    shield:
      '<path d="m12 2 8 4v7c0 5-8 9-8 9s-8-4-8-9V6l8-4Z"/><path d="m8 12 3 3 5-6"/>',
    edit: '<path d="m15 4 5 5M4 20l5-1L21 7l-4-4L5 15l-1 5Z"/>',
    spark:
      '<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"/>',
  };
  const icon = (name, cls = "") =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.info}</svg>`;
  const temple = () => `<div class="temple-icon">${icon("temple")}</div>`;
  const button = (label, href, cls = "", ico = "") =>
    `<a class="button ${cls}" href="#${href}">${ico ? icon(ico) : ""}${esc(label)}</a>`;
  const action = (label, name, cls = "", attributes = "", ico = "") =>
    `<button class="button ${cls}" type="button" data-action="${name}" ${attributes}>${ico ? icon(ico) : ""}${esc(label)}</button>`;
  const badge = (label, cls = "", ico = "") =>
    `<span class="badge ${cls}">${ico ? icon(ico) : ""}${esc(label)}</span>`;
  const notice = (title, copy, cls = "", ico = "info") =>
    `<div class="notice ${cls}">${icon(ico)}<div>${title ? `<strong>${esc(title)}</strong>` : ""}${copy}</div></div>`;
  const date = (iso, full = true) =>
    new Intl.DateTimeFormat("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      ...(full ? { year: "numeric" } : {}),
    }).format(new Date(iso + "T06:00:00+05:30"));
  const shortDate = (iso) =>
    new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" }).format(
      new Date(iso + "T06:00:00+05:30"),
    );
  const formatted = (iso) =>
    new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso + "T06:00:00+05:30"));
  const row = (label, value, sub = "") =>
    `<div class="data-row"><span>${esc(label)}</span><strong>${esc(value)}${sub ? `<small>${esc(sub)}</small>` : ""}</strong></div>`;
  function page(
    title,
    content,
    { back = "bookings/nirantar", footer = "", end = "" } = {},
  ) {
    return `<div class="screen"><header><a href="#${back}" class="circle-button" aria-label="Back">${icon("back")}</a><h1 tabindex="-1">${esc(title)}</h1>${end ? `<div class="header-end">${end}</div>` : ""}</header><div class="body fill">${content}</div>${footer}</div>`;
  }
  function identity(p, { large = false } = {}) {
    return `<div class="identity">${temple()}<div class="identity-content"><h${large ? "2" : "3"}>${esc(p.name)}</h${large ? "2" : "3"}><p class="temple-name">${esc(p.temple)}</p></div></div>`;
  }
  function beneficiary(p) {
    return `<div class="beneficiary"><strong>For ${esc(p.beneficiary)}</strong><span class="gotra">${esc(p.gotra)} gotra</span></div>`;
  }
  function progress(p) {
    return `<div class="progress-wrap"><div class="progress-heading"><strong>Recommended sankalp</strong><span>${p.completed} of ${p.target}</span></div><div class="progress-track" role="progressbar" aria-label="Recommended milestone" aria-valuemin="0" aria-valuemax="${p.target}" aria-valuenow="${p.completed}" aria-valuetext="${p.completed} of ${p.target} recommended ${esc(p.unit)} completed"><div class="progress-fill" style="width:${Math.min(100, (p.completed / p.target) * 100)}%"></div></div><p class="progress-copy">${p.completed} of ${p.target} recommended ${esc(p.unit)} completed</p></div>`;
  }
  function paymentBadge(p) {
    return badge(
      p.status,
      p.status === "Active"
        ? "green"
        : p.status === "Payment retrying"
          ? "red"
          : "gray",
      p.status === "Active"
        ? "check"
        : p.status === "Payment retrying"
          ? "clock"
          : "info",
    );
  }
  function planCard(p) {
    const active = p.status === "Active";
    const nextLabel = p.next ? date(p.next) : "No upcoming seva registered";
    return `<article class="card ${p.status === "Payment retrying" ? "soft" : ""}" data-plan="${esc(p.id)}"><div class="type-row"><span class="type-label">Nirantar Daan Seva</span>${badge(p.cadence, "brown")}</div>${identity(p)}${beneficiary(p)}<p class="schedule">${icon("repeat")}${esc(p.schedule)}</p>${progress(p)}<div class="data-rows">${row("Next seva", nextLabel, p.next ? p.registration : "")}${row("AutoPay", p.status, active && p.chargeDate ? `₹${p.charge} on ${formatted(p.chargeDate)}` : "")}</div>${p.status === "Payment retrying" ? notice("Payment retrying", `The 10 November seva was discontinued. We will retry until ${esc(formatted(p.retryEnd))} for the next eligible seva.`, "red", "alert") : ""}${button(active ? "View Details" : p.status === "Payment retrying" ? "View Payment Details" : p.status === "Inactive" ? "Restart Nirantar Seva" : "Book This Seva Again", active || p.status === "Payment retrying" ? `plan/${p.id}` : "details", "", active ? "arrow" : "")}</article>`;
  }
  function evidenceSummary(o) {
    return `<div class="asset-status"><div>Certificate<strong class="${o.certificate === "Ready" ? "ready" : ""}">${icon(o.certificate === "Ready" ? "check" : "clock")}${esc(o.certificate)}</strong></div><div>Seva videos<strong class="${o.videos ? "ready" : ""}">${icon(o.videos ? "check" : "clock")}${o.videos ? `${o.videos} ${o.videos === 1 ? "video" : "videos"} ready` : "Preparing"}</strong></div></div>`;
  }
  function occurrenceCard(o) {
    const done = o.status === "Performed";
    return `<article class="card" data-occurrence="${esc(o.id)}"><div class="type-row"><span class="type-label">${o.parent ? "Nirantar" : "One time"}</span>${badge(done ? "Performed" : o.status, done ? "green" : "")}</div>${identity(o)}${beneficiary(o)}<p class="occurrence-date">${done ? "Performed · " : ""}${esc(date(o.date))}</p><p class="offering">${esc(o.offering)}</p>${done ? `<div class="card-footer"><span>Amount paid</span><strong>₹${o.amount}${o.intro ? " · Introductory price" : ""}</strong></div>${evidenceSummary(o)}${!o.videos && o.certificate === "Preparing" ? `<p class="micro muted spaced">Your certificate and videos will be available within 48 hours of completion.</p>` : ""}<div class="button-row">${o.videos ? button("Watch Videos", `videos/${o.id}`, "", "play") : button("View Seva Details", `occurrence/${o.id}`, "")}${o.certificate === "Ready" ? button("View Certificate", `certificate/${o.id}`, "secondary") : ""}</div>` : button("Track Seva Details", `occurrence/${o.id}`, "", "arrow")}</article>`;
  }
  function tabs(selected) {
    return `<nav class="tabs" role="tablist" aria-label="Booking categories">${[
      ["nirantar", "Nirantar Sevas"],
      ["upcoming", "Upcoming"],
      ["completed", "Completed"],
    ]
      .map(
        ([id, label]) =>
          `<button class="tab" role="tab" id="tab-${id}" aria-selected="${selected === id}" aria-controls="booking-panel" tabindex="${selected === id ? "0" : "-1"}" data-tab="${id}">${label}</button>`,
      )
      .join("")}</nav>`;
  }
  function historyRow(o) {
    const iso = o.date.split("-");
    const mon = new Intl.DateTimeFormat("en", { month: "short" }).format(
      new Date(o.date + "T06:00:00+05:30"),
    );
    return `<a class="history-item" href="#occurrence/${esc(o.id)}" aria-label="${esc(date(o.date))}, ${esc(o.status)}, for ${esc(o.beneficiary)}"><span class="history-date"><strong>${Number(iso[2])}</strong>${mon}</span><span class="history-content"><strong>${esc(date(o.date))}</strong><span>For ${esc(o.beneficiary)} · ${esc(o.gotra)} gotra</span><span>${o.status === "Performed" ? `Certificate ${o.certificate === "Ready" ? "ready" : "preparing"} · ${o.videos ? `${o.videos} videos` : "Videos preparing"}` : o.status === "Discontinued" ? "Payment unsuccessful" : esc(o.status)}</span></span>${badge(o.status, o.status === "Performed" ? "green" : o.status === "Discontinued" ? "red" : "")}${icon("arrow", "arrow")}</a>`;
  }
  function support(ref) {
    return `<section class="detail-section"><h2>Help and support</h2><div class="support-row">${button("WhatsApp Support", `support/${ref}`, "green", "chat")}${button("Email Support", `support/${ref}`, "secondary", "mail")}</div><p class="support-caption">We’ll include reference ${esc(ref)} with your request.</p></section>`;
  }
  function dateRail(o) {
    if (!o.parent) return "";
    let items = historyItems(o.parent).slice().reverse();
    items = items.filter((i) => i.date !== o.date);
    items.push(o);
    items.sort((a, b) => a.date.localeCompare(b.date));
    return `<div class="section-title" style="margin-top:0"><span class="micro muted">Nirantar Daan Seva</span><a href="#plan/${esc(o.parent)}">View booking</a></div><nav class="date-rail" aria-label="Seva dates">${items.map((i) => `<a href="#occurrence/${esc(i.id)}" class="date-pill ${i.status === "Performed" ? "done" : i.status === "Discontinued" ? "failed" : ""}" ${i.date === o.date ? 'aria-current="date"' : ""} aria-label="${esc(date(i.date))}, ${esc(i.status)}${i.date === o.date ? ", selected" : ""}">${esc(shortDate(i.date))}<small>${icon(i.status === "Performed" ? "check" : i.status === "Discontinued" ? "close" : "calendar")}${i.status === "Performed" ? "Performed" : esc(i.status)}</small></a>`).join("")}</nav>`;
  }
  function timeline(o) {
    if (o.status === "Discontinued")
      return `<ol class="timeline"><li class="failed"><span class="timeline-dot">${icon("close")}</span><div><strong>Seva discontinued</strong><p>Payment was unsuccessful for ${esc(date(o.date))}. This seva was not performed.</p></div></li></ol>`;
    const done = o.status === "Performed";
    return `<ol class="timeline"><li class="done"><span class="timeline-dot">${icon("check")}</span><div><strong>Seva booked</strong><p>Payment received · ${esc(date(o.booked))}</p></div></li><li class="${done ? "done" : o.status === "Scheduled" ? "current" : ""}"><span class="timeline-dot">${icon(done ? "check" : "calendar")}</span><div><strong>${o.status === "Registered" ? "Schedule confirmation pending" : "Seva scheduled"}</strong><p>${esc(date(o.date))}</p></div></li><li class="${done ? "done" : ""}"><span class="timeline-dot">${icon(done ? "check" : "temple")}</span><div><strong>${done ? "Seva performed" : "Seva to be performed"}</strong><p>${done ? esc(date(o.date)) + " · 9:00 AM" : "Updates will appear here after the seva."}</p></div></li></ol>`;
  }
  function instructions(o) {
    if (o.name.includes("Gajalakshmi"))
      return `<details class="details-block"><summary>${icon("info")}Seva instructions${icon("down", "chevron")}</summary><div class="details-content">Instructions will appear here once confirmed by the temple.</div></details>`;
    return `<details class="details-block"><summary>${icon("info")}Seva instructions${icon("down", "chevron")}</summary><div class="details-content">Light a diya at home on the day of seva.<br>Chant “Om Hanumate Namah” 108 times.<br>Choose sattvic food and avoid alcohol.</div></details>`;
  }
  function assetSections(o) {
    const performed = o.status === "Performed";
    if (!performed) return "";
    return `<section class="detail-section"><h2>Certificate and videos</h2>${o.certificate === "Preparing" && !o.videos ? notice("Your seva has been performed", "Your certificate and seva videos are being prepared. They will be available within 48 hours of completion.", "", "clock") : ""}<div class="card"><div class="asset-card"><span class="asset-icon">${icon("certificate")}</span><div><h3>Seva certificate</h3>${badge(o.certificate === "Ready" ? "Certificate ready" : "Preparing", o.certificate === "Ready" ? "green" : "", o.certificate === "Ready" ? "check" : "clock")}<p class="spaced">${o.certificate === "Ready" ? "Your certificate for this performed date." : "Available within 48 hours of completion."}</p></div></div>${o.certificate === "Ready" ? button("View Certificate", `certificate/${o.id}`, "secondary") : ""}</div><div class="card"><div class="asset-card"><span class="asset-icon">${icon("video")}</span><div><h3>Seva videos</h3>${badge(o.videos ? `${o.videos} videos ready` : o.overdue ? "Taking longer than expected" : "Preparing", o.videos ? "green" : o.overdue ? "red" : "", o.videos ? "check" : "clock")}<p class="spaced">${o.videos ? "Watch, download and share each video." : o.overdue ? "More than 48 hours have passed since completion. Contact support for an update." : "Available within 48 hours of completion."}</p></div></div>${o.videos ? button("Watch Videos", `videos/${o.id}`, "", "play") : o.overdue ? button("Contact Support", `support/${o.ref}`, "secondary", "chat") : ""}</div></section>`;
  }
  function bill(o) {
    if (o.status === "Discontinued")
      return `<div class="card"><p class="small muted">No payment was collected for this discontinued occurrence.</p></div>`;
    return `<details class="details-block"><summary>${icon("receipt")}Bill details · ₹${o.amount}${icon("down", "chevron")}</summary><div class="details-content"><div class="data-rows">${row("Offering", o.offering)}${row("For", o.beneficiary, o.gotra + " gotra")}${row("Seva date", date(o.date))}${row("Amount paid", `₹${o.amount}`, o.intro ? "Introductory price" : "")}${row("Reference", o.ref)}</div></div></details>`;
  }
  function rating(o) {
    if (o.status !== "Performed") return "";
    const current = state.rating[o.id] || 0;
    return `<section class="detail-section"><h2>How was your seva experience?</h2><p class="small muted">Share your experience with us.</p><div class="rating" role="group" aria-label="Rate this performed seva">${[1, 2, 3, 4, 5].map((n) => `<button type="button" data-action="rate" data-id="${esc(o.id)}" data-value="${n}" aria-label="${n} ${n === 1 ? "star" : "stars"}" aria-pressed="${current === n}" class="${n <= current ? "selected" : ""}">${icon("star")}</button>`).join("")}</div>${current ? '<p class="micro muted">Thank you for sharing your experience.</p>' : ""}</section>`;
  }

  Object.assign(window.JBDesign, {
    esc,
    icon,
    temple,
    button,
    action,
    badge,
    notice,
    date,
    shortDate,
    formatted,
    row,
    page,
    identity,
    beneficiary,
    progress,
    paymentBadge,
    planCard,
    evidenceSummary,
    occurrenceCard,
    tabs,
    historyRow,
    support,
    dateRail,
    timeline,
    instructions,
    assetSections,
    bill,
    rating,
  });
})();

(() => {
  "use strict";
  const app = document.getElementById("app");
  const capture = new URLSearchParams(location.search).has("capture");
  document.body.classList.toggle("capture", capture);
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
  const NAME = "Mangalvar Sankat Mochan Laddoo Churma Seva";
  const TEMPLE = "Shri Sankat Mochan Hanuman Mandir, Varanasi";
  const plans = {
    N1: {
      id: "N1",
      ref: "JB-N1042",
      name: NAME,
      temple: TEMPLE,
      beneficiary: "Rohit Sharma",
      gotra: "Kashyap",
      cadence: "Weekly",
      schedule: "Every Tuesday",
      completed: 4,
      target: 7,
      unit: "weeks",
      status: "Active",
      next: "2026-11-17",
      registration: "Awaiting payment",
      chargeDate: "2026-11-16",
      charge: 101,
      regular: 101,
    },
    N2: {
      id: "N2",
      ref: "JB-N1043",
      name: "Maa Gajalakshmi Kumkum Arpan Seva",
      temple: "Gajalakshmi Mata Mandir, Ujjain",
      beneficiary: "Aarav Sharma",
      gotra: "Bharadwaj",
      cadence: "Weekly",
      schedule: "Every Friday",
      completed: 3,
      target: 7,
      unit: "weeks",
      status: "Active",
      next: "2026-11-13",
      registration: "Scheduled",
      chargeDate: "2026-11-19",
      charge: 101,
      regular: 101,
    },
    N3: {
      id: "N3",
      ref: "JB-N1044",
      name: NAME,
      temple: TEMPLE,
      beneficiary: "Meera Sharma",
      gotra: "Kashyap",
      cadence: "Weekly",
      schedule: "Every Tuesday",
      completed: 3,
      target: 7,
      unit: "weeks",
      status: "Payment retrying",
      next: "2026-11-17",
      registration: "Awaiting payment",
      retryEnd: "2026-11-20",
      charge: 101,
      regular: 101,
    },
  };
  const occurrences = {
    U1: {
      id: "U1",
      ref: "JB-S2041",
      parent: "N2",
      name: plans.N2.name,
      temple: plans.N2.temple,
      beneficiary: "Aarav Sharma",
      gotra: "Bharadwaj",
      date: "2026-11-13",
      booked: "2026-11-12",
      status: "Scheduled",
      offering: "1 × Kumkum arpan",
      amount: 101,
      certificate: "Preparing",
      videos: 0,
    },
    U2: {
      id: "U2",
      ref: "JB-S2042",
      name: "Laddoo Churma Arpan",
      temple: TEMPLE,
      beneficiary: "Kavita Sharma",
      gotra: "Vashishtha",
      date: "2026-11-14",
      booked: "2026-11-11",
      status: "Scheduled",
      offering: "1 × Laddoo churma arpan",
      amount: 151,
      certificate: "Preparing",
      videos: 0,
    },
    C1: {
      id: "C1",
      ref: "JB-S2038",
      parent: "N1",
      name: NAME,
      temple: TEMPLE,
      beneficiary: "Rohit Sharma",
      gotra: "Kashyap",
      date: "2026-11-10",
      booked: "2026-11-09",
      status: "Performed",
      offering: "1 × Laddoo churma arpan",
      amount: 101,
      certificate: "Ready",
      videos: 2,
    },
    C2: {
      id: "C2",
      ref: "JB-S2040",
      name: "Laddoo Churma Arpan",
      temple: TEMPLE,
      beneficiary: "Kavita Sharma",
      gotra: "Vashishtha",
      date: "2026-11-12",
      booked: "2026-11-11",
      status: "Performed",
      offering: "1 × Laddoo churma arpan",
      amount: 151,
      certificate: "Preparing",
      videos: 0,
    },
    C3: {
      id: "C3",
      ref: "JB-S2028",
      parent: "N1",
      name: NAME,
      temple: TEMPLE,
      beneficiary: "Rohit Sharma",
      gotra: "Kashyap",
      date: "2026-10-27",
      booked: "2026-10-26",
      status: "Performed",
      offering: "1 × Laddoo churma arpan",
      amount: 101,
      certificate: "Ready",
      videos: 2,
    },
    C4: {
      id: "C4",
      ref: "JB-S2021",
      parent: "N1",
      name: NAME,
      temple: TEMPLE,
      beneficiary: "Rohit Sharma",
      gotra: "Kashyap",
      date: "2026-10-20",
      booked: "2026-10-19",
      status: "Performed",
      offering: "1 × Laddoo churma arpan",
      amount: 51,
      intro: true,
      certificate: "Ready",
      videos: 1,
    },
    C5: {
      id: "C5",
      ref: "JB-S2032",
      parent: "N1",
      name: NAME,
      temple: TEMPLE,
      beneficiary: "Rohit Sharma",
      gotra: "Kashyap",
      date: "2026-11-03",
      booked: "2026-11-02",
      status: "Performed",
      offering: "1 × Laddoo churma arpan",
      amount: 101,
      certificate: "Ready",
      videos: 2,
    },
    F1: {
      id: "F1",
      ref: "JB-S2035",
      parent: "N2",
      name: plans.N2.name,
      temple: plans.N2.temple,
      beneficiary: "Aarav Sharma",
      gotra: "Bharadwaj",
      date: "2026-11-06",
      booked: "2026-11-05",
      status: "Performed",
      offering: "1 × Kumkum arpan",
      amount: 101,
      certificate: "Ready",
      videos: 1,
    },
    F2: {
      id: "F2",
      ref: "JB-S2030",
      parent: "N2",
      name: plans.N2.name,
      temple: plans.N2.temple,
      beneficiary: "Aarav Sharma",
      gotra: "Bharadwaj",
      date: "2026-10-30",
      booked: "2026-10-29",
      status: "Performed",
      offering: "1 × Kumkum arpan",
      amount: 101,
      certificate: "Ready",
      videos: 2,
    },
    F3: {
      id: "F3",
      ref: "JB-S2024",
      parent: "N2",
      name: plans.N2.name,
      temple: plans.N2.temple,
      beneficiary: "Aarav Sharma",
      gotra: "Bharadwaj",
      date: "2026-10-23",
      booked: "2026-10-22",
      status: "Performed",
      offering: "1 × Kumkum arpan",
      amount: 51,
      intro: true,
      certificate: "Ready",
      videos: 1,
    },
    D1: {
      id: "D1",
      ref: "JB-S2039",
      parent: "N3",
      name: NAME,
      temple: TEMPLE,
      beneficiary: "Meera Sharma",
      gotra: "Kashyap",
      date: "2026-11-10",
      status: "Discontinued",
      offering: "1 × Laddoo churma arpan",
      amount: 0,
      certificate: null,
      videos: 0,
    },
  };
  const completed = Object.values(occurrences)
    .filter((o) => o.status === "Performed")
    .sort((a, b) => b.date.localeCompare(a.date));
  const upcoming = [occurrences.U1, occurrences.U2];
  const state = {
    completedLimit: 3,
    selectedVideo: 1,
    rating: {},
    form: { name: "", gotra: "", phone: "" },
    otpSent: false,
    verified: false,
    otpError: "",
    edit: { name: "Aarav Sharma", gotra: "Bharadwaj" },
    formErrors: {},
  };
  let currentRoute = "home";
  const frames = [
    ["Main screens", "home", "01_Home", "Home"],
    ["Main screens", "profile", "02_Profile", "Profile"],
    [
      "My Bookings",
      "bookings/nirantar",
      "03_Bookings_Nirantar",
      "Option A · Nirantar",
    ],
    [
      "My Bookings",
      "bookings/upcoming",
      "04_Bookings_Upcoming",
      "Option A · Upcoming",
    ],
    [
      "My Bookings",
      "bookings/completed",
      "05_Bookings_Completed",
      "Option A · Completed",
    ],
    ["My Bookings", "sections", "06_Bookings_Sections", "Option B · Sections"],
    [
      "Nirantar detail",
      "plan/N1",
      "07_Nirantar_Active",
      "Active · Awaiting next payment",
    ],
    [
      "Nirantar detail",
      "plan/N2",
      "08_Nirantar_Registered",
      "Active · Next seva scheduled",
    ],
    ["Nirantar detail", "plan/N3", "09_Nirantar_Retrying", "Payment retrying"],
    ["Nirantar detail", "plan/inactive", "10_Nirantar_Inactive", "Inactive"],
    ["Nirantar detail", "plan/cancelled", "11_Nirantar_Cancelled", "Cancelled"],
    [
      "Nirantar detail",
      "plan/milestone",
      "12_Nirantar_Milestone",
      "Milestone · 7 of 14",
    ],
    [
      "Nirantar detail",
      "plan/new",
      "13_Nirantar_Before_First",
      "Before the first seva",
    ],
    [
      "Nirantar detail",
      "plan/sync",
      "14_Nirantar_Synchronizing",
      "Status synchronizing",
    ],
    [
      "Nirantar detail",
      "history/N1",
      "15_Occurrence_History",
      "Full date history",
    ],
    [
      "Nirantar detail",
      "history/N3",
      "16_Discontinued_History",
      "History · Discontinued date",
    ],
    ["Dated seva", "occurrence/U1", "17_Occurrence_Scheduled", "Scheduled"],
    [
      "Dated seva",
      "occurrence/registered",
      "18_Occurrence_Registered",
      "Registered",
    ],
    [
      "Dated seva",
      "occurrence/U2",
      "19_Occurrence_One_Time",
      "One time scheduled",
    ],
    [
      "Dated seva",
      "occurrence/C1",
      "20_Occurrence_Completed",
      "Performed · Evidence ready",
    ],
    [
      "Dated seva",
      "occurrence/C2",
      "21_Occurrence_Preparing",
      "Performed · Evidence preparing",
    ],
    [
      "Dated seva",
      "occurrence/partial-certificate",
      "22_Certificate_Ready_Only",
      "Certificate ready only",
    ],
    [
      "Dated seva",
      "occurrence/partial-video",
      "23_Videos_Ready_Only",
      "Videos ready only",
    ],
    [
      "Dated seva",
      "occurrence/D1",
      "24_Occurrence_Discontinued",
      "Discontinued",
    ],
    ["Dated seva", "occurrence/overdue", "25_Media_Overdue", "Media overdue"],
    [
      "Evidence",
      "certificate/C1",
      "26_Certificate_Viewer",
      "Certificate viewer",
    ],
    ["Evidence", "videos/C1", "27_Video_Viewer", "In app video player"],
    [
      "Evidence",
      "videos/mixed",
      "28_Videos_Partial_Readiness",
      "Several videos · Partial readiness",
    ],
    ["Evidence", "videos/error", "29_Video_Error", "Video loading error"],
    [
      "Beneficiary",
      "beneficiary/edit",
      "30_Edit_Beneficiary",
      "Edit before first seva",
    ],
    [
      "Beneficiary",
      "beneficiary/locked",
      "31_Beneficiary_Locked",
      "Locked after first seva",
    ],
    [
      "Beneficiary",
      "beneficiary/error",
      "32_Beneficiary_Validation",
      "Validation error",
    ],
    [
      "Details and payment",
      "details",
      "33_Your_Details",
      "Enter beneficiary details",
    ],
    [
      "Details and payment",
      "details/otp",
      "34_Verify_Phone",
      "Phone verification",
    ],
    [
      "Details and payment",
      "review",
      "35_Review_Payment",
      "Review and payment disclosure",
    ],
    [
      "Details and payment",
      "payment/processing",
      "36_Payment_Processing",
      "Payment processing",
    ],
    [
      "Details and payment",
      "payment/pending",
      "37_Registration_Pending",
      "Awaiting confirmation",
    ],
    [
      "Details and payment",
      "payment/failed",
      "38_Payment_Failed",
      "Payment failed",
    ],
    [
      "Details and payment",
      "payment/success",
      "39_Booking_Confirmed",
      "Confirmed after payment",
    ],
    [
      "Additional states",
      "empty/nirantar",
      "40_Empty_Nirantar",
      "No Nirantar bookings",
    ],
    [
      "Additional states",
      "empty/upcoming",
      "41_Empty_Upcoming",
      "No upcoming sevas",
    ],
    [
      "Additional states",
      "empty/completed",
      "42_Empty_Completed",
      "No completed sevas",
    ],
    ["Additional states", "loading/nirantar", "43_Loading", "Loading"],
    ["Additional states", "error/nirantar", "44_Load_Error", "Unable to load"],
    [
      "Additional states",
      "components/cadences",
      "45_Cadence_Variants",
      "Monthly and lunar cadences",
    ],
    [
      "Additional states",
      "support/N1",
      "46_Support",
      "Support with booking reference",
    ],
    [
      "Additional states",
      "plan/retry-success",
      "47_Retry_Success",
      "Successful retry · Next eligible date",
    ],
    [
      "Additional states",
      "history/older",
      "48_Older_Certificate",
      "Older certificate discoverability",
    ],
    [
      "Additional states",
      "components/long-names",
      "49_Long_Beneficiary_Names",
      "Long names and gotra",
    ],
  ];
  window.designFrames = frames.map(([group, route, file, title]) => ({
    group,
    route,
    file,
    title,
  }));

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
  function bookings(category = "nirantar", special = "") {
    let content = "";
    if (special === "empty") {
      const empties = {
        nirantar: [
          "Your Nirantar journey starts here",
          "You do not have an active Nirantar Daan Seva yet.",
          "Explore Nirantar Sevas",
        ],
        upcoming: [
          "No upcoming sevas",
          "No Daan Sevas are currently scheduled.",
          "Explore Sevas",
        ],
        completed: [
          "Your seva memories will be here",
          "Your completed Daan Sevas will appear here with certificates and videos.",
          "",
        ],
      };
      const [title, copy, cta] = empties[category];
      content = `<div class="empty-state"><div class="empty-icon">${icon(category === "completed" ? "certificate" : "temple")}</div><h2>${title}</h2><p>${copy}</p>${cta ? button(cta, "home") : ""}</div>`;
    } else if (special === "loading") {
      content = `<p class="loading-label" role="status">Loading your Nirantar Sevas…</p><div aria-hidden="true">${[1, 2].map(() => '<div class="card"><div class="skeleton big"></div><div class="skeleton wide"></div><div class="skeleton half"></div><div class="skeleton wide"></div><div class="skeleton wide spaced"></div><div class="skeleton half"></div><div class="skeleton wide"></div></div>').join("")}</div>`;
    } else if (special === "error") {
      content = `<div class="empty-state"><div class="empty-icon">${icon("alert")}</div><h2>We couldn’t load your bookings</h2><p>Your bookings are safe. Check your connection and try again.</p>${button("Try Again", `bookings/${category}`)}</div>`;
    } else if (category === "nirantar") {
      content = `<p class="list-intro"><strong>3 ongoing sevas</strong> · Your sankalp continues until you cancel AutoPay in your UPI app.</p>${notice("1 seva needs payment attention", '<a href="#plan/N3">View Meera Sharma’s payment details</a>', "red", "alert")}${Object.values(plans).map(planCard).join("")}`;
    } else if (category === "upcoming") {
      content = `<p class="list-intro"><strong>2 upcoming sevas</strong> · Nearest date first. Only registered or scheduled sevas appear here.</p>${upcoming.map(occurrenceCard).join("")}`;
    } else {
      const shown = completed.slice(0, state.completedLimit);
      content = `<p class="list-intro"><strong>${completed.length} completed sevas</strong> · Each date has its own certificate and videos.</p>${shown.map(occurrenceCard).join("")}${state.completedLimit < completed.length ? action("Load Older Sevas", "older", "secondary") : ""}<p class="list-end">Showing ${shown.length} of ${completed.length} performed sevas</p>`;
    }
    return `<div class="screen"><header><a href="#home" class="circle-button" aria-label="Back to Home">${icon("back")}</a><h1 tabindex="-1">My Bookings</h1></header>${tabs(category)}<div class="body fill" role="tabpanel" id="booking-panel" aria-labelledby="tab-${category}">${content}</div></div>`;
  }
  function sections() {
    return page(
      "My Bookings",
      `<p class="list-intro">Your ongoing sevas, upcoming dates and completed memories.</p><div class="section-summary"><div><strong>3</strong>Nirantar</div><div><strong>2</strong>Upcoming</div><div><strong>8</strong>Completed</div></div>${notice("1 seva needs payment attention", '<a href="#plan/N3">Meera Sharma · View payment details</a>', "red", "alert")}<div class="section-title"><h2>Nirantar Sevas</h2><a href="#bookings/nirantar">View all 3</a></div>${planCard(plans.N1)}<div class="section-title"><h2>Upcoming Sevas</h2><a href="#bookings/upcoming">View all 2</a></div>${occurrenceCard(occurrences.U1)}<div class="section-title"><h2>Completed Sevas</h2><a href="#bookings/completed">View all 8</a></div>${occurrenceCard(occurrences.C2)}`,
      { back: "home" },
    );
  }
  function home() {
    return `<div class="screen"><header class="home-header"><button type="button" class="circle-button" data-action="navigation" aria-label="Open navigation">${icon("menu")}</button><div class="home-brand jb-brand" aria-label="Jai Bhakti"><img src="../../assets/brand/temple-mark.svg" alt=""/><span lang="hi">जय भक्ति</span></div><a href="#bookings/nirantar" class="home-bookings">${icon("receipt")}My Bookings</a></header><div class="body"><section class="hero-panel"><p class="eyebrow">Shukravar special</p><h1>Maa Gajalakshmi</h1><p>A weekly offering of devotion<br>Kumkum arpan at Ujjain</p><span class="hero-place">Gajalakshmi Mata Mandir, Ujjain</span>${icon("temple", "hero-temple")}</section><p class="trust-line">${icon("shield")}Vedic rituals by authorised pandits</p><h2 class="home-section-title">Sacred sevas at the<br>temples of Bharat</h2><article class="card home-offering"><div class="offering-banner">${icon("temple")}<div><strong>Gajalakshmi<br>Mata Mandir</strong><span>Shukravar special · Ujjain</span></div></div><div class="offering-body"><h3>Maa Gajalakshmi Kumkum Arpan Seva</h3><div class="type-row">${badge("Nirantar Daan Seva", "brown")}${badge("Weekly")}</div><p class="small muted">Every Friday · Next seva ${esc(shortDate("2026-11-13"))} 2026</p><div class="price-block"><div class="price-line"><strong>₹51</strong><span>for your first Daan Seva</span></div><p>Then <b>₹101 every Friday</b> until cancelled in your UPI app.</p></div>${button("Book This Seva", "details", "", "arrow")}</div></article><p class="list-end">Seva for you and your loved ones.</p></div></div>`;
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
  function getPlan(id) {
    if (plans[id]) return plans[id];
    if (id === "checkout") {
      const p = checkoutIdentity();
      return {
        ...plans.N2,
        ...p,
        id: "checkout",
        ref: "JB-N1046",
        completed: 0,
        registration: "Registered",
        editable: true,
      };
    }
    if (id === "new")
      return {
        ...plans.N1,
        id: "new",
        ref: "JB-N1045",
        beneficiary: state.edit.name,
        gotra: state.edit.gotra,
        completed: 0,
        charge: 51,
        editable: true,
      };
    if (id === "milestone")
      return {
        ...plans.N1,
        id,
        base: "milestone",
        completed: 7,
        target: 14,
        milestone: true,
      };
    if (id === "inactive" || id === "cancelled")
      return {
        ...plans.N3,
        id,
        base: "N3",
        status: id === "inactive" ? "Inactive" : "Cancelled",
        next: null,
        chargeDate: null,
      };
    if (id === "sync")
      return {
        ...plans.N3,
        id,
        base: "N3",
        status: "Cancelled",
        next: null,
        sync: true,
      };
    if (id === "retry-success")
      return {
        ...plans.N3,
        id,
        base: "retry-success",
        status: "Active",
        registration: "Registered",
        retrySuccess: true,
        chargeDate: "2026-11-23",
      };
    return plans.N1;
  }
  function historyItems(id) {
    if (id === "milestone")
      return [
        ...historyItems("N1").map((o) => ({
          ...o,
          id: "LM-" + o.id,
          parent: "milestone",
          amount: 101,
          intro: false,
        })),
        ...["2026-10-13", "2026-10-06", "2026-09-29"].map((d, i) => ({
          ...occurrences.C4,
          id: "LM-X" + i,
          parent: "milestone",
          ref: "JB-S" + (2018 - i),
          date: d,
          booked: d,
          amount: i === 2 ? 51 : 101,
          intro: i === 2,
        })),
      ].sort((a, b) => b.date.localeCompare(a.date));
    if (id === "retry-success")
      return [getOccurrence("retry-success"), ...historyItems("N3")];
    if (id === "N3")
      return [
        occurrences.D1,
        ...["2026-11-03", "2026-10-27", "2026-10-20"].map((d, i) => ({
          ...occurrences.C5,
          id: `M${i}`,
          ref: `JB-M${i + 2020}`,
          parent: "N3",
          beneficiary: "Meera Sharma",
          gotra: "Kashyap",
          date: d,
          amount: i === 2 ? 51 : 101,
          intro: i === 2,
        })),
      ];
    return Object.values(occurrences)
      .filter((o) => o.parent === (id === "N2" ? "N2" : "N1"))
      .sort((a, b) => b.date.localeCompare(a.date));
  }
  function historyRow(o) {
    const iso = o.date.split("-");
    const mon = new Intl.DateTimeFormat("en", { month: "short" }).format(
      new Date(o.date + "T06:00:00+05:30"),
    );
    return `<a class="history-item" href="#occurrence/${esc(o.id)}" aria-label="${esc(date(o.date))}, ${esc(o.status)}, for ${esc(o.beneficiary)}"><span class="history-date"><strong>${Number(iso[2])}</strong>${mon}</span><span class="history-content"><strong>${esc(date(o.date))}</strong><span>For ${esc(o.beneficiary)} · ${esc(o.gotra)} gotra</span><span>${o.status === "Performed" ? `Certificate ${o.certificate === "Ready" ? "ready" : "preparing"} · ${o.videos ? `${o.videos} videos` : "Videos preparing"}` : o.status === "Discontinued" ? "Payment unsuccessful" : esc(o.status)}</span></span>${badge(o.status, o.status === "Performed" ? "green" : o.status === "Discontinued" ? "red" : "")}${icon("arrow", "arrow")}</a>`;
  }
  function planDetail(id) {
    const p = getPlan(id),
      isEnded = ["Inactive", "Cancelled"].includes(p.status),
      historyOwner = plans[id] ? id : p.base || "N1",
      hist = historyItems(historyOwner);
    let statusNotice = "";
    if (p.status === "Payment retrying")
      statusNotice = notice(
        "Your payment is being retried",
        `The seva on 10 November was discontinued because payment was unsuccessful. We will retry until <b>${formatted(p.retryEnd)}</b> for the next eligible seva.`,
        "red",
        "alert",
      );
    if (p.status === "Inactive")
      statusNotice = notice(
        "This Nirantar Daan Seva is inactive",
        "Payment could not be completed within the retry window. Restart to continue with a new UPI AutoPay mandate.",
        "red",
        "alert",
      );
    if (p.status === "Cancelled")
      statusNotice = notice(
        "AutoPay cancelled",
        "AutoPay was cancelled in your UPI app. Your past seva records and evidence remain available.",
        "neutral",
        "info",
      );
    if (p.sync)
      statusNotice += notice(
        "Updating your AutoPay status",
        "Showing the last confirmed status while we check for an update.",
        "neutral",
        "repeat",
      );
    if (p.retrySuccess)
      statusNotice = notice(
        "Payment received for the next eligible seva",
        "You are registered for 17 November. The missed seva on 10 November remains discontinued.",
        "green",
        "check",
      );
    const paymentRows = `${row("Status", p.status)}${!isEnded ? row("Next AutoPay", `₹${p.charge}`, p.chargeDate ? formatted(p.chargeDate) : "Retrying until " + formatted(p.retryEnd)) : ""}${row("First seva", "₹51", "Introductory price")}${row("Regular amount", `₹${p.regular}`, p.schedule)}${p.status === "Payment retrying" ? row("Retry ends", formatted(p.retryEnd)) : ""}`;
    return page(
      "Nirantar Daan Seva",
      `<section class="detail-hero"><div class="type-row">${badge(p.cadence, "brown")}${paymentBadge(p)}</div>${identity(p, { large: true })}${beneficiary(p)}<p class="schedule">${icon("repeat")}${esc(p.schedule)}</p><p class="ref">Booking reference ${esc(p.ref)}</p></section>${statusNotice}<section class="detail-section"><h2>Your recommended sankalp</h2><div class="card">${p.milestone ? notice("7 week sankalp completed", "You are continuing toward the recommended 14 week sankalp.", "green", "spark") : ""}${progress(p)}<p class="micro muted">Your Nirantar Daan Seva continues until you cancel AutoPay in your UPI app. Milestones are recommendations.</p></div></section><section class="detail-section"><h2>Next seva</h2><div class="card">${isEnded ? `<p>No upcoming seva is registered.</p>` : `<p class="value">${esc(date(p.next))}</p><div class="type-row spaced">${badge(p.registration, p.registration === "Scheduled" || p.registration === "Registered" ? "green" : "")}</div><p class="micro muted">${p.registration === "Awaiting payment" ? "This date will appear in Upcoming after payment and registration are confirmed." : "This is a dated seva with its own tracking and evidence."}</p>${p.id === "N2" ? button("Track Seva Details", "occurrence/U1", "", "arrow") : p.retrySuccess ? button("Track Seva Details", "occurrence/retry-success", "", "arrow") : ""}`}</div></section><section class="detail-section"><h2>AutoPay and billing</h2><div class="card"><div class="data-rows">${paymentRows}</div>${!isEnded ? `<p class="micro muted spaced">You can cancel at any time through your UPI app.</p>` : ""}${isEnded ? button(p.status === "Inactive" ? "Restart Nirantar Seva" : "Book This Seva Again", "details", "", "repeat") : ""}</div></section><section class="detail-section"><div class="section-title"><h2>Seva history</h2>${!p.editable ? `<a href="#history/${historyOwner}">View all</a>` : ""}</div>${p.editable ? `<div class="card"><p class="small muted">Your performed sevas will appear here.</p></div>` : `<div class="card history-list">${hist.slice(0, 3).map(historyRow).join("")}</div>`}</section><section class="detail-section"><h2>Beneficiary details</h2><div class="card"><div class="edit-row"><div><p class="value">For ${esc(p.beneficiary)}</p><p class="small muted">${esc(p.gotra)} gotra</p></div>${p.editable ? icon("edit") : `<span class="lock">${icon("lock")}Locked</span>`}</div><p class="micro muted spaced">${p.editable ? "You can update these details before your first seva is performed." : "The first seva has been performed. Contact support to request a change for future sevas."}</p>${button(p.editable ? "Edit Beneficiary" : "Request a Change", p.editable ? `beneficiary/edit/${p.id}` : `beneficiary/locked/${historyOwner}`, "secondary")}</div></section>${support(p.ref)}`,
      { back: "bookings/nirantar" },
    );
  }
  function historyPage(id) {
    const p = getPlan(id === "older" ? "N1" : id),
      items = historyItems(id === "older" ? "N1" : id);
    return page(
      "Seva History",
      `<p class="eyebrow">Nirantar Daan Seva · ${esc(p.schedule)}</p><h2 class="subheading spaced">For ${esc(p.beneficiary)}</h2><p class="subtext">${esc(p.gotra)} gotra · ${esc(p.ref)}</p><p class="list-intro">Each date keeps its own bill, certificate and videos. Discontinued dates remain in your history.</p><div class="card history-list">${items.map(historyRow).join("")}</div>`,
      { back: `plan/${p.id}` },
    );
  }
  function getOccurrence(id) {
    if (occurrences[id]) return occurrences[id];
    if (id.startsWith("LM-"))
      return (
        historyItems("milestone").find((o) => o.id === id) || occurrences.C1
      );
    if (/^M\d$/.test(id)) return historyItems("N3").find((o) => o.id === id);
    if (id === "checkout") {
      const p = checkoutIdentity();
      return {
        ...occurrences.U1,
        ...p,
        id: "checkout",
        ref: "JB-S2043",
        parent: "checkout",
        amount: 51,
        intro: true,
        status: "Registered",
      };
    }
    if (id === "registered")
      return { ...occurrences.U1, id, status: "Registered" };
    if (id === "retry-success")
      return {
        ...occurrences.U1,
        id,
        parent: "retry-success",
        beneficiary: "Meera Sharma",
        gotra: "Kashyap",
        name: NAME,
        temple: TEMPLE,
        date: "2026-11-17",
        status: "Registered",
      };
    if (id === "partial-certificate")
      return { ...occurrences.C2, id, certificate: "Ready" };
    if (id === "partial-video") return { ...occurrences.C2, id, videos: 2 };
    if (id === "overdue")
      return { ...occurrences.C1, id, videos: 0, overdue: true };
    if (id === "mixed")
      return { ...occurrences.C1, id, videos: 1, mixed: true };
    if (id === "error") return { ...occurrences.C1, id, videoError: true };
    return occurrences.C1;
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

  function certificatePage(id) {
    const o = getOccurrence(id);
    return page(
      "Seva Certificate",
      `<p class="eyebrow">${esc(date(o.date))} · Performed</p><div class="certificate-paper"><div class="temple-icon">${icon("temple")}</div><p class="eyebrow">Jai Bhakti</p><h2>Certificate of<br>Daan Seva</h2><p>This seva was performed for</p><div class="devotee">${esc(o.beneficiary)}</div><p>${esc(o.gotra)} gotra</p><p class="cert-seva">${esc(o.name)}</p><p>${esc(o.temple)}</p><p class="spaced">${esc(formatted(o.date))}</p><p class="cert-ref">Seva reference ${esc(o.ref)}</p><p class="cert-sample">Sample certificate</p></div><p class="small muted">This certificate belongs to the seva performed on ${esc(formatted(o.date))}.</p><div class="button-row">${action("Download", "certificate-download", "", 'data-id="' + esc(o.id) + '"', "download")}${action("Share", "asset-share", "secondary", 'data-id="' + esc(o.id) + '" data-kind="certificate"', "share")}</div><div class="section-title"><h2>Seva videos</h2></div><div class="card"><p class="small">${o.videos ? `${o.videos} videos are ready for this date.` : "Your seva videos are being prepared."}</p>${o.videos ? button("Watch Videos", `videos/${o.id}`, "secondary", "play") : '<p class="micro muted spaced">Available within 48 hours of completion.</p>'}</div>`,
      { back: `occurrence/${o.id}` },
    );
  }
  function videoPage(id) {
    const o = getOccurrence(id),
      selected = state.selectedVideo,
      total = o.mixed ? 2 : Math.max(1, o.videos),
      preparing = o.mixed && selected === 2,
      failed = o.videoError && selected === 1;
    const player = preparing
      ? `<div class="video-frame">${icon("clock", "scene-icon")}</div>${notice("Video 2 is being prepared", "Video 1 is ready to watch, download and share. Video 2 will be available within 48 hours of completion.", "", "clock")}`
      : failed
        ? `<div class="video-frame">${icon("alert", "scene-icon")}</div>${notice("This video couldn’t be loaded", "Try again or choose Video 2. Your ready certificate and other video remain available.", "red", "alert")}${action("Try Video Again", "retry-video", "secondary")}`
        : `<video class="video-frame" controls playsinline preload="metadata" poster="assets/video-preview.svg" aria-label="Seva video ${selected} of ${total} for ${esc(o.beneficiary)} on ${esc(formatted(o.date))}"><source src="assets/sample-seva-preview.webm" type="video/webm">Your browser does not support this video. Use Download to save it.</video>`;
    return page(
      "Seva Videos",
      `<p class="eyebrow">${esc(date(o.date))} · Performed</p><h2 class="subheading">For ${esc(o.beneficiary)}</h2><p class="subtext">${esc(o.gotra)} gotra · ${esc(o.ref)}</p>${player}<h3 class="video-title">Seva video ${selected} of ${total}</h3><p class="video-caption">${esc(o.name)}<br>${esc(o.temple)}</p><div class="video-selector" role="group" aria-label="Choose a seva video">${Array.from({ length: total }, (_, i) => `<button type="button" data-action="choose-video" data-value="${i + 1}" aria-pressed="${selected === i + 1}" aria-label="Seva video ${i + 1} of ${total}${o.mixed && i === 1 ? ", preparing" : ""}">Video ${i + 1}${o.mixed && i === 1 ? " · Preparing" : ""}</button>`).join("")}</div>${!preparing && !failed ? `<div class="button-row"><a class="button" href="assets/sample-seva-preview.webm" download="sample-seva-video-${selected}.webm">${icon("download")}Download</a>${action("Share", "asset-share", "secondary", 'data-id="' + esc(o.id) + '" data-kind="video"', "share")}</div>` : ""}<section class="detail-section"><h2>Seva certificate</h2><div class="card"><div class="asset-card"><span class="asset-icon">${icon("certificate")}</span><div><h3>${o.certificate === "Ready" ? "Certificate ready" : "Certificate being prepared"}</h3><p>${o.certificate === "Ready" ? "Available independently of your videos." : "Available within 48 hours of completion."}</p></div></div>${o.certificate === "Ready" ? button("View Certificate", `certificate/${o.id}`, "secondary") : ""}</div></section>${support(o.ref)}`,
      { back: `occurrence/${o.id}` },
    );
  }
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
  function checkoutIdentity() {
    return {
      name: "Maa Gajalakshmi Kumkum Arpan Seva",
      temple: "Gajalakshmi Mata Mandir, Ujjain",
      beneficiary: state.form.name || "Aarav Sharma",
      gotra: state.form.gotra || "Bharadwaj",
    };
  }
  function detailsPage(variant = "") {
    const otp = variant === "otp" || state.otpSent,
      errors = state.formErrors;
    const name = state.form.name || (variant === "otp" ? "Aarav Sharma" : ""),
      gotra = state.form.gotra || (variant === "otp" ? "Bharadwaj" : ""),
      phone = state.form.phone || (variant === "otp" ? "9000000000" : "");
    const input = (id, label, value, placeholder, key) =>
      `<div class="field"><label class="form-label" for="${id}">${label}</label><input id="${id}" name="${key}" value="${esc(value)}" placeholder="${placeholder}" ${key === "name" ? 'autocomplete="name"' : ""} ${errors[key] ? `aria-invalid="true" aria-describedby="error-${key}"` : ""}>${errors[key] ? `<p class="error" id="error-${key}">${esc(errors[key])}</p>` : ""}</div>`;
    return page(
      "Your Seva Details",
      `<div class="card">${identity(checkoutIdentity())}<p class="schedule">${icon("calendar")}Fri, 13 Nov 2026 · Weekly</p></div><h2 class="subheading">Who is this seva for?</h2><p class="subtext">We’ll use this name and gotra for your seva and certificate.</p><form id="details-form" novalidate><div class="card">${input("beneficiary-name", "Beneficiary name", name, "Enter full name", "name")}${input("beneficiary-gotra", "Gotra", gotra, "e.g. Bharadwaj", "gotra")}<div class="field"><label class="form-label" for="phone-number">Phone number</label><div class="phone-input"><span>+91</span><input id="phone-number" name="phone" type="tel" inputmode="numeric" autocomplete="tel-national" value="${esc(phone)}" maxlength="10" placeholder="Enter 10-digit number" ${errors.phone ? 'aria-invalid="true" aria-describedby="error-phone"' : ""}></div>${errors.phone ? `<p class="error" id="error-phone">${esc(errors.phone)}</p>` : ""}<p class="help">For booking and seva updates.</p></div>${!otp ? '<button type="button" class="button secondary" data-action="send-otp">Verify Phone Number</button>' : `<div class="notice green">${icon("check")}<div><strong>Verification code requested</strong>Enter the 4 digit code to continue.</div></div><div class="field"><label class="form-label" for="verification-code">Verification code</label><input id="verification-code" name="otp" inputmode="numeric" autocomplete="one-time-code" maxlength="4" placeholder="Enter 4-digit code" ${state.otpError ? 'aria-invalid="true" aria-describedby="otp-error"' : ""}>${state.otpError ? `<p class="error" id="otp-error">${esc(state.otpError)}</p>` : ""}</div><button type="button" class="text-button" data-action="resend-otp">Resend code</button>`}</div><p class="micro muted">Review these details before confirming AutoPay. You can edit them before the first seva is performed.</p><button type="submit" class="button spaced">Review Seva and Payment ${icon("arrow")}</button><p id="details-feedback" class="feedback-inline" role="alert"></p></form>`,
      { back: "home" },
    );
  }
  function reviewPage() {
    const p = checkoutIdentity();
    return page(
      "Review Your Daan Seva",
      `<div class="type-row">${badge("Nirantar Daan Seva", "brown")}${badge("Weekly")}</div><div class="card">${identity(p)}<p class="schedule">${icon("calendar")}First seva · Fri, 13 Nov 2026</p><p class="schedule">${icon("repeat")}Then every Friday</p><div class="review-beneficiary"><span>Seva for</span><strong>${esc(p.beneficiary)}</strong><span>${esc(p.gotra)} gotra</span></div><a class="text-button" href="#details">Edit beneficiary details</a></div><div class="card"><h2 class="subheading" style="font-size:16px">Your payment</h2><div class="review-amount"><span>First Daan Seva<br>Introductory price</span><strong>₹51</strong></div><div class="data-rows">${row("Then every Friday", "₹101", "Until cancelled in your UPI app")}${row("Next regular charge", "₹101 on 19 Nov 2026", "For the seva on 20 November")}</div></div>${notice("Your booking is confirmed after payment", "We will confirm your seva once payment and registration are successful.", "", "info")}`,
      {
        back: "details",
        footer: `<div class="checkout-footer"><p class="disclosure"><strong>First Daan Seva ₹51 · Then ₹101 every Friday</strong><br>Continues until cancelled in your UPI app.</p><label class="consent"><input id="autopay-consent" type="checkbox"><span>I agree to set up UPI AutoPay for these amounts and this schedule.</span></label>${action("Pay ₹51 and Set Up AutoPay", "start-payment", "", "", "shield")}<p id="payment-consent-error" class="feedback-inline" role="alert"></p></div>`,
      },
    );
  }
  function paymentPage(status) {
    const p = checkoutIdentity();
    const config = {
      processing: [
        "Confirming your payment",
        "Please wait while we check your payment. Your seva is not confirmed yet.",
        "clock",
        "pending",
      ],
      pending: [
        "Confirmation is pending",
        "Your payment result is being checked. Please do not pay again until the status is confirmed.",
        "clock",
        "pending",
      ],
      failed: [
        "Payment wasn’t completed",
        "Your Daan Seva has not been registered. You can try again to complete the payment.",
        "close",
        "failed",
      ],
      success: [
        "Your Daan Seva is booked",
        "Payment received and your first seva is registered for Friday, 13 November 2026.",
        "check",
        "",
      ],
    };
    const [title, copy, ico, cls] = config[status] || config.pending;
    return page(
      status === "success" ? "Booking Confirmed" : "Payment Status",
      `<div class="success-mark ${cls}">${icon(ico)}</div><h2 class="result-title">${title}</h2><p class="result-copy">${copy}</p><div class="card"><div class="review-beneficiary" style="margin-top:0"><span>Seva for</span><strong>${esc(p.beneficiary)}</strong><span>${esc(p.gotra)} gotra</span></div><p class="value" style="font-size:14px">${esc(p.name)}</p><p class="small muted spaced">${esc(p.temple)}</p><div class="data-rows">${row("Seva date", "Fri, 13 Nov 2026")}${status === "success" ? row("Amount paid", "₹51", "Introductory price") : row("Requested amount", "₹51")}${row("Ongoing amount", "₹101 every Friday", "Until cancelled in your UPI app")}</div>${status === "success" ? '<p class="ref">Booking reference JB-N1046</p>' : ""}</div>${status === "success" ? `${button("Track Seva Details", "occurrence/checkout", "", "arrow")}${button("View Nirantar Seva", "plan/checkout", "secondary spaced")}` : status === "failed" ? button("Try Payment Again", "review") : `${action("Check Status Again", "demo-feedback", "secondary", 'data-message="This design preview does not contact a payment provider. Choose a payment outcome from All screens."', "repeat")}<p class="micro muted spaced">You can return to My Bookings while confirmation is pending.</p>${button("My Bookings", "bookings/nirantar", "secondary spaced")}`}`,
      { back: "review" },
    );
  }
  function supportPage(id) {
    const p = plans[id],
      ref = p ? p.ref : id === "profile" ? "Your account" : id;
    return page(
      "Help and Support",
      `<h2 class="subheading">How can we help?</h2><p class="subtext">Support for your Daan Seva and booking details.</p><div class="card"><p class="info-label">Reference to include</p><p class="value">${esc(ref)}</p>${p ? beneficiary(p) : ""}</div>${notice("Keep your booking reference handy", "Share the seva date and reference so we can help with the right booking.", "", "receipt")}<div class="card"><h3 class="value">Contact support</h3><p class="small muted spaced">For beneficiary changes, payment queries and seva evidence.</p>${action("WhatsApp Support", "support-demo", "green spaced", 'data-channel="WhatsApp"', "chat")}${action("Email Support", "support-demo", "secondary spaced", 'data-channel="email"', "mail")}${action("Call Support", "support-demo", "secondary spaced", 'data-channel="phone"', "phone")}</div>`,
      { back: p ? `plan/${p.id}` : "bookings/nirantar" },
    );
  }
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
  function certificateBlob(o) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1100" viewBox="0 0 900 1100"><rect width="900" height="1100" fill="#fffaf0"/><rect x="35" y="35" width="830" height="1030" fill="none" stroke="#ac8250"/><rect x="50" y="50" width="800" height="1000" fill="none" stroke="#d3ba95"/><g text-anchor="middle" fill="#3a1604" font-family="Poppins,sans-serif"><text x="450" y="160" font-size="30">Jai Bhakti</text><text x="450" y="260" font-size="52">Certificate of Daan Seva</text><text x="450" y="345" font-size="24">This seva was performed for</text><text x="450" y="430" font-size="44">${esc(o.beneficiary)}</text><text x="450" y="480" font-size="25">${esc(o.gotra)} gotra</text><text x="450" y="600" font-size="22">${esc(o.name)}</text><text x="450" y="655" font-size="20">${esc(o.temple)}</text><text x="450" y="740" font-size="28">${esc(formatted(o.date))}</text><text x="450" y="850" font-size="18">Seva reference ${esc(o.ref)}</text><text x="450" y="970" font-size="24" fill="#a78a67">SAMPLE CERTIFICATE</text></g></svg>`;
    return new Blob([svg], { type: "image/svg+xml" });
  }
  function downloadCertificate(o) {
    const url = URL.createObjectURL(certificateBlob(o)),
      a = document.createElement("a");
    a.href = url;
    a.download = `Sample-Certificate-${o.ref}.svg`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    feedback("Sample certificate downloaded.");
  }
  function feedback(message) {
    const el = document.getElementById("prototype-feedback");
    el.textContent = message;
    el.hidden = false;
    clearTimeout(feedback.timer);
    feedback.timer = setTimeout(() => {
      el.hidden = true;
    }, 5500);
  }
  function navigation() {
    let group = "";
    document.getElementById("screen-navigation").innerHTML = frames
      .map(([g, route, , title]) => {
        const heading = g !== group ? `<h2>${esc(g)}</h2>` : "";
        group = g;
        return `${heading}<a href="#${route}" ${route === currentRoute ? 'aria-current="page"' : ""}>${esc(title)}</a>`;
      })
      .join("");
  }
  function render({ preserveScroll = false } = {}) {
    const top = window.scrollY;
    currentRoute = decodeURIComponent(location.hash.slice(1)) || "home";
    const [kind, id, owner] = currentRoute.split("/");
    let output;
    if (kind === "home") output = home();
    else if (kind === "profile") output = profile();
    else if (kind === "bookings")
      output = bookings(
        ["nirantar", "upcoming", "completed"].includes(id) ? id : "nirantar",
      );
    else if (kind === "sections") output = sections();
    else if (kind === "plan") output = planDetail(id);
    else if (kind === "history") output = historyPage(id);
    else if (kind === "occurrence") output = occurrenceDetail(id);
    else if (kind === "certificate") output = certificatePage(id);
    else if (kind === "videos") output = videoPage(id);
    else if (kind === "beneficiary") output = beneficiaryPage(id, owner);
    else if (kind === "details") output = detailsPage(id);
    else if (kind === "review") output = reviewPage();
    else if (kind === "payment") output = paymentPage(id);
    else if (["empty", "loading", "error"].includes(kind))
      output = bookings(id || "nirantar", kind);
    else if (kind === "components") output = cadencePage(id === "long-names");
    else if (kind === "support") output = supportPage(id);
    else output = home();
    app.innerHTML = output;
    app.dataset.route = currentRoute;
    navigation();
    const rail = app.querySelector(".date-rail"),
      selectedDate = rail?.querySelector('[aria-current="date"]');
    if (rail && selectedDate)
      rail.scrollLeft =
        selectedDate.offsetLeft -
        rail.offsetLeft -
        (rail.clientWidth - selectedDate.clientWidth) / 2;
    const found = frames.find((f) => f[1] === currentRoute);
    document.title = `${found ? found[3] : "Daan Seva"} · Jai Bhakti designs`;
    document.querySelector(".studio").classList.remove("open");
    document
      .getElementById("toggle-navigation")
      .setAttribute("aria-expanded", "false");
    if (preserveScroll) window.scrollTo(0, top);
    else {
      window.scrollTo(0, 0);
      app.querySelector("h1")?.focus({ preventScroll: true });
    }
    bindForms();
  }
  function readDetails() {
    const form = document.getElementById("details-form");
    if (!form) return;
    for (const key of ["name", "gotra", "phone"])
      state.form[key] = (form.elements[key]?.value || "").trim();
  }
  function validateDetails() {
    const errors = {};
    if (!state.form.name) errors.name = "Enter the beneficiary’s full name.";
    if (!state.form.gotra) errors.gotra = "Enter the beneficiary’s gotra.";
    if (!/^[6-9]\d{9}$/.test(state.form.phone))
      errors.phone = "Enter a valid 10-digit phone number.";
    state.formErrors = errors;
    return Object.keys(errors).length === 0;
  }
  function bindForms() {
    const edit = document.getElementById("beneficiary-form");
    if (edit)
      edit.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = edit.elements.beneficiary.value.trim(),
          gotra = edit.elements.gotra.value.trim();
        if (!name || !gotra) {
          const missing = !name
            ? edit.elements.beneficiary
            : edit.elements.gotra;
          missing.setAttribute("aria-invalid", "true");
          document.getElementById("edit-feedback").textContent = !name
            ? "Enter the beneficiary’s full name."
            : "Enter the beneficiary’s gotra.";
          missing.focus();
          return;
        }
        if (edit.dataset.owner === "checkout") {
          state.form.name = name;
          state.form.gotra = gotra;
          location.hash = "plan/checkout";
        } else {
          state.edit = { name, gotra };
          location.hash = "plan/new";
        }
        feedback(
          "Beneficiary details updated for your first and future sevas.",
        );
      });
    const form = document.getElementById("details-form");
    if (form)
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        readDetails();
        if (!validateDetails()) {
          render({ preserveScroll: true });
          app.querySelector('[aria-invalid="true"]')?.focus();
          return;
        }
        const code = form.elements.otp?.value;
        if (!code) {
          state.otpSent = true;
          render({ preserveScroll: true });
          feedback("Use 1234 for verification in this design prototype.");
          return;
        }
        if (code !== "1234") {
          state.otpError = "That code is incorrect. Check it and try again.";
          render({ preserveScroll: true });
          document.getElementById("verification-code")?.focus();
          return;
        }
        state.verified = true;
        state.otpError = "";
        location.hash = "review";
      });
  }
  app.addEventListener("click", async (event) => {
    const tab = event.target.closest("[data-tab]");
    if (tab) {
      location.hash = "bookings/" + tab.dataset.tab;
      return;
    }
    const el = event.target.closest("[data-action]");
    if (!el) return;
    const a = el.dataset.action;
    if (a === "navigation") {
      document.querySelector(".studio").classList.toggle("open");
      document
        .getElementById("toggle-navigation")
        .setAttribute(
          "aria-expanded",
          String(document.querySelector(".studio").classList.contains("open")),
        );
    }
    if (a === "older") {
      state.completedLimit = completed.length;
      render({ preserveScroll: true });
    }
    if (a === "choose-video") {
      state.selectedVideo = Number(el.dataset.value);
      render({ preserveScroll: true });
    }
    if (a === "retry-video") {
      location.hash = "videos/C1";
    }
    if (a === "rate") {
      state.rating[el.dataset.id] = Number(el.dataset.value);
      render({ preserveScroll: true });
    }
    if (a === "send-otp") {
      readDetails();
      if (!validateDetails()) {
        render({ preserveScroll: true });
        app.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }
      state.otpSent = true;
      state.otpError = "";
      render({ preserveScroll: true });
      document.getElementById("verification-code")?.focus();
      feedback("Design prototype: use verification code 1234. No SMS is sent.");
    }
    if (a === "resend-otp") {
      state.otpError = "";
      feedback("Design prototype: use verification code 1234. No SMS is sent.");
    }
    if (a === "start-payment") {
      const consent = document.getElementById("autopay-consent");
      if (!consent.checked) {
        document.getElementById("payment-consent-error").textContent =
          "Review and agree to the AutoPay amount and schedule to continue.";
        consent.focus();
        return;
      }
      location.hash = "payment/processing";
      feedback(
        "No payment is initiated. Preview pending, failed or confirmed outcomes from All screens.",
      );
    }
    if (a === "certificate-download")
      downloadCertificate(getOccurrence(el.dataset.id));
    if (a === "asset-share") {
      const o = getOccurrence(el.dataset.id),
        title = `${el.dataset.kind === "certificate" ? "Certificate" : "Seva video"} · ${formatted(o.date)}`;
      const isCertificate = el.dataset.kind === "certificate";
      const bytes = isCertificate
        ? certificateBlob(o)
        : new Blob(
            [
              Uint8Array.from(atob(window.SAMPLE_VIDEO_BASE64 || ""), (c) =>
                c.charCodeAt(0),
              ),
            ],
            { type: "video/webm" },
          );
      const file = new File(
        [bytes],
        isCertificate
          ? `Sample-Certificate-${o.ref}.svg`
          : `Sample-Seva-${o.ref}.webm`,
        { type: bytes.type },
      );
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ title, files: [file] });
          feedback("Share completed.");
        } catch (error) {
          if (error.name !== "AbortError")
            feedback(
              "Sharing could not be opened. You can download this sample asset.",
            );
        }
      } else
        feedback(
          "Sharing is unavailable in this browser. Use Download to save the sample asset.",
        );
    }
    if (a === "support-demo")
      feedback(
        `The ${el.dataset.channel} support destination needs to be configured. No message or call is sent by this prototype.`,
      );
    if (a === "demo-feedback")
      feedback(el.dataset.message || "This is a design preview.");
  });
  app.addEventListener("keydown", (event) => {
    const tab = event.target.closest('[role="tab"]');
    if (!tab || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
      return;
    event.preventDefault();
    const ids = ["nirantar", "upcoming", "completed"],
      i = ids.indexOf(tab.dataset.tab),
      n =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? 2
            : (i + (event.key === "ArrowRight" ? 1 : 2)) % 3;
    location.hash = "bookings/" + ids[n];
    setTimeout(() => document.getElementById("tab-" + ids[n])?.focus(), 0);
  });
  document.getElementById("toggle-navigation").addEventListener("click", () => {
    const open = document.querySelector(".studio").classList.toggle("open");
    document
      .getElementById("toggle-navigation")
      .setAttribute("aria-expanded", String(open));
  });
  window.addEventListener("hashchange", () => {
    if ((decodeURIComponent(location.hash.slice(1)) || "home") === currentRoute)
      return;
    state.selectedVideo = 1;
    render();
  });
  window.__design = {
    plans,
    occurrences,
    completed,
    render,
    getOccurrence,
    getPlan,
    state,
  };
  render();
})();

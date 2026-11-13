/* Design preview routing and demo interactions. Screen markup lives in screens/. */
(() => {
  "use strict";
  const {
    state,
    frames,
    plans,
    occurrences,
    completed,
    getOccurrence,
    getPlan,
    formatted,
    certificateBlob,
    home,
    profile,
    bookings,
    sections,
    planDetail,
    historyPage,
    occurrenceDetail,
    certificatePage,
    videoPage,
    beneficiaryPage,
    detailsPage,
    reviewPage,
    paymentPage,
    cadencePage,
    supportPage,
    esc,
  } = window.JBDesign;
  const app = document.getElementById("app");
  const capture = new URLSearchParams(location.search).has("capture");
  document.body.classList.toggle("capture", capture);
  let currentRoute = "home";

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

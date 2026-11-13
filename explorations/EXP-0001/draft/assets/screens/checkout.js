/* Checkout screen designs. Shared helpers come from components.js; samples from fixtures.js. */
(() => {
  "use strict";
  const {
    state,
    page,
    identity,
    checkoutIdentity,
    esc,
    icon,
    badge,
    row,
    notice,
    action,
    button,
  } = window.JBDesign;

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

  Object.assign(window.JBDesign, {
    detailsPage,
    reviewPage,
    paymentPage,
  });
})();

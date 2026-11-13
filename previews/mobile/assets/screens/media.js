/* Media screen designs. Shared helpers come from components.js; samples from fixtures.js. */
(() => {
  "use strict";
  const {
    getOccurrence,
    page,
    esc,
    date,
    icon,
    formatted,
    action,
    button,
    state,
    notice,
    support,
  } = window.JBDesign;

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
  function certificateBlob(o) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1100" viewBox="0 0 900 1100"><rect width="900" height="1100" fill="#fffaf0"/><rect x="35" y="35" width="830" height="1030" fill="none" stroke="#ac8250"/><rect x="50" y="50" width="800" height="1000" fill="none" stroke="#d3ba95"/><g text-anchor="middle" fill="#3a1604" font-family="Poppins,sans-serif"><text x="450" y="160" font-size="30">Jai Bhakti</text><text x="450" y="260" font-size="52">Certificate of Daan Seva</text><text x="450" y="345" font-size="24">This seva was performed for</text><text x="450" y="430" font-size="44">${esc(o.beneficiary)}</text><text x="450" y="480" font-size="25">${esc(o.gotra)} gotra</text><text x="450" y="600" font-size="22">${esc(o.name)}</text><text x="450" y="655" font-size="20">${esc(o.temple)}</text><text x="450" y="740" font-size="28">${esc(formatted(o.date))}</text><text x="450" y="850" font-size="18">Seva reference ${esc(o.ref)}</text><text x="450" y="970" font-size="24" fill="#a78a67">SAMPLE CERTIFICATE</text></g></svg>`;
    return new Blob([svg], { type: "image/svg+xml" });
  }

  Object.assign(window.JBDesign, {
    certificatePage,
    videoPage,
    certificateBlob,
  });
})();

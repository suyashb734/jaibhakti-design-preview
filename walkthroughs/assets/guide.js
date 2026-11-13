/* Review navigation only. Product design sources remain under previews/references. */
(() => {
  const catalogue = window.JB_REVIEW_CATALOG;
  const get = (id) => document.getElementById(id);
  const frame = get("preview");
  const capture = get("capture");
  let epoch = 0;
  let timer;
  const rootPath = (path) => (/^https:\/\//.test(path) ? path : "../" + path);
  const originalPath = rootPath(
    "references/initial-prototype/Jai%20Bhakti%20App.html",
  );

  for (const tour of catalogue.tours) {
    get("tour").add(new Option(tour.title, tour.id));
  }

  function selection() {
    const [id, index] = location.hash.slice(1).split("/");
    const tour =
      catalogue.tours.find((item) => item.id === id) || catalogue.tours[0];
    const step = Math.max(
      0,
      Math.min(Number.parseInt(index, 10) || 0, tour.steps.length - 1),
    );
    return { tour, step };
  }

  function go(id, index) {
    location.hash = id + "/" + index;
  }

  function activateOriginal(screen, currentEpoch, attempt = 0) {
    if (epoch !== currentEpoch) return;
    try {
      if (typeof frame.contentWindow.__dcSetProps === "function") {
        frame.contentWindow.__dcSetProps("Jai Bhakti App", {
          start: screen.title,
          still: true,
        });
        capture.hidden = true;
        frame.hidden = false;
        get("render-status").textContent =
          "Interactive render of the preserved original final design. The historical capture is available separately.";
        return;
      }
    } catch (error) {
      get("render-status").textContent =
        "Showing the frozen original capture. Use the local server or Codespaces for interactive original-screen stepping, or open the full design separately.";
      return;
    }
    if (attempt < 100) {
      timer = setTimeout(
        () => activateOriginal(screen, currentEpoch, attempt + 1),
        80,
      );
    } else {
      get("render-status").textContent =
        "Showing the frozen original capture while the packed design is unavailable. Open the full design separately to retry.";
    }
  }

  function render() {
    clearTimeout(timer);
    const currentEpoch = ++epoch;
    const { tour, step } = selection();
    const selected = tour.steps[step];
    const screen = catalogue.screens[selected.screen_id];
    get("tour").value = tour.id;
    get("tour-status").textContent = tour.status;
    get("tour-summary").textContent = tour.summary;
    get("context").href = rootPath(tour.context);
    get("step").replaceChildren();
    tour.steps.forEach((item, index) =>
      get("step").add(new Option(index + 1 + ". " + item.label, String(index))),
    );
    get("step").value = String(step);
    get("position").textContent =
      "Screen " + (step + 1) + " of " + tour.steps.length + " · " + screen.id;
    get("step-title").textContent = selected.label;
    get("step-note").textContent = selected.note;
    get("previous").disabled = step === 0;
    get("next").disabled = step === tour.steps.length - 1;
    get("open-capture").href = rootPath(screen.image);
    frame.title = selected.label + " — " + tour.status;
    frame.onload = null;
    if (screen.platform === "reference") {
      capture.src = rootPath(screen.image);
      capture.alt = selected.label + " — frozen original reference capture";
      capture.hidden = false;
      frame.hidden = true;
      get("open-source").href = originalPath;
      get("render-status").textContent =
        "Loading the original interactive screen; its frozen capture is shown meanwhile.";
      frame.onload = () => activateOriginal(screen, currentEpoch);
      if (frame.getAttribute("src") === originalPath)
        activateOriginal(screen, currentEpoch);
      else frame.src = originalPath;
    } else {
      capture.hidden = true;
      frame.hidden = false;
      get("open-source").href = rootPath(screen.preview);
      frame.src = rootPath(
        "previews/mobile/Prototype.html?capture=1#" + screen.route,
      );
      get("render-status").textContent =
        "Interactive working draft. The frozen reference capture may differ after source edits. Record approval against an exact revision.";
    }
  }

  get("tour").addEventListener("change", () => go(get("tour").value, 0));
  get("step").addEventListener("change", () =>
    go(selection().tour.id, Number(get("step").value)),
  );
  get("previous").addEventListener("click", () => {
    const { tour, step } = selection();
    go(tour.id, step - 1);
  });
  get("next").addEventListener("click", () => {
    const { tour, step } = selection();
    go(tour.id, step + 1);
  });
  window.addEventListener("hashchange", render);
  render();
})();

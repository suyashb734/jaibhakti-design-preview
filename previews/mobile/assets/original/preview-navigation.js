/* Review entry routes only. The preserved original controls the design journey. */
(() => {
  const routes = new Set(['home', 'sevaOrder', 'bhent', 'detail', 'cart', 'pay',
    'success', 'seva', 'sevaSetup', 'mandate', 'sevaSuccess', 'profile']);
  let revision = 0;
  function openEntry(event) {
    const current = ++revision;
    // Embedded walkthroughs choose their own entry through the original API.
    if (!location.hash && !new URLSearchParams(location.search).has('capture') &&
        event?.type !== 'hashchange') return;
    const requested = decodeURIComponent(location.hash.slice(1)) || 'home';
    const start = routes.has(requested) ? requested : 'home';
    let attempts = 0;
    function activate() {
      if (current !== revision) return;
      if (typeof window.__dcSetProps === 'function' &&
          !document.body.innerText.includes('{{')) {
        window.__dcSetProps(window.__dcRootName(), {
          start, still: new URLSearchParams(location.search).has('capture'),
        });
        document.body.dataset.designRoute = start;
      } else if (++attempts < 300) requestAnimationFrame(activate);
    }
    activate();
  }
  window.addEventListener('hashchange', openEntry);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', openEntry);
  else openEntry();
})();

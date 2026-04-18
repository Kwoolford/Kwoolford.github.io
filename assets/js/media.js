(function () {
  // ── Random strip (homepage) ──────────────────────────────────
  const grid = document.getElementById('media-strip-grid');
  if (grid) {
    const items = Array.from(grid.querySelectorAll('[data-media]'));
    if (items.length > 3) {
      const shuffled = items.slice();
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const show = new Set(shuffled.slice(0, 3));
      for (const item of items) {
        item.hidden = !show.has(item);
      }
    }
  }

  // ── Lightbox ─────────────────────────────────────────────────
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lightbox-img');
  const lbClose    = document.getElementById('lightbox-close');
  if (!lightbox || !lbImg) return;

  function open(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  // Wire up all media images (strip + grid)
  document.querySelectorAll('.media-item img, .media-grid-item img').forEach(img => {
    img.addEventListener('click', () => open(img.src, img.alt));
  });

  // Close on backdrop click (not on image itself)
  lightbox.addEventListener('click', e => {
    if (e.target !== lbImg) close();
  });

  lbClose.addEventListener('click', close);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) close();
  });
})();

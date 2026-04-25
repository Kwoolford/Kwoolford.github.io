(function () {
  // ── Carousel (homepage) ──────────────────────────────────────
  const track = document.getElementById('media-strip-grid');
  if (track) {
    // Duplicate children for seamless infinite loop (-50% = one full copy)
    Array.from(track.children).forEach(item => {
      track.appendChild(item.cloneNode(true));
    });
  }

  // ── Lightbox ─────────────────────────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightbox-img');
  const lbClose  = document.getElementById('lightbox-close');
  if (!lightbox || !lbImg) return;

  function open(src, alt, naturalWidth) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lbImg.style.maxWidth = naturalWidth
      ? 'min(90vw, ' + naturalWidth + 'px)'
      : '90vw';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  // Event delegation covers both originals and clones in the carousel
  document.querySelector('.media-carousel')?.addEventListener('click', e => {
    const img = e.target.closest('.media-item img');
    if (img) open(img.src, img.alt, img.naturalWidth);
  });

  // Wire up the full media grid on /media/ page
  document.querySelectorAll('.media-grid-item img').forEach(img => {
    img.addEventListener('click', () => open(img.src, img.alt, img.naturalWidth));
  });

  // Detect landscape images on the /media/ grid and span 2 columns
  document.querySelectorAll('.media-grid-item img').forEach(img => {
    function checkLandscape() {
      if (img.naturalWidth > img.naturalHeight) {
        img.closest('.media-grid-item').classList.add('landscape');
      }
    }
    if (img.complete && img.naturalWidth) checkLandscape();
    else img.addEventListener('load', checkLandscape);
  });

  // Close on backdrop click
  lightbox.addEventListener('click', e => {
    if (e.target !== lbImg) close();
  });

  lbClose.addEventListener('click', close);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) close();
  });
})();

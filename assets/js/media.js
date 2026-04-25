(function () {
  // ── Sliding carousel (homepage) ──────────────────────────────
  const track    = document.getElementById('media-strip-grid');
  const viewport = track && track.closest('.media-carousel-viewport');
  const prevBtn  = document.querySelector('.carousel-prev');
  const nextBtn  = document.querySelector('.carousel-next');

  if (track && viewport) {
    const slides  = Array.from(track.querySelectorAll('[data-media]'));
    const GAP     = 12; // matches --s3 (0.75rem @ 16px)
    const VISIBLE = 3;
    let idx       = 0;
    let autoTimer;

    function slideWidth() {
      return (viewport.offsetWidth - (VISIBLE - 1) * GAP) / VISIBLE;
    }

    function applyWidths() {
      const w = slideWidth();
      slides.forEach(s => { s.style.width = w + 'px'; });
    }

    function updateButtons() {
      if (prevBtn) prevBtn.disabled = idx === 0;
      if (nextBtn) nextBtn.disabled = idx >= slides.length - VISIBLE;
    }

    function goTo(n) {
      idx = Math.max(0, Math.min(n, slides.length - VISIBLE));
      track.style.transform = `translateX(-${idx * (slideWidth() + GAP)}px)`;
      updateButtons();
    }

    function startAuto() {
      autoTimer = setInterval(() => {
        goTo(idx < slides.length - VISIBLE ? idx + 1 : 0);
      }, 5000);
    }

    function resetAuto() { clearInterval(autoTimer); startAuto(); }

    applyWidths();
    goTo(0);
    startAuto();

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(idx - 1); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(idx + 1); resetAuto(); });

    window.addEventListener('resize', () => { applyWidths(); goTo(idx); });
  }

  // ── Lightbox ─────────────────────────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightbox-img');
  const lbClose  = document.getElementById('lightbox-close');
  if (!lightbox || !lbImg) return;

  function open(src, alt, naturalWidth) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lbImg.style.maxWidth = naturalWidth ? 'min(90vw, ' + naturalWidth + 'px)' : '90vw';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  document.querySelectorAll('.media-item img').forEach(img => {
    img.addEventListener('click', () => open(img.src, img.alt, img.naturalWidth));
  });

  document.querySelectorAll('.media-grid-item img').forEach(img => {
    img.addEventListener('click', () => open(img.src, img.alt, img.naturalWidth));
  });

  // Detect landscape images on /media/ grid
  document.querySelectorAll('.media-grid-item img').forEach(img => {
    function check() {
      if (img.naturalWidth > img.naturalHeight)
        img.closest('.media-grid-item').classList.add('landscape');
    }
    if (img.complete && img.naturalWidth) check();
    else img.addEventListener('load', check);
  });

  lightbox.addEventListener('click', e => { if (e.target !== lbImg) close(); });
  lbClose.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) close();
  });
})();

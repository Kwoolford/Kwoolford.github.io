(function () {
  // ── Slot carousel (homepage) ─────────────────────────────────
  const grid = document.getElementById('media-strip-grid');
  if (grid) {
    const allItems = Array.from(grid.querySelectorAll('[data-media]'));

    if (allItems.length > 3) {
      // Build a shuffled pool of { src, alt }
      const pool = allItems.map(item => {
        const img = item.querySelector('img');
        return { src: img.src, alt: img.alt };
      });
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }

      // Keep only 3 slots; remove the rest from the DOM
      allItems.slice(3).forEach(item => item.remove());
      const slots = allItems.slice(0, 3);

      // Seed slots from the shuffled pool
      slots.forEach((slot, i) => {
        const img = slot.querySelector('img');
        img.src = pool[i].src;
        img.alt = pool[i].alt;
      });

      let poolIdx = 3;   // next image to pull from pool
      let slotIdx = 0;   // which slot to swap next

      // Every 3s swap one slot, cycling left-to-right through slots
      setInterval(() => {
        const slot = slots[slotIdx % 3];
        slotIdx++;
        const img = slot.querySelector('img');
        const next = pool[poolIdx % pool.length];
        poolIdx++;

        slot.classList.add('fading');
        setTimeout(() => {
          img.onload = () => slot.classList.remove('fading');
          img.src = next.src;
          img.alt = next.alt;
          if (img.complete) slot.classList.remove('fading');
        }, 600); // wait for fade-out (matches CSS transition)
      }, 3000);
    }
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

  // Wire carousel slots (uses current img src at click time)
  document.querySelectorAll('.media-strip-grid .media-item img').forEach(img => {
    img.addEventListener('click', () => open(img.src, img.alt, img.naturalWidth));
  });

  // Wire full media grid on /media/ page
  document.querySelectorAll('.media-grid-item img').forEach(img => {
    img.addEventListener('click', () => open(img.src, img.alt, img.naturalWidth));
  });

  // Detect landscape images on /media/ grid and span 2 columns
  document.querySelectorAll('.media-grid-item img').forEach(img => {
    function checkLandscape() {
      if (img.naturalWidth > img.naturalHeight) {
        img.closest('.media-grid-item').classList.add('landscape');
      }
    }
    if (img.complete && img.naturalWidth) checkLandscape();
    else img.addEventListener('load', checkLandscape);
  });

  lightbox.addEventListener('click', e => {
    if (e.target !== lbImg) close();
  });
  lbClose.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) close();
  });
})();

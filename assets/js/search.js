(function () {
  const input = document.getElementById('archive-search');
  const grid = document.getElementById('archive-grid');
  const empty = document.getElementById('archive-empty');
  if (!input || !grid) return;

  const cards = Array.from(grid.querySelectorAll('.card'));

  function filter(query) {
    const q = (query || '').trim().toLowerCase();
    const terms = q ? q.split(/\s+/) : [];
    let visible = 0;
    for (const c of cards) {
      if (!terms.length) {
        c.hidden = false;
        visible++;
        continue;
      }
      const blob = [
        c.dataset.title || '',
        c.dataset.tags || '',
        c.dataset.status || '',
        c.dataset.category || ''
      ].join(' ');
      const match = terms.every(t => blob.includes(t));
      c.hidden = !match;
      if (match) visible++;
    }
    if (empty) empty.hidden = visible !== 0;
  }

  input.addEventListener('input', e => filter(e.target.value));

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      input.value = '';
      filter('');
      input.blur();
    }
  });
})();

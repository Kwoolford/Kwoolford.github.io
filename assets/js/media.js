(function () {
  const grid = document.getElementById('media-strip-grid');
  if (!grid) return;
  const items = Array.from(grid.querySelectorAll('[data-media]'));
  if (items.length <= 3) return;

  // Fisher-Yates shuffle, pick 3
  const shuffled = items.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const show = new Set(shuffled.slice(0, 3));
  for (const item of items) {
    item.hidden = !show.has(item);
  }
})();

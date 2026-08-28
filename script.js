// Animate the breath-line paths with a gentle spirometry-like waveform
function drawWave(path, seed = 0) {
  const w = 1200, h = 60, mid = 30;
  let d = `M0,${mid}`;
  const points = 24;
  for (let i = 1; i <= points; i++) {
    const x = (w / points) * i;
    const amp = 8 + Math.sin(i * 0.7 + seed) * 4;
    const y = mid + Math.sin(i * 0.9 + seed) * amp * 0.4;
    d += ` L${x},${y}`;
  }
  path.setAttribute('d', d);
}
document.querySelectorAll('.breath-line path, .breath-line .breathPath2').forEach((p, i) => {
  drawWave(p, i * 2);
});

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ---- News ----
fetch('news.json')
  .then(r => r.json())
  .then(items => {
    items.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Hero = latest item
    if (items.length) {
      const latest = items[0];
      document.getElementById('heroTitle').textContent = latest.title;
      document.getElementById('heroSummary').textContent = latest.summary;
      document.getElementById('heroDate').textContent = formatDate(latest.date);
    }

    const list = document.getElementById('newsList');
    list.innerHTML = '';
    items.forEach(item => {
      const el = document.createElement('article');
      el.className = 'news-item';
      el.tabIndex = 0;
      el.innerHTML = `
        <div class="news-item-head">
          <h3 class="news-item-title">${item.title}</h3>
          <span class="news-item-date mono">${formatDate(item.date)}</span>
        </div>
        <p class="news-item-summary">${item.summary}</p>
        <span class="news-item-toggle">Read more →</span>
        <div class="news-item-body">${item.body.split('\n\n').map(p => `<p>${p}</p>`).join('')}</div>
      `;
      const toggle = () => {
        el.classList.toggle('expanded');
        const t = el.querySelector('.news-item-toggle');
        t.textContent = el.classList.contains('expanded') ? 'Show less ←' : 'Read more →';
      };
      el.addEventListener('click', toggle);
      el.addEventListener('keypress', e => { if (e.key === 'Enter') toggle(); });
      list.appendChild(el);
    });
  })
  .catch(() => {
    document.getElementById('heroTitle').textContent = 'GALA Health';
    document.getElementById('newsList').innerHTML = '<p>News is being updated — check back shortly.</p>';
  });

// ---- Publications ----
fetch('publications.json')
  .then(r => r.json())
  .then(items => {
    items.sort((a, b) => new Date(b.date) - new Date(a.date));
    const list = document.getElementById('pubList');
    list.innerHTML = '';
    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'pub-item';
      el.innerHTML = `
        <div class="pub-main">
          <span class="pub-tag mono">${item.type}</span>
          <span class="pub-title">${item.title}</span>
        </div>
        <a class="pub-link mono" href="${item.file}" target="_blank" rel="noopener">Download PDF ↓</a>
      `;
      list.appendChild(el);
    });
    if (!items.length) {
      list.innerHTML = '<p>No publications yet.</p>';
    }
  })
  .catch(() => {
    document.getElementById('pubList').innerHTML = '<p>Publications are being updated — check back shortly.</p>';
  });

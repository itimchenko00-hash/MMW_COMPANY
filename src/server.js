const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 10000;
const ROOT = path.join(__dirname, '..');

const BUILD = '2026-09-02-system-visual-v5';
const pages = {
  home: path.join(ROOT, 'company/website/mmw-company-interactive-v11.html'),
  aladin: path.join(ROOT, 'projects/ALADIN/website/aladin-presentation-suite.html'),
  nexusWork: path.join(ROOT, 'projects/NEXUS-WORK/website/nexus-work-presentation-suite.html'),
  nexusLogistics: path.join(ROOT, 'projects/NEXUS-LOGISTICS/website/nexus-logistics-presentation-v2.html'),
  carpathia: path.join(ROOT, 'projects/CARPATHIA/website/carpathia-compact.html'),
  agrohub: path.join(ROOT, 'projects/AGROHUB/website/agrohub-compact.html'),
  energy: path.join(ROOT, 'projects/ENERGY-PARK/website/energy-compact.html')
};

for (const [name, file] of Object.entries(pages)) {
  if (!fs.existsSync(file)) {
    console.error(`[MMW-FATAL] Missing canonical page: ${name} -> ${file}`);
    process.exit(1);
  }
}

app.disable('x-powered-by');
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('X-MMW-Build', BUILD);
  res.set('X-MMW-Repo', 'itimchenko00-hash/MMW_COMPANY');
  next();
});

function sendPage(file, res, refineHome = false) {
  if (!refineHome) {
    return res.sendFile(file, err => {
      if (err && !res.headersSent) res.status(err.statusCode || 404).send('MMW-COMPANY: page not found');
    });
  }

  fs.readFile(file, 'utf8', (err, html) => {
    if (err) return res.status(404).send('MMW-COMPANY: page not found');

    html = html
      .replace('<span>Идея, актив или задача</span>', '<span>Задача и концепция</span>')
      .replace('<span>Roadmap, контроль и запуск</span>', '<span>План запуска</span>');

    const visualStyle = `
      <style>
        #system .architecture{align-items:stretch}
        #system .node{padding:0;overflow:hidden;display:flex;flex-direction:column;min-height:245px;position:relative}
        #system .nodeVisual{height:118px;position:relative;overflow:hidden;border-bottom:1px solid var(--line);background:#08120f}
        #system .nodeVisual img{width:100%;height:100%;object-fit:cover;display:block;opacity:.62;filter:saturate(.72) contrast(1.08)}
        #system .nodeVisual:after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#07100e22,#07100ed9)}
        #system .nodeInfo{padding:15px 15px 17px;display:flex;flex-direction:column;flex:1}
        #system .nodeInfo b{font-size:10px}
        #system .nodeInfo strong{margin:5px 0 3px}
        #system .nodeInfo span{font-size:11px;line-height:1.45}
        #system .nodeViz{position:absolute;z-index:2;right:12px;bottom:10px;width:72px;height:42px;opacity:.96}
        #system .nodeViz svg{width:100%;height:100%;fill:none;stroke:var(--gold2);stroke-width:1.6}
        #system .nodeViz text{fill:var(--gold2);stroke:none;font:700 7px 'DM Sans',sans-serif;letter-spacing:.08em}
        @media(max-width:950px){#system .node{min-height:225px}}
        @media(max-width:600px){#system .node{min-height:235px}}
      </style>`;

    const nodes = [
      ['IDEA','Задача и концепция','https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=82',`<svg viewBox="0 0 72 42"><circle cx="12" cy="21" r="7"/><circle cx="36" cy="10" r="7"/><circle cx="60" cy="28" r="7"/><path d="M19 18L29 13M43 13L53 24"/><text x="5" y="40">CONCEPT</text></svg>`],
      ['STRATEGY','Рынок и позиционирование','https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=82',`<svg viewBox="0 0 72 42"><path d="M7 34L20 23L31 27L45 13L64 8"/><path d="M57 8h7v7"/><circle cx="20" cy="23" r="3"/><circle cx="45" cy="13" r="3"/><text x="7" y="40">MARKET</text></svg>`],
      ['BUSINESS MODEL','Продукт и доходы','https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=82',`<svg viewBox="0 0 72 42"><rect x="6" y="25" width="9" height="10"/><rect x="20" y="19" width="9" height="16"/><rect x="34" y="12" width="9" height="23"/><rect x="48" y="6" width="9" height="29"/><path d="M5 36H63"/><text x="6" y="41">REVENUE</text></svg>`],
      ['MODEL','Экономика проекта','https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=82',`<svg viewBox="0 0 72 42"><path d="M7 32L20 26L32 29L45 16L64 8"/><path d="M7 35H64"/><path d="M12 8v27"/><text x="8" y="40">CAPEX · OPEX</text></svg>`],
      ['SYSTEM','Управление и процессы','https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=82',`<svg viewBox="0 0 72 42"><rect x="26" y="4" width="20" height="10" rx="2"/><rect x="7" y="27" width="20" height="10" rx="2"/><rect x="45" y="27" width="20" height="10" rx="2"/><path d="M36 14v7M36 21L17 27M36 21L55 27"/><text x="7" y="41">TEAM · FLOW</text></svg>`],
      ['LAUNCH','План запуска','https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=82',`<svg viewBox="0 0 72 42"><path d="M7 34H64"/><path d="M12 34V27M25 34V22M38 34V17M51 34V11"/><path d="M51 7l7 4-7 4z"/><text x="7" y="41">ROADMAP</text></svg>`]
    ];

    const originalNodes = [
      '<div class="node"><b>01</b><strong>IDEA</strong><span>Задача и концепция</span></div>',
      '<div class="node"><b>02</b><strong>STRATEGY</strong><span>Рынок, цели и позиционирование</span></div>',
      '<div class="node"><b>03</b><strong>BUSINESS MODEL</strong><span>Продукт, клиенты и доходы</span></div>',
      '<div class="node"><b>04</b><strong>MODEL</strong><span>CAPEX, OPEX, Cash Flow и KPI</span></div>',
      '<div class="node"><b>05</b><strong>SYSTEM</strong><span>Команда, процессы и документы</span></div>',
      '<div class="node"><b>06</b><strong>LAUNCH</strong><span>План запуска</span></div>'
    ];

    nodes.forEach((node, i) => {
      const [title, desc, image, svg] = node;
      const replacement = `<div class="node"><div class="nodeVisual"><img src="${image}" alt="${title}" loading="lazy"><div class="nodeViz">${svg}</div></div><div class="nodeInfo"><b>${String(i + 1).padStart(2,'0')}</b><strong>${title}</strong><span>${desc}</span></div></div>`;
      html = html.replace(originalNodes[i], replacement);
    });

    html = html.replace('</style>\n</head>', '</style>' + visualStyle + '\n</head>');
    res.type('html').send(html);
  });
}

app.get('/', (req, res) => sendPage(pages.home, res, true));
app.get(['/index.html', '/company', '/company/', '/company.html', '/home-v2'], (req, res) => res.redirect(308, '/'));

app.get(['/aladin', '/aladin/'], (req, res) => sendPage(pages.aladin, res));
app.get(['/nexus', '/nexus-work', '/nexus-work/'], (req, res) => sendPage(pages.nexusWork, res));
app.get(['/nexus-logistics', '/nexus-logistics/'], (req, res) => sendPage(pages.nexusLogistics, res));
app.get(['/carpathia', '/carpathia/'], (req, res) => sendPage(pages.carpathia, res));
app.get(['/agrohub', '/agrohub/'], (req, res) => sendPage(pages.agrohub, res));
app.get(['/energy', '/energy/'], (req, res) => sendPage(pages.energy, res));

app.get('/order', (req, res) => res.redirect('https://mmw-order.onrender.com'));
app.get('/health', (req, res) => res.json({
  service: 'MMW-COMPANY',
  status: 'ok',
  build: BUILD,
  repo: 'itimchenko00-hash/MMW_COMPANY',
  branch: 'main',
  structure: ['home', 'ALADIN', 'NEXUS WORK', 'NEXUS LOGISTICS', 'CARPATHIA ECO LODGE', 'AGROHUB', 'ENERGY PARK'],
  order: 'external /order redirect only'
}));

app.use((req, res) => res.status(404).send('MMW-COMPANY: route not found'));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MMW-COMPANY listening on ${PORT} | ${BUILD}`);
});

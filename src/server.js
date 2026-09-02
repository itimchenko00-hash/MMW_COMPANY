const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;
const ROOT = path.join(__dirname, '..');

const BUILD = '2026-09-02-products-v2';
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
  if (!require('fs').existsSync(file)) {
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

function sendPage(file, res) {
  res.sendFile(file, err => {
    if (err && !res.headersSent) res.status(err.statusCode || 404).send('MMW-COMPANY: page not found');
  });
}

app.get('/', (req, res) => sendPage(pages.home, res));
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

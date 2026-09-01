const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 10000;

const ROOT_DIR = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const HOME = path.join(ROOT_DIR, 'index.html');
const PROJECT_PRESENTATIONS = path.join(PUBLIC_DIR, 'project-presentations-v3.html');
const PRESENTATION_LINKS = path.join(PUBLIC_DIR, 'presentation-links.js');
const ALADIN_CONTENT = path.join(PUBLIC_DIR, 'aladin-content-v1.js');
const NEXUS_CONTENT = path.join(PUBLIC_DIR, 'nexus-content-v1.js');
const AGROHUB_PRESENTATIONS = path.join(PUBLIC_DIR, 'agrohub-presentations-v1.html');
const ENERGY_PRESENTATIONS = path.join(PUBLIC_DIR, 'energy-presentations-v1.html');
const ALADIN_PAGE = path.join(PUBLIC_DIR, 'aladin.html');

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

app.use(express.static(ROOT_DIR, { maxAge: 0 }));
app.use('/public', express.static(PUBLIC_DIR, { maxAge: 0 }));
app.get('/', (req, res) => res.sendFile(HOME));

// ALADIN has a clean project landing page. The detailed slide engine remains available separately.
app.get('/aladin', (req, res) => res.sendFile(ALADIN_PAGE));
app.get('/project/aladin', (req, res) => {
  if (req.query.deck) return sendProjectPresentation({ ...req, params: { slug: 'aladin' } }, res);
  return res.sendFile(ALADIN_PAGE);
});
app.get('/aladin-presentation', (req, res) => sendProjectPresentation({ ...req, params: { slug: 'aladin' } }, res));
app.get('/project/:slug', sendProjectPresentation);

function sendProjectPresentation(req, res) {
  const slug = req.params.slug || '';
  if (slug === 'agrohub') return res.sendFile(AGROHUB_PRESENTATIONS);
  if (slug === 'energy') return res.sendFile(ENERGY_PRESENTATIONS);

  fs.readFile(PROJECT_PRESENTATIONS, 'utf8', (err, html) => {
    if (err) return res.status(500).send('Presentation engine unavailable');
    fs.readFile(PRESENTATION_LINKS, 'utf8', (jsErr, js) => {
      const injectBase = jsErr ? '' : `<script>${js}</script>`;
      const contentFile = slug === 'aladin' ? ALADIN_CONTENT : slug === 'nexus' ? NEXUS_CONTENT : null;
      if (!contentFile) return res.type('html').send(html.replace('</body>', `${injectBase}</body>`));
      fs.readFile(contentFile, 'utf8', (cErr, cJs) => {
        const inject = `${injectBase}${cErr ? '' : `<script>${cJs}</script>`}`;
        res.type('html').send(html.replace('</body>', `${inject}</body>`));
      });
    });
  });
}

app.get('/projects', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'projects-v2.html')));
app.get('/portfolio', (req, res) => res.redirect('/projects'));
app.get('/aladin-pokupateli', (req, res) => res.redirect('/aladin-presentation?deck=buyer#presentations'));
app.get('/order', (req, res) => res.redirect('https://mmw-order.onrender.com'));

app.get('/health', (req, res) => res.json({
  service: 'MMW-COMPANY',
  status: 'ok',
  presentation_engine: 'v3',
  aladin_page: 'clean-project-v1',
  aladin_content: 'team+buyer-v1',
  nexus_content: 'investor+team+buyer-v1',
  agrohub_content: 'investor+team+buyer-v1',
  energy_content: 'investor+team+buyer-v1',
  source: 'repository-root',
  architecture: 'main-site -> projects -> clean project page -> project presentations -> MMW-ORDER'
}));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MMW-COMPANY listening on ${PORT}`);
});
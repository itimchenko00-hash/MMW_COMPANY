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

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

app.use(express.static(ROOT_DIR, { maxAge: 0 }));
app.use('/public', express.static(PUBLIC_DIR, { maxAge: 0 }));
app.get('/', (req, res) => res.sendFile(HOME));

app.get('/aladin', sendProjectPresentation);
app.get('/project/:slug', sendProjectPresentation);

function sendProjectPresentation(req, res) {
  const slug = req.params.slug || (req.path === '/aladin' ? 'aladin' : '');
  if (slug === 'agrohub') return res.sendFile(AGROHUB_PRESENTATIONS);

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
app.get('/aladin-pokupateli', (req, res) => res.redirect('/project/aladin?mode=buyer'));
app.get('/order', (req, res) => res.redirect('https://mmw-order.onrender.com'));

app.get('/health', (req, res) => res.json({
  service: 'MMW-COMPANY',
  status: 'ok',
  presentation_engine: 'v3',
  aladin_content: 'team+buyer-v1',
  nexus_content: 'investor+team+buyer-v1',
  agrohub_content: 'investor+team+buyer-v1',
  source: 'repository-root',
  architecture: 'main-site -> projects -> project-specific-presentations -> MMW-ORDER'
}));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MMW-COMPANY listening on ${PORT}`);
});

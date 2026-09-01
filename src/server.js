const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Single source of truth for the public MMW-COMPANY site is the repository root.
// The /public directory remains the storage area for project presentation assets.
const ROOT_DIR = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const HOME = path.join(ROOT_DIR, 'index.html');
const PROJECT_PRESENTATIONS = path.join(PUBLIC_DIR, 'project-presentations-v3.html');

// Never let browser/CDN/Render asset caching hide a newly published build.
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

// Serve the canonical root site (index.html, app.js, styles.css, etc.).
app.use(express.static(ROOT_DIR, { maxAge: 0 }));

// Project presentations and their supporting public assets.
app.use('/public', express.static(PUBLIC_DIR, { maxAge: 0 }));

app.get('/', (req, res) => res.sendFile(HOME));

// Every project uses the v3 presentation engine: three audiences, detailed
// project-specific content, visuals, roadmap and responsive controls.
app.get('/aladin', (req, res) => res.sendFile(PROJECT_PRESENTATIONS));
app.get('/project/:slug', (req, res) => res.sendFile(PROJECT_PRESENTATIONS));

// Portfolio route remains available for compatibility.
app.get('/projects', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'projects-v2.html')));
app.get('/portfolio', (req, res) => res.redirect('/projects'));

// Legacy ALADIN buyer page remains available, but the canonical project page
// is now /project/aladin.
app.get('/aladin-pokupateli', (req, res) => res.redirect('/project/aladin?mode=buyer'));

// MMW-ORDER remains a separate technical system.
app.get('/order', (req, res) => res.redirect('https://mmw-order.onrender.com'));

app.get('/health', (req, res) => res.json({
  service: 'MMW-COMPANY',
  status: 'ok',
  presentation_engine: 'v3',
  source: 'repository-root',
  architecture: 'main-site -> projects -> three-audience-presentations -> MMW-ORDER'
}));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MMW-COMPANY listening on ${PORT}`);
});

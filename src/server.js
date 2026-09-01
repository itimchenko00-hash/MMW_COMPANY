const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

const PUBLIC_DIR = path.join(__dirname, '../public');
const HOME = path.join(PUBLIC_DIR, 'index.html');
const PROJECT_PRESENTATIONS = path.join(PUBLIC_DIR, 'project-presentations.html');

// Canonical MMW-COMPANY runtime. HTML is never cached so Render/browser caches
// cannot mask a newly published project presentation.
app.use((req, res, next) => {
  if (req.path.endsWith('.html') || req.path === '/' || req.path.startsWith('/project') || req.path === '/projects' || req.path === '/aladin') {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
  }
  next();
});

app.use(express.static(PUBLIC_DIR, { maxAge: '1h' }));

// Canonical MMW-COMPANY public site.
app.get('/', (req, res) => res.sendFile(HOME));

// Every project uses the same presentation engine and gets three audiences:
// investor, team/specialists and buyer/client.
app.get('/aladin', (req, res) => res.sendFile(PROJECT_PRESENTATIONS));
app.get('/project/:slug', (req, res) => res.sendFile(PROJECT_PRESENTATIONS));

// Portfolio route.
app.get('/projects', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'projects-v2.html')));
app.get('/portfolio', (req, res) => res.redirect('/projects'));

// Legacy ALADIN buyer page remains available, but the canonical project page
// is now /project/aladin.
app.get('/aladin-pokupateli', (req, res) => res.redirect('/project/aladin?mode=buyer'));

// MMW-ORDER remains a separate technical system and is never merged into the
// company presentation layer.
app.get('/order', (req, res) => res.redirect('https://mmw-order.onrender.com'));

app.get('/health', (req, res) => res.json({ service: 'MMW-COMPANY', status: 'ok', architecture: 'main-site -> projects -> three-audience-presentations -> MMW-ORDER' }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MMW-COMPANY listening on ${PORT}`);
});

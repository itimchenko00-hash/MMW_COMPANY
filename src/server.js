const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

const PUBLIC_DIR = path.join(__dirname, '../public');
const HOME = path.join(PUBLIC_DIR, 'index.html');

// Canonical MMW-COMPANY runtime. HTML is served without browser/proxy caching
// so a newly deployed build cannot be masked by an older cached page.
app.use((req, res, next) => {
  if (req.path.endsWith('.html') || req.path === '/' || req.path.startsWith('/project') || req.path === '/projects' || req.path === '/aladin') {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
  }
  next();
});

app.use(express.static(PUBLIC_DIR, { maxAge: '1h' }));

// MMW-COMPANY is the canonical public site at the Render primary URL.
app.get('/', (req, res) => res.sendFile(HOME));

// Interactive flagship/project pages.
app.get('/aladin', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'project.html')));
app.get('/project/:slug', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'project.html')));

// Portfolio and legacy presentation routes.
app.get('/projects', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'projects-v2.html')));
app.get('/portfolio', (req, res) => res.redirect('/projects'));
app.get('/aladin-pokupateli', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'aladin-buyers.html')));

// MMW-ORDER is intentionally a separate technical system.
app.get('/order', (req, res) => res.redirect('https://mmw-order.onrender.com'));

app.get('/health', (req, res) => res.json({ service: 'MMW-COMPANY', status: 'ok', architecture: 'main-site -> projects -> interactive-projects -> MMW-ORDER' }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MMW-COMPANY listening on ${PORT}`);
});

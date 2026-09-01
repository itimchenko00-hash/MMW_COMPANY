const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

const PUBLIC_DIR = path.join(__dirname, '../public');
const HOME = path.join(PUBLIC_DIR, 'index.html');

app.use(express.static(PUBLIC_DIR));

// MMW-COMPANY is the canonical public site at the Render primary URL.
app.get('/', (req, res) => res.sendFile(HOME));

// Interactive flagship/project pages.
app.get('/aladin', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'project.html')));
app.get('/project/:slug', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'project.html')));

// Portfolio and legacy presentation routes.
app.get('/projects', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'projects-v2.html')));
app.get('/portfolio', (req, res) => res.redirect('/projects'));
app.get('/aladin-pokupateli', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'aladin-buyers.html')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MMW-COMPANY listening on ${PORT}`);
});

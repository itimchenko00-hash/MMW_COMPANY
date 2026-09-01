const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

const PUBLIC_DIR = path.join(__dirname, '../public');
const HOME = path.join(PUBLIC_DIR, 'index.html');

app.use(express.static(PUBLIC_DIR));

// Canonical home page: MMW-COMPANY always opens at the root URL.
app.get('/', (req, res) => {
  res.sendFile(HOME);
});

// ALADIN is a core project of the MMW-COMPANY platform.
app.get('/aladin', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'aladin-hub.html'));
});

// Dedicated ALADIN buyer presentation.
app.get('/aladin-pokupateli', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'aladin-buyers.html'));
});

// MMW-COMPANY project portfolio: ALADIN + four demonstration projects.
app.get('/projects', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'projects-v2.html'));
});

// Friendly alias for the portfolio.
app.get('/portfolio', (req, res) => {
  res.redirect('/projects');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MMW-COMPANY listening on ${PORT}`);
});

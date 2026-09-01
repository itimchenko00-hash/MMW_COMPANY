const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static(path.join(__dirname, '../public')));

// ALADIN is a core section of the public MMW-COMPANY site.
app.get('/aladin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/aladin-hub.html'));
});

// Dedicated ALADIN buyer presentation.
app.get('/aladin-pokupateli', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/aladin-buyers.html'));
});

// MMW-COMPANY project portfolio: ALADIN + four distinct demonstration projects.
app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/projects-v2.html'));
});

// Friendly alias for the portfolio.
app.get('/portfolio', (req, res) => {
  res.redirect('/projects');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MMW-COMPANY listening on ${PORT}`);
});

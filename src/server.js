const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static(path.join(__dirname, '../public')));

// Dedicated ALADIN buyer presentation. The main MMW-COMPANY site remains unchanged.
app.get('/aladin-pokupateli', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/aladin-buyers.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MMW-COMPANY listening on ${PORT}`);
});

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static(path.join(__dirname, '../public')));

// Express 5 no longer accepts the legacy '*' route pattern.
// Static assets and index.html are already served above, so no catch-all route is needed.

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MMW-COMPANY listening on ${PORT}`);
});

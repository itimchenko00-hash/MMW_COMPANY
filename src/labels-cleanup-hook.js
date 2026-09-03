const express = require('express');
const originalSend = express.response.send;

// Remove only the requested visual labels from the final HTML response.
// This is deliberately text-only: it does not delete sections, cards, links,
// forms, data attributes, scripts, or any structural elements.
function cleanRequestedLabels(body) {
  if (typeof body !== 'string' || !body.includes('</body>')) return body;

  body = body.replace(/01\s*·\s*PACKAGES\s*\/\s*02\s*·\s*ADD-ONS/gi, '');
  body = body.replace(/01\s*\/\s*PACKAGES/gi, '');
  body = body.replace(/02\s*\/\s*ADD-ONS/gi, '');

  // Remove standalone numeric labels only when they are text nodes.
  body = body.replace(/>(\s*)(05|04|01|0|02)(\s*)</g, '>$1$3<');

  return body;
}

express.response.send = function (body) {
  return originalSend.call(this, cleanRequestedLabels(body));
};

const express = require('express');
const originalSend = express.response.send;

// Remove only the requested visual labels. Keep every surrounding element,
// card, section, link and script intact.
function cleanServerText(body) {
  if (typeof body !== 'string') return body;

  // Exact legacy headings.
  body = body.replace(/01\s*·\s*PACKAGES\s*\/\s*02\s*·\s*ADD-ONS/gi, '');
  body = body.replace(/01\s*\/\s*PACKAGES/gi, '');
  body = body.replace(/02\s*\/\s*ADD-ONS/gi, '');

  // Remove standalone numeric labels when wrapped in their own element.
  body = body.replace(/(<(?:b|span|div|small|em|strong)[^>]*>)\s*(?:05|04|01|0|02)\s*(<\/(?:b|span|div|small|em|strong)>)/gi, '$1$2');

  // Also remove exact numeric text nodes on the client side. This catches
  // labels created dynamically after the initial HTML response.
  if (!body.includes('</body>')) return body;
  const cleanupScript = `<script id="mmw-labels-cleanup">(()=>{
const exact=new Set(['05','04','01','0','02','01 · PACKAGES / 02 · ADD-ONS','01 / PACKAGES','02 / ADD-ONS']);
const clean=()=>{const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];while(w.nextNode())nodes.push(w.currentNode);for(const n of nodes){const v=n.nodeValue.trim();if(exact.has(v))n.nodeValue='';}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',clean,{once:true});else clean();
new MutationObserver(clean).observe(document.body,{childList:true,subtree:true});
})();</script>`;
  return body.replace('</body>', cleanupScript+'</body>');
}

express.response.send = function(body) {
  return originalSend.call(this, cleanServerText(body));
};

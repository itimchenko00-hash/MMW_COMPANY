const express = require('express');
const originalSend = express.response.send;

// Remove only the requested visual labels. The DOM pass removes text nodes,
// never sections/elements, so site structure and functionality remain intact.
function cleanServerText(body) {
  if (typeof body !== 'string' || !body.includes('</body>')) return body;
  body = body.replace(/01\s*·\s*PACKAGES\s*\/\s*02\s*·\s*ADD-ONS/gi, '');
  body = body.replace(/01\s*\/\s*PACKAGES/gi, '');
  body = body.replace(/02\s*\/\s*ADD-ONS/gi, '');
  body = body.replace(/>(\s*)(05|04|01|0|02)(\s*)</g, '>$1$3<');

  const cleanupScript = `<script id="mmw-labels-cleanup">(()=>{\nconst exact=new Set(['05','04','01','0','02','01 · PACKAGES / 02 · ADD-ONS','01 / PACKAGES','02 / ADD-ONS']);\nconst run=()=>{const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];while(w.nextNode())nodes.push(w.currentNode);for(const n of nodes){if(exact.has(n.nodeValue.trim()))n.nodeValue='';}};\nif(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();\nnew MutationObserver(run).observe(document.body,{childList:true,subtree:true});\n})();</script>`;
  return body.replace('</body>', cleanupScript+'</body>');
}

express.response.send = function(body) {
  return originalSend.call(this, cleanServerText(body));
};

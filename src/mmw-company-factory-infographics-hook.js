const fs=require('fs');
const path=require('path');
const TARGET=path.normalize(path.join(__dirname,'../company/website/mmw-company-interactive-v11.html'));
const original=fs.readFileSync.bind(fs);

const icons={
 market:'<svg viewBox="0 0 120 56" aria-hidden="true"><path d="M8 45V12M8 45h104M18 38l18-11 16 5 19-18 31-7"/><path d="M94 7h18v18"/><circle cx="52" cy="32" r="3"/><text x="9" y="54">DEMAND / SEGMENTS</text></svg>',
 model:'<svg viewBox="0 0 120 56" aria-hidden="true"><circle cx="18" cy="29" r="10"/><circle cx="60" cy="12" r="10"/><circle cx="102" cy="31" r="10"/><path d="M27 25l24-10M69 16l24 10"/><path d="M45 45h30"/><text x="9" y="54">VALUE / REVENUE</text></svg>',
 economics:'<svg viewBox="0 0 120 56" aria-hidden="true"><path d="M8 45h104"/><rect x="16" y="32" width="12" height="13"/><rect x="38" y="25" width="12" height="20"/><rect x="60" y="17" width="12" height="28"/><rect x="82" y="8" width="12" height="37"/><path d="M12 15h80"/><text x="9" y="54">ASSUMPTIONS / KPI</text></svg>',
 operations:'<svg viewBox="0 0 120 56" aria-hidden="true"><rect x="48" y="5" width="24" height="13" rx="2"/><rect x="9" y="36" width="29" height="13" rx="2"/><rect x="82" y="36" width="29" height="13" rx="2"/><path d="M60 18v9M60 27L24 36M60 27l36 9"/><text x="9" y="54">PEOPLE / PROCESS</text></svg>',
 capital:'<svg viewBox="0 0 120 56" aria-hidden="true"><circle cx="60" cy="28" r="15"/><path d="M60 13V4M60 43v9M45 28H9M75 28h36"/><circle cx="16" cy="28" r="3"/><circle cx="104" cy="28" r="3"/><text x="9" y="54">DEAL / CAPITAL</text></svg>',
 sales:'<svg viewBox="0 0 120 56" aria-hidden="true"><path d="M8 45l20-11 17 5 20-17 28 7 19-22"/><path d="M99 7h13v13"/><circle cx="93" cy="29" r="3"/><text x="9" y="54">PACKAGE / CONVERSION</text></svg>'
};

const arch=[['01','MARKET','спрос и сегменты','market'],['02','MODEL','ценность и доход','model'],['03','ECONOMICS','допущения и KPI','economics'],['04','OPERATIONS','процессы и ресурсы','operations'],['05','INVESTMENT','форматы сделки','capital'],['06','SALES','коммерческий пакет','sales']];
const chain=[['01','IDEA','исходная задача'],['02','MARKET','спрос и сегменты'],['03','BUSINESS MODEL','ценность и доход'],['04','ECONOMICS','модель и KPI'],['05','OPERATIONS','процессы и ресурсы'],['06','TECHNICAL','техническая система'],['07','LEGAL','правовой контур'],['08','INVESTMENT','финансирование'],['09','SALES','коммерциализация'],['10','IMPLEMENTATION','переход к реализации']];

function infographicCard(a){return `<div class="card factoryInfo"><div class="factoryViz">${icons[a[3]]}</div><div class="factoryInfoBody"><b>${a[0]}</b><strong>${a[1]}</strong><span>${a[2]}</span></div></div>`}
function chainCard(a,i){return `<div class="phase factoryChain"><b>${a[0]}</b><strong>${a[1]}</strong><span>${a[2]}</span>${i<9?'<i aria-hidden="true">→</i>':''}</div>`}

function transform(html){
 if(html.includes('id="mmw-factory-infographics"')) return html;
 const css=`<style id="mmw-factory-infographics">
.factoryInfo{min-height:174px;position:relative;background:linear-gradient(145deg,var(--p2),var(--p));}
.factoryViz{height:84px;padding:11px 13px;background:#08120f;border-bottom:1px solid var(--l);display:flex;align-items:center;position:relative;overflow:hidden}
.factoryViz:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent 49%,#29423933 50%,transparent 51%),linear-gradient(0deg,transparent 49%,#29423933 50%,transparent 51%);background-size:22px 22px;opacity:.55}
.factoryViz svg{position:relative;z-index:1;width:100%;height:100%;fill:none;stroke:var(--g2);stroke-width:1.35}
.factoryViz text{fill:var(--g2);stroke:none;font:700 7px "DM Sans";letter-spacing:.055em}
.factoryInfoBody{padding:12px 14px}.factoryInfoBody>b{color:var(--g);font:800 10px Manrope}.factoryInfoBody strong{display:block;font:700 15px Manrope;margin:3px 0}.factoryInfoBody span{color:var(--m);font-size:11px}
.factoryChain{position:relative;min-height:118px;display:flex;flex-direction:column;justify-content:center}.factoryChain i{position:absolute;right:-10px;top:44%;font-style:normal;color:var(--g);font-size:17px;z-index:3}.factoryChain b{color:var(--g);font:800 10px Manrope}.factoryChain strong{display:block;font:700 13px Manrope;margin:6px 0 2px}.factoryChain span{font-size:10px;color:var(--m)}
.readySell{margin-top:18px;padding:24px;border:1px solid var(--l);border-radius:15px;background:linear-gradient(145deg,var(--p2),var(--p));position:relative;overflow:hidden}.readySell:after{content:"100%";position:absolute;right:22px;top:12px;font:800 44px Manrope;color:#d8b56b18;letter-spacing:-.06em}.readySellGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:18px}.readySellItem{padding:14px;background:#08120f;border:1px solid var(--l);border-radius:9px;position:relative}.readySellItem:before{content:"✓";position:absolute;right:10px;top:8px;color:var(--g);font-weight:800}.readySellItem b{color:var(--g);font:800 11px Manrope}.readySellItem strong{display:block;margin-top:5px;font:700 14px Manrope}
.factoryGate{margin-top:18px;padding:16px;border:1px solid var(--l);border-radius:12px;background:#08120f}.factoryGateRow{display:grid;grid-template-columns:repeat(5,1fr);gap:7px;align-items:center}.factoryGateStep{padding:10px 7px;text-align:center;border:1px solid var(--l);border-radius:7px;font:800 9px Manrope;color:var(--m);letter-spacing:.04em}.factoryGateStep.active{border-color:#d8b56b88;color:var(--g2);background:#12231d}.factoryGateArrow{text-align:center;color:var(--g);font-size:13px}
@media(max-width:950px){.factoryChain i{display:none}.readySellGrid{grid-template-columns:1fr 1fr}.factoryGateRow{grid-template-columns:1fr 1fr 1fr 1fr 1fr}}
@media(max-width:600px){.readySellGrid{grid-template-columns:1fr}.factoryGateRow{grid-template-columns:1fr}.factoryGateArrow{transform:rotate(90deg)}}
</style>`;
 html=html.replace('</style>',css+'</style>');

 // Replace the existing six architecture cards with one semantic Factory architecture layer.
 html=html.replace(/<div class="architecture">[\s\S]*?<\/div><\/div><\/section>/,`<div class="architecture">${arch.map(infographicCard).join('')}</div><div class="factoryGate"><div class="eyebrow">CONTROL GATE</div><div class="factoryGateRow"><div class="factoryGateStep active">FACTORY</div><div class="factoryGateArrow">→</div><div class="factoryGateStep">TEST</div><div class="factoryGateArrow">→</div><div class="factoryGateStep active">VERIFIED</div></div></div></div></section>`);

 // Replace the existing roadmap visuals with the ten-step development chain, without adding a second roadmap block.
 html=html.replace(/<div class="roadmap">[\s\S]*?<\/div><\/div><\/section>/,`<div class="roadmap">${chain.map(chainCard).join('')}</div></div></section>`);

 html=html.replace(/<div class="eyebrow">01 · Система<\/div><h2>Одна задача\. <em>Полная архитектура\.<\/em><\/h2>/,'<div class="eyebrow">03 · METHODOLOGY</div><h2>PROJECT <em>ARCHITECTURE.</em></h2>');
 html=html.replace(/<div class="eyebrow">06 · Процесс<\/div><h2>От задачи <em>до запуска\.<\/em><\/h2>/,'<div class="eyebrow">01 · DEVELOPMENT CHAIN</div><h2>От задачи <em>до реализации.</em></h2>');

 // Add READY-TO-SELL 100 once, immediately before the request block.
 if(!html.includes('id="ready-to-sell"')){
  const ready=`<section id="ready-to-sell"><div class="wrap"><div class="head"><div><div class="eyebrow">05 / STANDARD</div><h2>READY-TO-SELL <em>100.</em></h2></div><p>Полнота разработанного и упакованного бизнес-проекта — без гарантии его реализации или прибыльности.</p></div><div class="readySell"><div class="eyebrow">MMW / PROJECT STANDARD</div><h3>READY-TO-SELL 100</h3><p class="notice">Готовность означает полноту разработанного и упакованного бизнес-проекта, а не гарантию его реализации или прибыльности.</p><div class="readySellGrid"><div class="readySellItem"><b>01</b><strong>структура проекта</strong></div><div class="readySellItem"><b>02</b><strong>экономическая модель</strong></div><div class="readySellItem"><b>03</b><strong>управление и процессы</strong></div><div class="readySellItem"><b>04</b><strong>коммерческая упаковка</strong></div></div><div class="actions"><a class="btn primary" href="/ready-to-sell">VIEW READY-TO-SELL</a></div></div></div></section>`;
  html=html.replace('<section id="package-request">',ready+'<section id="package-request">');
 }
 return html;
}

fs.readFileSync=function(file,opts){const out=original(file,opts);if(path.normalize(file)===TARGET&&typeof out==='string')return transform(out);return out};

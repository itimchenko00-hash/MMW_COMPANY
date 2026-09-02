const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 10000;
const ROOT = path.join(__dirname, '..');

const BUILD = '2026-09-02-products-visual-v1';
const pages = {
  home: path.join(ROOT, 'company/website/mmw-company-interactive-v11.html'),
  aladin: path.join(ROOT, 'projects/ALADIN/website/aladin-presentation-suite.html'),
  nexusWork: path.join(ROOT, 'projects/NEXUS-WORK/website/nexus-work-presentation-suite.html'),
  nexusLogistics: path.join(ROOT, 'projects/NEXUS-LOGISTICS/website/nexus-logistics-presentation-v2.html'),
  carpathia: path.join(ROOT, 'projects/CARPATHIA/website/carpathia-compact.html'),
  agrohub: path.join(ROOT, 'projects/AGROHUB/website/agrohub-compact.html'),
  energy: path.join(ROOT, 'projects/ENERGY-PARK/website/energy-compact.html')
};

for (const [name, file] of Object.entries(pages)) {
  if (!fs.existsSync(file)) {
    console.error(`[MMW-FATAL] Missing canonical page: ${name} -> ${file}`);
    process.exit(1);
  }
}

app.disable('x-powered-by');
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('X-MMW-Build', BUILD);
  res.set('X-MMW-Repo', 'itimchenko00-hash/MMW_COMPANY');
  next();
});

function sendPage(file, res, refineHome = false) {
  if (!refineHome) {
    return res.sendFile(file, err => {
      if (err && !res.headersSent) res.status(err.statusCode || 404).send('MMW-COMPANY: page not found');
    });
  }

  fs.readFile(file, 'utf8', (err, html) => {
    if (err) return res.status(404).send('MMW-COMPANY: page not found');

    html = html
      .replace('<span>Идея, актив или задача</span>', '<span>Задача и концепция</span>')
      .replace('<span>Roadmap, контроль и запуск</span>', '<span>План запуска</span>');

    const visualStyle = `
      <style>
        #system .architecture{align-items:stretch}
        #system .node{padding:0;overflow:hidden;display:flex;flex-direction:column;min-height:245px;position:relative}
        #system .nodeVisual{height:118px;position:relative;overflow:hidden;border-bottom:1px solid var(--line);background:#08120f}
        #system .nodeVisual img{width:100%;height:100%;object-fit:cover;display:block;opacity:.62;filter:saturate(.72) contrast(1.08)}
        #system .nodeVisual:after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#07100e22,#07100ed9)}
        #system .nodeInfo{padding:15px 15px 17px;display:flex;flex-direction:column;flex:1}
        #system .nodeInfo b{font-size:10px}
        #system .nodeInfo strong{margin:5px 0 3px}
        #system .nodeInfo span{font-size:11px;line-height:1.45}
        #system .nodeViz{position:absolute;z-index:2;right:12px;bottom:10px;width:72px;height:42px;opacity:.96}
        #system .nodeViz svg{width:100%;height:100%;fill:none;stroke:var(--gold2);stroke-width:1.6}
        #system .nodeViz text{fill:var(--gold2);stroke:none;font:700 7px 'DM Sans',sans-serif;letter-spacing:.08em}

        #products .head,#extras .head{margin-bottom:22px}
        #products .products{grid-template-columns:repeat(3,1fr);gap:12px}
        #products .productVisual,#extras .extraVisual{height:78px;position:relative;overflow:hidden;border-bottom:1px solid var(--line);background:#08120f}
        #products .productVisual img,#extras .extraVisual img{width:100%;height:100%;object-fit:cover;display:block;opacity:.55;filter:saturate(.7) contrast(1.08)}
        #products .productVisual:after,#extras .extraVisual:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#07100eb8,#07100e25 65%,#07100eaa)}
        #products .productViz,#extras .extraViz{position:absolute;z-index:2;right:12px;top:14px;width:82px;height:48px}
        #products .productViz svg,#extras .extraViz svg{width:100%;height:100%;fill:none;stroke:var(--gold2);stroke-width:1.5}
        #products .productViz text,#extras .extraViz text{fill:var(--gold2);stroke:none;font:700 7px 'DM Sans',sans-serif;letter-spacing:.07em}
        #products .product{min-height:0;padding:0;overflow:hidden}
        #products .productBody{padding:15px 16px 16px;display:flex;flex-direction:column;min-height:235px}
        #products .product h3{font-size:18px;margin:5px 0 2px;letter-spacing:-.02em}
        #products .product .price{font-size:23px;margin:4px 0 8px}
        #products .product ul{margin:0 0 12px;padding-left:16px}
        #products .product li{font-size:11px;margin:3px 0;line-height:1.35}
        #products .product .btn{padding:8px 11px;font-size:11px}
        #products .tag{font-size:9px}
        #products .featured{border-color:#d8b56b88}

        #extras .extras{grid-template-columns:repeat(4,1fr);gap:12px}
        #extras .extra{padding:0;overflow:hidden;min-height:0}
        #extras .extraBody{padding:13px 14px 14px;display:flex;align-items:end;justify-content:space-between;gap:10px;min-height:86px}
        #extras .extra h3{font-size:14px;margin:0;line-height:1.2}
        #extras .extra .price{font-size:17px;margin:4px 0 0;white-space:nowrap}
        #extras .extra p{display:none}
        #extras .extraViz{top:15px;right:10px;width:68px;height:42px}
        #extras .extraName{max-width:62%}
        #products .package-note{margin-top:13px;padding:11px 14px;border:1px solid var(--line);border-radius:9px;background:#0a1713;color:var(--muted);font-size:11px}
        @media(max-width:950px){
          #system .node{min-height:225px}
          #products .products{grid-template-columns:1fr 1fr}
          #extras .extras{grid-template-columns:1fr 1fr}
        }
        @media(max-width:600px){
          #system .node{min-height:235px}
          #products .products,#extras .extras{grid-template-columns:1fr}
          #products .productBody{min-height:0}
          #extras .extraBody{min-height:78px}
        }
      </style>`;

    const nodes = [
      ['IDEA','Задача и концепция','https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=82',`<svg viewBox="0 0 72 42"><circle cx="12" cy="21" r="7"/><circle cx="36" cy="10" r="7"/><circle cx="60" cy="28" r="7"/><path d="M19 18L29 13M43 13L53 24"/><text x="5" y="40">CONCEPT</text></svg>`],
      ['STRATEGY','Рынок и позиционирование','https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=82',`<svg viewBox="0 0 72 42"><path d="M7 34L20 23L31 27L45 13L64 8"/><path d="M57 8h7v7"/><circle cx="20" cy="23" r="3"/><circle cx="45" cy="13" r="3"/><text x="7" y="40">MARKET</text></svg>`],
      ['BUSINESS MODEL','Продукт и доходы','https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=82',`<svg viewBox="0 0 72 42"><rect x="6" y="25" width="9" height="10"/><rect x="20" y="19" width="9" height="16"/><rect x="34" y="12" width="9" height="23"/><rect x="48" y="6" width="9" height="29"/><path d="M5 36H63"/><text x="6" y="41">REVENUE</text></svg>`],
      ['MODEL','Экономика проекта','https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=82',`<svg viewBox="0 0 72 42"><path d="M7 32L20 26L32 29L45 16L64 8"/><path d="M7 35H64"/><path d="M12 8v27"/><text x="8" y="40">CAPEX · OPEX</text></svg>`],
      ['SYSTEM','Управление и процессы','https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=82',`<svg viewBox="0 0 72 42"><rect x="26" y="4" width="20" height="10" rx="2"/><rect x="7" y="27" width="20" height="10" rx="2"/><rect x="45" y="27" width="20" height="10" rx="2"/><path d="M36 14v7M36 21L17 27M36 21L55 27"/><text x="7" y="41">TEAM · FLOW</text></svg>`],
      ['LAUNCH','План запуска','https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=82',`<svg viewBox="0 0 72 42"><path d="M7 34H64"/><path d="M12 34V27M25 34V22M38 34V17M51 34V11"/><path d="M51 7l7 4-7 4z"/><text x="7" y="41">ROADMAP</text></svg>`]
    ];

    const originalNodes = [
      '<div class="node"><b>01</b><strong>IDEA</strong><span>Задача и концепция</span></div>',
      '<div class="node"><b>02</b><strong>STRATEGY</strong><span>Рынок, цели и позиционирование</span></div>',
      '<div class="node"><b>03</b><strong>BUSINESS MODEL</strong><span>Продукт, клиенты и доходы</span></div>',
      '<div class="node"><b>04</b><strong>MODEL</strong><span>CAPEX, OPEX, Cash Flow и KPI</span></div>',
      '<div class="node"><b>05</b><strong>SYSTEM</strong><span>Команда, процессы и документы</span></div>',
      '<div class="node"><b>06</b><strong>LAUNCH</strong><span>План запуска</span></div>'
    ];

    nodes.forEach((node, i) => {
      const [title, desc, image, svg] = node;
      const replacement = `<div class="node"><div class="nodeVisual"><img src="${image}" alt="${title}" loading="lazy"><div class="nodeViz">${svg}</div></div><div class="nodeInfo"><b>${String(i + 1).padStart(2,'0')}</b><strong>${title}</strong><span>${desc}</span></div></div>`;
      html = html.replace(originalNodes[i], replacement);
    });

    const productCard = (tag, title, price, bullets, image, svg, featured = false, action = 'Выбрать пакет') => `
      <div class="card product${featured ? ' featured' : ''}">
        <div class="productVisual"><img src="${image}" alt="${title}" loading="lazy"><div class="productViz">${svg}</div></div>
        <div class="productBody"><span class="tag">${tag}</span><h3>${title}</h3><div class="price">${price}</div><ul>${bullets.map(x => `<li>${x}</li>`).join('')}</ul><a class="btn${featured ? ' primary' : ''}" href="#package-request">${action}</a></div>
      </div>`;

    const productData = [
      ['7 рабочих дней','BUSINESS CONCEPT','49 000 грн',['концепция и продукт','целевой клиент','рынок и конкуренты','бизнес-модель и базовая экономика','Roadmap'],'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=82',`<svg viewBox="0 0 82 48"><circle cx="14" cy="23" r="7"/><circle cx="41" cy="11" r="7"/><circle cx="68" cy="27" r="7"/><path d="M21 20L34 14M48 14L61 24"/><text x="6" y="45">IDEA → PLAN</text></svg>`,false],
      ['от 15 рабочих дней','BUSINESS PROJECT','119 000 грн',['исследование рынка','маркетинг и продажи','оргструктура','финансовая модель и KPI','риски и план действий'],'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=82',`<svg viewBox="0 0 82 48"><path d="M7 36L22 26L35 29L51 15L74 8"/><path d="M67 8h7v7"/><text x="8" y="45">MARKET → MODEL</text></svg>`,false],
      ['Flagship · от 25 рабочих дней','BUSINESS SYSTEM','249 000 грн',['бизнес-архитектура','управление и ответственность','KPI, процессы, регламенты','документооборот','финансовый контроль и CRM-логика'],'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=82',`<svg viewBox="0 0 82 48"><rect x="31" y="4" width="20" height="10" rx="2"/><rect x="8" y="29" width="20" height="10" rx="2"/><rect x="54" y="29" width="20" height="10" rx="2"/><path d="M41 14v8M41 22L18 29M41 22L64 29"/><text x="9" y="46">SYSTEM</text></svg>`,true],
      ['от 15 рабочих дней','INVESTMENT PROJECT','169 000 грн',['инвестиционная концепция','финансовая модель','структура капитала','Investment Memorandum','презентация и Data Room'],'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=82',`<svg viewBox="0 0 82 48"><path d="M8 37L20 27L33 30L49 16L73 9"/><path d="M66 9h7v7"/><circle cx="49" cy="16" r="3"/><text x="8" y="46">CAPITAL</text></svg>`,false],
      ['от 15 рабочих дней','BUSINESS RESTART','99 000 грн',['диагностика модели','продажи и расходы','оптимизация','новая экономика','план перезапуска'],'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=82',`<svg viewBox="0 0 82 48"><path d="M10 31c10-17 23-17 32-3 8 12 18 11 30-8"/><path d="M65 18h7v7"/><text x="9" y="46">RESET → GROW</text></svg>`,false],
      ['от 10 рабочих дней','BUSINESS SALE','129 000 грн',['бизнес-профиль','финансы и активы','презентация','Data Room','переговорная логика'],'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=82',`<svg viewBox="0 0 82 48"><path d="M8 37h66"/><path d="M15 31l13-9 12 6 15-14 11 4"/><path d="M66 14h8v8"/><text x="9" y="46">SALE ROOM</text></svg>`,false],
      ['Расширенный пакет','BUSINESS + INVESTOR','229 000 грн',['Business Project','расширенная финансовая модель','Investment Memorandum','Investor Presentation','Data Room'],'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=82',`<svg viewBox="0 0 82 48"><circle cx="18" cy="24" r="8"/><circle cx="64" cy="24" r="8"/><path d="M26 24h30"/><path d="M48 16l8 8-8 8"/><text x="12" y="46">BUSINESS + CAPITAL</text></svg>`,false],
      ['Индивидуальное ТЗ','CUSTOM BUSINESS PROJECT','от 299 000 грн',['девелопмент и строительство','производство и промышленность','агробизнес и переработка','логистика, недвижимость, инфраструктура'],'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=82',`<svg viewBox="0 0 82 48"><path d="M8 36h66"/><path d="M14 36V23l14-10 14 10v13M42 36V18l12-9 20 14v13"/><text x="8" y="46">CUSTOM BUILD</text></svg>`,false,'Обсудить проект'],
      ['Индивидуальное ТЗ','LARGE SCALE','от 499 000 грн',['крупные компании и группы','стратегия и финансы','организация и процессы','инвестиционная упаковка','Roadmap реализации'],'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=82',`<svg viewBox="0 0 82 48"><rect x="9" y="27" width="13" height="10"/><rect x="27" y="19" width="13" height="18"/><rect x="45" y="11" width="13" height="26"/><rect x="63" y="5" width="10" height="32"/><path d="M7 39h68"/><text x="8" y="46">SCALE</text></svg>`,false,'Обсудить проект']
    ];

    const productsMarkup = productData.map(x => productCard(...x)).join('');
    const productsSection = `<section id="products"><div class="wrap"><div class="head"><div><div class="eyebrow">02 · Продукты</div><h2>Форматы работы <em>MMW-COMPANY</em></h2></div><p>Выберите уровень проработки. После заявки уточняем задачу, подтверждаем состав работ и фиксируем финальную стоимость.</p></div><div class="products">${productsMarkup}</div><div class="package-note">Базовые цены. Финальная стоимость зависит от сложности проекта, объёма исследования, количества документов и требований заказчика.</div></div></section><section id="extras">`;

    const extraData = [
      ['Финансовая модель','от 24 900 грн','https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=800&q=82',`<svg viewBox="0 0 68 42"><path d="M7 34L19 25L31 28L44 15L61 8"/><path d="M55 8h7v7"/><text x="7" y="40">MODEL</text></svg>`],
      ['Бизнес-план','от 39 900 грн','https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=82',`<svg viewBox="0 0 68 42"><rect x="10" y="7" width="40" height="28" rx="2"/><path d="M17 15h25M17 21h25M17 27h17"/><text x="8" y="41">PLAN</text></svg>`],
      ['Инвестиционная презентация','от 19 900 грн','https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=82',`<svg viewBox="0 0 68 42"><rect x="8" y="7" width="52" height="28" rx="2"/><path d="M15 28l10-8 9 4 13-11"/><text x="8" y="41">PITCH</text></svg>`],
      ['Управляющее резюме','от 14 900 грн','https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=82',`<svg viewBox="0 0 68 42"><circle cx="18" cy="20" r="8"/><path d="M31 13h28M31 20h22M31 27h25"/><text x="8" y="41">BRIEF</text></svg>`],
      ['Data Room','от 29 900 грн','https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=82',`<svg viewBox="0 0 68 42"><path d="M8 12h20l4 5h28v18H8z"/><path d="M34 17v18"/><text x="8" y="41">DATA</text></svg>`],
      ['Пакет деловой документации','от 49 900 грн','https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=82',`<svg viewBox="0 0 68 42"><rect x="9" y="7" width="20" height="27"/><rect x="39" y="7" width="20" height="27"/><path d="M14 14h10M14 20h10M44 14h10M44 20h10"/><text x="7" y="41">DOCS</text></svg>`],
      ['Анализ рынка','от 29 900 грн','https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=82',`<svg viewBox="0 0 68 42"><path d="M8 34V12M8 34h52"/><path d="M15 28l11-10 10 5 15-13"/><text x="8" y="41">MARKET</text></svg>`],
      ['Конкурентный анализ','от 19 900 грн','https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=82',`<svg viewBox="0 0 68 42"><circle cx="22" cy="21" r="12"/><circle cx="47" cy="21" r="12"/><path d="M30 16l9 10M39 16l-9 10"/><text x="8" y="41">COMPETE</text></svg>`]
    ];

    const extrasMarkup = extraData.map(([title, price, image, svg]) => `<div class="card extra"><div class="extraVisual"><img src="${image}" alt="${title}" loading="lazy"><div class="extraViz">${svg}</div></div><div class="extraBody"><div class="extraName"><h3>${title}</h3><div class="price">${price}</div></div></div></div>`).join('');
    const extrasSection = `<section id="extras"><div class="wrap"><div class="head"><div><div class="eyebrow">03 · Дополнительные модули</div><h2>Отдельные <em>задачи.</em></h2></div><p>Модули можно заказать отдельно или добавить к основному проекту.</p></div><div class="extras">${extrasMarkup}</div></div></section><section id="portfolio">`;

    html = html.replace(/<section id="products">[\s\S]*?<section id="extras">/, productsSection);
    html = html.replace(/<section id="extras">[\s\S]*?<section id="portfolio">/, extrasSection);
    html = html.replace('</style>\n</head>', '</style>' + visualStyle + '\n</head>');
    res.type('html').send(html);
  });
}

app.get('/', (req, res) => sendPage(pages.home, res, true));
app.get(['/index.html', '/company', '/company/', '/company.html', '/home-v2'], (req, res) => res.redirect(308, '/'));

app.get(['/aladin', '/aladin/'], (req, res) => sendPage(pages.aladin, res));
app.get(['/nexus', '/nexus-work', '/nexus-work/'], (req, res) => sendPage(pages.nexusWork, res));
app.get(['/nexus-logistics', '/nexus-logistics/'], (req, res) => sendPage(pages.nexusLogistics, res));
app.get(['/carpathia', '/carpathia/'], (req, res) => sendPage(pages.carpathia, res));
app.get(['/agrohub', '/agrohub/'], (req, res) => sendPage(pages.agrohub, res));
app.get(['/energy', '/energy/'], (req, res) => sendPage(pages.energy, res));

app.get('/order', (req, res) => res.redirect('https://mmw-order.onrender.com'));
app.get('/health', (req, res) => res.json({
  service: 'MMW-COMPANY',
  status: 'ok',
  build: BUILD,
  repo: 'itimchenko00-hash/MMW_COMPANY',
  branch: 'main',
  structure: ['home', 'ALADIN', 'NEXUS WORK', 'NEXUS LOGISTICS', 'CARPATHIA ECO LODGE', 'AGROHUB', 'ENERGY PARK'],
  order: 'external /order redirect only'
}));

app.use((req, res) => res.status(404).send('MMW-COMPANY: route not found'));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MMW-COMPANY listening on ${PORT} | ${BUILD}`);
});

(() => {
  const root = document.getElementById('projects');
  if (!root || document.getElementById('companyArchitecture')) return;

  const photo = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;
  const blocks = [
    ['STRATEGY','Стратегия','Определяет бизнес-модель, позиционирование и вектор роста.','photo-1556761175-b413da4baf72','От классической стратегии до современной business design-практики: сначала формулируем, куда должен прийти бизнес, затем связываем это решение с экономикой.'],
    ['MODEL','Бизнес-модель','Превращает идею в понятную систему создания и получения ценности.','photo-1553877522-43269d4ea984','Business Model Canvas и современные методы продуктового проектирования сделали бизнес-модель отдельным инструментом управления, а не приложением к бизнес-плану.'],
    ['OPERATIONS','Операционная модель','Превращает стратегию в процессы, роли, регламенты и контроль.','photo-1551836022-d5d88e9218df','Современный operations management вырос из промышленной инженерии и системного управления качеством. В MMW процесс должен быть измеримым и повторяемым.'],
    ['FINANCE','Финансовая архитектура','Связывает продукт, затраты, капитал, денежный поток и результат.','photo-1554224155-6726b3ff858f','Финансовая модель нужна не ради красивой таблицы: она показывает, при каких условиях проект становится жизнеспособным и где находятся точки риска.'],
    ['DOCUMENTS','Системы и документы','Фиксируем решения в рабочих формах, договорах, чек-листах и управленческих правилах.','photo-1450101499163-c8848c66ca85','От первых бумажных управленческих систем до цифровых data room и ERP принцип один: решение должно оставлять проверяемый след.'],
    ['CAPITAL','Инвестиционная упаковка','Готовим проект к предметному разговору с инвестором или финансовым партнёром.','photo-1526304640581-d334cdbbf45e','Профессиональная инвестиционная упаковка соединяет историю проекта, рынок, экономику, структуру сделки и раскрытие рисков.'],
    ['ROADMAP','Roadmap запуска','Переводим проект из презентации в последовательность конкретных действий.','photo-1500530855697-b586d89ba3ee','Хороший roadmap отвечает на три вопроса: что делаем, кто отвечает и какой результат должен быть получен к контрольной точке.']
  ];

  const clients = [
    ['Предпринимателям','Идея → структурированный бизнес-проект → запуск.','photo-1521737711867-e3b97375f902'],
    ['Инвесторам','Диагностика, финансовая логика, инвестиционные материалы и риски.','photo-1559526324-593bc073d938'],
    ['Собственникам земли','Концепция монетизации земельного актива и девелоперская модель.','photo-1500382017468-9049fed747ef'],
    ['Собственникам недвижимости','Коммерциализация объекта: концепция, экономика и операционная модель.','photo-1486406146926-c627a92ad1ab'],
    ['Действующим компаниям','Перезапуск, реструктуризация, масштабирование или подготовка к продаже.','photo-1497366811353-6870744d04b2']
  ];

  const pricing = [
    ['BUSINESS CONCEPT','Концепция и первичная структура','49 000 грн'],
    ['BUSINESS PROJECT','Полный бизнес-проект под запуск','119 000 грн'],
    ['BUSINESS SYSTEM','Система управления + операционная модель','249 000 грн'],
    ['INVESTMENT PROJECT','Проект для привлечения инвесторов','169 000 грн'],
    ['BUSINESS RESTART','Перезапуск и реструктуризация','99 000 грн'],
    ['BUSINESS SALE','Подготовка бизнеса к продаже','129 000 грн'],
    ['BUSINESS + INVESTOR','Проект + сопровождение до инвестора','229 000 грн'],
    ['CUSTOM BUSINESS PROJECT','Индивидуальная разработка','от 299 000 грн'],
    ['LARGE SCALE','Крупные и комплексные проекты','от 499 000 грн']
  ];

  const extra = [
    ['Финансовая модель','24 900 грн','photo-1554224154-26032ffc0d07'],
    ['Бизнес-план','39 900 грн','photo-1454165804606-c3d57bc86b40'],
    ['Инвестиционная презентация','19 900 грн','photo-1551288049-bebda4e38f71'],
    ['Investment Memorandum','29 900 грн','photo-1556761175-5973dc0f32e7'],
    ['Executive Summary','14 900 грн','photo-1497366754035-f200968a6e72'],
    ['Data Room','29 900 грн','photo-1563013544-824ae1b704d3'],
    ['Business Documentation Package','49 900 грн','photo-1450101499163-c8848c66ca85'],
    ['Анализ рынка','29 900 грн','photo-1444653614773-995cb1ef9efa'],
    ['Конкурентный анализ','19 900 грн','photo-1556761175-4b46a572b786']
  ];

  const wrap = document.createElement('section');
  wrap.className = 'section mmw-company-content';
  wrap.id = 'companyArchitecture';
  wrap.innerHTML = `
    <div class="mmw-intro">
      <div><div class="eyebrow">BUSINESS DEVELOPMENT STUDIO</div><h2>Мы создаём не документ.<br><span>Мы создаём систему.</span></h2></div>
      <div class="mmw-intro-copy"><p>MMW-COMPANY проектирует целостную архитектуру будущего бизнеса: стратегия определяет бизнес-модель, бизнес-модель формирует финансовую структуру, а операционная модель превращается в конкретные процессы, документы и системы управления.</p><p>На выходе — не папка с отчётами, а структурированный проект, который можно анализировать, финансировать, запускать, масштабировать или продавать.</p></div>
    </div>
    <div class="mmw-photo-grid">
      ${blocks.map((b,i)=>`<article class="mmw-photo-card" style="--photo:url('${photo(b[3])}')"><div class="mmw-photo-overlay"></div><div class="mmw-photo-copy"><small>${String(i+1).padStart(2,'0')} / ${b[0]}</small><h3>${b[1]}</h3><p>${b[2]}</p><details><summary>История и логика</summary><span>${b[4]}</span></details></div></article>`).join('')}
    </div>

    <div class="mmw-section-title"><div class="eyebrow">WHO WE HELP</div><h2>Наши <span>клиенты.</span></h2><p>От первой идеи до инвестиционной сделки и нового этапа развития.</p></div>
    <div class="mmw-client-grid">${clients.map(c=>`<article><div class="mmw-client-img" style="background-image:url('${photo(c[2])}')"></div><div><h3>${c[0]}</h3><p>${c[1]}</p></div></article>`).join('')}</div>

    <div class="mmw-section-title"><div class="eyebrow">METHODOLOGY</div><h2>7 этапов <span>проектирования.</span></h2><p>Одна последовательность, понятные контрольные точки и ответственный результат на каждом этапе.</p></div>
    <div class="mmw-steps">${['Бриф','Диагностика','Проектирование','Моделирование','Документация','Инвестиционная упаковка','Roadmap'].map((x,i)=>`<div><b>0${i+1}</b><strong>${x}</strong><span>${['Идея, ресурсы, задача','Возможности, ограничения, риски','Архитектура будущего бизнеса','Бизнес-модель и финансовая модель','Рабочие системы и документы','Подготовка к финансированию','План до момента запуска'][i]}</span></div>`).join('')}</div>

    <div class="mmw-section-title"><div class="eyebrow">MMW-COMPANY PACKAGES</div><h2>Форматы <span>работы.</span></h2><p>Базовые ориентиры стоимости. Состав и цена конкретного проекта определяются после брифинга.</p></div>
    <div class="mmw-price-grid">${pricing.map(p=>`<article><small>${p[0]}</small><h3>${p[1]}</h3><strong>${p[2]}</strong></article>`).join('')}</div>

    <div class="mmw-section-title"><div class="eyebrow">ADDITIONAL SERVICES</div><h2>Отдельные <span>форматы.</span></h2><p>Конкретный аналитический или документальный продукт можно заказать отдельно.</p></div>
    <div class="mmw-extra-grid">${extra.map(e=>`<article><div class="mmw-extra-img" style="background-image:url('${photo(e[2])}')"></div><div><h3>${e[0]}</h3><strong>${e[1]}</strong></div></article>`).join('')}</div>

    <div class="mmw-final-grid">
      <article class="mmw-final-card" style="--photo:url('${photo('photo-1521292270410-a8c4d716d518')}')"><div class="mmw-final-overlay"></div><div><div class="eyebrow">GEOGRAPHY</div><h2>Международные проекты.<br><span>Полностью удалённо.</span></h2><p>Украина — база MMW-COMPANY. Проекты могут выполняться дистанционно для клиентов из Европы и других регионов.</p><div class="mmw-pills"><b>Украина</b><b>Международные проекты</b><b>Remote</b></div></div></article>
      <article class="mmw-final-card" style="--photo:url('${photo('photo-1563013544-824ae1b704d3')}')"><div class="mmw-final-overlay"></div><div><div class="eyebrow">CONFIDENTIALITY</div><h2>Безопасность и<br><span>защита данных.</span></h2><p>Конфиденциальная работа с проектной информацией, NDA по запросу и контролируемая передача материалов.</p><div class="mmw-pills"><b>Confidential</b><b>NDA</b><b>Secure workflow</b></div></div></article>
    </div>

    <div class="mmw-cta-strip"><div><div class="eyebrow">NEXT ACTION</div><h2>Есть идея, актив или действующий бизнес?</h2><p>Опишите исходные данные — определим, можно ли превратить их в проект и какой формат сотрудничества подходит.</p></div><a class="btn primary" href="mailto:itimchenko00@gmail.com">Написать MMW ↗</a></div>
  `;
  root.parentNode.insertBefore(wrap, root);

  const style = document.createElement('style');
  style.textContent = `
    .mmw-company-content{background:#080b09;padding-top:125px}
    .mmw-intro{display:grid;grid-template-columns:.85fr 1.15fr;gap:7vw;align-items:end;margin-bottom:55px}.mmw-intro h2,.mmw-section-title h2{font-family:'Playfair Display',Georgia,serif;font-size:clamp(42px,5.5vw,78px);line-height:.98;letter-spacing:-.04em;margin:0}.mmw-intro h2 span,.mmw-section-title h2 span{color:#c9a45b}.mmw-intro-copy p,.mmw-section-title p{color:#8f968f;max-width:720px;font-size:16px}.mmw-photo-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.mmw-photo-card{min-height:380px;position:relative;overflow:hidden;border:1px solid #303730;background:var(--photo) center/cover}.mmw-photo-overlay{position:absolute;inset:0;background:linear-gradient(0deg,rgba(4,6,5,.97),rgba(4,6,5,.12) 70%)}.mmw-photo-copy{position:absolute;left:0;right:0;bottom:0;padding:27px;z-index:1}.mmw-photo-copy small{color:#c9a45b;letter-spacing:.15em;font-size:9px}.mmw-photo-copy h3{font-size:28px;margin:10px 0 7px}.mmw-photo-copy p{color:#c0c5bf;margin:0;max-width:600px}.mmw-photo-copy details{margin-top:15px;border-top:1px solid #ffffff2a;padding-top:12px}.mmw-photo-copy summary{cursor:pointer;color:#dfc58c;font-size:10px;letter-spacing:.1em;text-transform:uppercase}.mmw-photo-copy details span{display:block;color:#9ea69e;font-size:12px;margin-top:9px;max-width:650px}.mmw-section-title{margin:115px 0 35px}.mmw-client-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}.mmw-client-grid article{border:1px solid #2d342e;background:#0b0f0d}.mmw-client-img{height:155px;background-size:cover;background-position:center;filter:saturate(.7)}.mmw-client-grid article>div:last-child{padding:18px}.mmw-client-grid h3{margin:0 0 8px;font-size:19px}.mmw-client-grid p{color:#858e86;font-size:12px;margin:0}.mmw-steps{display:grid;grid-template-columns:repeat(7,1fr);gap:8px}.mmw-steps div{border:1px solid #2d342e;background:#0b0f0d;padding:18px;min-height:165px}.mmw-steps b{color:#c9a45b;font-size:10px}.mmw-steps strong{display:block;margin:25px 0 8px;font-size:14px}.mmw-steps span{color:#777f78;font-size:10px}.mmw-price-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.mmw-price-grid article{border:1px solid #2d342e;padding:22px;background:#0b0f0d;min-height:145px}.mmw-price-grid small{color:#c9a45b;letter-spacing:.12em;font-size:8px}.mmw-price-grid h3{font-size:17px;margin:18px 0 15px}.mmw-price-grid strong{font-size:21px}.mmw-extra-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.mmw-extra-grid article{border:1px solid #2d342e;background:#0b0f0d;display:grid;grid-template-columns:110px 1fr;min-height:110px}.mmw-extra-img{background-size:cover;background-position:center}.mmw-extra-grid article>div:last-child{padding:17px}.mmw-extra-grid h3{font-size:15px;margin:0 0 10px}.mmw-extra-grid strong{color:#c9a45b;font-size:13px}.mmw-final-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:115px}.mmw-final-card{min-height:420px;position:relative;overflow:hidden;border:1px solid #303730;background:var(--photo) center/cover}.mmw-final-overlay{position:absolute;inset:0;background:linear-gradient(0deg,rgba(4,6,5,.96),rgba(4,6,5,.25))}.mmw-final-card>div:last-child{position:absolute;inset:auto 0 0;padding:32px;z-index:1}.mmw-final-card h2{font-family:'Playfair Display',Georgia,serif;font-size:clamp(32px,4vw,55px);line-height:.98}.mmw-final-card h2 span{color:#c9a45b}.mmw-final-card p{color:#a5ada5;max-width:650px}.mmw-pills{display:flex;gap:7px;flex-wrap:wrap}.mmw-pills b{border:1px solid #4b5049;padding:6px 9px;color:#c7ccc6;font-size:8px;letter-spacing:.08em}.mmw-cta-strip{margin-top:25px;border:1px solid #3a4038;padding:38px;display:flex;justify-content:space-between;align-items:center;gap:30px;background:radial-gradient(circle at 90% 10%,#302a1b,transparent 35%),#0b0f0d}.mmw-cta-strip h2{font-family:'Playfair Display',Georgia,serif;font-size:clamp(32px,4vw,55px);margin:0}.mmw-cta-strip p{color:#8b938b;max-width:750px}
    @media(max-width:1000px){.mmw-intro{grid-template-columns:1fr}.mmw-client-grid{grid-template-columns:repeat(2,1fr)}.mmw-steps{grid-template-columns:repeat(4,1fr)}.mmw-price-grid{grid-template-columns:repeat(2,1fr)}.mmw-extra-grid{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:650px){.mmw-photo-grid,.mmw-final-grid{grid-template-columns:1fr}.mmw-client-grid,.mmw-steps,.mmw-price-grid,.mmw-extra-grid{grid-template-columns:1fr}.mmw-cta-strip{align-items:flex-start;flex-direction:column}.mmw-photo-card{min-height:330px}}
  `;
  document.head.appendChild(style);
})();

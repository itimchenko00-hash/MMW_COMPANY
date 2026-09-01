(() => {
  'use strict';

  const IMG = {
    LAND: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85',
    CAPITAL: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1400&q=85',
    DESIGN: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=85',
    BUILD: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=85',
    SALES: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=85',
    OPERATE: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85',
    RETURN: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=85',
    TEAM: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=85',
    SERVICES: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=85'
  };

  const VALUE = [
    ['LAND','ЗЕМЛЯ','⌂','Актив и исходная точка проекта.','MMW проверяет назначение, ограничения, инфраструктуру, окружение и потенциальный продукт.','Земля стала основой организованного хозяйства задолго до появления современной недвижимости.'],
    ['CAPITAL','ИНВЕСТИЦИИ','◈','Ресурс, который запускает проект.','Формируем CAPEX/OPEX, источники капитала, этапы финансирования, риски и структуру SPV.','Современная инвестиционная архитектура выросла вместе с банками, промышленностью и рынками капитала.'],
    ['DESIGN','ПРОЕКТ','⌗','Идея превращается в продукт.','Архитектура, инженерия, BIM, смета, визуализация, ТЗ и подготовка к реализации.','От ручных чертежей архитектура пришла к CAD, BIM, 3D и цифровым моделям.'],
    ['BUILD','СТРОЙКА','▦','Проект становится физическим активом.','Подрядчики, закупки, календарь, качество, бюджет, безопасность и документация.','Индустриализация добавила строительству механизацию, стандартизацию и управление качеством.'],
    ['SALES','ПРОДАЖИ','↗','Созданный продукт находит своего клиента.','Позиционирование, упаковка, маркетинг, лидогенерация, CRM и организация сделок.','Профессиональные продажи недвижимости развивались вместе с городскими рынками, рекламой и ипотекой.'],
    ['OPERATE','ОПЕРАЦИИ','⚙','Актив начинает работать после запуска.','Эксплуатация, сервис, загрузка, расходы, клиентский опыт и контроль операционной модели.','Facility и property management стали отдельными дисциплинами с ростом сложных зданий и коммерческих объектов.'],
    ['RETURN','ДОХОД','₴','Экономический результат проекта.','Выручка, EBITDA, денежный поток, exit или реинвестирование — только после проверки фактических данных.','Доходность всегда связывает капитал, время, риск и денежный поток.']
  ];

  const PROFESSIONS = [
    ['🏛️','Архитектор','От главного строителя античности до BIM и цифровых моделей.','В MMW превращает бизнес-задачу в понятный, реализуемый и продаваемый продукт.'],
    ['📐','Инженер-конструктор','Развитие расчётной механики, стали и железобетона позволило создавать более сложные и высокие здания.','Отвечает за надёжность, расчёты и техническую реализуемость.'],
    ['📊','Сметчик / Cost Manager','Учёт материалов и труда существовал на крупных стройках задолго до современных сметных систем.','Защищает бюджет и связывает стоимость с графиком, закупками и контрактами.'],
    ['💻','3D / Design','Ручная перспектива сменилась CAD, 3D, VR и цифровыми двойниками.','Делает сложный проект понятным клиенту, инвестору и команде.'],
    ['🏗️','Строитель','Одна из древнейших организованных профессий, которая прошла путь от ручного труда к механизации и цифровому контролю.','Превращает проектную документацию в реальный актив.'],
    ['◈','Project Manager','Дисциплина управления проектами сформировалась на сложных инженерных и инфраструктурных программах XX века.','Синхронизирует людей, деньги, сроки, риски, документы и результат.'],
    ['🚀','Development Manager','Девелопмент объединяет землю, капитал, продукт и рынок в единую экономическую систему.','Управляет созданием стоимости от идеи до работающего актива.'],
    ['🤝','Sales & Marketing','Современные продажи стали измеримым процессом благодаря маркетингу, CRM и цифровым каналам.','Формирует спрос и превращает продукт в сделки.']
  ];

  const SERVICES = [
    ['01','Development','Концепция, стратегия, ТЭО и дорожная карта проекта.'],
    ['02','Land & Due Diligence','Предварительная проверка участка, назначения, ограничений и потенциала.'],
    ['03','Financial Architecture','Финансовая модель, CAPEX/OPEX, сценарии, структура капитала и data room.'],
    ['04','Project Management','Команда, сроки, бюджет, риски, подрядчики и проектная документация.'],
    ['05','Design Management','ТЗ, архитектура, инженерия, BIM, визуализация и координация проектирования.'],
    ['06','Construction Management','Закупки, подрядчики, контроль сроков, качества, стоимости и строительного цикла.'],
    ['07','Sales & Marketing','Позиционирование, упаковка, маркетинг, лидогенерация, CRM и продажи.'],
    ['08','Operations','Подготовка операционной модели, сервисов и управления активом.'],
    ['09','Investment Packaging','Инвестмеморандум, презентации, структура сделки и переговорная подготовка.'],
    ['10','Project Company / SPV','Проектная структура, распределение ресурсов, рисков и экономики по соглашению сторон.']
  ];

  const css = `
    body{font-size:17px}
    .clean-section{position:relative;background:#090d0b}
    .clean-section:before{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:80px 80px;opacity:.25}
    .clean-wrap{position:relative;z-index:1}
    .clean-intro{max-width:760px;margin:0 0 34px}
    .clean-intro p{color:#9da69e;line-height:1.7;margin:12px 0 0}
    .value-grid-clean{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
    .value-card-clean{position:relative;min-height:260px;overflow:hidden;border:1px solid #303831;background:#0b100d;color:#fff;text-align:left;padding:0;cursor:pointer}
    .value-card-clean .bg{position:absolute;inset:0;background:var(--bg) center/cover;opacity:.34;transition:.4s}
    .value-card-clean:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,8,6,.08),rgba(5,8,6,.94) 82%)}
    .value-card-clean:hover{border-color:#c9a45b}.value-card-clean:hover .bg{transform:scale(1.05);opacity:.5}
    .value-copy-clean{position:absolute;z-index:2;left:20px;right:20px;bottom:18px}
    .value-copy-clean .icon{font-size:27px;color:#d7b56a;margin-bottom:12px;display:block}
    .value-copy-clean .code{font-size:10px;letter-spacing:.16em;color:#d7b56a}
    .value-copy-clean strong{display:block;font-size:24px;margin:5px 0}
    .value-copy-clean small{display:block;color:#b7c0b8;line-height:1.4}
    .detail-clean{display:grid;grid-template-columns:1fr 1.2fr;gap:22px;margin-top:16px;border:1px solid #303831;background:#0b100d;padding:18px}
    .detail-clean[hidden]{display:none}.detail-photo-clean{min-height:270px;background:var(--bg) center/cover}.detail-text-clean{padding:10px 10px 10px 4px}.detail-text-clean h3{font-size:30px;margin:0 0 8px}.detail-text-clean p{color:#b5beb6;line-height:1.65}.detail-history-clean{margin-top:18px;border-left:2px solid #c9a45b;padding-left:15px;color:#d9ded9;line-height:1.6}
    .clean-grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
    .profession-clean{border:1px solid #303831;background:#0b100d;color:#fff;text-align:left;padding:20px;cursor:pointer;min-height:190px}.profession-clean:hover{border-color:#c9a45b;transform:translateY(-2px)}
    .profession-clean .ico{font-size:28px}.profession-clean strong{display:block;font-size:19px;margin:15px 0 8px}.profession-clean small{color:#909a91;line-height:1.5}
    .service-grid-clean{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.service-clean{display:grid;grid-template-columns:52px 1fr;gap:12px;border:1px solid #303831;background:#0b100d;padding:20px}.service-clean .n{color:#c9a45b;font-size:11px;letter-spacing:.12em}.service-clean h3{margin:0;font-size:20px}.service-clean p{margin:7px 0 0;color:#929b93;line-height:1.5}
    .audience-clean{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.audience-clean a{display:block;border:1px solid #303831;background:#0b100d;padding:22px;color:#fff;text-decoration:none}.audience-clean a:hover{border-color:#c9a45b}.audience-clean .tag{font-size:10px;letter-spacing:.15em;color:#c9a45b}.audience-clean h3{margin:10px 0 7px;font-size:22px}.audience-clean p{margin:0;color:#929b93;line-height:1.5}
    @media(max-width:980px){.value-grid-clean,.clean-grid-4{grid-template-columns:repeat(2,1fr)}.detail-clean{grid-template-columns:1fr}.audience-clean{grid-template-columns:1fr}}
    @media(max-width:640px){body{font-size:16px}.value-grid-clean,.clean-grid-4,.service-grid-clean{grid-template-columns:1fr}.value-card-clean{min-height:220px}.detail-photo-clean{min-height:200px}.clean-intro{margin-bottom:24px}}
  `;

  function injectCss(){
    if(document.getElementById('mmw-clean-css')) return;
    const s=document.createElement('style');s.id='mmw-clean-css';s.textContent=css;document.head.appendChild(s);
  }

  function sectionShell(id,eyebrow,title,lead,body){
    const s=document.createElement('section');s.className='section clean-section';s.id=id;
    s.innerHTML=`<div class="clean-wrap"><div class="clean-intro"><div class="eyebrow">${eyebrow}</div><h2>${title}</h2><p>${lead}</p></div>${body}</div>`;
    return s;
  }

  function buildValueSection(){
    const cards=VALUE.map((v,i)=>`<button class="value-card-clean" data-value-index="${i}" style="--bg:url('${v[6]||IMG[v[0]]}')"><span class="bg"></span><span class="value-copy-clean"><span class="icon">${v[2]}</span><span class="code">0${i+1} · ${v[0]}</span><strong>${v[1]}</strong><small>${v[3]}</small></span></button>`).join('');
    const s=sectionShell('value-chain','02 / VALUE CHAIN','Как MMW-COMPANY создаёт стоимость.','Семь последовательных контуров. Каждый отвечает за свой ресурс, результат и источник ценности.',`<div class="value-grid-clean">${cards}</div><div id="value-detail-clean" class="detail-clean" hidden></div>`);
    s.querySelectorAll('[data-value-index]').forEach(btn=>btn.addEventListener('click',()=>{
      const v=VALUE[Number(btn.dataset.valueIndex)],d=s.querySelector('#value-detail-clean');
      d.style.setProperty('--bg',`url('${IMG[v[0]]}')`);d.innerHTML=`<div class="detail-photo-clean"></div><div class="detail-text-clean"><div class="eyebrow">${v[0]}</div><h3>${v[1]}</h3><p>${v[4]}</p><div class="detail-history-clean"><b>Короткий исторический факт</b><br>${v[5]}</div></div>`;d.hidden=false;
      d.scrollIntoView({behavior:'smooth',block:'nearest'});
    }));
    return s;
  }

  function buildTeamSection(){
    const cards=PROFESSIONS.map((p,i)=>`<button class="profession-clean" data-prof-index="${i}"><span class="ico">${p[0]}</span><strong>${p[1]}</strong><small>История профессии · роль в MMW ↗</small></button>`).join('');
    const s=sectionShell('team','06 / TEAM','Команда, которая строит систему.','Не просто должности. Это профессии с историей, ответственностью и понятным местом в проектном цикле.',`<div class="clean-grid-4">${cards}</div><div id="profession-detail-clean" class="detail-clean" hidden></div>`);
    s.querySelectorAll('[data-prof-index]').forEach(btn=>btn.addEventListener('click',()=>{
      const p=PROFESSIONS[Number(btn.dataset.profIndex)],d=s.querySelector('#profession-detail-clean');
      d.style.setProperty('--bg',`url('${IMG.TEAM}')`);d.innerHTML=`<div class="detail-photo-clean"></div><div class="detail-text-clean"><div class="eyebrow">${p[1]}</div><h3>${p[0]} ${p[1]}</h3><p>${p[2]}</p><div class="detail-history-clean"><b>Роль в MMW-COMPANY</b><br>${p[3]}</div></div>`;d.hidden=false;d.scrollIntoView({behavior:'smooth',block:'nearest'});
    }));
    return s;
  }

  function buildServicesSection(){
    const cards=SERVICES.map(x=>`<article class="service-clean"><div class="n">${x[0]}</div><div><h3>${x[1]}</h3><p>${x[2]}</p></div></article>`).join('');
    return sectionShell('services','05 / SERVICES','Услуги MMW-COMPANY.','От первичной идеи и земли до финансовой архитектуры, реализации, продаж и операционного управления.',`<div class="service-grid-clean">${cards}</div>`);
  }

  function buildAudienceSection(){
    return sectionShell('routes','07 / PROJECT ROUTES','Три маршрута для каждого проекта.','Один бренд — три разные задачи. Не смешиваем язык инвестора, команды и будущего клиента.',`<div class="audience-clean"><a href="/project/aladin?deck=investor#presentations"><span class="tag">💰 INVESTOR</span><h3>Инвестор</h3><p>Экономика, структура сделки, риски, капитал и сценарии.</p></a><a href="/project/aladin?deck=team#presentations"><span class="tag">👷 TEAM</span><h3>Команда</h3><p>Роли, развитие, управление, компетенции и партнёрская модель.</p></a><a href="/project/aladin?deck=buyer#presentations"><span class="tag">🏡 BUYER</span><h3>Покупатель</h3><p>Продукт, среда жизни, преимущества, сервис и путь клиента.</p></a></div>`);
  }

  function cleanExisting(){
    document.querySelectorAll('#value-chain,#team,#services,#routes').forEach(x=>x.remove());
    const oldPartner=[...document.querySelectorAll('section')].find(s=>s.querySelector('.partner-cards'));
    if(oldPartner) oldPartner.remove();
  }

  function mount(){
    injectCss();
    cleanExisting();
    const system=document.getElementById('system');
    const portfolio=document.getElementById('projects');
    const lab=document.getElementById('lab');
    const order=document.getElementById('order');
    if(!system||!portfolio||!lab||!order) return;

    system.after(buildValueSection());
    portfolio.after(buildServicesSection());
    lab.after(buildAudienceSection());
    // Team is deliberately placed after services and before ORDER: capability follows offer, then action.
    const services=document.getElementById('services');
    services.after(buildTeamSection());

    const nav=document.querySelector('.nav nav');
    if(nav && !document.getElementById('team-nav')){
      const a=document.createElement('a');a.id='team-nav';a.href='#team';a.textContent='Команда';nav.insertBefore(a,nav.querySelector('.nav-cta')||null);
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount); else mount();
})();

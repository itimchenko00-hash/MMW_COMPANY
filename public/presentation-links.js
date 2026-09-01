(() => {
  const decks = [
    ['investor','ИНВЕСТОР','Финансовая модель, инвестиционная логика, риски и структура сделки'],
    ['team','КОМАНДА','Роли, этапы, управление, компетенции и рабочая модель'],
    ['buyer','КЛИЕНТ / ПОКУПАТЕЛЬ','Продукт, ценность, сценарий использования и путь клиента']
  ];

  const systemBlocks = [
    ['LAND','ЗЕМЛЯ','Актив, локация, юридическая и инженерная проверка.','photo-1500382017468-9049fed747ef','investor'],
    ['CAPITAL','КАПИТАЛ','Финансирование, структура сделки, транши и контроль бюджета.','photo-1559526324-4b87b5e36e44','investor'],
    ['DESIGN','ПРОЕКТ','Архитектура, продукт, BIM и технические решения.','photo-1487958449943-2429e8be8625','team'],
    ['BUILD','СТРОЙКА','Подрядчики, закупки, график, технадзор, качество и безопасность.','photo-1504307651254-35680f356dfd','team'],
    ['SALES','ПРОДАЖИ','Позиционирование, маркетинг, лиды, воронка и коммерциализация.','photo-1556761175-b413da4baf72','buyer'],
    ['OPERATE','ОПЕРАТОР','Запуск, сервис, эксплуатация, KPI и цифровое управление.','photo-1497366216548-37526070297c','team'],
    ['RETURN','ДОХОД','Источники выручки, маржа, возврат капитала и масштабирование.','photo-1551836022-d5d88e9218df','investor']
  ];

  const ALADIN_TEAM = [
    ['ALADIN','Мы ищем людей, которые хотят не просто работать в строительстве.','Мы ищем тех, кто хочет его создавать.','Архитекторы • Инженеры • Конструкторы • Сметчики • Дизайнеры • Строители','photo-1503387762-592deb58ef4e'],
    ['ЧТО МЫ СОЗДАЁМ?','Новую строительную компанию Украины','Строить доступное, современное и энергоэффективное жильё. Развивать строительные технологии. Создавать рабочие места. Масштабировать решения по Украине.','Строительство • технологии • команда • масштаб','photo-1504307651254-35680f356dfd'],
    ['ПОЧЕМУ МЫ ИЩЕМ МОЛОДЫХ СПЕЦИАЛИСТОВ?','ALADIN строится с нуля.','Мы не хотим просто нанять человека на должность. Мы ищем будущих руководителей направлений, главных инженеров, архитекторов проектов и директоров филиалов.','Амбиция • ответственность • рост • лидерство','photo-1521737711867-e3b97375f902'],
    ['КОГО МЫ ИЩЕМ?','Архитектор • Инженер-конструктор • Сметчик • 3D / Design','Архитектура, конструкции, нагрузки, узлы, себестоимость, сметы, визуализация, презентации и дизайн продукта.','⌂ Архитектор  ·  ⌬ Конструктор  ·  ₴ Сметчик  ·  ◇ 3D / Design','photo-1497366754035-f200968a6e72'],
    ['НАМ НЕ НУЖНЫ «ИДЕАЛЬНЫЕ» РЕЗЮМЕ','Нам важнее другое','Амбиции. Ответственность. Обучаемость. Инициативность. Командность. Архитектор без конструктора далеко не уйдёт — сильный проект создаёт команда.','Амбиции • ответственность • обучаемость • инициативность • командность','photo-1529156069898-49953e39b3ac'],
    ['ЧТО ТЫ ПОЛУЧИШЬ?','Реальный проект вместо учебного макета','Ты увидишь весь путь: идея → проект → смета → земля → финансирование → строительство → продажа → готовый дом.','Полный цикл проекта','photo-1497366216548-37526070297c'],
    ['ГЛАВНОЕ ПРЕИМУЩЕСТВО','Твоя работа может стать твоим бизнесом','На стартовом этапе рассматривается партнёрская модель: работа над проектом, участие в развитии компании, возможный процент от результата проекта или доля по отдельному соглашению. Условия фиксируются документально.','Работа → вклад → результат → партнёрство','photo-1556761175-b413da4baf72'],
    ['КАРЬЕРНЫЙ ПУТЬ','Студент → стажёр → специалист → руководитель направления → руководитель проекта → партнёр ALADIN','Рост строится вокруг реальной ответственности и способности вести направление от задачи до результата.','6 ступеней роста','photo-1521737604893-d14cc237f11d'],
    ['ПЕРВЫЙ ПРОЕКТ','Таунхаус нового поколения · ≈70 м²','Энергоэффективность, современная архитектура, рациональная планировка, современные материалы и низкие эксплуатационные расходы. Первый объект станет лабораторией технологий, экономики и организации строительства.','≈70 м² • energy efficient • pilot','photo-1600585154340-be6161a56a0c'],
    ['А ПОТОМ?','Мы масштабируемся','Ивано-Франковск → Западная Украина → другие регионы → проекты восстановления → ALADIN REBUILD UKRAINE.','Локальный пилот → национальная система','photo-1500530855697-b586d89ba3ee'],
    ['НАША ФИЛОСОФИЯ','FIRMITAS · UTILITAS · VENUSTAS','Прочность. Польза. Красота. Три принципа ALADIN: создавать здания, которые надёжны → полезны → красивы.','Надёжность • польза • красота','photo-1511818966892-d7d671e672a2'],
    ['КАК ПОПАСТЬ В КОМАНДУ?','5 простых этапов','1. Информация о себе. 2. Любая работа: диплом, проект, чертёж, 3D или расчёт. 3. Короткое собеседование. 4. Практическое задание. 5. Лучшие кандидаты входят в проектную команду.','Информация → портфолио → интервью → практика → команда','photo-1551836022-d5d88e9218df'],
    ['ФИНАЛ','ALADIN ищет не сотрудников. ALADIN ищет партнёров.','Если ты хочешь однажды сказать: «Я участвовал в создании этой компании с самого начала» — возможно, тебе к нам.','Telegram • Email • MMW-COMPANY','photo-1510798831971-661eb04b3739']
  ];

  const ALADIN_BUYER = [
    ['ALADIN','ДОМ, КОТОРЫЙ СОЗДАН ДЛЯ ЖИЗНИ','Современные энергоэффективные таунхаусы в Ивано-Франковской области.','≈70 м² • собственная территория • современная архитектура • энергоэффективность','photo-1600585154340-be6161a56a0c'],
    ['БОЛЬШЕ, ЧЕМ КВАРТИРА','Собственный дом и своё пространство','🏡 Собственный дом  ·  🌿 пространство  ·  🚗 парковка  ·  ☀️ светлая планировка  ·  🔥 энергоэффективность  ·  🛡️ безопасность  ·  🌳 природа рядом','Дом для жизни, а не просто квадратные метры','photo-1600607687920-4e2a09cf159d'],
    ['ВАШ НОВЫЙ ДОМ','Ориентировочно 70 м²','Первый уровень: кухня-гостиная, санузел, техническая зона, выход на территорию. Второй уровень: спальня, детская / кабинет, санузел. Планировка уточняется финальным проектом.','2 уровня • семейный сценарий • гибкая планировка','photo-1494526585095-c41746248156'],
    ['ДОМ, КОТОРЫЙ ЭКОНОМИТ','Энергоэффективность начинается на стадии архитектуры','Меньше теплопотерь → меньше потребление энергии → меньше расходы на отопление → больше комфорта.','Тепловой контур • инженерные системы • контроль качества','photo-1510798831971-661eb04b3739'],
    ['СОВРЕМЕННАЯ АРХИТЕКТУРА','Минимализм, который не надоедает','Чистые линии. Большие окна. Естественное освещение. Рациональные помещения. Современные фасады. Дом должен выглядеть современно сегодня и через 10 лет.','Функция • свет • пропорции • долговечность','photo-1487958449943-2429e8be8625'],
    ['ВАШЕ ПРОСТРАНСТВО','Квартира заканчивается у двери. Ваш дом начинается за ней.','Своя территория, парковка, пространство для отдыха, отдельный вход и собственный ритм жизни.','Приватность • территория • парковка • свой вход','photo-1449844908441-8829872d2607'],
    ['МЕСТО ДЛЯ СЕМЬИ','Мы создаём не квадратные метры. Мы создаём образ жизни.','Утро с кофе на своей террасе. Дети играют во дворе. Автомобиль рядом с домом. Вечером семья собирается в общей гостиной.','Терраса • двор • семья • комфорт','photo-1505693416388-ac5ce068fe85'],
    ['ТЕХНОЛОГИИ','Дом ALADIN — от проектирования до готового дома','Проектирование → энергоэффективные конструкции → современные инженерные системы → качественные материалы → контроль строительства → готовый дом.','Контроль на каждом этапе','photo-1473341304170-971dccb5ac1e'],
    ['ПОЛНЫЙ ЦИКЛ','Один проект. Одна команда. Один результат.','Архитектура, инженерия, строительство, контроль и сервис объединяются в одной девелоперской системе.','Архитектура • инженерия • стройка • контроль • сервис','photo-1504307651254-35680f356dfd'],
    ['ДОСТУПНОЕ ЖИЛЬЁ','Собственный дом можно сделать доступнее','Рациональная архитектура, типовые решения, оптимизация процессов, контроль себестоимости и собственная девелоперская система помогают снижать лишние издержки.','Рациональность • повторяемость • контроль','photo-1564013799919-ab600027ffc6'],
    ['ФИНАНСИРОВАНИЕ','Покупка собственного дома должна быть реальной','Проекты планируется адаптировать под доступные законные инструменты финансирования и государственные программы при соответствии объекта требованиям. Возможны собственные средства, банковское кредитование и другие инструменты.','Финансирование подбирается под конкретный объект','photo-1559526324-593bc073d938'],
    ['ПЕРВЫЙ ПРОЕКТ','ALADIN RESIDENCE · Ивано-Франковская область','Современный малоэтажный жилой комплекс: 4 первые секции, ориентировочно ≈70 м² каждая, собственная территория, парковка и энергоэффективность.','4 секции • ≈280 м² пилот • energy efficient','photo-1545324418-cc1a3fa10c00'],
    ['ДЛЯ КОГО?','ALADIN — для тех, кто хочет больше','👨‍👩‍👧 Молодая семья. 💻 IT / digital специалист. 👷 Инженер или специалист. 🌿 Семья, которая хочет тишины рядом с городской инфраструктурой.','Семья • работа • природа • комфорт','photo-1504150558240-0b4fd8946624'],
    ['ПОКУПАЯ ALADIN, ВЫ ПОЛУЧАЕТЕ','Дом и пространство для жизни','🏡 Дом · 🌿 территория · 🚗 парковка · 🔥 энергоэффективность · 🛠️ современные технологии · 🔑 сервис ALADIN · ❤️ пространство для семьи.','Не просто дом — целостный продукт','photo-1600566753190-17f0baa2a6c3'],
    ['ФИНАЛ','ВАШ ДОМ. ВАША ТЕРРИТОРИЯ. ВАША ЖИЗНЬ.','ALADIN · SOCIETAS AEDIFICANDI. Мы строим пространство, в котором хочется жить.','Следующий шаг — заявка на проект / консультацию','photo-1600607688969-a5bfcd646154']
  ];

  const img = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=88`;
  const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function currentProject(){
    const m=location.pathname.match(/\/project\/([^/?#]+)/);
    return m ? m[1].toLowerCase() : (location.pathname.includes('aladin')?'aladin':null);
  }

  function openDeck(id){
    if(currentProject()==='aladin' && (id==='team'||id==='buyer')) { openCustomDeck(id); return; }
    const audiences=document.querySelector('#audiences');
    if(!audiences) return;
    const card=[...audiences.querySelectorAll('[data-audience]')].find(x=>x.dataset.audience===id);
    if(card){card.click();history.replaceState({},'',`?deck=${id}#presentations`);document.querySelector('#presentations')?.scrollIntoView({behavior:'smooth',block:'start'});}
  }

  function openCustomDeck(id){
    const slides=id==='team'?ALADIN_TEAM:ALADIN_BUYER;
    const title=id==='team'?'👷 ALADIN — КОМАНДА':'🏡 ALADIN — БУДУЩИЕ ПОКУПАТЕЛИ';
    let index=0;
    let modal=document.querySelector('#mmwCustomDeck');
    if(!modal){
      modal=document.createElement('div');modal.id='mmwCustomDeck';
      modal.innerHTML=`<div class="mmw-deck-backdrop"></div><div class="mmw-deck"><div class="mmw-deck-top"><div><span class="mmw-deck-kicker">ALADIN · PRESENTATION</span><h2 id="mmwDeckTitle"></h2></div><button id="mmwDeckClose">×</button></div><div class="mmw-deck-progress"><i id="mmwDeckProgress"></i></div><div class="mmw-deck-body"><div class="mmw-deck-copy"><span id="mmwDeckNum"></span><h1 id="mmwDeckSlideTitle"></h1><p id="mmwDeckSlideText"></p><div id="mmwDeckPoints"></div><div class="mmw-deck-note" id="mmwDeckNote"></div></div><div class="mmw-deck-image" id="mmwDeckImage"></div></div><div class="mmw-deck-bottom"><button id="mmwDeckPrev">← Назад</button><span id="mmwDeckCounter"></span><button id="mmwDeckNext">Далее →</button></div></div>`;
      document.body.appendChild(modal);
      const style=document.createElement('style');style.id='mmwCustomDeckStyle';style.textContent=`#mmwCustomDeck{position:fixed;inset:0;z-index:99999;display:none}.mmw-deck-backdrop{position:absolute;inset:0;background:#020609e8;backdrop-filter:blur(12px)}.mmw-deck{position:relative;width:min(1180px,94vw);height:min(760px,92vh);margin:4vh auto;background:#071017;border:1px solid #29404b;border-radius:24px;overflow:hidden;box-shadow:0 30px 90px #000b;color:#f5f7f8;display:flex;flex-direction:column}.mmw-deck-top{padding:20px 24px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #29404b}.mmw-deck-top h2{margin:4px 0 0;font:700 25px Georgia,serif}.mmw-deck-kicker{font-size:10px;letter-spacing:.2em;color:#f2d992;font-weight:900}.mmw-deck-top button{width:42px;height:42px;border-radius:50%;border:1px solid #29404b;background:#10202a;color:#fff;font-size:28px;cursor:pointer}.mmw-deck-progress{height:4px;background:#13232b}.mmw-deck-progress i{display:block;height:100%;width:0;background:linear-gradient(90deg,#d7ad59,#8bd5e5);transition:.25s}.mmw-deck-body{flex:1;min-height:0;display:grid;grid-template-columns:1fr 1fr}.mmw-deck-copy{padding:45px;display:flex;flex-direction:column;justify-content:center;overflow:auto}.mmw-deck-copy>span{color:#d7ad59;font-size:11px;letter-spacing:.18em;font-weight:900}.mmw-deck-copy h1{font:700 clamp(34px,4.3vw,62px)/1 Georgia,serif;margin:12px 0 18px}.mmw-deck-copy p{font-size:18px;line-height:1.55;color:#d0dade;margin:0 0 18px}.mmw-deck-points{display:grid;gap:9px}.mmw-deck-point{padding:12px 14px;border:1px solid #29404b;border-radius:12px;background:#0b1820;color:#dbe3e6}.mmw-deck-note{margin-top:16px;padding:13px;border-left:2px solid #d7ad59;color:#a9b8bf;font-size:13px}.mmw-deck-image{min-height:400px;background-size:cover;background-position:center;position:relative}.mmw-deck-image:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#05080b55,#05080b05),linear-gradient(0deg,#05080b88,transparent 45%)}.mmw-deck-bottom{padding:15px 24px;border-top:1px solid #29404b;display:flex;justify-content:space-between;align-items:center}.mmw-deck-bottom button{padding:10px 15px;border:1px solid #29404b;border-radius:11px;background:#10202a;color:#fff;font-weight:800;cursor:pointer}.mmw-deck-bottom button:hover{border-color:#d7ad59}.mmw-deck-bottom span{color:#a9b8bf;font-size:12px}@media(max-width:760px){.mmw-deck{height:94vh;margin:3vh auto}.mmw-deck-body{grid-template-columns:1fr;overflow:auto}.mmw-deck-image{order:-1;min-height:210px}.mmw-deck-copy{padding:25px}.mmw-deck-copy h1{font-size:38px}.mmw-deck-copy p{font-size:16px}}`;document.head.appendChild(style);
      document.querySelector('#mmwDeckClose').onclick=()=>modal.style.display='none';document.querySelector('.mmw-deck-backdrop').onclick=()=>modal.style.display='none';document.querySelector('#mmwDeckPrev').onclick=()=>{index=(index-1+slides.length)%slides.length;render()};document.querySelector('#mmwDeckNext').onclick=()=>{index=(index+1)%slides.length;render()};
      document.addEventListener('keydown',e=>{if(modal.style.display!=='block')return;if(e.key==='Escape')modal.style.display='none';if(e.key==='ArrowLeft'){index=(index-1+slides.length)%slides.length;render()}if(e.key==='ArrowRight'){index=(index+1)%slides.length;render()}});
    }
    function render(){const s=slides[index];document.querySelector('#mmwDeckTitle').textContent=title;document.querySelector('#mmwDeckNum').textContent=`SLIDE ${String(index+1).padStart(2,'0')} / ${slides.length}`;document.querySelector('#mmwDeckSlideTitle').textContent=s[1];document.querySelector('#mmwDeckSlideText').textContent=s[2];document.querySelector('#mmwDeckPoints').innerHTML=`<div class="mmw-deck-point">${esc(s[3])}</div>`;document.querySelector('#mmwDeckNote').textContent=id==='team'?'ALADIN: путь от специалиста к партнёру. Контакты и условия сотрудничества уточняются на этапе отбора.':'ALADIN: концепция находится в стадии развития. Планировки, характеристики, цены и условия покупки уточняются после подготовки и проверки финального проекта.';document.querySelector('#mmwDeckImage').style.backgroundImage=`url('${img(s[4])}')`;document.querySelector('#mmwDeckCounter').textContent=`${index+1} / ${slides.length}`;document.querySelector('#mmwDeckProgress').style.width=`${((index+1)/slides.length)*100}%`;}
    index=0;render();modal.style.display='block';history.replaceState({},'',`?deck=${id}#presentations`);
  }

  function init(){
    const root=document.querySelector('#presentations .wrap');
    const audiences=document.querySelector('#audiences');
    if(!root||!audiences) return;
    if(!document.querySelector('#mmwDeckLinks')){
      const box=document.createElement('div');box.id='mmwDeckLinks';box.style.cssText='display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:0 0 18px;';
      box.innerHTML=decks.map(([id,title,text],i)=>`<a class="btn ${i===0?'primary':''}" data-deck-link="${id}" href="?deck=${id}#presentations" style="min-height:72px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;text-align:left;padding:14px 17px"><b>${title}</b><small style="font-weight:600;opacity:.78;margin-top:3px">${text}</small></a>`).join('');
      audiences.parentNode.insertBefore(box,audiences);[...box.querySelectorAll('[data-deck-link]')].forEach(a=>a.addEventListener('click',e=>{e.preventDefault();openDeck(a.dataset.deckLink);}));
    }
    if(!document.querySelector('#mmwSystemBlocks')){
      const section=document.createElement('section');section.id='mmwSystemBlocks';section.style.cssText='padding:68px 0 22px;';
      section.innerHTML=`<div class="wrap"><div class="sectionhead"><div><div class="eyebrow">MMW DEVELOPMENT SYSTEM</div><h2>Земля → капитал → проект → реализация → доход</h2><p class="muted">Каждый проект раскрывается через семь управляемых блоков. Каждый блок получил собственный тематический визуал и кнопку перехода в соответствующую презентацию.</p></div></div><div id="mmwSystemGrid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;"></div></div>`;
      const grid=section.querySelector('#mmwSystemGrid');grid.innerHTML=systemBlocks.map(([code,title,text,photo,deck],i)=>`<article class="mmw-system-card" style="border:1px solid #29404b;border-radius:20px;overflow:hidden;background:linear-gradient(145deg,#10222c,#081117);transition:.25s"><div style="height:150px;background:linear-gradient(180deg,#0000,#05080bcf),url('https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1200&q=85') center/cover"></div><div style="padding:18px"><div class="eyebrow">${code}</div><h3 style="margin:5px 0 8px;font-size:22px">${title}</h3><p class="muted" style="font-size:13px;min-height:63px;margin:0 0 14px">${text}</p><button class="btn" data-system-deck="${deck}" style="width:100%">Открыть презентацию ↗</button></div></article>`).join('');
      grid.querySelectorAll('[data-system-deck]').forEach(b=>b.addEventListener('click',()=>openDeck(b.dataset.systemDeck)));const presentation=document.querySelector('#presentations');presentation.parentNode.insertBefore(section,presentation);
      const style=document.createElement('style');style.textContent='@media(max-width:900px){#mmwSystemGrid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:560px){#mmwSystemGrid{grid-template-columns:1fr!important}}.mmw-system-card:hover{transform:translateY(-5px);border-color:#d7ad59!important;box-shadow:0 12px 30px #0005}.mmw-system-card button:hover{border-color:#d7ad59;color:#f2d992}';document.head.appendChild(style);
    }
    const wanted=new URLSearchParams(location.search).get('deck');if(wanted)setTimeout(()=>openDeck(wanted),100);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

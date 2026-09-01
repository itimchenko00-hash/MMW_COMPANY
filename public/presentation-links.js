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
  function openDeck(id){
    const audiences=document.querySelector('#audiences');
    if(!audiences) return;
    const card=[...audiences.querySelectorAll('[data-audience]')].find(x=>x.dataset.audience===id);
    if(card){
      card.click();
      history.replaceState({},'',`?deck=${id}#presentations`);
      document.querySelector('#presentations')?.scrollIntoView({behavior:'smooth',block:'start'});
    }
  }
  function init(){
    const root=document.querySelector('#presentations .wrap');
    const audiences=document.querySelector('#audiences');
    if(!root||!audiences) return;
    if(!document.querySelector('#mmwDeckLinks')){
      const box=document.createElement('div');
      box.id='mmwDeckLinks';
      box.style.cssText='display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:0 0 18px;';
      box.innerHTML=decks.map(([id,title,text],i)=>`<a class="btn ${i===0?'primary':''}" data-deck-link="${id}" href="?deck=${id}#presentations" style="min-height:72px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;text-align:left;padding:14px 17px"><b>${title}</b><small style="font-weight:600;opacity:.78;margin-top:3px">${text}</small></a>`).join('');
      audiences.parentNode.insertBefore(box,audiences);
      [...box.querySelectorAll('[data-deck-link]')].forEach(a=>a.addEventListener('click',e=>{e.preventDefault();openDeck(a.dataset.deckLink);}));
    }
    if(!document.querySelector('#mmwSystemBlocks')){
      const section=document.createElement('section');
      section.id='mmwSystemBlocks';
      section.style.cssText='padding:68px 0 22px;';
      section.innerHTML=`<div class="wrap"><div class="sectionhead"><div><div class="eyebrow">MMW DEVELOPMENT SYSTEM</div><h2>Земля → капитал → проект → реализация → доход</h2><p class="muted">Каждый проект раскрывается через семь управляемых блоков. Каждый блок получил собственный тематический визуал и кнопку перехода в соответствующую презентацию.</p></div></div><div id="mmwSystemGrid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;"></div></div>`;
      const grid=section.querySelector('#mmwSystemGrid');
      grid.innerHTML=systemBlocks.map(([code,title,text,img,deck])=>`<article class="mmw-system-card" style="border:1px solid #29404b;border-radius:20px;overflow:hidden;background:linear-gradient(145deg,#10222c,#081117);transition:.25s"><div style="height:150px;background:linear-gradient(180deg,#0000,#05080bcf),url('https://images.unsplash.com/${img}?auto=format&fit=crop&w=1200&q=85') center/cover"></div><div style="padding:18px"><div class="eyebrow">${code}</div><h3 style="margin:5px 0 8px;font-size:22px">${title}</h3><p class="muted" style="font-size:13px;min-height:63px;margin:0 0 14px">${text}</p><button class="btn" data-system-deck="${deck}" style="width:100%">Открыть презентацию ↗</button></div></article>`).join('');
      grid.querySelectorAll('[data-system-deck]').forEach(b=>b.addEventListener('click',()=>openDeck(b.dataset.systemDeck)));
      const presentation=document.querySelector('#presentations');
      presentation.parentNode.insertBefore(section,presentation);
      const style=document.createElement('style');
      style.textContent='@media(max-width:900px){#mmwSystemGrid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:560px){#mmwSystemGrid{grid-template-columns:1fr!important}}.mmw-system-card:hover{transform:translateY(-5px);border-color:#d7ad59!important;box-shadow:0 12px 30px #0005}.mmw-system-card button:hover{border-color:#d7ad59;color:#f2d992}';
      document.head.appendChild(style);
    }
    const wanted=new URLSearchParams(location.search).get('deck');
    if(wanted) setTimeout(()=>openDeck(wanted),50);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();

(() => {
  const decks = [
    ['investor','ИНВЕСТОР','Финансовая модель, инвестиционная логика, риски и структура сделки'],
    ['team','КОМАНДА','Роли, этапы, управление, компетенции и рабочая модель'],
    ['buyer','КЛИЕНТ / ПОКУПАТЕЛЬ','Продукт, ценность, сценарий использования и путь клиента']
  ];
  function init(){
    const root=document.querySelector('#presentations .wrap');
    const audiences=document.querySelector('#audiences');
    if(!root||!audiences||document.querySelector('#mmwDeckLinks')) return;
    const box=document.createElement('div');
    box.id='mmwDeckLinks';
    box.style.cssText='display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:0 0 18px;';
    box.innerHTML=decks.map(([id,title,text],i)=>`<a class="btn ${i===0?'primary':''}" data-deck-link="${id}" href="?deck=${id}#presentations" style="min-height:72px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;text-align:left;padding:14px 17px"><b>${title}</b><small style="font-weight:600;opacity:.78;margin-top:3px">${text}</small></a>`).join('');
    audiences.parentNode.insertBefore(box,audiences);
    const wanted=new URLSearchParams(location.search).get('deck');
    if(wanted){
      const card=[...audiences.querySelectorAll('[data-audience]')].find(x=>x.dataset.audience===wanted);
      if(card) card.click();
    }
    [...box.querySelectorAll('[data-deck-link]')].forEach(a=>a.addEventListener('click',e=>{
      e.preventDefault();
      const id=a.dataset.deckLink;
      const card=[...audiences.querySelectorAll('[data-audience]')].find(x=>x.dataset.audience===id);
      if(card){card.click(); history.replaceState({},'',`?deck=${id}#presentations`); document.querySelector('#presentations')?.scrollIntoView({behavior:'smooth'});}
    }));
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();

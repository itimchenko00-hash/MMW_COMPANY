const express = require('express');
const originalSend = express.response.send;

const ORDER_CATALOG = {
  packages: [
    {id:'starter',name:'START',price:15000,description:'Техническое оформление и первичная подготовка заказа.',features:['Бриф и проверка исходных данных','Структура работ','Техническое задание','Расчёт базовой стоимости']},
    {id:'business',name:'BUSINESS',price:35000,description:'Полный пакет подготовки заказа для реализации.',features:['Всё из START','Детализированный расчёт','График этапов','Комплект рабочих форм','Координация исполнителей']},
    {id:'pro',name:'PRO',price:75000,description:'Расширенное техническое сопровождение заказа.',features:['Всё из BUSINESS','Проектная декомпозиция','Контроль сроков и бюджета','Отчётность','Сопровождение до передачи в работу']}
  ],
  services: [
    {id:'estimate',name:'Расширенная смета',price:12000},
    {id:'site',name:'Выезд / обследование объекта',price:8000},
    {id:'docs',name:'Дополнительный комплект документов',price:7500},
    {id:'management',name:'Проектное сопровождение',price:18000},
    {id:'urgent',name:'Срочное оформление заказа',price:10000}
  ]
};

const HOOK = `<style id="mmw-order-catalog">
#mmwOrderCatalog{max-width:1180px;margin:0 auto;padding:76px 20px 20px;border-top:1px solid #29423966}
#mmwOrderCatalog .mmw-order-head{display:flex;justify-content:space-between;gap:30px;align-items:end;margin-bottom:26px}
#mmwOrderCatalog h2{font:800 clamp(34px,5vw,55px)/1.05 Manrope,system-ui,sans-serif;margin:8px 0;color:#f4f7f3}
#mmwOrderCatalog h2 em{font-style:normal;color:#f1d28f}
#mmwOrderCatalog p{color:#9eaea8;max-width:560px}
#mmwOrderCatalog .mmw-order-eyebrow{font:800 10px Manrope;letter-spacing:.17em;text-transform:uppercase;color:#d8b56b}
#mmwOrderCatalog .mmw-order-block{margin-top:42px}
#mmwOrderCatalog .mmw-order-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
#mmwOrderCatalog .mmw-order-grid.services{grid-template-columns:repeat(5,1fr)}
#mmwOrderCatalog .mmw-order-card{background:linear-gradient(145deg,#12231d,#0d1a16);border:1px solid #294239;border-radius:15px;padding:24px;display:flex;flex-direction:column;min-height:310px;box-shadow:0 14px 40px #0000001f}
#mmwOrderCatalog .mmw-order-card.service{min-height:245px}
#mmwOrderCatalog h3{font:800 21px/1.2 Manrope,system-ui,sans-serif;color:#f4f7f3;margin:8px 0}
#mmwOrderCatalog .price{font:800 23px Manrope;color:#f1d28f;margin:3px 0 7px}
#mmwOrderCatalog .desc{color:#9eaea8;line-height:1.5;margin:12px 0}
#mmwOrderCatalog ul{padding-left:17px;color:#9eaea8;line-height:1.7;margin:8px 0 18px}
#mmwOrderCatalog .mmw-order-add{margin-top:auto;border:1px solid #294239;border-radius:8px;padding:11px 16px;background:#0a1713;color:#f1d28f;cursor:pointer;font:800 11px Manrope;text-transform:uppercase;letter-spacing:.04em}
#mmwOrderCatalog .mmw-order-add:hover,#mmwOrderCatalog .mmw-order-add.added{border-color:#d8b56b;color:#f1d28f;box-shadow:0 0 0 1px #d8b56b33}
#mmwOrderCatalog .mmw-order-note{margin:18px 0 0;font-size:11px;color:#748a82}
@media(max-width:950px){#mmwOrderCatalog .mmw-order-grid,#mmwOrderCatalog .mmw-order-grid.services{grid-template-columns:1fr 1fr}}
@media(max-width:600px){#mmwOrderCatalog{padding:58px 12px 10px}#mmwOrderCatalog .mmw-order-head{display:block}#mmwOrderCatalog .mmw-order-grid,#mmwOrderCatalog .mmw-order-grid.services{grid-template-columns:1fr}#mmwOrderCatalog .mmw-order-card{padding:20px;min-height:280px}}
</style>
<section id="mmwOrderCatalog" aria-label="MMW ORDER — тарифы и дополнительные услуги">
  <div class="mmw-order-head"><div><div class="mmw-order-eyebrow">01 · PACKAGES / 02 · ADD-ONS</div><h2>Оформление заказа <em>без лишних шагов.</em></h2></div><p>Тарифы и дополнительные услуги MMW ORDER теперь доступны прямо на странице MMW-COMPANY. Выбор формирует ту же корзину, а количество каждой позиции передаётся в MMW ORDER без изменения.</p></div>
  <div class="mmw-order-block"><div class="mmw-order-eyebrow">01 / PACKAGES</div><h3>Тарифы</h3><div class="mmw-order-grid">${ORDER_CATALOG.packages.map(p=>`<article class="mmw-order-card"><span class="mmw-order-eyebrow">${p.id==='business'?'RECOMMENDED':'PACKAGE'}</span><h3>${p.name}</h3><div class="price">${p.price.toLocaleString('uk-UA')} грн</div><div class="desc">${p.description}</div><ul>${p.features.map(f=>`<li>✓ ${f}</li>`).join('')}</ul><button type="button" class="mmw-order-add" data-mmw-order-id="${p.id}">Добавить в корзину</button></article>`).join('')}</div></div>
  <div class="mmw-order-block"><div class="mmw-order-eyebrow">02 / ADD-ONS</div><h3>Дополнительные услуги</h3><div class="mmw-order-grid services">${ORDER_CATALOG.services.map(s=>`<article class="mmw-order-card service"><span class="mmw-order-eyebrow">ADD-ON</span><h3>${s.name}</h3><div class="price">${s.price.toLocaleString('uk-UA')} грн</div><div class="desc">Дополнительная позиция к основному заказу.</div><button type="button" class="mmw-order-add" data-mmw-order-id="${s.id}">Добавить</button></article>`).join('')}</div></div>
  <div class="mmw-order-note">Цены и названия синхронизированы с текущим каталогом MMW ORDER. Сам MMW ORDER не изменяется: эта секция работает автономно внутри MMW-COMPANY.</div>
</section>
<script id="mmw-order-catalog-script">(()=>{const KEY='MMWCompanyProductsCart';const CATALOG=${JSON.stringify([...ORDER_CATALOG.packages,...ORDER_CATALOG.services])};let cart=[];try{cart=JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){cart=[]}const get=id=>CATALOG.find(x=>x.id===id);const save=()=>localStorage.setItem(KEY,JSON.stringify(cart));const render=()=>document.querySelectorAll('[data-mmw-order-id]').forEach(b=>{const x=cart.find(i=>i.id===b.dataset.mmwOrderId);b.classList.toggle('added',!!x);b.textContent=x?'Добавлено ✓':'Добавить в корзину'});document.addEventListener('click',e=>{const b=e.target.closest('[data-mmw-order-id]');if(!b)return;const id=b.dataset.mmwOrderId;if(!get(id))return;const x=cart.find(i=>i.id===id);if(x)x.qty++;else cart.push({id,qty:1});save();render();const fab=document.getElementById('mmwProductsCartFab');if(fab)fab.classList.add('show');});render()})();</script>`;

express.response.send = function(body){
  if(typeof body==='string' && body.includes('MMW-COMPANY') && body.includes('</body>') && !body.includes('id="mmwOrderCatalog"')) {
    const marker='<section id="finance">';
    body=body.includes(marker)?body.replace(marker,HOOK+marker):body.replace('</body>',HOOK+'</body>');
  }
  return originalSend.call(this,body);
};

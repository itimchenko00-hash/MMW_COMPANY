const express=require('express');
const originalSend=express.response.send;

const PRODUCT_IDS={
  'BUSINESS CONCEPT':'business-concept',
  'BUSINESS PROJECT':'business-project',
  'BUSINESS SYSTEM':'business-system',
  'INVESTMENT PROJECT':'investment-project',
  'BUSINESS RESTART':'business-restart',
  'BUSINESS SALE':'business-sale',
  'BUSINESS + INVESTOR':'business-investor',
  'CUSTOM BUSINESS PROJECT':'custom-business-project',
  'LARGE SCALE':'large-scale'
};

function addProductIds(html){
  for(const [name,id] of Object.entries(PRODUCT_IDS)){
    const re=new RegExp('<a class="btn(?: primary)?" href="#package-request">([^<]*'+name.replace(/[+]/g,'\\+')+'[^<]*)<\\/a>','g');
    html=html.replace(re,(m,label)=>m.replace('<a class="btn',`<a data-product-id="${id}" class="btn`));
  }
  return html;
}

function vacanciesSection(){
  return `<section id="vacancies"><div class="wrap"><div class="head"><div><div class="eyebrow">Вакансии · Коммуникация</div><h2>Работаем вместе. <em>Строим проекты.</em></h2></div><p>Если вы хотите работать с MMW-COMPANY, присоединиться к проекту или предложить свою экспертизу — расскажите о себе.</p></div><div class="contact"><div class="panel"><div class="eyebrow">MMW-COMPANY</div><h3>Вакансии и партнёрство</h3><p class="notice">Мы формируем проектные команды под конкретные задачи: управление, финансы, строительство, девелопмент, продажи, маркетинг, IT, логистика и другие направления.</p><div class="noticeBox">Открытые позиции, требования и условия сотрудничества будут опубликованы здесь отдельно.</div></div><div class="panel"><form class="form" action="mailto:itimchenko00@gmail.com" method="post" enctype="text/plain"><input name="Имя" placeholder="Ваше имя" required><input name="Контакт" placeholder="Телефон / мессенджер" required><input name="Email" type="email" placeholder="Email"><input name="Направление" placeholder="Специализация / желаемая позиция"><textarea name="Сообщение" placeholder="Расскажите о себе, опыте и чем вы можете быть полезны проектам MMW-COMPANY"></textarea><button class="btn primary full" type="submit">Связаться с MMW-COMPANY →</button></form></div></div></div></section>`;
}

express.response.send=function(body){
  if(typeof body==='string' && body.includes('</body>') && body.includes('MMW-COMPANY')){
    body=addProductIds(body);
    body=body.replace(/<section id="package-request">[\\s\\S]*?<\\/section>/g,vacanciesSection());
    body=body.replace(/href="#package-request">Получить расчёт/g,'href="#vacancies">Связаться с MMW-COMPANY');
  }
  return originalSend.call(this,body);
};

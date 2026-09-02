(function(){
  'use strict';
  var LANGS=[
    ['auto','Auto'],['en','English'],['uk','Українська'],['ru','Русский'],['de','Deutsch'],['fr','Français'],
    ['es','Español'],['pt','Português'],['it','Italiano'],['pl','Polski'],['nl','Nederlands'],['tr','Türkçe'],
    ['ar','العربية'],['zh-CN','中文'],['ja','日本語'],['ko','한국어'],['ro','Română'],['cs','Čeština'],['sv','Svenska']
  ];
  var supported=LANGS.map(function(x){return x[0]});
  var browser=(navigator.language||navigator.userLanguage||'en').toLowerCase().split('-')[0];
  var saved=localStorage.getItem('mmw-language');
  var target=saved || (supported.indexOf(browser)>-1 ? browser : 'en');
  if(target==='auto') target=browser;
  if(!supported.includes(target)) target='en';
  function cookie(name,value){document.cookie=name+'='+value+';path=/;max-age=31536000;SameSite=Lax';}
  function setGoogleCookie(lang){cookie('googtrans','/auto/'+lang);cookie('googtrans','/auto/'+lang);}
  function selectGoogle(lang){var select=document.querySelector('.goog-te-combo');if(!select)return false;select.value=lang;select.dispatchEvent(new Event('change'));return true;}
  function apply(lang){
    if(lang==='auto') lang=browser;if(!supported.includes(lang))lang='en';localStorage.setItem('mmw-language',lang);setGoogleCookie(lang);
    if(lang==='ru'){localStorage.setItem('mmw-language','ru');setGoogleCookie('ru');}
    if(!selectGoogle(lang)){setTimeout(function(){selectGoogle(lang)},700);setTimeout(function(){selectGoogle(lang)},1800);}
    var label=document.getElementById('mmw-language-label');if(label){var item=LANGS.find(function(x){return x[0]===lang});label.textContent=item?item[1]:'English';}
  }
  window.googleTranslateElementInit=function(){
    if(!window.google||!google.translate)return;
    new google.translate.TranslateElement({pageLanguage:'auto',includedLanguages:supported.filter(function(x){return x!=='auto'}).join(','),autoDisplay:false,multilanguagePage:true},'google_translate_element');
    setTimeout(function(){apply(target)},350);
  };
  function visualLayer(){
    var path=location.pathname.toLowerCase();
    if(path.indexOf('/projects/')!==0)return;
    var root=document.documentElement;
    var map={
      'nexus-work':['office','meeting','architecture','coworking','digital','team','business','construction','community','workspace','finance','city'],
      'nexus-logistics':['warehouse','truck','logistics','container','forklift','road','technology','engineering','security','energy','analytics','network'],
      'carpathia':['mountain','forest','cabin','spa','restaurant','family','hiking','workation','nature','hospitality','wellness','landscape'],
      'agrohub':['farm','grain','harvest','warehouse','factory','processing','laboratory','logistics','packaging','export','energy','technology'],
      'energy-park':['solar','power-grid','electricity','industrial','engineering','finance','factory','energy','network','operations','technology','infrastructure']
    };
    var key=path.indexOf('nexus-work')>-1?'nexus-work':path.indexOf('nexus-logistics')>-1?'nexus-logistics':path.indexOf('carpathia')>-1?'carpathia':path.indexOf('agrohub')>-1?'agrohub':path.indexOf('energy-park')>-1?'energy-park':null;
    if(!key)return;
    var terms=map[key];
    var css=document.createElement('style');
    css.textContent='.mmw-visual-card{position:relative;overflow:hidden;min-height:235px!important;padding:0!important;background:#0a100d!important}.mmw-visual-card .mmw-card-img{height:105px;background:center/cover;position:relative}.mmw-visual-card .mmw-card-img:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#030605d9,#03060535)}.mmw-visual-card .mmw-card-body{padding:16px 18px 18px}.mmw-visual-card .num{display:block}.mmw-visual-card .mmw-infographic{display:flex;gap:4px;align-items:end;height:26px;margin-top:12px}.mmw-visual-card .mmw-infographic i{display:block;flex:1;background:linear-gradient(180deg,#f1d58b,#d7ad59);border-radius:3px 3px 0 0;opacity:.85}.mmw-visual-card .mmw-infographic i:nth-child(1){height:35%}.mmw-visual-card .mmw-infographic i:nth-child(2){height:55%}.mmw-visual-card .mmw-infographic i:nth-child(3){height:78%}.mmw-visual-card .mmw-infographic i:nth-child(4){height:100%}.mmw-visual-card .mmw-infographic i:nth-child(5){height:68%}.mmw-visual-card .bar{margin-top:9px}.mmw-visual-card .bar i{background:linear-gradient(90deg,#d7ad59,#f1d58b)}.mmw-section-visual{margin:0 0 22px;height:180px;border:1px solid #29382f;border-radius:18px;background:center/cover;position:relative;overflow:hidden}.mmw-section-visual:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#040705e8,#04070555)}.mmw-section-visual span{position:absolute;z-index:2;left:20px;bottom:18px;color:#f1d58b;font-weight:800;letter-spacing:.12em;font-size:11px}.mmw-photo-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:18px}.mmw-photo-grid div{height:95px;border-radius:12px;background:center/cover;border:1px solid #29382f}.mmw-visual-card:hover .mmw-card-img{transform:scale(1.02);transition:.3s}@media(max-width:800px){.mmw-photo-grid{grid-template-columns:1fr}.mmw-section-visual{height:145px}}';
    document.head.appendChild(css);
    var base='https://images.unsplash.com/photo-';
    var ids={
      office:'1497366216548-37526070297c',meeting:'1497366811353-6870744d04b2',architecture:'1487958449943-2429e8be8625',coworking:'1524758631624-e2822e304c36',digital:'1517245386807-bb43f82c33c4',team:'1521737711867-e3b97375f902',business:'1556761175-b945d0a5e0b5',construction:'1504307651254-35680f356dfd',community:'1529156069898-49953e39b3ac',workspace:'1497366754035-f200968a6e72',finance:'1559526324-593bc073d938',city:'1477959858617-67f85cf4f1df',
      warehouse:'1586528116493-da8b0f0d0f2d',truck:'1566576912321-d58ddd7a6088',logistics:'1553413077-190dd305871c',container:'1519003722824-1c0d6b3b9e8b',forklift:'1586528116311-ad8dd3c8310d',road:'1500534623283-312aade485b7',technology:'1518770660439-4636190af475',engineering:'1581091226825-a6a2a5aee158',security:'1557597774-4f9b9f8d6a7d',energy:'1473341304170-971dccb5ac1e',analytics:'1551288049-bebda4e38f71',network:'1558494949-ef010cbdcc31',
      mountain:'1500534623283-312aade485b7',forest:'1510798831971-661eb04b3739',cabin:'1449158743715-0a90ebb6d2d8',spa:'1540555700478-4be289fbecef',restaurant:'1515003197210-e0cd71810b5f',family:'1504150558240-0d4bfeccac38',hiking:'1551632811-561732d1e306',workation:'1497215842964-222b430dc094',nature:'1501785888041-af3ef285b470',hospitality:'1566073771259-6a8506099945',wellness:'1544161515-4ab6ce6db874',landscape:'1464822759023-fed622ff2c3b',
      farm:'1500937386664-56d1dfef3854',grain:'1574323347407-f5e1ad6d020b',harvest:'1500076656116-558758e5e2e2',factory:'1581091226825-a6a2a5aee158',processing:'1565610222536-ef125c6d2f45',laboratory:'1582719478250-c89cae4dc85b',packaging:'1605640840605-14ac1855827b',export:'1494412574643-ff11b5f5b6b2',
      solar:'1509391366360-2e959784a276','power-grid':'1473341304170-971dccb5ac1e',industrial:'1581091226825-a6a2a5aee158',infrastructure:'1504307651254-35680f356dfd',operations:'1497366811353-6870744d04b2'
    };
    function url(term){return base+(ids[term]||ids[terms[0]])+'?auto=format&fit=crop&w=1200&q=82'}
    var cards=[].slice.call(document.querySelectorAll('.card'));
    cards.forEach(function(card,i){
      if(card.classList.contains('mmw-visual-card'))return;
      var term=terms[i%terms.length];card.classList.add('mmw-visual-card');
      var old=card.innerHTML;card.innerHTML='<div class="mmw-card-img" style="background-image:url('+url(term)+')"></div><div class="mmw-card-body">'+old+'<div class="mmw-infographic"><i></i><i></i><i></i><i></i><i></i></div></div>';
    });
    var photos=document.querySelectorAll('.photo');photos.forEach(function(el,i){if(!el.dataset.mmwVisual){el.dataset.mmwVisual='1';el.style.backgroundImage='url('+url(terms[i%terms.length])+')';}});
    var slide=document.querySelector('.slide');
    if(slide&&!slide.dataset.mmwVisual){
      slide.dataset.mmwVisual='1';var visual=document.createElement('div');visual.className='mmw-section-visual';visual.style.backgroundImage='url('+url(terms[0])+')';visual.innerHTML='<span>THEMATIC PROJECT VISUAL · '+key.replace(/-/g,' ').toUpperCase()+'</span>';
      var parent=slide.parentNode;parent.insertBefore(visual,slide);
    }
  }
  function boot(){
    var style=document.createElement('style');
    style.textContent='.mmw-lang{position:fixed;right:18px;bottom:18px;z-index:99999;font:700 12px/1 Inter,system-ui,sans-serif}.mmw-lang button{border:1px solid #6f592c;background:#0b110e;color:#f0d48b;border-radius:999px;padding:10px 14px;cursor:pointer;box-shadow:0 8px 30px #0008}.mmw-lang-menu{display:none;position:absolute;right:0;bottom:48px;width:180px;max-height:55vh;overflow:auto;padding:8px;background:#080d0a;border:1px solid #26322c;border-radius:14px;box-shadow:0 18px 50px #000c}.mmw-lang.open .mmw-lang-menu{display:block}.mmw-lang-menu button{display:block;width:100%;border:0;background:transparent;box-shadow:none;border-radius:8px;text-align:left;color:#e7ebe8;padding:9px 10px}.mmw-lang-menu button:hover{background:#18221c}.mmw-lang-menu button.active{color:#f0d48b;background:#151d18}.goog-te-banner-frame.skiptranslate{display:none!important}body{top:0!important}.goog-te-gadget{display:none!important}#google_translate_element{display:none!important}.goog-tooltip,.goog-tooltip:hover{display:none!important}.goog-text-highlight{background:transparent!important;box-shadow:none!important}';
    document.head.appendChild(style);
    var box=document.createElement('div');box.className='mmw-lang notranslate';box.innerHTML='<button type="button" id="mmw-language-toggle" aria-label="Language">🌐 <span id="mmw-language-label">English</span></button><div class="mmw-lang-menu" id="mmw-language-menu"></div>';
    var menu=box.querySelector('#mmw-language-menu');LANGS.filter(function(x){return x[0]!=='auto'}).forEach(function(x){var b=document.createElement('button');b.type='button';b.dataset.lang=x[0];b.textContent=x[1];b.onclick=function(){box.classList.remove('open');apply(x[0]);};menu.appendChild(b)});
    box.querySelector('#mmw-language-toggle').onclick=function(){box.classList.toggle('open');};document.body.appendChild(box);
    var hidden=document.createElement('div');hidden.id='google_translate_element';hidden.className='notranslate';document.body.appendChild(hidden);
    var s=document.createElement('script');s.src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';s.async=true;document.head.appendChild(s);apply(target);
    setTimeout(visualLayer,100);setTimeout(visualLayer,900);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();

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

  function cookie(name,value){
    document.cookie=name+'='+value+';path=/;max-age=31536000;SameSite=Lax';
  }
  function setGoogleCookie(lang){
    cookie('googtrans','/auto/'+lang);
    cookie('googtrans','/auto/'+lang);
  }
  function selectGoogle(lang){
    var select=document.querySelector('.goog-te-combo');
    if(!select) return false;
    select.value=lang;
    select.dispatchEvent(new Event('change'));
    return true;
  }
  function apply(lang){
    if(lang==='auto') lang=browser;
    if(!supported.includes(lang)) lang='en';
    localStorage.setItem('mmw-language',lang);
    setGoogleCookie(lang);
    if(lang==='ru'){
      localStorage.setItem('mmw-language','ru');
      setGoogleCookie('ru');
    }
    if(!selectGoogle(lang)){
      setTimeout(function(){selectGoogle(lang)},700);
      setTimeout(function(){selectGoogle(lang)},1800);
    }
    var label=document.getElementById('mmw-language-label');
    if(label){var item=LANGS.find(function(x){return x[0]===lang});label.textContent=item?item[1]:'English';}
  }
  window.googleTranslateElementInit=function(){
    if(!window.google||!google.translate) return;
    new google.translate.TranslateElement({pageLanguage:'auto',includedLanguages:supported.filter(function(x){return x!=='auto'}).join(','),autoDisplay:false,multilanguagePage:true},'google_translate_element');
    setTimeout(function(){apply(target)},350);
  };
  function boot(){
    var style=document.createElement('style');
    style.textContent='.mmw-lang{position:fixed;right:18px;bottom:18px;z-index:99999;font:700 12px/1 Inter,system-ui,sans-serif}.mmw-lang button{border:1px solid #6f592c;background:#0b110e;color:#f0d48b;border-radius:999px;padding:10px 14px;cursor:pointer;box-shadow:0 8px 30px #0008}.mmw-lang-menu{display:none;position:absolute;right:0;bottom:48px;width:180px;max-height:55vh;overflow:auto;padding:8px;background:#080d0a;border:1px solid #26322c;border-radius:14px;box-shadow:0 18px 50px #000c}.mmw-lang.open .mmw-lang-menu{display:block}.mmw-lang-menu button{display:block;width:100%;border:0;background:transparent;box-shadow:none;border-radius:8px;text-align:left;color:#e7ebe8;padding:9px 10px}.mmw-lang-menu button:hover{background:#18221c}.mmw-lang-menu button.active{color:#f0d48b;background:#151d18}.goog-te-banner-frame.skiptranslate{display:none!important}body{top:0!important}.goog-te-gadget{display:none!important}#google_translate_element{display:none!important}.goog-tooltip,.goog-tooltip:hover{display:none!important}.goog-text-highlight{background:transparent!important;box-shadow:none!important}';
    document.head.appendChild(style);
    var box=document.createElement('div');box.className='mmw-lang notranslate';
    box.innerHTML='<button type="button" id="mmw-language-toggle" aria-label="Language">🌐 <span id="mmw-language-label">English</span></button><div class="mmw-lang-menu" id="mmw-language-menu"></div>';
    var menu=box.querySelector('#mmw-language-menu');
    LANGS.filter(function(x){return x[0]!=='auto'}).forEach(function(x){var b=document.createElement('button');b.type='button';b.dataset.lang=x[0];b.textContent=x[1];b.onclick=function(){box.classList.remove('open');apply(x[0]);};menu.appendChild(b)});
    box.querySelector('#mmw-language-toggle').onclick=function(){box.classList.toggle('open');};
    document.body.appendChild(box);
    var hidden=document.createElement('div');hidden.id='google_translate_element';hidden.className='notranslate';document.body.appendChild(hidden);
    var s=document.createElement('script');s.src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';s.async=true;document.head.appendChild(s);
    apply(target);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();

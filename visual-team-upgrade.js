(() => {
  'use strict';

  const PHOTO = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`;

  // Each profession gets its own visual: no repeated photo is used inside the team section.
  const professionPhotos = [
    'photo-1503387762-592deb58ef4e', // architect / drawings
    'photo-1581094794329-c8112a89af12', // structural / engineering
    'photo-1554224155-6726b3ff858f', // cost / finance
    'photo-1558655146-9f40138edfeb', // design / creative
    'photo-1504307651254-35680f356dfd', // construction
    'photo-1552664730-d307ca884978', // project management
    'photo-1454165804606-c3d57bc86b40', // development / strategy
    'photo-1556761175-4b46a572b786' // sales / marketing
  ];

  const servicePhotos = [
    'photo-1454165804606-c3d57bc86b40',
    'photo-1500382017468-9049fed747ef',
    'photo-1554224155-6726b3ff858f',
    'photo-1556761175-b413da4baf72',
    'photo-1503387762-592deb58ef4e',
    'photo-1504307651254-35680f356dfd',
    'photo-1560518883-ce09059eeffa',
    'photo-1497366811353-6870744d04b2',
    'photo-1526304640581-d334cdbbf45e',
    'photo-1556761175-5973dc0f32e7'
  ];

  const css = document.createElement('style');
  css.id = 'mmw-visual-team-css';
  css.textContent = `
    .profession-clean{position:relative;overflow:hidden;min-height:245px;display:flex;align-items:flex-end;background:#0b100d!important;isolation:isolate}
    .profession-clean:before{content:'';position:absolute;inset:0;background-image:var(--profession-bg);background-position:center;background-size:cover;opacity:.30;z-index:-2;transition:transform .5s ease,opacity .5s ease}
    .profession-clean:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(4,7,5,.18),rgba(4,7,5,.96) 82%);z-index:-1}
    .profession-clean:hover:before{transform:scale(1.06);opacity:.46}
    .profession-clean .ico{position:relative;z-index:1;text-shadow:0 2px 12px #000}
    .profession-clean strong,.profession-clean small{position:relative;z-index:1}
    .service-clean{position:relative;overflow:hidden;isolation:isolate}
    .service-clean:before{content:'';position:absolute;right:0;top:0;width:42%;height:100%;background-image:var(--service-bg);background-position:center;background-size:cover;opacity:.16;z-index:-2;transition:opacity .4s ease,transform .4s ease}
    .service-clean:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#0b100d 0%,rgba(11,16,13,.94) 52%,rgba(11,16,13,.65) 100%);z-index:-1}
    .service-clean:hover:before{opacity:.30;transform:scale(1.04)}
    .service-clean>*{position:relative;z-index:1}
    .mmw-team-visual-note{margin:16px 0 0;color:#788178;font-size:12px;letter-spacing:.03em}
  `;
  document.head.appendChild(css);

  function apply() {
    document.querySelectorAll('.profession-clean').forEach((el, i) => {
      if (professionPhotos[i]) el.style.setProperty('--profession-bg', `url('${PHOTO(professionPhotos[i])}')`);
    });

    document.querySelectorAll('.service-clean').forEach((el, i) => {
      if (servicePhotos[i]) el.style.setProperty('--service-bg', `url('${PHOTO(servicePhotos[i])}')`);
    });

    // Replace any repeated visual used by the additional-services cards with a unique themed image.
    const extras = document.querySelectorAll('.mmw-extra-grid .mmw-extra-img');
    const extraPhotos = [
      'photo-1554224154-26032ffc0d07',
      'photo-1454165804606-c3d57bc86b40',
      'photo-1551288049-bebda4e38f71',
      'photo-1556761175-5973dc0f32e7',
      'photo-1497366754035-f200968a6e72',
      'photo-1563013544-824ae1b704d3',
      'photo-1450101499163-c8848c66ca85',
      'photo-1444653614773-995cb1ef9efa',
      'photo-1556761175-4b46a572b786'
    ];
    extras.forEach((el, i) => {
      if (extraPhotos[i]) el.style.backgroundImage = `url('${PHOTO(extraPhotos[i])}')`;
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, { once:true });
  else apply();
})();

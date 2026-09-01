(() => {
  'use strict';

  const slug = {
    'ALADIN': 'aladin',
    'NEXUS WORK': 'nexus-work',
    'CARPATHIA ECO LODGE': 'carpathia-eco-lodge',
    'AGROHUB': 'agrohub',
    'ENERGY PARK': 'energy-park'
  };

  // Keep project cards on the canonical interactive project pages.
  document.addEventListener('click', (event) => {
    const button = event.target.closest('.open-project');
    if (!button) return;
    const target = slug[button.dataset.project || ''];
    if (!target) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.assign('/project/' + target);
  }, true);

  // Final DOM pass: remove remnants of older upgrade versions and keep the page order logical.
  function finalCleanup() {
    document.querySelectorAll('#economics').forEach(el => el.remove());

    const system = document.getElementById('system');
    const portfolio = document.getElementById('projects');
    const lab = document.getElementById('lab');
    const services = document.getElementById('services');
    const team = document.getElementById('team');
    const routes = document.getElementById('routes');
    const order = document.getElementById('order');
    const value = document.getElementById('value-chain');

    if (!system || !portfolio || !lab || !services || !team || !routes || !order) return;

    // Canonical reading sequence:
    // Hero → System → Value Chain → Portfolio → Financial Lab → Services → Team → Routes → ORDER → Contact
    if (value) system.parentNode.insertBefore(value, portfolio);
    portfolio.parentNode.insertBefore(lab, services);
    portfolio.parentNode.insertBefore(services, lab.nextSibling);
    portfolio.parentNode.insertBefore(team, services.nextSibling);
    portfolio.parentNode.insertBefore(routes, team.nextSibling);

    document.querySelectorAll('.partner-cards').forEach(el => {
      const parent = el.closest('section');
      if (parent && parent !== team) parent.remove();
    });

    const nav = document.querySelector('.nav nav');
    if (nav && !nav.querySelector('[data-clean-nav]')) {
      const links = [
        ['Система','#system'],['Цепочка','#value-chain'],['Проекты','#projects'],
        ['Financial Lab','#lab'],['Услуги','#services'],['Команда','#team'],['ORDER','#order']
      ];
      nav.innerHTML = links.map(([text,href]) => `<a data-clean-nav href="${href}">${text}</a>`).join('') + '<a class="nav-cta" href="#contact">Связаться</a>';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(finalCleanup, 50));
  } else {
    setTimeout(finalCleanup, 50);
  }
})();

(() => {
  // Canonical project navigation: portfolio cards open the full interactive
  // presentation center instead of the legacy in-page modal.
  const slug = {
    'ALADIN': 'aladin',
    'NEXUS WORK': 'nexus-work',
    'CARPATHIA ECO LODGE': 'carpathia-eco-lodge',
    'AGROHUB': 'agrohub',
    'ENERGY PARK': 'energy-park'
  };
  document.addEventListener('click', (event) => {
    const button = event.target.closest('.open-project');
    if (!button) return;
    const name = button.dataset.project || '';
    const target = slug[name];
    if (!target) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.assign('/project/' + target);
  }, true);
})();

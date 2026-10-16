(() => {
  const tabs = [...document.querySelectorAll('[data-tabs] button')];
  const panels = [...document.querySelectorAll('[data-view]')];
  for (const tab of tabs) {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      for (const item of tabs) item.setAttribute('aria-pressed', String(item === tab));
      for (const panel of panels) panel.hidden = target !== 'all' && panel.dataset.view !== target;
    });
  }
})();

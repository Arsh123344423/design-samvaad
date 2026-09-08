export function initAgendaTabs(tabs) {
  if (!tabs) return;

  const tabButtons = [...tabs.querySelectorAll('[role="tab"]')];
  const panels = [...tabs.querySelectorAll('[role="tabpanel"]')];
  if (!tabButtons.length || tabButtons.length !== panels.length) return;

  const activate = (activeTab, moveFocus = false) => {
    tabButtons.forEach((tab) => {
      const isActive = tab === activeTab;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
      const panel = tabs.querySelector(`#${tab.getAttribute('aria-controls')}`);
      if (panel) panel.hidden = !isActive;
    });
    if (moveFocus) activeTab.focus();
  };

  tabButtons.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const nextIndex = event.key === 'Home' ? 0
        : event.key === 'End' ? tabButtons.length - 1
        : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabButtons.length) % tabButtons.length;
      activate(tabButtons[nextIndex], true);
    });
  });
}
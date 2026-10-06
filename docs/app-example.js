const tabsController = LumenTabs.initTabs();
const toggle = document.querySelector('[data-nav-toggle]');
const navigation = document.getElementById(toggle.getAttribute('aria-controls'));
const inPageNavigationLinks = document.querySelectorAll(
    '#app-navigation a[href^="#"], aside[data-layout-sidebar] nav a[href^="#"]'
);

document.addEventListener('click', (event) => {
    const link = event.target.closest(
        '#app-navigation a[href^="#"], aside[data-layout-sidebar] nav a[href^="#"]'
    );
    if (!link) return;
    inPageNavigationLinks.forEach((item) => item.removeAttribute('aria-current'));
    link.setAttribute('aria-current', 'location');
});

toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    toggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
});

navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
    }
});

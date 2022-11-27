function toggleNavigationBar() {
  navigationBar.classList.toggle('w-0');
  container.classList.toggle('no-border');
}

function toggleTooltipsBar() {
  tooltipsBar.classList.toggle('d-none');
  content.classList.toggle('w-100');
}

const HideNavBar = new Feature(
  'hideNavBar',
  toggleNavigationBar,
  toggleNavigationBar
);
const HideTooltipsBar = new Feature(
  'hideTooltipsBar',
  toggleTooltipsBar,
  toggleTooltipsBar
);

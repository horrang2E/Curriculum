import { setupThemeToggle } from './js/theme.js';
import { setupCardFilters } from './js/filter.js';
import { setupResponsiveNav } from './js/responsive-nav.js';

document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  setupCardFilters();
  setupResponsiveNav();
});

import './style.css'
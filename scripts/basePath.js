// Auto base path helper for GitHub Pages
export const BASE_PATH = window.location.pathname.includes('/pages/')
  ? '..'
  : '.';

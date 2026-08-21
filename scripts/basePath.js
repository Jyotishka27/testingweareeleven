// Auto base path helper supporting root, /pages/, and /tournaments/ subdirectories
function computeBasePath() {
  const pathname = window.location.pathname;
  if (pathname.includes('/tournaments/independence-cup-2026/') ||
      pathname.includes('/tournaments/independence_cup_2026/') ||
      pathname.includes('/tournaments/independence_cup_2025/') || 
      pathname.includes('/tournaments/winter-carnival-cup-2026/') ||
      pathname.match(/\/tournaments\/[^/]+\//)) {
    return '../..';
  }
  if (pathname.includes('/pages/') || pathname.includes('/tournaments/')) {
    return '..';
  }
  return '.';
}

export const BASE_PATH = computeBasePath();


import { BASE_PATH } from './basePath.js';

// Reusable tournament header
export function injectHeader(targetSelector, { active = "" } = {}) {
  const el = document.querySelector(targetSelector);
  if (!el) return;

  const nav = [
    { key: "home", label: "Home", href: `${BASE_PATH}/index.html` },
    { key: "teams", label: "Teams", href: `${BASE_PATH}/tournaments/team_list.html` },
    { key: "results", label: "Results", href: `${BASE_PATH}/tournaments/team_results.html` },
    {
      key: "tournaments",
      label: "Independence Cup",
      // href: `${BASE_PATH}/tournaments/independence_cup_2025/independence_cup_2025.html`,
    },
    {
      key: "tournament_photos",
      label: "Tournament Photos",
      href: `${BASE_PATH}/tournaments/tournament_gallery.html`,
    },
  ];

  const link = (item, mobile = false) => {
    const isActive = item.key === active;
    const base =
      "block px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring focus:ring-offset-2";
    const cls = isActive
      ? "bg-gray-900 text-white"
      : "text-gray-300 hover:bg-gray-700 hover:text-white";
    const aria = isActive ? 'aria-current="page"' : "";
    return `<a href="${item.href}" class="${base} ${cls}" ${aria}>${item.label}</a>`;
  };

  el.innerHTML = `
  <header class="bg-gray-800">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="flex h-16 items-center justify-between">

        <!-- Brand -->
        <div class="flex items-center gap-3">
          <a href="${BASE_PATH}/tournaments/independence_cup_2025/independence_cup_2025.html"
             class="flex items-center gap-2">
            <img
              src="${BASE_PATH}/assets/images/independence_cup_logo.jpg"
              alt="Independence Cup logo"
              class="h-8 w-8 rounded-full object-cover"
            />
            <span class="text-white font-semibold tracking-wide">
              Independence Cup 2025
            </span>
          </a>
        </div>

        <!-- Desktop nav -->
        <div class="hidden md:flex items-center gap-2">
          ${nav.map((n) => link(n)).join("")}
        </div>

        <!-- Mobile button -->
        <div class="md:hidden">
          <button
            id="mobile-menu-button"
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring"
            aria-controls="mobile-menu"
            aria-expanded="false"
            aria-label="Open main menu">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>

      </div>
    </nav>

    <!-- Mobile nav -->
    <div class="md:hidden hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pb-3 pt-2">
        ${nav.map((n) => link(n, true)).join("")}
      </div>
    </div>
  </header>
  `;

  // Mobile toggle
  const btn = el.querySelector("#mobile-menu-button");
  const menu = el.querySelector("#mobile-menu");

  if (btn && menu) {
    const close = () => {
      menu.classList.add("hidden");
      btn.setAttribute("aria-expanded", "false");
    };

    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      menu.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!el.contains(e.target)) close();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) close();
    });
  }
}

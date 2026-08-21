import { BASE_PATH } from './basePath.js';

// Reusable site header with mobile toggle + active link
export function injectHeader(targetSelector, { active = "" } = {}) {
  const el = document.querySelector(targetSelector);
  if (!el) return;

  const nav = [
    { key: "home", label: "Home", href: `${BASE_PATH}/index.html` },
    { key: "tournaments", label: "Tournaments", href: `${BASE_PATH}/pages/tournament.html` },
    { key: "photos", label: "Photos", href: `${BASE_PATH}/pages/gallery.html` },
    { key: "auction", label: "Auction", href: `${BASE_PATH}/pages/football_auctioneer.html` },
    { key: "memberships", label: "Memberships", href: `${BASE_PATH}/pages/join.html` },
    { key: "about", label: "About Us", href: `${BASE_PATH}/pages/about_us.html` },
  ];

  const link = (item, mobile = false) => {
    const isActive = item.key === active;
    const base = mobile
      ? "block px-3 py-2.5 rounded-lg text-base font-medium transition-colors"
      : "inline-flex items-center px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors";
    const cls = isActive
      ? "bg-slate-900 text-white shadow-sm ring-1 ring-white/10"
      : "text-slate-300 hover:bg-slate-800 hover:text-white";
    const aria = isActive ? 'aria-current="page"' : "";
    return `<a href="${item.href}" class="${base} ${cls}" ${aria}>${item.label}</a>`;
  };

  const isAuthActive = active === "login" || active === "profile" || active === "register";

  el.innerHTML = `
  <header class="bg-slate-950 border-b border-slate-800/80 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main Navigation">
      <div class="flex h-16 items-center justify-between">

        <!-- Brand -->
        <div class="flex items-center gap-3">
          <a href="${BASE_PATH}/index.html" class="flex items-center gap-2.5 group">
            <img
              src="${BASE_PATH}/assets/group-logo/we_are_eleven_logo.jpg"
              alt="We Are Eleven logo"
              class="h-9 w-9 rounded-full object-cover ring-2 ring-emerald-500/40 group-hover:ring-emerald-400 transition"
            />
            <span class="text-white font-bold tracking-tight text-lg group-hover:text-emerald-400 transition">
              We Are Eleven
            </span>
          </a>
        </div>

        <!-- Desktop nav -->
        <div class="hidden md:flex items-center gap-1.5">
          ${nav.map((n) => link(n)).join("")}
        </div>

        <!-- Desktop Action Buttons -->
        <div class="hidden md:flex items-center gap-3">
          <a href="${BASE_PATH}/pages/join.html"
             class="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-sm transition">
            Join Us
          </a>
          <a href="${BASE_PATH}/pages/login.html"
             class="inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg text-sm font-medium border ${isAuthActive ? 'border-emerald-500 text-emerald-400 bg-emerald-950/40' : 'border-slate-700 text-slate-300 hover:text-white hover:border-slate-500'} transition">
            Login
          </a>
        </div>

        <!-- Mobile button -->
        <div class="md:hidden flex items-center gap-2">
          <a href="${BASE_PATH}/pages/join.html"
             class="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-slate-950">
            Join
          </a>
          <button
            id="mobile-menu-button"
            class="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
    <div class="md:hidden hidden border-t border-slate-800 bg-slate-950/95 px-4 pt-3 pb-4 space-y-1.5" id="mobile-menu">
      ${nav.map((n) => link(n, true)).join("")}
      <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <a href="${BASE_PATH}/pages/login.html"
           class="flex-1 text-center py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 border border-slate-700">
          Login / Account
        </a>
        <a href="${BASE_PATH}/pages/admin.html"
           class="px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200">
          Admin
        </a>
      </div>
    </div>
  </header>
  `;

  // Mobile toggle logic
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

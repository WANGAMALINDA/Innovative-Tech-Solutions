(() => {
  // site.js
  if (window.location.hash) {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }
  window.scrollTo(0, 0);
  window.addEventListener("load", () => window.scrollTo(0, 0));
  (function() {
    const btn = document.querySelector(".hamburger");
    const menu = document.getElementById("navMenu");
    const scrim = document.getElementById("navScrim");
    if (!btn || !menu) return;
    function closeMenu() {
      document.body.classList.remove("nav-open");
      btn.setAttribute("aria-expanded", "false");
    }
    function openMenu() {
      document.body.classList.add("nav-open");
      btn.setAttribute("aria-expanded", "true");
    }
    btn.addEventListener("click", () => {
      document.body.classList.contains("nav-open") ? closeMenu() : openMenu();
    });
    scrim.addEventListener("click", closeMenu);
    menu.querySelectorAll("a").forEach((anchor) => anchor.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  })();
  (function() {
    const grid = document.getElementById("demosGrid");
    const dots = document.querySelectorAll("#demosDots span");
    const prev = document.getElementById("demosPrev");
    const next = document.getElementById("demosNext");
    if (!grid) return;
    function cardWidth() {
      const card = grid.querySelector(".demo-card");
      return card ? card.getBoundingClientRect().width + 28.8 : 400;
    }
    function scrollToIndex(index) {
      grid.scrollTo({ left: index * cardWidth(), behavior: "smooth" });
    }
    dots.forEach((dot) => {
      dot.addEventListener("click", () => scrollToIndex(parseInt(dot.dataset.i, 10)));
    });
    prev.addEventListener("click", () => {
      const index = Math.max(0, Math.round(grid.scrollLeft / cardWidth()) - 1);
      scrollToIndex(index);
    });
    next.addEventListener("click", () => {
      const max = dots.length - 1;
      const index = Math.min(max, Math.round(grid.scrollLeft / cardWidth()) + 1);
      scrollToIndex(index);
    });
    let ticking = false;
    grid.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const index = Math.round(grid.scrollLeft / cardWidth());
        dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === index));
        ticking = false;
      });
    });
  })();
})();
//# sourceMappingURL=site.bundle.js.map

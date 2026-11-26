(() => {
  const clearPageTransition = () => {
    document.body.classList.remove("is-leaving");
    document.documentElement.classList.remove("is-leaving");
  };

  window.addEventListener("pageshow", clearPageTransition);
  window.addEventListener("popstate", clearPageTransition);

  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const filterBar = document.querySelector("[data-filter-bar]");
  const projectCards = Array.from(document.querySelectorAll("[data-category]"));

  if (filterBar && projectCards.length) {
    const applyFilter = (filter) => {
      filterBar.querySelectorAll("[data-filter]").forEach((item) => {
        const active = item.dataset.filter === filter;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      projectCards.forEach((card) => {
        const categories = (card.dataset.category || "").split(/\s+/);
        card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
      });
    };

    filterBar.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;

      const filter = button.dataset.filter;
      applyFilter(filter);
      history.replaceState(null, "", filter === "all" ? location.pathname : `#${filter}`);
    });

    const initialFilter = window.location.hash.replace("#", "");
    if (initialFilter && filterBar.querySelector(`[data-filter="${initialFilter}"]`)) {
      applyFilter(initialFilter);
    }
  }

  document.querySelectorAll("[data-news-reader]").forEach((reader) => {
    const tabs = Array.from(reader.querySelectorAll(".news-tab"));
    const frame = reader.querySelector("[data-news-frame]");
    const image = reader.querySelector("img[data-news-image]");
    const screenTitle = reader.querySelector("[data-news-screen-title]");
    const external = reader.querySelector("[data-news-external]");

    tabs.forEach((tab) => {
      const preloadNewsImage = () => {
        const src = tab.dataset.newsImage;
        if (!src || tab.dataset.newsPreloaded === "1") return;
        tab.dataset.newsPreloaded = "1";
        const preload = new Image();
        preload.src = src;
      };

      tab.addEventListener("pointerenter", preloadNewsImage);
      tab.addEventListener("focus", preloadNewsImage);

      tab.addEventListener("click", () => {
        tabs.forEach((item) => {
          const active = item === tab;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-selected", String(active));
        });

        const url = tab.dataset.newsUrl;
        if (frame && url) frame.src = url;
        if (image && tab.dataset.newsImage) image.src = tab.dataset.newsImage;
        if (image) image.alt = `万国霸业新闻：${tab.querySelector("strong")?.textContent || "原文"}长图`;
        if (screenTitle) screenTitle.textContent = tab.dataset.newsTitle || tab.textContent.trim();
        if (external && url) external.href = url;
      });
    });

    const preloadAllNewsImages = () => {
      tabs.forEach((tab) => {
        const src = tab.dataset.newsImage;
        if (!src || tab.dataset.newsPreloaded === "1") return;
        tab.dataset.newsPreloaded = "1";
        const preload = new Image();
        preload.src = src;
      });
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(preloadAllNewsImages, { timeout: 2600 });
    } else {
      window.setTimeout(preloadAllNewsImages, 1400);
    }
  });

  document.querySelectorAll("[data-metro-tabs]").forEach((wrapper) => {
    const tabs = Array.from(wrapper.querySelectorAll("[data-metro-step]"));
    const panels = Array.from(wrapper.querySelectorAll("[data-metro-panel]"));
    if (!tabs.length || !panels.length) return;

    const show = (key, focus = false) => {
      tabs.forEach((tab) => {
        const active = tab.dataset.metroStep === key;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
        if (active && focus) tab.focus();
      });

      panels.forEach((panel) => {
        const active = panel.dataset.metroPanel === key;
        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
      });
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => show(tab.dataset.metroStep));
      tab.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        const next = (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
        show(tabs[next].dataset.metroStep, true);
      });
    });

    const initial = tabs.find((tab) => tab.classList.contains("is-active")) || tabs[0];
    show(initial.dataset.metroStep);
  });

  document.querySelectorAll("[data-print]").forEach((button) => {
    button.addEventListener("click", () => window.print());
  });

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const backFloat = document.querySelector(".back-float");
  if (backFloat) {
    const syncBackFloat = () => {
      backFloat.classList.toggle("is-visible", window.scrollY > 420);
    };
    backFloat.classList.add("is-scroll-aware");
    syncBackFloat();
    window.addEventListener("scroll", syncBackFloat, { passive: true });
    window.addEventListener("pageshow", syncBackFloat);
  }

  const lightboxLinks = document.querySelectorAll("[data-lightbox]");
  if (lightboxLinks.length) {
    let overlay = null;

    const closeLightbox = () => {
      if (!overlay) return;
      overlay.remove();
      overlay = null;
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeydown);
    };

    const onKeydown = (event) => {
      if (event.key === "Escape") closeLightbox();
    };

    lightboxLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        closeLightbox();

        overlay = document.createElement("div");
        overlay.className = "lightbox";
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-label", link.dataset.caption || "查看大图");

        const image = document.createElement("img");
        image.src = link.getAttribute("href");
        image.alt = link.dataset.caption || "";

        const button = document.createElement("button");
        button.type = "button";
        button.className = "lightbox-close";
        button.setAttribute("aria-label", "关闭");
        button.textContent = "×";

        overlay.append(image, button);
        overlay.addEventListener("click", (clickEvent) => {
          if (clickEvent.target === overlay || clickEvent.target === button) closeLightbox();
        });

        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onKeydown);
      });
    });
  }

  const mainScript = document.querySelector('script[src$="assets/js/main.js"]');
  if (mainScript && !document.querySelector(".wq-pet")) {
    const petCss = document.createElement("link");
    petCss.rel = "stylesheet";
    petCss.href = new URL("../css/pet.css", mainScript.src).href;
    document.head.appendChild(petCss);

    {
      const path = location.pathname.replace(/\/+$/, "").split("/").filter(Boolean).pop() || "home";
      const page = path.replace(/\.html$/, "");
      const messages = {
        home: [
          "先看网易游戏社媒，还是 KOC/KOL？",
          "经历时间轴在顶部，点进去看全链路。",
          "KOC 那页有 400+ 校园创作者。",
          "211 / 2027 届，找游戏营销岗。",
          "点右上角简历，可以直接看。",
        ],
        portfolio: [
          "点开卡片看完整项目。",
          "广告素材那页有真实投放图。",
          "KOC 和 KOL 是两条不同的线。",
        ],
        experience: [
          "点左边或右边节点，中间会切换。",
          "网易互娱那段最完整。",
          "每段都写了职责、动作和结果。",
        ],
        koc: [
          "点四个阶段，能看到搭建到结算。",
          "400+ 校园 KOC，不是随便拉群。",
          "每张图都能点开看完整版。",
        ],
        resume: ["可以直接打印成 PDF。", "邮箱和电话都在左侧。"],
        creative: [
          "素材墙里有真实广告图。",
          "先看卖点，再看素材形式。",
          "这页是我最想让你看的项目。",
        ],
        kol: [
          "达人不是越贵越好。",
          "游戏直播、Coser、泛娱乐、同人，各有用处。",
        ],
        brand: [
          "官方号也可以说人话。",
          "王者荣耀、百家讲坛、苏超都联动过。",
        ],
        demo: [
          "这里是我自己做的东西。",
          "同人游戏、AI 配音、3D、自媒体。",
        ],
      };
      const lines = messages[page] || messages.home;

      const pet = document.createElement("div");
      pet.className = "wq-pet";
      pet.innerHTML = `
        <div class="wq-pet__bubble">
          <span class="wq-pet__label">明明</span>
          <span class="wq-pet__text" aria-live="polite"></span>
        </div>
        <button class="wq-pet__character" type="button" aria-label="点击换一句话">
          <svg viewBox="0 0 64 64" shape-rendering="crispEdges" aria-hidden="true">
            <rect x="10" y="14" width="12" height="14" fill="#141414"/>
            <rect x="42" y="14" width="12" height="14" fill="#141414"/>
            <rect x="12" y="16" width="8" height="9" fill="#f3efe5"/>
            <rect x="44" y="16" width="8" height="9" fill="#f3efe5"/>
            <rect x="14" y="22" width="36" height="30" fill="#141414"/>
            <rect x="16" y="24" width="32" height="26" fill="#f3efe5"/>
            <rect x="12" y="26" width="40" height="4" fill="#e43b2e"/>
            <rect x="6" y="28" width="8" height="14" fill="#e43b2e"/>
            <rect x="50" y="28" width="8" height="14" fill="#e43b2e"/>
            <rect x="20" y="34" width="6" height="6" fill="#141414"/>
            <rect x="38" y="34" width="6" height="6" fill="#141414"/>
            <rect x="28" y="44" width="8" height="3" fill="#e43b2e"/>
            <rect x="16" y="52" width="8" height="4" fill="#141414"/>
            <rect x="40" y="52" width="8" height="4" fill="#141414"/>
          </svg>
          <span class="wq-pet__status"></span>
        </button>
      `;
      document.body.appendChild(pet);

      const textNode = pet.querySelector(".wq-pet__text");
      const character = pet.querySelector(".wq-pet__character");
      let messageIndex = 0;
      let typeTimer = 0;
      let nextTimer = 0;

      const typeMessage = () => {
        clearInterval(typeTimer);
        clearTimeout(nextTimer);
        const text = lines[messageIndex % lines.length];
        messageIndex += 1;
        let charIndex = 0;
        textNode.textContent = "";
        typeTimer = window.setInterval(() => {
          charIndex += 1;
          textNode.textContent = text.slice(0, charIndex);
          if (charIndex >= text.length) {
            clearInterval(typeTimer);
            nextTimer = window.setTimeout(typeMessage, 6200);
          }
        }, 34);
      };

      character.addEventListener("click", typeMessage);
      pet.addEventListener("mouseenter", () => clearTimeout(nextTimer));
      pet.addEventListener("mouseleave", () => {
        clearTimeout(nextTimer);
        nextTimer = window.setTimeout(typeMessage, 2200);
      });

      typeMessage();
    }
  }

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll(".event-carousel__slide"));
    const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
    if (slides.length < 2) return;

    let index = 0;
    const show = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === index;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
      });
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-pressed", String(active));
      });
    };

    carousel.querySelector("[data-carousel-prev]")?.addEventListener("click", () => show(index - 1));
    carousel.querySelector("[data-carousel-next]")?.addEventListener("click", () => show(index + 1));
    dots.forEach((dot, dotIndex) => dot.addEventListener("click", () => show(dotIndex)));
  });
})();

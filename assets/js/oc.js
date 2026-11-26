(() => {
  const line = document.querySelector("[data-oc-line]");
  const buttons = Array.from(document.querySelectorAll("[data-oc-topic]"));
  const modal = document.querySelector("[data-oc-modal]");
  const modalCard = modal?.querySelector(".oc-modal__card");
  const modalEyebrow = document.querySelector("[data-oc-eyebrow]");
  const modalTitle = document.querySelector("[data-oc-title]");
  const modalBody = document.querySelector("[data-oc-body]");
  const modalTags = document.querySelector("[data-oc-tags]");
  const modalMedia = document.querySelector("[data-oc-media]");
  const process = document.querySelector("[data-oc-process]");
  const processTabs = Array.from(document.querySelectorAll("[data-oc-step]"));
  const stepTag = document.querySelector("[data-oc-step-tag]");
  const stepTitle = document.querySelector("[data-oc-step-title]");
  const stepBody = document.querySelector("[data-oc-step-body]");
  const stepLink = document.querySelector("[data-oc-step-link]");
  const closeButton = modal?.querySelector(".oc-modal__close");
  const lightbox = document.querySelector("[data-oc-lightbox]");
  const lightboxImage = document.querySelector("[data-oc-lightbox-img]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!line || !buttons.length) return;

  const topics = {
    model: {
      index: "01",
      label: "C4D建模",
      line: "先搭出世界，角色才有地方活下去。",
      body: "C4D / Blender 搭建工业废墟、地下隧道和载具硬表面。先把世界观变成能看见的空间，再让角色和内容落进去。",
      tags: ["C4D", "Blender", "工业废墟", "硬表面"],
      media: [
        {
          type: "video",
          src: "../assets/video/oc-model.mp4?v=2",
          poster: "../assets/img/oc-model-poster.webp",
          caption: "C4D 场景搭建过程 / 16s",
        },
        {
          src: "../assets/img/oc-model-tank.webp",
          alt: "C4D 载具硬表面建模",
          caption: "载具硬表面 / 炮塔结构",
        },
        {
          src: "../assets/img/oc-model-plant.webp",
          alt: "C4D 工业厂区场景",
          caption: "工业厂区 / 管线与平台",
        },
        {
          src: "../assets/img/oc-model-pipes.webp",
          alt: "C4D 管道与楼梯细节",
          caption: "管道与楼梯 / 场景细节",
        },
      ],
    },
    iskari: {
      index: "02",
      label: "独立文游【伊斯卡利】",
      line: "《伊斯卡利》是我把文案、建模和配音串起来的一次完整制作。",
      body: "从人设、世界观、脚本到约稿配图，完整跑一遍独立文游的制作流程。",
      tags: ["独立文游", "剧情文案", "3D 场景", "约稿"],
      steps: {
        persona: {
          tag: "STEP 01 / CHARACTER",
          title: "确定人设",
          body: "烟雾镜：表面是健谈、体面、带点爹味的美国 CEO，骨子里是阿兹特克至高神。喜欢美元、枪械和 B 级片；他宣称没有讨厌的东西，因为所有令自己不快的事物，都可以用力量付之一炬。",
          mediaOne: true,
          media: [
            {
              src: "../assets/img/oc-iskari-persona.webp",
              alt: "伊斯卡利角色烟雾镜的人设档案",
              caption: "人设档案 / 烟雾镜 · 点击看全文",
            },
          ],
        },
        world: {
          tag: "STEP 02 / WORLD",
          title: "搭建世界观",
          body: "故事发生在加利福尼亚一间近乎废弃的酒馆：环形阶梯通向不存在的二楼，镜面、蜂鸟、货物与失忆症患者叠在一起。阿兹特克文明没有记忆，烟雾镜用肺制作降临人间的种子；酒馆里的交易，交换的是民族记忆本身。",
          mediaOne: true,
          media: [
            {
              src: "../assets/img/oc-iskari-world.webp",
              alt: "伊斯卡利地下通道与环形空间 C4D 场景",
              caption: "世界观场景 / 地下通道与环形空间",
            },
          ],
        },
        script: {
          tag: "STEP 03 / SCRIPT",
          title: "产出文案脚本",
          body: "10 页剧本：先写剧情介绍，再落到场次、人物和对白。开场是戴先生走进废弃酒馆，左女士、烟老板围绕阿兹特克、记忆与“愚人船”展开对话。",
          mediaOne: true,
          media: [
            {
              src: "../assets/img/oc-iskari-script.webp",
              alt: "伊斯卡利文案脚本第一页",
              caption: "《伊斯卡利》脚本 / 第 1 页 · 点击看大图",
            },
          ],
        },
        commission: {
          tag: "STEP 04 / ART",
          title: "约稿配图",
          body: "人设和世界观确定后，把文字设定拆成约稿 brief：角色设定、服装与道具、场景氛围和封面插画。约稿图既服务游戏内呈现，也作为对外传播的视觉资产。",
          mediaTwo: true,
          mediaFit: true,
          media: [
            {
              src: "../assets/img/oc-iskari-commission-01.webp",
              alt: "伊斯卡利约稿角色设定与道具图",
              caption: "约稿图 01 / 角色设定与道具",
            },
            {
              src: "../assets/img/oc-iskari-commission-02.webp",
              alt: "伊斯卡利红色背景角色插画",
              caption: "约稿图 02 / 角色插画",
            },
          ],
        },
      },
    },
    fan: {
      index: "03",
      label: "同人账号",
      line: "在 LOFTER 写同人，也在评论区学会判断什么会被记住。",
      body: "LOFTER 二次元文学垂类账号，UGC 150w+、互动 3w+。从选题、连载到评论区共创，持续验证什么内容会被记住。",
      tags: ["LOFTER", "同人写作", "UGC 150w+", "互动 3w+"],
      mediaTwo: true,
      media: [
        {
          src: "../assets/img/oc-fan-01.webp",
          alt: "同人文案例第一页",
          caption: "同人文案例 / 第 1 页 · 点击看全文",
        },
        {
          src: "../assets/img/oc-fan-02.webp",
          alt: "同人文案例第二页",
          caption: "同人文案例 / 第 2 页 · 点击看全文",
        },
      ],
    },
    cosplay: {
      index: "04",
      label: "cosplay",
      line: "角色不是穿上衣服就成立，语气、站姿、眼神都要对上。",
      body: "Cos 与角色演绎，小红书 Cos & 建模内容互动 6k+。从角色理解、妆造、拍摄到后期与发布，完整走一遍内容生产。",
      tags: ["Cos", "角色演绎", "小红书", "互动 6k+"],
      mediaTall: true,
      media: [
        {
          src: "../assets/img/oc-cos-01.webp",
          alt: "Coser 角色演绎一",
          caption: "Coser / 蓝发角色演绎",
        },
        {
          src: "../assets/img/oc-cos-pink.webp",
          alt: "Coser 粉色造型三格拼图",
          caption: "Coser / 粉色造型与镜框",
        },
        {
          src: "../assets/img/oc-cos-last.webp",
          alt: "Coser 黑蓝发与墨镜造型",
          caption: "Coser / 黑蓝发与墨镜",
        },
      ],
    },
    art: {
      index: "05",
      label: "美工",
      line: "构图、字体、材质和留白，都是内容的一部分。",
      body: "视觉背景、角色物料、排版与封面设计。把世界观变成一眼能识别的画面，也让内容在不同平台上保持统一的调性。",
      tags: ["视觉设计", "排版", "封面", "物料"],
      mediaTall: true,
      media: [
        {
          src: "../assets/img/oc-art-01.webp",
          alt: "角色插画与眼部神经医学参考",
          caption: "角色插画 / 医学参考与表情设计",
        },
        {
          src: "../assets/img/oc-art-02.webp",
          alt: "棕发角色与白花插画",
          caption: "角色插画 / 白花与西装",
        },
        {
          src: "../assets/img/oc-art-03.webp",
          alt: "水彩人物与蝴蝶插画",
          caption: "角色插画 / 水彩与蝴蝶",
        },
      ],
    },
  };

  let typeTimer = 0;
  let lastTrigger = null;

  const typeLine = (text) => {
    window.clearInterval(typeTimer);
    line.textContent = "";

    if (reducedMotion) {
      line.textContent = text;
      return;
    }

    let index = 0;
    typeTimer = window.setInterval(() => {
      index += 1;
      line.textContent = text.slice(0, index);
      if (index >= text.length) {
        window.clearInterval(typeTimer);
      }
    }, 58);
  };

  const setActiveButton = (activeButton) => {
    buttons.forEach((button) => {
      const active = button === activeButton;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-expanded", String(active));
    });
  };

  const closeModal = () => {
    if (!modal || modal.hidden) return;
    modal.querySelectorAll("video").forEach((video) => video.pause());
    modal.classList.remove("is-open");
    document.body.classList.remove("oc-lock");
    window.setTimeout(() => {
      modal.hidden = true;
    }, 180);
    lastTrigger?.focus();
  };

  const setupCarousel = (carousel) => {
    const track = carousel.querySelector(".oc-carousel__track");
    const dots = Array.from(carousel.querySelectorAll("[data-oc-carousel-dot]"));
    if (!track || dots.length < 2) return;

    const update = () => {
      const index = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-current", active ? "true" : "false");
      });
    };

    carousel.querySelector("[data-oc-carousel-prev]")?.addEventListener("click", () => {
      track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
    });
    carousel.querySelector("[data-oc-carousel-next]")?.addEventListener("click", () => {
      track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
    });
    dots.forEach((dot, dotIndex) => {
      dot.addEventListener("click", () => {
        track.scrollTo({ left: track.clientWidth * dotIndex, behavior: "smooth" });
      });
    });
    track.addEventListener("scroll", () => window.requestAnimationFrame(update), { passive: true });
    update();
  };

  const renderMedia = (topic) => {
    if (!modalMedia) return;
    modalMedia.innerHTML = "";

    if (!topic.media?.length) {
      modalMedia.hidden = true;
      return;
    }

    modalMedia.hidden = false;
    const videos = topic.media.filter((item) => item.type === "video");
    const images = topic.media.filter((item) => item.type !== "video");

    if (videos.length) {
      const videoRow = document.createElement("div");
      videoRow.className = "oc-media-videos";
      videos.forEach((item) => {
        const figure = document.createElement("figure");
        figure.className = "oc-media__item oc-media__item--video";
        figure.innerHTML = `
          <video controls playsinline preload="none" poster="${item.poster}">
            <source src="${item.src}" type="video/mp4" />
          </video>
          <figcaption>${item.caption}</figcaption>
        `;
        videoRow.appendChild(figure);
      });
      modalMedia.appendChild(videoRow);
    }

    if (images.length) {
      const carousel = document.createElement("div");
      carousel.className = `oc-carousel${images.length === 1 ? " is-single" : ""}`;
      const track = document.createElement("div");
      track.className = "oc-carousel__track";

      images.forEach((item, index) => {
        const slide = document.createElement("figure");
        slide.className = "oc-media__item oc-carousel__slide";
        slide.innerHTML = `
          <a href="${item.src}" data-oc-zoom>
            <img src="${item.src}" alt="${item.alt}" loading="lazy" />
            <i class="oc-media__zoom" aria-hidden="true">↗</i>
          </a>
          <figcaption>${item.caption}</figcaption>
        `;
        track.appendChild(slide);
      });

      carousel.appendChild(track);
      if (images.length > 1) {
        const prev = document.createElement("button");
        prev.type = "button";
        prev.className = "oc-carousel__btn oc-carousel__btn--prev";
        prev.dataset.ocCarouselPrev = "";
        prev.setAttribute("aria-label", "上一张");
        prev.textContent = "←";

        const next = document.createElement("button");
        next.type = "button";
        next.className = "oc-carousel__btn oc-carousel__btn--next";
        next.dataset.ocCarouselNext = "";
        next.setAttribute("aria-label", "下一张");
        next.textContent = "→";

        const dots = document.createElement("div");
        dots.className = "oc-carousel__dots";
        images.forEach((item, index) => {
          const dot = document.createElement("button");
          dot.type = "button";
          dot.dataset.ocCarouselDot = "";
          dot.setAttribute("aria-label", `第 ${index + 1} 张`);
          if (index === 0) dot.classList.add("is-active");
          dots.appendChild(dot);
        });

        carousel.appendChild(prev);
        carousel.appendChild(next);
        carousel.appendChild(dots);
      }
      modalMedia.appendChild(carousel);
      setupCarousel(carousel);
    }
  };

  const renderStep = (stepKey) => {
    const step = topics.iskari.steps[stepKey];
    if (!step) return;

    processTabs.forEach((tab) => {
      const active = tab.dataset.ocStep === stepKey;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });

    stepTag.textContent = step.tag;
    stepTitle.textContent = step.title;
    stepBody.textContent = step.body;
    stepLink.innerHTML = step.link
      ? `<a href="${step.link.href}" target="_blank" rel="noopener">${step.link.label}</a>`
      : "";
    renderMedia(step);
  };

  const openModal = (topic, trigger) => {
    if (!modal || !modalCard) return;
    lastTrigger = trigger;
    modalEyebrow.textContent = `MEMORY / ${topic.index}`;
    modalTitle.textContent = topic.label;
    modalBody.textContent = topic.body;
    modalTags.innerHTML = topic.tags.map((tag) => `<span>${tag}</span>`).join("");
    if (process) process.hidden = !topic.steps;
    if (topic.steps) {
      renderStep("persona");
    } else {
      renderMedia(topic);
    }
    modal.hidden = false;
    document.body.classList.add("oc-lock");
    modalCard.scrollTop = 0;
    window.requestAnimationFrame(() => {
      modal.classList.add("is-open");
      closeButton?.focus();
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const topic = topics[button.dataset.ocTopic];
      if (!topic) return;
      setActiveButton(button);
      typeLine(topic.line);
      openModal(topic, button);
    });
  });

  processTabs.forEach((tab) => {
    tab.addEventListener("click", () => renderStep(tab.dataset.ocStep));
  });

  const closeLightbox = () => {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    if (lightboxImage) {
      lightboxImage.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      lightboxImage.alt = "";
    }
  };

  const openLightbox = (src, alt) => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightbox.hidden = false;
  };

  document.addEventListener("click", (event) => {
    const zoomLink = event.target.closest("[data-oc-zoom]");
    if (!zoomLink) return;
    event.preventDefault();
    const image = zoomLink.querySelector("img");
    openLightbox(zoomLink.getAttribute("href"), image?.alt || "");
  });

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox || event.target.closest("[data-oc-lightbox-close]")) {
      closeLightbox();
    }
  });

  modal?.querySelectorAll("[data-oc-close]").forEach((element) => {
    element.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (lightbox && !lightbox.hidden) {
      closeLightbox();
      return;
    }
    closeModal();
  });

  window.setTimeout(() => typeLine("选择的记忆才是最震撼的记忆"), 420);
})();

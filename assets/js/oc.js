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
          src: "../assets/video/oc-model.mp4",
          poster: "../assets/img/oc-model-poster.jpg",
          caption: "C4D 场景搭建过程 / 16s",
        },
        {
          src: "../assets/img/oc-model-tank.jpg",
          alt: "C4D 载具硬表面建模",
          caption: "载具硬表面 / 炮塔结构",
        },
        {
          src: "../assets/img/oc-model-plant.jpg",
          alt: "C4D 工业厂区场景",
          caption: "工业厂区 / 管线与平台",
        },
        {
          src: "../assets/img/oc-model-pipes.jpg",
          alt: "C4D 管道与楼梯细节",
          caption: "管道与楼梯 / 场景细节",
        },
      ],
    },
    iskari: {
      index: "02",
      label: "独立文游【伊斯卡利】",
      line: "《伊斯卡利》是我把文案、建模和配音串起来的一次完整制作。",
      body: "基于《命运冠位指定》世界观制作的独立文游，负责世界观、剧情文案、3D 场景与配音统筹，积累付费用户 3k+。",
      tags: ["独立文游", "剧情文案", "配音统筹", "3k+ 付费用户"],
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
          src: "../assets/img/oc-fan-01.jpg",
          alt: "同人文案例第一页",
          caption: "同人文案例 / 第 1 页 · 点击看全文",
        },
        {
          src: "../assets/img/oc-fan-02.jpg",
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
          src: "../assets/img/oc-cos-01.jpg",
          alt: "Coser 角色演绎一",
          caption: "Coser / 蓝发角色演绎",
        },
        {
          src: "../assets/img/oc-cos-pink.jpg",
          alt: "Coser 粉色造型三格拼图",
          caption: "Coser / 粉色造型与镜框",
        },
        {
          src: "../assets/img/oc-cos-last.jpg",
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
          src: "../assets/img/oc-art-01.jpg",
          alt: "角色插画与眼部神经医学参考",
          caption: "角色插画 / 医学参考与表情设计",
        },
        {
          src: "../assets/img/oc-art-02.jpg",
          alt: "棕发角色与白花插画",
          caption: "角色插画 / 白花与西装",
        },
        {
          src: "../assets/img/oc-art-03.jpg",
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

  const renderMedia = (topic) => {
    if (!modalMedia) return;
    modalMedia.innerHTML = "";
    modalMedia.classList.toggle("oc-modal__media--two", Boolean(topic.mediaTwo));
    modalMedia.classList.toggle("oc-modal__media--tall", Boolean(topic.mediaTall));

    if (!topic.media?.length) {
      modalMedia.hidden = true;
      return;
    }

    modalMedia.hidden = false;
    topic.media.forEach((item) => {
      const figure = document.createElement("figure");
      figure.className = "oc-media__item";

      if (item.type === "video") {
        figure.classList.add("oc-media__item--video");
        figure.innerHTML = `
          <video controls playsinline preload="none" poster="${item.poster}">
            <source src="${item.src}" type="video/mp4" />
          </video>
          <figcaption>${item.caption}</figcaption>
        `;
      } else {
        figure.innerHTML = `
          <a href="${item.src}" data-oc-zoom>
            <img src="${item.src}" alt="${item.alt}" loading="lazy" />
            <i class="oc-media__zoom" aria-hidden="true">↗</i>
          </a>
          <figcaption>${item.caption}</figcaption>
        `;
      }

      modalMedia.appendChild(figure);
    });
  };

  const openModal = (topic, trigger) => {
    if (!modal || !modalCard) return;
    lastTrigger = trigger;
    modalEyebrow.textContent = `MEMORY / ${topic.index}`;
    modalTitle.textContent = topic.label;
    modalBody.textContent = topic.body;
    modalTags.innerHTML = topic.tags.map((tag) => `<span>${tag}</span>`).join("");
    renderMedia(topic);
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

  const closeLightbox = () => {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    if (lightboxImage) {
      lightboxImage.removeAttribute("src");
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

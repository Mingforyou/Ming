(function () {
  var MIN_MS = 380;
  var MAX_MS = 900;
  var start = performance.now();
  var done = false;
  var timer = 0;

  try {
    if (sessionStorage.getItem("wq-loader-seen") === "1") {
      document.documentElement.classList.add("wq-skip-loader");
      return;
    }
  } catch (_) {}

  function finish() {
    if (done) return;
    done = true;
    clearTimeout(timer);

    var node = document.getElementById("wq-loader");
    var pct = document.getElementById("wq-loader-pct");
    if (pct) pct.textContent = "100";
    if (node && node.firstElementChild) {
      var bar = node.querySelector(".wq-loader__bar span");
      if (bar) bar.style.width = "100%";
    }

    try {
      sessionStorage.setItem("wq-loader-seen", "1");
    } catch (_) {}

    setTimeout(function () {
      if (node) node.classList.add("is-done");
      setTimeout(function () {
        if (node && node.parentNode) node.parentNode.removeChild(node);
      }, 240);
    }, 140);
  }

  function tick() {
    var pct = document.getElementById("wq-loader-pct");
    var bar = document.querySelector(".wq-loader__bar span");
    if (!pct || !bar) return;
    var t = performance.now() - start;
    var value = Math.min(94, Math.round((t / 620) * 94));
    pct.textContent = String(value);
    bar.style.width = value + "%";
    if (!done && t < MAX_MS) requestAnimationFrame(tick);
  }

  function ready() {
    var wait = Math.max(0, MIN_MS - (performance.now() - start));
    setTimeout(finish, wait);
  }

  if (document.readyState === "complete") {
    ready();
  } else {
    window.addEventListener("load", ready);
  }

  timer = setTimeout(finish, MAX_MS);
  requestAnimationFrame(tick);
})();

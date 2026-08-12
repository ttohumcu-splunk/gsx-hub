(function () {
  "use strict";

  var content = document.getElementById("page-content");
  var ciscoLogo = content && content.querySelector(".brand-logo.cisco");
  var splunkLogo = content && content.querySelector(".brand-logo.splunk");
  if (!content || !ciscoLogo || !splunkLogo) return;

  var style = document.createElement("style");
  style.textContent = `
    #page-content .brand-logo.cisco,
    #page-content .brand-logo.splunk {
      cursor: default;
      user-select: none;
      -webkit-user-select: none;
    }

    #buttercup {
      position: fixed;
      right: 20px;
      bottom: -240px;
      height: 200px;
      z-index: 60;
      opacity: 0;
      pointer-events: none;
      transition: bottom 0.8s ease, opacity 0.3s ease;
    }

    #buttercup.show {
      bottom: 0;
      opacity: 1;
      animation: buttercup-wave 1.5s ease-in-out infinite;
    }

    #buttercup-8bit {
      --bc8-size: 240px;
      position: fixed;
      left: 20px;
      bottom: 20px;
      width: var(--bc8-size);
      height: var(--bc8-size);
      z-index: 70;
      opacity: 0;
      pointer-events: none;
    }

    #buttercup-8bit.run {
      opacity: 1;
      animation: buttercup-run 2s linear forwards;
    }

    @keyframes buttercup-wave {
      0%, 100% { transform: rotate(0deg) translateY(0); }
      50% { transform: rotate(3deg) translateY(-5px); }
    }

    @keyframes buttercup-run {
      from { transform: translate(calc(-1 * var(--bc8-size) - 40px), calc(var(--bc8-size) + 40px)); }
      to { transform: translate(calc(100vw + 40px), calc(-100vh - 40px)); }
    }

    @media (max-width: 768px) {
      #buttercup { right: 12px; bottom: -160px; height: 140px; }
      #buttercup.show { bottom: -8px; }
      #buttercup-8bit { --bc8-size: 180px; left: 12px; bottom: 12px; }
    }

    @media (prefers-reduced-motion: reduce) {
      #buttercup { transition: none; }
      #buttercup.show,
      #buttercup-8bit.run { animation: none; }
    }
  `;
  document.head.appendChild(style);

  var buttercup = document.createElement("img");
  buttercup.id = "buttercup";
  buttercup.src = "Assets/buttercup.png";
  buttercup.alt = "";
  buttercup.setAttribute("aria-hidden", "true");
  buttercup.decoding = "async";

  var buttercup8Bit = document.createElement("img");
  buttercup8Bit.id = "buttercup-8bit";
  buttercup8Bit.src = "Assets/Buttercup_8bit.png";
  buttercup8Bit.alt = "";
  buttercup8Bit.setAttribute("aria-hidden", "true");
  buttercup8Bit.decoding = "async";

  content.appendChild(buttercup);
  content.appendChild(buttercup8Bit);

  var buttercupImages = [
    "Assets/buttercup.png",
    "Assets/buttercup2.png",
    "Assets/buttercup3.png",
    "Assets/buttercup4.png",
    "Assets/buttercup5.png"
  ];
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ciscoClicks = 0;
  var splunkClicks = 0;
  var ciscoTimer;
  var splunkTimer;
  var hideTimer;

  function showButtercup() {
    window.clearTimeout(hideTimer);
    buttercup.src = buttercupImages[Math.floor(Math.random() * buttercupImages.length)];
    buttercup.classList.add("show");
    hideTimer = window.setTimeout(function () {
      buttercup.classList.remove("show");
    }, 2000);
  }

  function runButtercup() {
    buttercup8Bit.classList.remove("run");
    void buttercup8Bit.offsetWidth;
    buttercup8Bit.classList.add("run");
    if (reduceMotion) {
      window.setTimeout(function () { buttercup8Bit.classList.remove("run"); }, 2000);
    }
  }

  buttercup8Bit.addEventListener("animationend", function () {
    buttercup8Bit.classList.remove("run");
  });

  ciscoLogo.addEventListener("click", function () {
    ciscoClicks += 1;
    window.clearTimeout(ciscoTimer);
    if (ciscoClicks >= 10) {
      runButtercup();
      ciscoClicks = 0;
      return;
    }
    ciscoTimer = window.setTimeout(function () { ciscoClicks = 0; }, 3000);
  });

  splunkLogo.addEventListener("click", function () {
    splunkClicks += 1;
    window.clearTimeout(splunkTimer);
    if (splunkClicks >= 5) {
      showButtercup();
      splunkClicks = 0;
      return;
    }
    splunkTimer = window.setTimeout(function () { splunkClicks = 0; }, 2000);
  });
})();

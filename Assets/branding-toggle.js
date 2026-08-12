(function () {
  "use strict";

  var STORAGE_KEY = "gsx-hub-brand";
  var CHANNEL_NAME = "gsx-hub-brand-sync";
  var CISCO = "cisco";
  var SPLUNK = "splunk";
  var root = document.documentElement;
  var channel = typeof BroadcastChannel === "function"
    ? new BroadcastChannel(CHANNEL_NAME)
    : null;

  function injectThemeStyles() {
    if (document.getElementById("gsx-brand-theme-styles")) return;

    var style = document.createElement("style");
    style.id = "gsx-brand-theme-styles";
    style.textContent = `
      #page-content,
      #page-content .platform,
      #page-content .tier,
      #page-content .category,
      #page-content .store,
      #page-content .sub-link,
      #page-content .brand-logo {
        transition: background 220ms ease, border-color 220ms ease,
          box-shadow 220ms ease, color 220ms ease, opacity 220ms ease,
          filter 220ms ease, transform 220ms ease;
      }

      html[data-brand="cisco"] body {
        background: #041220;
      }

      html[data-brand="cisco"] #page-content {
        --cdf-cyan: #00bceb;
        --cdf-blue: #0a60ff;
        --cdf-magenta: #0a60ff;
        --cdf-orange: #64e6ff;
        background:
          radial-gradient(circle at 50% 0%, rgba(0, 188, 235, 0.16), transparent 34%),
          linear-gradient(180deg, rgba(4, 25, 38, 0.76), rgba(4, 18, 32, 0.84)),
          var(--gsx-page-bg) center / cover fixed no-repeat;
      }

      html[data-brand="cisco"] #page-content .brand-logo.cisco {
        opacity: 1;
        filter: drop-shadow(0 0 12px rgba(0, 188, 235, 0.48));
        transform: scale(1.04);
      }

      html[data-brand="cisco"] #page-content .brand-logo.splunk {
        opacity: 1;
        filter: none;
      }

      html[data-brand="cisco"] #page-content .pill,
      html[data-brand="cisco"] #page-content .sub-link {
        border: 0 !important;
        background: rgba(24, 72, 98, 0.92);
        filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.48));
        box-shadow:
          0 0 0 1px rgba(255, 255, 255, 0.28),
          0 0 16px rgba(255, 255, 255, 0.4),
          0 10px 22px rgba(0, 188, 235, 0.11),
          0 8px 18px rgba(0, 0, 0, 0.24);
        color: #fff;
      }

      html[data-brand="cisco"] #page-content .pill:not(:hover) {
        border: 0;
        box-shadow: none !important;
        filter: none !important;
        text-shadow: none !important;
      }

      html[data-brand="cisco"] #page-content .pill:hover,
      html[data-brand="cisco"] #page-content .sub-link:hover,
      html[data-brand="cisco"] #page-content .sub-link:focus-visible {
        border: 0 !important;
        background: rgba(48, 82, 108, 0.98);
        box-shadow: 0 6px 14px rgba(0, 188, 235, 0.06), 0 5px 14px rgba(0, 0, 0, 0.26);
        filter: none;
      }

      html[data-brand="cisco"] #page-content .sub-link:not(:hover):not(:focus-visible) {
        border: 0 !important;
        box-shadow: 0 8px 18px rgba(0, 0, 0, 0.28) !important;
        filter: none !important;
        text-shadow: none;
      }

      html[data-brand="cisco"] #page-content .platform,
      html[data-brand="cisco"] #page-content .tier,
      html[data-brand="cisco"] #page-content .category,
      html[data-brand="cisco"] #page-content .store {
        box-shadow: 0 14px 34px rgba(0, 188, 235, 0.16), 0 8px 22px rgba(0, 0, 0, 0.32);
      }

      html[data-brand="cisco"] #page-content .store-wrap:hover .store {
        box-shadow: 0 18px 40px rgba(0, 188, 235, 0.24), 0 8px 22px rgba(0, 0, 0, 0.34);
      }

      html[data-brand="splunk"] body {
        background: #120c20;
      }

      html[data-brand="splunk"] #page-content {
        --cdf-cyan: #ff007f;
        --cdf-blue: #0a60ff;
        --cdf-magenta: #ff007f;
        --cdf-orange: #ff9000;
        background:
          radial-gradient(circle at 22% 2%, rgba(255, 144, 0, 0.22), transparent 31%),
          radial-gradient(circle at 78% 0%, rgba(255, 0, 127, 0.2), transparent 33%),
          radial-gradient(circle at 50% 35%, rgba(10, 96, 255, 0.1), transparent 44%),
          linear-gradient(180deg, rgba(18, 12, 32, 0.76), rgba(6, 18, 34, 0.84)),
          var(--gsx-page-bg) center / cover fixed no-repeat;
      }

      html[data-brand="splunk"] #page-content .platform {
        border-color: transparent;
        background:
          linear-gradient(rgba(4, 22, 40, 0.94), rgba(4, 22, 40, 0.94)) padding-box,
          linear-gradient(110deg, #ff9000, #ff007f, #02c8ff, #0a60ff) border-box;
        box-shadow: 0 18px 42px rgba(255, 0, 127, 0.13);
      }

      html[data-brand="splunk"] #page-content .platform .title-cisco {
        display: inline-block;
        background: linear-gradient(90deg, #ff9000, #ff007f, #02c8ff, #0a60ff);
        background-size: 100% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      html[data-brand="splunk"] #page-content .tier.index,
      html[data-brand="splunk"] #page-content .category {
        border-color: rgba(255, 0, 127, 0.62);
        box-shadow: 0 15px 34px rgba(255, 0, 127, 0.1);
      }

      html[data-brand="splunk"] #page-content .tier.raw {
        border-color: rgba(255, 144, 0, 0.72);
      }

      html[data-brand="splunk"] #page-content .sub-link.start {
        border-color: #ff007f;
        background: rgba(255, 0, 127, 0.12);
        color: #ff79bd;
      }

      html[data-brand="splunk"] #page-content .start-badge {
        background: #ff007f;
        color: #fff;
      }

      html[data-brand="splunk"] #page-content .brand-logo.splunk {
        opacity: 1;
        filter: drop-shadow(0 0 14px rgba(255, 0, 127, 0.52));
        transform: scale(1.04);
      }

      html[data-brand="splunk"] #page-content .brand-logo.cisco {
        opacity: 1;
        filter: none;
      }

      html[data-brand="splunk"] #page-content .pill,
      html[data-brand="splunk"] #page-content .sub-link {
        border: 1px solid rgba(255, 255, 255, 0.62);
        background: #000;
        filter: drop-shadow(0 0 7px rgba(255, 255, 255, 0.52));
        box-shadow:
          0 0 0 1px rgba(255, 255, 255, 0.32),
          0 0 17px rgba(255, 255, 255, 0.44),
          0 0 12px rgba(255, 0, 127, 0.22),
          0 0 22px rgba(255, 144, 0, 0.08),
          0 8px 18px rgba(0, 0, 0, 0.24);
        color: #fff;
      }

      html[data-brand="splunk"] #page-content .pill:not(:hover) {
        border: 0;
        box-shadow:
          inset 0 0 0 1px rgba(255, 255, 255, 0.14),
          inset 0 0 8px rgba(255, 255, 255, 0.2),
          0 8px 18px rgba(0, 0, 0, 0.24);
        filter: none;
        text-shadow: none;
      }

      html[data-brand="splunk"] #page-content .pill:hover,
      html[data-brand="splunk"] #page-content .sub-link:hover,
      html[data-brand="splunk"] #page-content .sub-link:focus-visible {
        border: 0 !important;
        background: linear-gradient(90deg, rgba(255, 144, 0, 0.86), rgba(255, 0, 127, 0.75), rgba(10, 96, 255, 0.76));
        box-shadow: 0 8px 18px rgba(255, 0, 127, 0.14), 0 6px 14px rgba(255, 144, 0, 0.07), 0 6px 16px rgba(0, 0, 0, 0.28);
        filter: none;
      }

      html[data-brand="splunk"] #page-content .sub-link:not(:hover):not(:focus-visible) {
        border: 0 !important;
        box-shadow:
          inset 0 0 0 1px rgba(255, 255, 255, 0.14),
          inset 0 0 8px rgba(255, 255, 255, 0.2),
          0 8px 18px rgba(0, 0, 0, 0.28) !important;
        filter: none !important;
        text-shadow: none;
      }

      html[data-brand="splunk"] #page-content .platform,
      html[data-brand="splunk"] #page-content .tier,
      html[data-brand="splunk"] #page-content .category,
      html[data-brand="splunk"] #page-content .store {
        box-shadow: 0 14px 34px rgba(255, 0, 127, 0.16), 0 8px 22px rgba(0, 0, 0, 0.32);
      }

      html[data-brand="splunk"] #page-content .store-wrap:hover .store {
        box-shadow: 0 18px 40px rgba(255, 0, 127, 0.24), 0 10px 28px rgba(255, 144, 0, 0.14), 0 8px 22px rgba(0, 0, 0, 0.34);
      }

      @media (prefers-reduced-motion: reduce) {
        #page-content,
        #page-content .platform,
        #page-content .tier,
        #page-content .category,
        #page-content .store,
        #page-content .sub-link,
        #page-content .brand-logo {
          transition: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function normalizeBrand(value) {
    return value === SPLUNK ? SPLUNK : CISCO;
  }

  function applyBrand(value, options) {
    var brand = normalizeBrand(value);
    var settings = options || {};
    root.dataset.brand = brand;

    if (settings.persist !== false) {
      localStorage.setItem(STORAGE_KEY, brand);
    }

    if (settings.notify && channel) {
      channel.postMessage({ brand: brand });
    }
  }

  function toggleBrand() {
    applyBrand(root.dataset.brand === CISCO ? SPLUNK : CISCO, { notify: true });
  }

  function isEditable(element) {
    return element && typeof element.closest === "function" &&
      element.closest("input, textarea, select, [contenteditable='true']");
  }

  injectThemeStyles();
  applyBrand(localStorage.getItem(STORAGE_KEY), { persist: false });

  window.addEventListener("storage", function (event) {
    if (event.key !== STORAGE_KEY) return;
    applyBrand(event.newValue, { persist: false });
  });

  if (channel) {
    channel.addEventListener("message", function (event) {
      applyBrand(event.data && event.data.brand, { persist: false });
    });
  }

  document.addEventListener("keydown", function (event) {
    var isThemeShortcut = event.ctrlKey && event.altKey && !event.shiftKey &&
      !event.metaKey && (event.code === "KeyT" || event.key.toLowerCase() === "t");

    if (!isThemeShortcut || isEditable(event.target)) return;
    event.preventDefault();
    toggleBrand();
  });
})();

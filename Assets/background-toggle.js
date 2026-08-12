(function () {
  "use strict";

  var backgrounds = [
    "Assets/PortalBG-alt1.png",
    "Assets/PortalBG-alt2.png",
    "Assets/PortalBG-alt3.png",
    "Assets/PortalBG-alt4.png",
    "Assets/PortalBG-alt5.jpg",
    "Assets/PortalBG-alt6.jpeg"
  ];
  var STORAGE_KEY = "gsx-hub-background-index";
  var root = document.documentElement;
  var index = Number.parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);

  if (!Number.isInteger(index) || index < 0 || index >= backgrounds.length) {
    index = 0;
  }

  function applyBackground() {
    root.style.setProperty("--gsx-page-bg", "url('" + backgrounds[index] + "')");
    localStorage.setItem(STORAGE_KEY, String(index));
  }

  function isEditable(element) {
    return element && typeof element.closest === "function" &&
      element.closest("input, textarea, select, [contenteditable='true']");
  }

  document.addEventListener("keydown", function (event) {
    var isBackgroundShortcut = (event.ctrlKey || event.metaKey) &&
      !event.altKey && !event.shiftKey && event.key.toLowerCase() === "b";

    if (!isBackgroundShortcut || isEditable(event.target)) return;
    event.preventDefault();
    index = (index + 1) % backgrounds.length;
    applyBackground();
  });

  applyBackground();
})();

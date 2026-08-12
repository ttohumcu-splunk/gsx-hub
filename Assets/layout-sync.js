(function () {
  "use strict";

  var objectStoresPanel = document.querySelector("#page-content .category");
  var coreTierFrames = document.querySelectorAll("#page-content .tier-stack .tier");
  var scheduledFrame = 0;

  if (!objectStoresPanel || !coreTierFrames.length) return;

  function matchTierHeights() {
    cancelAnimationFrame(scheduledFrame);
    scheduledFrame = requestAnimationFrame(function () {
      if (window.innerWidth <= 700) {
        coreTierFrames.forEach(function (tier) {
          tier.style.height = "";
        });
        return;
      }

      var objectStoresHeight = Math.ceil(objectStoresPanel.getBoundingClientRect().height);
      if (!objectStoresHeight) return;

      coreTierFrames.forEach(function (tier) {
        tier.style.height = objectStoresHeight + "px";
      });
    });
  }

  if (typeof ResizeObserver === "function") {
    new ResizeObserver(matchTierHeights).observe(objectStoresPanel);
  }

  window.addEventListener("resize", matchTierHeights);
  window.addEventListener("load", matchTierHeights);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(matchTierHeights);
  }

  matchTierHeights();
})();

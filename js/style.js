import { pads } from "./dom.js";

(() => {
  const { clear, del, equal, redixPoint, opeRators } = pads;
  const combineKeys = [
    clear,
    del,
    equal,
    redixPoint,
    ...Object.values(opeRators),
  ];

  combineKeys.forEach((key, i) => {
    key.classList.add("non-numeric-keys");
    if (i === 2) {
      key.style.color = "red";
    }
  });
})();

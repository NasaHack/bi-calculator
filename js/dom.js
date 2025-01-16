const common = {
  calculator: document.getElementById("calculator"),
  heading: document.getElementById("heading"),
  display: document.getElementById("display"),
  conversionResult: document.getElementById("conversion-result"),
  pads: document.getElementById("pads"),
  loader: document.getElementById("loader"),
};

const modeSwitch = {
  arithmetic: document.getElementById("mode-button"),
  conversion: document.getElementById("conversion-btn"),
};

const modeSelector = {
  arithmetic: document.getElementById("mode-selector"),
  conversion: document.getElementById("conversion-selector"),
};

const pads = {
  keys: document.querySelectorAll("#pads .pads-button"),

  get clear() {
    return this.keys[0];
  },
  get del() {
    return this.keys[1];
  },
  get equal() {
    return this.keys[24];
  },
  get redixPoint() {
    return this.keys[2];
  },
  get numKeys() {
    return {
      0: this.keys[20],
      1: this.keys[21],
      2: this.keys[22],
      3: this.keys[23],
      4: this.keys[15],
      5: this.keys[16],
      6: this.keys[17],
      7: this.keys[18],
      8: this.keys[10],
      9: this.keys[11],
      A: this.keys[12],
      B: this.keys[13],
      C: this.keys[5],
      D: this.keys[6],
      E: this.keys[7],
      F: this.keys[8],
    };
  },
  get opeRators() {
    return {
      "+": this.keys[19],
      "-": this.keys[14],
      "×": this.keys[9],
      "÷": this.keys[4],
      "%": this.keys[3],
    };
  },
};

export { common, modeSelector, modeSwitch, pads };

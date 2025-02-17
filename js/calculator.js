import { createStore } from "./lib/external/Redux.js";
import Arithmetic from "./lib/custom/Arithmetic.js";
import Conversion from "./lib/custom/Conversion.js";
import genCOS from "./constants.js";
import { handleRefresh } from "./lib/custom/common.js";
import { pads, modeSelector, modeSwitch, common } from "./dom.js";

const initialState = {
  mode: "arithmetic",
  input: "",
  modeType: "",
  conversionType: "",
  orReadOnly: ["+", "-", "×", "÷", "%"],
  conversionResult: "",
};

const ACTION_TYPE = {
  SWITCH_MODE: "SWITCH_MODE",
  TYPE_KEY: "TYPE_KEY",
  GET_MOODE_TYPE: "GET_MOODE_TYPE",
  GET_CONVERSION_TYPE: "GET_CONVERSION_TYPE",
  RESET: "RESET",
  DELETE: "DELETE",
  ADD_OPERATOR_AND_RADIX: "ADD_OPERATOR_AND_RADIX",
  CALCULATE: "CALCULATE",
  CALCULATE_CONVERSION: "CALCULATE_CONVERSION",
  DISPLAY_MESSAGE: "DISPLAY_MESSAGE",
};

const ACTIONS = {
  SWITCH_MODE: (mode) => ({
    type: ACTION_TYPE.SWITCH_MODE,
    mode,
  }),
  TYPE_KEY: (key) => ({
    type: ACTION_TYPE.TYPE_KEY,
    key,
  }),
  GET_MOODE_TYPE: (type) => ({
    type: ACTION_TYPE.GET_MOODE_TYPE,
    modeType: type,
  }),
  GET_CONVERSION_TYPE: (type) => ({
    type: ACTION_TYPE.GET_CONVERSION_TYPE,
    conversionType: type,
  }),
  RESET: () => ({
    type: ACTION_TYPE.RESET,
  }),
  DELETE: () => ({
    type: ACTION_TYPE.DELETE,
  }),
  ADD_OPERATOR_AND_RADIX: (or) => ({
    type: ACTION_TYPE.ADD_OPERATOR_AND_RADIX,
    or,
  }),
  CALCULATE: (inputString) => ({
    type: ACTION_TYPE.CALCULATE,
    inputString,
  }),
  CALCULATE_CONVERSION: (inputString) => ({
    type: ACTION_TYPE.CALCULATE_CONVERSION,
    inputString,
  }),
  DISPLAY_MESSAGE: (message) => ({
    type: ACTION_TYPE.DISPLAY_MESSAGE,
    message,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SWITCH_MODE: {
      return {
        ...state,
        mode: action.mode,
      };
    }

    case ACTION_TYPE.TYPE_KEY: {
      return {
        ...state,
        input: state.input + action.key.innerText,
      };
    }

    case ACTION_TYPE.GET_MOODE_TYPE: {
      return {
        ...state,
        modeType: action.modeType,
      };
    }

    case ACTION_TYPE.GET_CONVERSION_TYPE: {
      return {
        ...state,
        conversionType: action.conversionType
          ? action.conversionType
          : genCOS(state.modeType).initialOptions,
      };
    }

    case ACTION_TYPE.RESET: {
      return {
        ...state,
        input: "",
        conversionResult: "",
        modeType: state.modeType,
        conversionType: state.conversionType,
      };
    }

    case ACTION_TYPE.DELETE: {
      return {
        ...state,
        input: state.input.slice(0, state.input.length - 1),
      };
    }

    case ACTION_TYPE.ADD_OPERATOR_AND_RADIX: {
      return {
        ...state,
        input: (() => {
          switch (state.mode) {
            case "arithmetic":
              return state.input + action.or;
            case "conversion": {
              return !state.input.includes(".")
                ? state.input + action.or
                : state.input;
            }
          }
        })(),
      };
    }

    case ACTION_TYPE.CALCULATE: {
      return {
        ...state,

        input: (() => {
          const arithmetic = new Arithmetic(
            (() => {
              switch (state.modeType) {
                case "bin":
                  return 2;
                case "oct":
                  return 8;
                case "dec":
                  return 10;
                case "hex":
                  return 16;
              }
            })()
          );

          const operator =
            state.input[
              state.input.split("").findIndex((char, i) => {
                if (i > 0) {
                  return state.orReadOnly.includes(char);
                }
              })
            ];

          let isSameOperator = (() => {
            let operators = [];
            state.input.split("").forEach((char) => {
              if (state.orReadOnly.includes(char)) {
                operators.push(char);
              }
            });

            return operators.every((operator) => {
              return operator === operators[0];
            });
          })();

          const splitter = (operator, input) => {
            let splitInput = input.split(operator);
            let isAllAreTruthy = splitInput.every((char) => Boolean(char));
            return isAllAreTruthy ? splitInput : false;
          };

          if (isSameOperator) {
            switch (operator) {
              case "+": {
                const addend = splitter(operator, state.input);
                if (!addend) {
                  handleRefresh(1200);
                  return "Malformed expression";
                }
                let result = arithmetic.addition(addend);
                if (result === "NaN") {
                  handleRefresh(1200);
                  return "Malformed expression";
                }
                return result;
              }
              case "-": {
                const sequentialSubtractor = splitter(operator, state.input);
                if (!sequentialSubtractor) {
                  handleRefresh(1200);
                  return "Malformed expression";
                }
                let result = arithmetic.subtraction(sequentialSubtractor);
                if (result === "NaN") {
                  handleRefresh(1200);
                  return "Malformed expression";
                }
                return result;
              }
              case "×": {
                const fractor = splitter(operator, state.input);
                if (!fractor) {
                  handleRefresh(1200);
                  return "Malformed expression";
                }
                let result = arithmetic.multiply(fractor);
                if (result === "NaN") {
                  handleRefresh(1200);
                  return "Malformed expression";
                }
                return result;
              }
              case "÷": {
                const sequentialDivisor = splitter(operator, state.input);
                if (!sequentialDivisor) {
                  handleRefresh(1200);
                  return "Malformed expression";
                }
                let result = arithmetic.division(sequentialDivisor);
                if (result === "NaN") {
                  handleRefresh(1200);
                  return "Malformed expression";
                }
                return result;
              }
              case "%": {
                const sequentialRemainder = splitter(operator, state.input);
                if (!sequentialRemainder) {
                  handleRefresh(1200);
                  return "Malformed expression";
                }
                let result = arithmetic.remainder(sequentialRemainder);
                if (result === "NaN") {
                  handleRefresh(1200);
                  return "Malformed expression";
                }
                return result;
              }
            }
          } else {
            let result = arithmetic.genericCalculation(state.input);
            if (result === "NaN") {
              handleRefresh(1200);
              return "Malformed expression";
            }
            return result;
          }
        })(),
      };
    }

    case ACTION_TYPE.CALCULATE_CONVERSION: {
      return {
        ...state,
        conversionResult: (() => {
          const conversion = new Conversion();
          switch (state.conversionType) {
            case "bin-oct":
              return conversion.BinaryToOctal(state.input);
            case "bin-dec":
              return conversion.BinaryToDecimal(state.input);
            case "bin-hex":
              return conversion.BinaryToHexadecimal(state.input);
            case "oct-bin":
              return conversion.OctalToBinary(state.input);
            case "oct-dec":
              return conversion.OctalToDecimal(state.input);
            case "oct-hex":
              return conversion.OctalToHexadecimal(state.input);
            case "dec-bin":
              return conversion.decimalToBinary(state.input);
            case "dec-oct":
              return conversion.decimalToOctal(state.input);
            case "dec-hex":
              return conversion.decimalToHexadecimal(state.input);
            case "hex-bin":
              return conversion.hexadecimalToBinary(state.input);
            case "hex-oct":
              return conversion.hexadecimalToOctal(state.input);
            case "hex-dec":
              return conversion.hexadecimalToDecimal(state.input);
          }

          return action.inputString;
        })(),
      };
    }

    case ACTION_TYPE.DISPLAY_MESSAGE: {
      return {
        ...state,
        input: action.message,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

const store = createStore(reducer);

{
  modeSwitch.arithmetic.addEventListener("click", () => {
    store.dispatch(ACTIONS.RESET());
    store.dispatch(ACTIONS.SWITCH_MODE("arithmetic"));
  });
  modeSwitch.conversion.addEventListener("click", () => {
    store.dispatch(ACTIONS.RESET());
    store.dispatch(ACTIONS.SWITCH_MODE("conversion"));
  });
}

{
  pads.clear.addEventListener("click", () => {
    store.dispatch(ACTIONS.RESET());
  });
}

{
  pads.del.addEventListener("click", () => {
    store.dispatch(ACTIONS.DELETE());
  });
}

{
  const combineKeys = [pads.redixPoint, ...Object.values(pads.opeRators)];
  const add_operator_and_radix_point = (or) => {
    store.dispatch(ACTIONS.ADD_OPERATOR_AND_RADIX(or));
  };
  combineKeys.forEach((key) => {
    key.addEventListener("click", () => {
      add_operator_and_radix_point(key.innerText);
    });
  });
}

{
  const handleArithmeticSelector = (type) => {
    store.dispatch(ACTIONS.RESET());
    store.dispatch(ACTIONS.GET_MOODE_TYPE(type));
    store.dispatch(ACTIONS.GET_CONVERSION_TYPE(genCOS(type).initialOptions));
  };
  handleArithmeticSelector(modeSelector.arithmetic.value);
  modeSelector.arithmetic.addEventListener("change", (e) => {
    handleArithmeticSelector(e.target.value);
  });
}

{
  const handleCoinversionType = (type) => {
    store.dispatch(ACTIONS.RESET());
    store.dispatch(ACTIONS.GET_CONVERSION_TYPE(type));
    modeSelector.conversion.value = type;
  };

  handleCoinversionType(modeSelector.conversion.value);
  modeSelector.conversion.addEventListener("change", (e) => {
    handleCoinversionType(e.target.value);
  });
}

{
  const handleCalculate = () => {
    const { mode, input } = store.getState();
    if (input && mode === "arithmetic") {
      store.dispatch(ACTIONS.CALCULATE(input));
    }
    if (input && mode === "conversion") {
      store.dispatch(ACTIONS.CALCULATE_CONVERSION(input));
    }
  };
  pads.equal.addEventListener("click", handleCalculate);
}

Object.entries(pads.numKeys).map(([i, key]) => {
  key.addEventListener("click", () => {
    store.dispatch(ACTIONS.TYPE_KEY(key));
  });
});

const modeSwitcher = (mode) => {
  switch (mode) {
    case "arithmetic": {
      modeSwitch.arithmetic.classList.add("active");
      modeSelector.arithmetic.style.display = "block";
      modeSelector.conversion.style.display = "none";
      common.conversionResult.style.display = "none";
      modeSwitch.conversion.classList.remove("active");
      break;
    }
    case "conversion": {
      modeSwitch.conversion.classList.add("active");
      modeSelector.conversion.style.display = "block";
      modeSelector.arithmetic.style.display = "none";
      common.conversionResult.style.display = "block";
      modeSwitch.arithmetic.classList.remove("active");
      break;
    }
  }
};

const handleAllowdKeys = (modeType, conversionType) => {
  switch (modeType) {
    case "bin": {
      return Object.values(pads.numKeys).forEach((key, i) => {
        if (i > 1) {
          key.classList.add("disabled");
          key.setAttribute("disabled", true);
          key.setAttribute("title", `You are in Binary Mode`);
        } else {
          key.classList.remove("disabled");
          key.removeAttribute("disabled");
          key.removeAttribute("title");
        }
      });
    }
    case "oct": {
      return Object.values(pads.numKeys).forEach((key, i) => {
        if (i > 7) {
          key.classList.add("disabled");
          key.setAttribute("disabled", true);
          key.setAttribute("title", `You are in Octal Mode`);
        } else {
          key.classList.remove("disabled");
          key.removeAttribute("disabled");
          key.removeAttribute("title");
        }
      });
    }
    case "dec": {
      return Object.values(pads.numKeys).forEach((key, i) => {
        if (i > 9) {
          key.classList.add("disabled");
          key.setAttribute("disabled", true);
          key.setAttribute("title", `You are in Decimal Mode`);
        } else {
          key.classList.remove("disabled");
          key.removeAttribute("disabled");
          key.removeAttribute("title");
        }
      });
    }
    case "hex": {
      return Object.values(pads.numKeys).forEach((key, i) => {
        if (i > 15) {
          key.classList.add("disabled");
          key.setAttribute("disabled", true);
          key.setAttribute("title", `You are in Hexadecimal Mode`);
        } else {
          key.classList.remove("disabled");
          key.removeAttribute("disabled");
          key.removeAttribute("title");
        }
      });
    }
  }
};

const handleSlectCoinversion = (mode) => {
  const { conversionType } = store.getState();
  let { options, initialOptions } = genCOS(mode);
  modeSelector.conversion.innerHTML = "";
  modeSelector.conversion.appendChild(options);
  modeSelector.conversion.value = conversionType
    ? conversionType
    : initialOptions;
};

const handleMissingOperand = (input) => {
  if (typeof input === "undefined") {
    store.dispatch(ACTIONS.DISPLAY_MESSAGE("Invalid Operation"));
    handleRefresh(1200);
  }
};

const dispalyInput = (input) => {
  common.display.innerHTML = input?.toUpperCase();
};

const displayConversion = (result) => {
  common.conversionResult.innerHTML = result?.toUpperCase();
};

const handleDisabledORKeys = (mode) => {
  if (mode === "conversion") {
    Object.values(pads.opeRators).forEach((keys) => {
      keys.setAttribute("disabled", true);
      keys.setAttribute("title", "Not Allowed!");
      keys.classList.add("disabled");
    });
  } else {
    Object.values(pads.opeRators).forEach((keys) => {
      keys.removeAttribute("disabled");
      keys.removeAttribute("title");
      keys.classList.remove("disabled");
    });
  }
};

// update State change
const useState = () => {
  const { mode, input, modeType, conversionType, conversionResult } =
    store.getState();
  modeSwitcher(mode);
  dispalyInput(input);
  handleAllowdKeys(modeType, conversionType);
  handleSlectCoinversion(modeType);
  handleMissingOperand(input);
  displayConversion(conversionResult);
  handleDisabledORKeys(mode);
};

useState();
store.subscribe(useState);

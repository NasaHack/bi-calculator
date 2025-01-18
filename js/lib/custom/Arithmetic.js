import Conversion from "./Conversion.js";

class Arithmetic extends Conversion {
  constructor(base) {
    super();
    if (!Object.values(this.base).includes(base)) {
      throw Error("Base Must be 2, 8, 10, or 16");
    }
    this.currentBase = base;
  }

  base = {
    bin: 2,
    oct: 8,
    dec: 10,
    hex: 16,
  };

  isCrossBase = (numbers, operationType) => {
    numbers.forEach((number, i) => {
      number
        .toString()
        .split("")
        .forEach((digit) => {
          if (Number(digit) >= this.currentBase) {
            let err = `Invalid Digit for ${operationType} at arguments-${i}: ${numbers[i]}`;
            throw Error(err);
          }
        });
    });
  };

  parseToDecimal = (number, base) => {
    switch (base) {
      case this.base.bin: {
        return Number(this.BinaryToDecimal(number));
      }
      case this.base.oct: {
        return Number(this.OctalToDecimal(number));
      }
      case this.base.dec: {
        return Number(number);
      }
      case this.base.hex: {
        return Number(this.hexadecimalToDecimal(number));
      }
    }
  };

  addition(addend) {
    // Check if any digit of a numbers that cross the tergeted base
    this.isCrossBase(addend, "addition");

    // perform addition
    let sum = addend.reduce(
      (prev, acc) =>
        this.parseToDecimal(prev, this.currentBase) +
        this.parseToDecimal(acc, this.currentBase)
    );
    return sum.toString(this.currentBase);
  }

  subtraction(sequentialSubtractor) {
    // Check if any digit of a numbers that cross the tergeted base
    this.isCrossBase(sequentialSubtractor, "Subtraction");

    // perform subtraction
    let subtract = sequentialSubtractor.reduce(
      (prev, acc) =>
        this.parseToDecimal(prev, this.currentBase) -
        this.parseToDecimal(acc, this.currentBase)
    );
    return subtract.toString(this.currentBase);
  }

  multiply(factor) {
    // Check if any digit of a numbers that cross the tergeted base
    this.isCrossBase(factor, "Multiplication");

    // perform multiply
    let product = factor.reduce(
      (prev, acc) =>
        this.parseToDecimal(prev, this.currentBase) *
        this.parseToDecimal(acc, this.currentBase)
    );
    return product.toString(this.currentBase);
  }

  division(sequentialDivisor) {
    // Check if any digit of a numbers that cross the tergeted base
    this.isCrossBase(sequentialDivisor, "Division");

    // perform division
    const quotient = sequentialDivisor.reduce(
      (prev, acc) =>
        this.parseToDecimal(prev, this.currentBase) /
        this.parseToDecimal(acc, this.currentBase)
    );

    return quotient.toString(this.currentBase);
  }

  remainder(sequentialRemainder) {
    // Check if any digit of a numbers that cross the tergeted base
    this.isCrossBase(sequentialRemainder, "Remainder");

    // perform division
    const quotient = sequentialRemainder.reduce(
      (prev, acc) =>
        this.parseToDecimal(prev, this.currentBase) %
        this.parseToDecimal(acc, this.currentBase)
    );

    return quotient.toString(this.currentBase);
  }

  // Perform calculation with eval function if all the operators are not same
  genericCalculation(expression) {
    let validateMDoperator = expression.replace("×", "*").replace("÷", "/");

    const regex =
      /(?<![0-9a-fA-Fx])\b([0-9]+(?:\.[0-9]+)?|[a-zA-Z][a-zA-Z0-9]*)\b/g;

    try {
      if (this.currentBase <= this.base.dec) {
        return eval(validateMDoperator).toString(this.currentBase);
      } else {
        return eval(validateMDoperator.replace(regex, "0x$1")).toString(
          this.currentBase
        );
      }
    } catch (error) {
      return "NaN";
    }
  }
}

export default Arithmetic;

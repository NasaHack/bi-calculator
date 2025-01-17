class Arithmetic {
  constructor(base) {
    if (
      ![this.base.bin, this.base.oct, this.base.dec, this.base.hex].includes(
        base
      )
    ) {
      throw Error("Base Must be 2, 8, 10, or 16");
    }
    this.base = base;
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
          if (Number(digit) >= this.base) {
            let err = `Invalid Digit for ${operationType} at arguments-${i}: ${numbers[i]}`;
            throw Error(err);
          }
        });
    });
  };

  parseToDecimal = (number, base) => {
    if (this.base <= this.base.dec) {
      return parseFloat(number, base);
    } else {
      return Number(eval("0x" + number));
    }
  };

  addition(addend) {
    // Check if any digit of a numbers that cross the tergeted base
    this.isCrossBase(addend, "addition");

    // perform addition
    let sum = addend.reduce(
      (prev, acc) =>
        this.parseToDecimal(prev, this.base) +
        this.parseToDecimal(acc, this.base)
    );
    return sum.toString(this.base);
  }

  subtraction(sequentialSubtractor) {
    // Check if any digit of a numbers that cross the tergeted base
    this.isCrossBase(sequentialSubtractor, "Subtraction");

    // perform subtraction
    let subtract = sequentialSubtractor.reduce(
      (prev, acc) =>
        this.parseToDecimal(prev, this.base) -
        this.parseToDecimal(acc, this.base)
    );
    return subtract.toString(this.base);
  }

  multiply(factor) {
    // Check if any digit of a numbers that cross the tergeted base
    this.isCrossBase(factor, "Multiplication");

    // perform multiply
    let product = factor.reduce(
      (prev, acc) =>
        this.parseToDecimal(prev, this.base) *
        this.parseToDecimal(acc, this.base)
    );
    return product.toString(this.base);
  }

  division(sequentialDivisor) {
    // Check if any digit of a numbers that cross the tergeted base
    this.isCrossBase(sequentialDivisor, "Division");

    // perform division
    const quotient = sequentialDivisor.reduce(
      (prev, acc) =>
        this.parseToDecimal(prev, this.base) /
        this.parseToDecimal(acc, this.base)
    );

    return quotient.toString(this.base);
  }

  remainder(sequentialRemainder) {
    // Check if any digit of a numbers that cross the tergeted base
    this.isCrossBase(sequentialRemainder, "Remainder");

    // perform division
    const quotient = sequentialRemainder.reduce(
      (prev, acc) =>
        this.parseToDecimal(prev, this.base) %
        this.parseToDecimal(acc, this.base)
    );

    return quotient.toString(this.base);
  }

  // Perform calculation with eval function if all the operators are not same
  genericCalculation(expression) {
    let validateMDoperator = expression.replace("×", "*").replace("÷", "/");

    const regex =
      /(?<![0-9a-fA-Fx])\b([0-9]+(?:\.[0-9]+)?|[a-zA-Z][a-zA-Z0-9]*)\b/g;

    try {
      if (this.base <= this.base.dec) {
        return eval(validateMDoperator).toString(this.base);
      } else {
        return eval(validateMDoperator.replace(regex, "0x$1")).toString(
          this.base
        );
      }
    } catch (error) {
      return "NaN";
    }
  }
}

export default Arithmetic;

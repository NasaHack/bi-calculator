class Arithmetic {
  constructor(base) {
    if (!["2", "8", "10", "16"].includes(base.toString())) {
      throw Error("Base Must be 2, 8, 10, or 16");
    }
    this.base = base;
  }

  isCrossBase = (numbers) => {
    numbers.forEach((number, i) => {
      number
        .toString()
        .split("")
        .forEach((digit) => {
          if (Number(digit) >= this.base) {
            let err = `Invalid Digit for Binary Multiplication at arguments-${i}: ${numbers[i]}`;
            throw Error(err);
          }
        });
    });
  };

  parseToDecimal = (number, base) => {
    if (this.base <= 10) {
      return parseFloat(number, base);
    } else {
      if (number.toString().includes(".")) {
        let [int, frac] = number.toString().split(".");

        int = parseInt(int, base);
        frac = parseInt(frac, base);

        return Number(int + "." + frac);
      } else {
        return parseInt(number, base);
      }
    }
  };

  addition(addend) {
    // Check if any digit of a numbers that cross the tergeted base
    this.isCrossBase(addend);

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
    this.isCrossBase(sequentialSubtractor);

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
    this.isCrossBase(factor);

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
    this.isCrossBase(sequentialDivisor);

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
    this.isCrossBase(sequentialRemainder);

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
      if (this.base <= 10) {
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

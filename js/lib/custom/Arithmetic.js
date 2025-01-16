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

  addition(...addend) {
    // Check if any digit of a numbers that cross the binary base of 2
    this.isCrossBase(addend);

    // perform addition
    let sum = addend.reduce(
      (prev, acc) => parseInt(prev, this.base) + parseInt(acc, this.base)
    );
    return sum.toString(this.base);
  }

  subtraction(minuend, subtrahend) {
    // Check if any digit of a numbers that cross the binary base of 2
    this.isCrossBase([minuend, subtrahend]);

    // perform subtraction
    let subtract =
      parseInt(minuend, this.base) - parseInt(subtrahend, this.base);
    return subtract.toString(this.base);
  }

  multiply(...factor) {
    // Check if any digit of a numbers that cross the binary base of 2
    this.isCrossBase(factor);

    // perform multiply
    let product = factor.reduce(
      (prev, acc) => parseInt(prev, this.base) * parseInt(acc, this.base)
    );
    return product.toString(this.base);
  }

  division(dividend, divisor) {
    // Check if any digit of a numbers that cross the binary base of 2
    this.isCrossBase([dividend, divisor]);

    // perform division
    const quotient =
      parseInt(dividend, this.base) / parseInt(divisor, this.base);

    return quotient.toString(this.base);
  }

  remainder(dividend, divisor) {
    // Check if any digit of a numbers that cross the binary base of 2
    this.isCrossBase([dividend, divisor]);

    // perform division
    const quotient =
      parseInt(dividend, this.base) % parseInt(divisor, this.base);

    return quotient.toString(this.base);
  }
}

export default Arithmetic;

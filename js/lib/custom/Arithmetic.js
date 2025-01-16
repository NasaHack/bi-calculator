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

  addition(addend) {
    console.log(addend);
    // Check if any digit of a numbers that cross the tergeted base
    this.isCrossBase(addend);

    // perform addition
    let sum = addend.reduce(
      (prev, acc) => parseInt(prev, this.base) + parseInt(acc, this.base)
    );
    return sum.toString(this.base);
  }

  subtraction(sequentialSubtractor) {
    // Check if any digit of a numbers that cross the tergeted base
    this.isCrossBase(sequentialSubtractor);

    // perform subtraction
    let subtract = sequentialSubtractor.reduce(
      (prev, acc) => parseInt(prev, this.base) - parseInt(acc, this.base)
    );
    return subtract.toString(this.base);
  }

  multiply(factor) {
    // Check if any digit of a numbers that cross the tergeted base
    this.isCrossBase(factor);

    // perform multiply
    let product = factor.reduce(
      (prev, acc) => parseInt(prev, this.base) * parseInt(acc, this.base)
    );
    return product.toString(this.base);
  }

  division(sequentialDivisor) {
    // Check if any digit of a numbers that cross the tergeted base
    this.isCrossBase(sequentialDivisor);

    // perform division
    const quotient = sequentialDivisor.reduce(
      (prev, acc) => parseInt(prev, this.base) / parseInt(acc, this.base)
    );

    return quotient.toString(this.base);
  }

  remainder(sequentialRemainder) {
    // Check if any digit of a numbers that cross the tergeted base
    this.isCrossBase(sequentialRemainder);

    // perform division
    const quotient = sequentialRemainder.reduce(
      (prev, acc) => parseInt(prev, this.base) % parseInt(acc, this.base)
    );

    return quotient.toString(this.base);
  }
}

export default Arithmetic;

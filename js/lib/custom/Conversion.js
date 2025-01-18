// Math implementation for Number Conversion between Binary, Octal, Decimal & Hexadecimal

class Conversion {
  base = {
    bin: 2,
    oct: 8,
    dec: 10,
    hex: 16,
  };
  digits = "0123456789ABCDEF";

  isCrossBase(numbers, base) {
    numbers.forEach((number, i) => {
      number
        .toString()
        .split("")
        .forEach((digit) => {
          if (Number(digit) >= base) {
            let err = `Invalid Digit for base-${base} Number System at arguments-${i}: ${numbers[i]}`;
            throw Error(err);
          }
        });
    });
  }

  getRemainders(dividend, divisor) {
    let remainders = [];
    let quotient = dividend;

    while (quotient > 0) {
      remainders.push(quotient % divisor);
      quotient = Math.floor(quotient / divisor);
    }
    return remainders;
  }

  getFracMultiply(fraction, base) {
    let frac = [];
    let multiplicand = fraction;

    while (multiplicand % 1 !== 0) {
      frac.push(Math.trunc((multiplicand % 1) * base));
      multiplicand = (multiplicand % 1) * base;
    }
    return frac;
  }

  convertToBase(decimal, base) {
    let [int, frac] = decimal.toString().split(".");
    let result = "";

    if (int) {
      let intPart = "";
      while (int > 0) {
        let placeNumber = this.digits[int % base];
        intPart = placeNumber + intPart;
        int = Math.floor(int / base);
      }
      result = intPart;
    }

    if (frac) {
      let fracPart = "";
      frac = `0.${frac}`;
      while (frac % 1 !== 0) {
        frac = (frac % 1) * base;
        fracPart = this.digits[Math.trunc(frac % base)] + fracPart;
      }
      result += "." + fracPart.split("").reverse().join("");
    }

    return result || "0";
  }

  // Converesion Binary, Octal, Hexadecimal -> Decimal
  /*..................................................*/
  // Binary to Decimal
  // Formula :  (...XYZ.ABC)Bₐₛₑ = MSB... + (X × Bₐₛₑ²) + (Y × Bₐₛₑ¹) + (Z × Bₐₛₑ⁰) + (A × Bₐₛₑ⁻¹) + (B × Bₐₛₑ⁻²) + (C × Bₐₛₑ⁻³) + ...LSB
  BinaryToDecimal(binary) {
    this.isCrossBase([binary], this.base.bin);

    const [int, frac] = binary.toString().split(".");

    let intDec = 0,
      fracDec = 0,
      decimal = null;

    if (int) {
      let intPart = int.split("").reverse(); // reverse intPart for calculating LSB to MSB
      for (let i = 0; i <= intPart.length - 1; i++) {
        intDec += Number(intPart[i]) * Math.pow(this.base.bin, i);
      }
      decimal += intDec;
    }

    if (frac) {
      let fracPart = frac.split("");
      for (let i = 0; i <= fracPart.length - 1; i++) {
        fracDec += Number(fracPart[i]) * Math.pow(this.base.bin, -i - 1);
      }
      decimal += fracDec;
    }

    return decimal.toString();
  }

  // Binary to Octal
  /*Steps:  Binary -> Decimal -> Octal*/
  BinaryToOctal(binary) {
    this.isCrossBase([binary], this.base.oct);

    // Convert Input Binary to Decimal
    let decimal = this.BinaryToDecimal(binary);

    // Now, Convert previous converted decimal to Octal
    return this.convertToBase(decimal, this.base.oct);
  }

  // Binary to Hexadecimal
  /*Steps:  Binary -> Decimal -> Hexadecimal*/
  BinaryToHexadecimal(binary) {
    this.isCrossBase([binary], this.base.hex);
    // Convert Input Binary to Decimal
    let decimal = this.BinaryToDecimal(binary);

    // Now, Convert previous converted decimal to Hexadecimal
    return this.convertToBase(decimal, this.base.hex);
  }

  // Octal to Decimal
  OctalToDecimal(octal) {
    this.isCrossBase([octal], this.base.oct);

    const [int, frac] = octal.toString().split(".");

    let intDec = 0,
      fracDec = 0,
      decimal = null;

    if (int) {
      let intPart = int.split("").reverse(); // reverse intPart for calculating LSB to MSB
      for (let i = 0; i <= intPart.length - 1; i++) {
        intDec += Number(intPart[i]) * Math.pow(this.base.oct, i);
      }
      decimal += intDec;
    }

    if (frac) {
      let fracPart = frac.split("");
      for (let i = 0; i <= fracPart.length - 1; i++) {
        fracDec += Number(fracPart[i]) * Math.pow(this.base.oct, -i - 1);
      }
      decimal += fracDec;
    }

    return decimal.toString();
  }

  // Octal To Binary
  /*Steps:  Octal -> Decimal -> Binary*/
  OctalToBinary(octal) {
    this.isCrossBase([octal], this.base.oct);

    // Convert Octal to Decimal
    const decimal = this.OctalToDecimal(octal);

    // Now Coinvert this converted decimal to Binary
    return this.convertToBase(decimal, this.base.bin);
  }

  // Octal to Hexadecimal
  OctalToHexadecimal(octal) {
    this.isCrossBase([octal], this.base.oct);

    // Convert Octal to Decimal
    const decimal = this.OctalToDecimal(octal);

    // Now Coinvert this converted decimal to Hexadecimal
    return this.convertToBase(decimal, this.base.hex);
  }

  // Hexadecimal to Decimal
  hexadecimalToDecimal(hexadecimal) {
    this.isCrossBase([hexadecimal], this.base.hex);

    const [int, frac] = hexadecimal.toString().split(".");

    let intDec = 0,
      fracDec = 0,
      decimal = null;

    if (int) {
      let intPart = int.split("").reverse(); // reverse intPart for calculating LSB to MSB
      for (let i = 0; i <= intPart.length - 1; i++) {
        intDec +=
          Number(this.digits.indexOf(intPart[i])) * Math.pow(this.base.hex, i);
      }
      decimal += intDec;
    }

    if (frac) {
      let fracPart = frac.split("");
      for (let i = 0; i <= fracPart.length - 1; i++) {
        fracDec +=
          Number(this.digits.indexOf(fracPart[i])) *
          Math.pow(this.base.hex, -i - 1);
      }
      decimal += fracDec;
    }

    return decimal.toString();
  }

  // Hexadecimal to Binary
  /*Steps:  Hexadecimal -> Decimal -> Binary*/
  hexadecimalToBinary(hexadecmal) {
    this.isCrossBase([hexadecmal], this.base.hex);

    // Convert Input hexadecimal to Decimal
    const decimal = this.hexadecimalToDecimal(hexadecmal);

    // Now Coinvert this converted decimal to Hexadecimal
    return this.convertToBase(decimal, this.base.bin);
  }

  // Hexadecimal to Octal
  /*Steps:  Hexadecimal -> Decimal -> Octal*/
  hexadecimalToOctal(hexadecimal) {
    this.isCrossBase([hexadecimal], this.base.hex);

    // Convert Input hexadecimal to Decimal
    const decimal = this.hexadecimalToDecimal(hexadecimal);

    // Now Coinvert this converted decimal to Octal
    return this.convertToBase(decimal, this.base.oct);
  }

  // Decimal to Binary
  decimalToBinary(decimal) {
    this.isCrossBase([decimal], this.base.dec);

    // Convert Input Decimal to Binary
    return this.convertToBase(decimal, this.base.bin);
  }

  // Decimal to Octal
  decimalToOctal(decimal) {
    this.isCrossBase([decimal], this.base.dec);

    // Convert Input Decimal to Binary
    return this.convertToBase(decimal, this.base.oct);
  }

  // Decimal to Hexadecimal
  decimalToHexadecimal(decimal) {
    this.isCrossBase([decimal], this.base.dec);

    // Convert Input Decimal to Hexadecimal
    return this.convertToBase(decimal, this.base.hex);
  }
}

export default Conversion;

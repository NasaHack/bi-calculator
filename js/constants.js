// Conversion Option Selections
const COS_MODE = {
    bin: {
      "bin-oct": "Binary to Octal",
      "bin-dec": "Binary to Decimal",
      "bin-hex": "Binary to Hexadecimal",
    },
    oct: {
      "oct-bin": "Octal to Binary",
      "oct-dec": "Octal to Decimal",
      "oct-hex": "Octal to Hexadecimal",
    },
    dec: {
      "dec-bin": "Decimal to Binary",
      "dec-oct": "Decimal to Octal",
      "dec-hex": "Decimal to Hexadecimal",
    },
    hex: {
      "hex-bin": "Hexadecimal to Binary",
      "hex-oct": "Hexadecimal to Octal",
      "hex-dec": "Hexadecimal to Decimal",
    },
  };
  
  const genCOS = (mode) => {
    let frag = document.createDocumentFragment();
  
    Object.entries(COS_MODE[mode]).forEach(([cos_type, cos_description]) => {
      let options = document.createElement("option");
      options.innerText = cos_description;
      options.value = cos_type;
  
      frag.appendChild(options);
    });
  
    return { options: frag, initialOptions: Object.keys(COS_MODE[mode])[0] };
  };
  
  export default genCOS;

  
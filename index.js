const Engine = require("./src/engine");
const {parseNumberString} = require("./src/utils");

class Converter {
  constructor(locale = "en-us") {
    try {
      this.locale = require(`./src/locales/${locale}`);
    } catch(error) {
      throw new Error("locale not found");
    }
  }

  toWords(number, settings = {}) {
    const numberParsed = parseNumberString(`${number}`);
    const engine = new Engine(this.locale);
    let result = engine.toWords(numberParsed.whole, {...this.locale, ...settings});

    if (numberParsed.fraction != "0") {
      result += ` ${this.locale.names.point} ` + [...numberParsed.fraction].map(digit => engine.toWords(digit, this.locale)).join(" ");
    }

    if (numberParsed.sign == '-') {
      result = this.locale.names.minus + " " + result;
    }

    return result;
  }
} 

module.exports = Converter;

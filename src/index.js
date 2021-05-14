import Engine from "./engine.js";
import {parseNumberString} from "./utils.js";
import defaultLocale from "./locales/en-us.js";
export {default as enUS} from "./locales/en-us.js";
export {default as bnBD} from "./locales/bn-bd.js";
export {default as hiIN} from "./locales/hi-in.js";

export class Converter {
  constructor(locale = defaultLocale) {
    this.locale = locale;
  }

  toWords(number, settings = {}) {
    const numberParsed = parseNumberString(`${number}`);
    const engine = new Engine(this.locale);
    let result = engine.toWords(numberParsed.whole, {...this.locale, ...settings});

    if (numberParsed.fraction != "0") {
      result += ` ${this.locale.names.point} ` + [...numberParsed.fraction].map(digit => engine.toWords(digit, {...this.locale, ...settings})).join(" ");
    }

    if (numberParsed.sign == '-') {
      result = this.locale.names.minus + " " + result;
    }

    return result;
  }
} 

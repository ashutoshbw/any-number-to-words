# Any number to words
Converts any(string is it's limit) decimal number to words in several locales.

See **[Live Demo](https://any-number-to-words.netlify.app/)**

## Installation
```
npm i any-number-to-words
```

## API
### Initialization
ES6 module format:
```javascript
import {Converter} from "any-number-to-words";
const converter = new Converter();
```

CommonJS module format:
```javascript
const {Converter} = require("any-number-to-words");
const converter = new Converter();
```

The default locale is `enUS`(English). To convert in to other locales(eg. `bnBD`) you also need to import or require the locales:
```javascript
// bnBD is for Bengali
import {Converter, bnBD} from "any-number-to-words";
const converter = new Converter(bnBD);
```

Or

```
const {Converter, bnBD} = require("any-number-to-words");
const converter = new Converter(bnBD);
```

### Meat of the matter
Syntax:
```
converter.toWords(number|string, [options]);
``` 
* 1st parameter(`number|string`): It can be a JavaScript number or a string. If it is a string it should follow the same syntax as JavaScript decimal number.
* 2nd parameter(`[options|locale]`, *optional*): It is used to provide optional settings like comma separator: `{comma: true}`. However it can be used to override the whole locale. Or it can given some locale too to use that local temporarily.


Examples:
```javascript
// --- assuming the locale is enUS ---

converter.toWords(1729);                // → one thousand seven hundred twenty-nine 

// turn on commas
converter.toWords(1729, {comma: true}); // → one thousand, seven hundred twenty-nine

// string as input
converter.toWords('1729');              // → one thousand, seven hundred twenty-nine

// You can also use exponent notation
converter.toWords('1729e100');          // → seventeen tretrigintillion twenty-nine googol
```

That's basically it. Have fun!

### Currently supported locales
* `enUS` for English.
* `bnBD` for Bengali.
* `hiIN` for Hindi.

## Contributions, Comments and Bugs
Contributions, comments and/or bug reports are very much appreciated. Open a pull request or add comments on the [issues page](https://github.com/ashutoshbw314/any-number-to-words/issues). Thanks!

## License
MIT

## Acknowledgements
* The regular expression for parsing number is inspired from [Eloquent JavaScript](https://eloquentjavascript.net/code/#9.3) book.

## Change Log
#### Version 2.0.1
* Added documentation.
* Fixed the bug of not translating fractional part of non en-us locales.

#### Version 2.0.0
* Made the package hybrid to support both ES6 modules syntax and CommonJS syntax.
* Made changes to API. Set `Converter` as named export.
* Added locales: `bnBD` and `hiIN`.

#### Version 1.0.0
* Initial release.


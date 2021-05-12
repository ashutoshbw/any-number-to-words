class Engine {
  constructor(settings) {
    this.settings = settings;
  }
  
  toWords(numStr, settings = this.settings) {
    const {names, comma} = settings;
    const rangesInfo = [{name: "firstTwoDigits", range: 2},
              {name: names.hundred, range: 1},
              {name: names.thousand, range: (names.rest.length ? names.rest[0].power - 3 : 0)}].
              concat(names.rest.map((e, i) => {
                return {name: e.name, range: (i == names.rest.length - 1 ? 0 : names.rest[i + 1].power - e.power)};
              }));

    const makeRange = (name, value, inner = null) => { return {name, value, inner} };

    function breakInTwo(n, distFromEnd) {
      return [n.slice(0, (distFromEnd < n.length ? n.length - distFromEnd : 0)), n.slice(-distFromEnd)];
    }

    function parseNum(n) {
      let result = [];
      for (let i = 0; i < rangesInfo.length; i++) {
        if (n == "") break;
        let [left, right] = breakInTwo(n, rangesInfo[i].range);
        n = left;
        right = right.replace(/^0*/, "");
        if (right == "") continue;
        let range = makeRange(rangesInfo[i].name, right);
        if (right.length > 2) range.inner = parseNum(right);
        result.unshift(range);
      }
      if (!result.length) result.push(makeRange("firstTwoDigits", "0"));
      return result;
    }

    function readRanges(ranges) {
      function readRange(range) {
        function indexOfName(name) {
          for (let i = 0; i < rangesInfo.length; i++) {
            if (rangesInfo[i].name == name) return i;
          }
          return -1;
        }

        if (range.inner == null) {
          let name = range.name;
          let value = range.value;
          name = (name == "firstTwoDigits" ? "" : " " + name);
          return names.zeroTo99[value] + name + (indexOfName(range.name) > 1 && comma ? "," : ""); 
        } else {
          let result = [];
          let innerRanges = range.inner;
          for (let i = 0; i < innerRanges.length; i++) {
            result.push(readRange(innerRanges[i]));
          }
          return result.join(" ") + " " + range.name + (comma ? "," : "");
        }
      }

      let result = [];
      for (let i = 0; i < ranges.length; i++) {
        result.push(readRange(ranges[i]));
      }
      return result.join(" ").replace(/,?$/, "");  // replaces the ending , in some numbers, eg. 10000
    }
    return readRanges(parseNum(numStr));
  }
}

module.exports = Engine;

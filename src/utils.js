function parseNumberString(str) {
  const numberPattern = /^(?<sign>[+\-])?(?<number>\d+(\.\d*)?|\.\d+)([eE](?<exponent>[+\-]?\d+))?$/;
  const match = str.match(numberPattern);
  if (match == null) throw new Error("Invalid number");
  const {sign, number, exponent} = match.groups;
  let [whole, fraction] = number.split(".");
  if (fraction) {
    fraction = fraction.replace(/0+$/, "");
  }

  const joinedNum = whole + (fraction || "");
  const fractionLen = fraction ? fraction.length : 0;
  const pointPos = fractionLen - (+(exponent || 0));
  const result = {
    sign: sign || "+",
    whole: "0",
    fraction: "0",
  };

  if (pointPos < 0) {
    result.whole = joinedNum + "0".repeat(-pointPos)
  } else if (pointPos == 0) {
    result.whole = joinedNum;
  } else {
    if (pointPos == joinedNum.length) {
      result.fraction = joinedNum;
    } else if (pointPos < joinedNum.length) {
      result.fraction = joinedNum.slice(-pointPos)
      result.whole = joinedNum.slice(0, joinedNum.length - pointPos);
    } else {
      result.fraction = "0".repeat(pointPos - joinedNum.length) + joinedNum;
    }
  }

  return result;
}

exports.parseNumberString = parseNumberString;

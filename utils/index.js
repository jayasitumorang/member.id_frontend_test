function parseCalculationString(s) {
  // Parse a calculation string into an array of numbers and operators
  let calculation = [],
    current = "";
  for (let i = 0, ch; (ch = s.charAt(i)); i++) {
    if ("*%/+-".indexOf(ch) > -1) {
      if (current === "" && ch === "-") {
        current = "-";
      } else {
        calculation.push(parseFloat(current), ch);
        current = "";
      }
    } else {
      current += s.charAt(i);
    }
  }
  if (current !== "") {
    if (current === "0.") {
      calculation.push("0.");
    } else {
      calculation.push(parseFloat(current));
    }
  }
  return calculation;
}

export const calculation = (calcArray, currentResult) => {
  if (isNaN(calcArray[calcArray.length - 1])) {
    return currentResult;
  }
  let calcString = calcArray.join("");
  // Example [4,5,'+',2,'/',6] -> '45+2/6' -> ['45','+','2','/','6']
  let calc = parseCalculationString(calcString);
  // let calc = calcString.split(/(\+|-|\*|\/)/g);
  let ops = [
      { "%": (a, b) => (a / 100) * b },
      { "/": (a, b) => a / b },
      { "*": (a, b) => a * b },
      { "+": (a, b) => a + b },
      { "-": (a, b) => a - b }
    ],
    newCalc = [],
    currentOp;
  for (let i = 0; i < ops.length; i++) {
    for (let j = 0; j < calc.length; j++) {
      if (ops[i][calc[j]]) {
        currentOp = ops[i][calc[j]];
      } else if (currentOp) {
        newCalc[newCalc.length - 1] = currentOp(
          newCalc[newCalc.length - 1],
          calc[j]
        );
        currentOp = null;
      } else {
        newCalc.push(calc[j]);
      }
    }
    calc = newCalc;
    newCalc = [];
  }

  if (calc.length > 1) {
    console.log("Error: unable to resolve calculation");
    return calc;
  } else {
    return calc[0];
  }
};

export const addValueToCalculation = (value, currentState) => {
  currentState = [...currentState];

  let operatorValues = ["%", "*", "/", "+", "-"];

  // handle dot key
  if (value === ".") {
    if (!currentState.length) {
      return [...currentState, "0."];
    } else {
      let lastDotIndex = currentState.lastIndexOf(".");
      if (lastDotIndex === -1) {
        lastDotIndex = currentState.lastIndexOf("0.");
      }
      if (lastDotIndex !== -1) {
        for (let li = lastDotIndex; li < currentState.length; li++) {
          if (operatorValues.includes(currentState[li])) {
            return [...currentState, value];
          }
        }
      } else {
        return [...currentState, value];
      }
      return currentState;
    }
  }

  if (["±", "="].includes(value)) {
    if (calculation(currentState)) {
      if (value === "±") {
        return [calculation(currentState) * -1];
      }
      return [calculation(currentState)];
    }
  }
  if (typeof value !== "number" && !operatorValues.includes(value)) {
    return currentState;
  }

  if (operatorValues.includes(value) && !currentState.length) {
    return currentState;
  }

  let lastVal = currentState[currentState.length - 1];

  let lastValIsOperator = operatorValues.includes(lastVal);

  let currentValIsOperator = operatorValues.includes(value);

  if (currentValIsOperator && lastVal === ".") {
    currentState[currentState.length - 1] = value;
    return currentState;
  }
  if (lastValIsOperator && currentValIsOperator) {
    currentState[currentState.length - 1] = value;
    return currentState;
  }

  return [...currentState, value];
};

import { calculation, addValueToCalculation } from "../../utils";
import ActionTypes from "../constants";
const { UPDATE_CALCULATION_AND_RESULT, CLEAR_ALL } = ActionTypes;

export const updateCalculation = (inputValue, currentState, currentResult) => {
  let updateCalculationArray = addValueToCalculation(inputValue, currentState);
  let calculationResult = calculation(updateCalculationArray, currentResult);

  return {
    type: UPDATE_CALCULATION_AND_RESULT,
    payload: {
      calculation: updateCalculationArray,
      result: calculationResult
    }
  };
};

export const clearCalculation = () => {
  return {
    type: CLEAR_ALL,
    payload: {
      calculation: [],
      result: 0
    }
  };
};

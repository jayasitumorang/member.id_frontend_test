import ActionTypes from "../constants";
const { UPDATE_CALCULATION_AND_RESULT, CLEAR_ALL } = ActionTypes;
const initialState = {
  calculation: [],
  result: 0
};

const calculatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CALCULATION_AND_RESULT:
      return {
        calculation: action.payload.calculation,
        result: action.payload.result
      };
    case CLEAR_ALL:
      return {
        calculation: [],
        result: 0
      };
    default:
      return state;
  }
};

export default calculatorReducer;

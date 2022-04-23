import React from "react";
import { connect } from "react-redux";
import { updateCalculation } from "../redux/actions";

const Button = props => {
  const {
    additionalClassWrapper = "",
    additionalClass = "",
    onClick,
    dispatch,
    value,
    calculation,
    result,
    htmlCode
  } = props;
  return (
    <div className={`Button ${additionalClassWrapper}`}>
      <button
        className={`calc-input ${additionalClass}`}
        onClick={
          onClick
            ? onClick
            : () => dispatch(updateCalculation(value, calculation, result))
        }
      >
        {htmlCode ? String.fromCharCode(htmlCode) : value}
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  calculation: state.calculation,
  result: state.result
});

export default connect(mapStateToProps)(Button);

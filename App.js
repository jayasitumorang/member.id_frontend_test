import React from "react";
import { connect } from "react-redux";
import { clearCalculation } from "./redux/actions";
import Button from "./components/Button";
import Display from "./components/Display";


const CalculatorComponent = props => {
  const { dispatch } = props;
  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 0.1
        }}
    />
  );
  return (
    
    <div className="calculator">
      <Display />
      <ColoredLine color="#666666" />
      <div className="calculator_wrapper">
      <Button
          value={"CLEAR"} onClick={() => dispatch(clearCalculation())}
          additionalClassWrapper="equal"
          additionalClass="equal"
        />
        
        <Button value="*" htmlCode="215" additionalClass="operator" />
        
        <Button value={1} />
        <Button value={2} />
        <Button value={3} />
        <Button value="+" htmlCode="43" additionalClass="operator" />

        <Button value={4} />
        <Button value={5} />
        <Button value={6} />
        <Button value="-" htmlCode="8722" additionalClass="operator" />

        <Button value={7} />
        <Button value={8} />
        <Button value={9} />
        <Button value={"%"} additionalClass="operator" />
        
        <Button value={"±"} additionalClass="operator"/>
        <Button value={0} />
        <Button value={"."} additionalClass="operator"/>
        <Button
          value={"="} additionalClass="operator"
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  calculation: state.calculation,
  result: state.result
});

export default connect(mapStateToProps)(CalculatorComponent);

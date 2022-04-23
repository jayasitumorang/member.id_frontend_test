import React, { Component } from "react";
import { connect } from "react-redux";

class Display extends Component {
  componentDidMount() {
    this._forceScrollOnDisplay();
  }

  componentDidUpdate() {
    this._forceScrollOnDisplay();
  }

  _replaceChars(value) {
    value = value.join("");
    // eslint-disable-next-line no-useless-escape
    value = value.split(/(\+|-|\*|\%|\/)/g).map(data => {
      if (data.length > 8) {
        return parseFloat(data).toPrecision(2);
      }
      return data;
    });
    value = value.join("");
    value = value.replace(/\//g, '<span class="operatorStyle">÷</span>');
    value = value.replace(/\*/g, '<span class="operatorStyle">×</span>');
    // eslint-disable-next-line no-useless-escape
    value = value.replace(/\%/g, '<span class="operatorStyle">%</span>');
    value = value.replace(/\+/g, '<span class="operatorStyle">+</span>');
    value = value.replace(/-/g, '<span class="operatorStyle">-</span>');
    return value;
  }

  _forceScrollOnDisplay() {
    this.refs.calculationDisplay.scrollLeft = 10000;
    this.refs.resultDisplay.scrollLeft = 10000;
  }

  formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  
  render() {
    
    const { result, calculation } = this.props;
    return (
      <div className="calculator-results">
        <div
          ref="calculationDisplay"
          className="calculationDisplay"
          dangerouslySetInnerHTML={{
            __html: calculation.length ? this._replaceChars(calculation) : 0
          }}
        />
        
        
        <div ref="resultDisplay" className="resultDisplay">
        <div id="texts" style={{ padding: "1em 5.2em", justifyContent:"left",display: "inline", whiteSpace: "nowrap" }}>
        <strong> = </strong>
       </div>
          {result.toString().length > 10
            ? result.toPrecision(4)
            : this.formatNumber(result)}
        </div>
      </div>
      
    );
  }
}

const mapStateToProps = state => ({
  calculation: state.calculation,
  result: state.result
});

export default connect(mapStateToProps)(Display);

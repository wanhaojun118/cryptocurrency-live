import React, { Component } from "react";
import "../styles/price.css";

class Price extends Component {
  render() {
    return (
      <div>
        <h5 className="crypto-price">{this.props.price}</h5>
      </div>
    );
  }
}

export default Price;

import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";

class Currencies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectCurrency: this.props.selectCurrency
    };
  }
  render() {
    return (
      <Dropdown onSelect={evtKey => this.props.onChangeCurrency(evtKey)}>
        <Dropdown.Toggle
          variant="secondary"
          id={"dropdown-basic-" + this.props.coin}
        >
          <span>{this.props.selectCurrency}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ minWidth: "fit-content" }}>
          {this.props.currencies.map((currency, index) => (
            <Dropdown.Item
              key={"currency-" + index}
              id={"currency-" + index}
              eventKey={currency}
            >
              {currency}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default Currencies;

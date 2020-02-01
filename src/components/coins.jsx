import React, { Component } from "react";
import Coin from "./coin";
import { Container, Row, Card } from "react-bootstrap";
import "../styles/coins.css";

class Coins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: ["BTC", "ETH", "DASH"],
      currencies: ["USD", "SGD", "MYR", "HKD"]
    };
  }

  selectBackgroundColor = coin => {
    if (coin === "BTC") return "rgba(255, 153, 0, 0.3)";
    else if (coin === "ETH") return "rgba(60, 60, 61, 0.3)";
    else return "rgba(51, 152, 204, 0.3)";
  };

  render() {
    return (
      <Container>
        <Row>
          {this.state.coins.map((coin, index) => (
            <Card
              key={index}
              style={{ background: this.selectBackgroundColor(coin) }}
            >
              <Coin coin={coin} currencies={this.state.currencies} />
            </Card>
          ))}
        </Row>
      </Container>
    );
  }
}

export default Coins;

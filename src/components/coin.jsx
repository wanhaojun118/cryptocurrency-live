import React, { Component } from "react";
import Price from "./price";
import Currencies from "./currencies";
import bitcoin_logo from "../images/icons/BTC.png";
import ethereum_logo from "../images/icons/ETH.png";
import dash_logo from "../images/icons/DASH.png";
import "../styles/coin.css";

class Coin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0.0,
      apiEndPoint: {
        url: "https://api.nomics.com/v1/",
        tickerPath: "currencies/ticker?",
        apiKey: "key=d8c58ad78c3ac68338f91185065bfb46&",
        coinId: "ids=" + this.props.coin + "&",
        interval: "interval=1h&",
        currency: "convert=USD"
      },
      selectCurrency: this.props.currencies[0]
    };
  }

  componentDidMount() {
    const {
      url,
      tickerPath,
      apiKey,
      coinId,
      interval,
      currency
    } = this.state.apiEndPoint;
    const apiEndPoint =
      url + tickerPath + apiKey + coinId + interval + currency;

    this.fetchPrice(apiEndPoint, "ComponentDidMount once.");

    this.apiRequest = setInterval(() => {
      this.fetchPrice(apiEndPoint, "ComponentDidMount interval.");
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.apiRequest);
  }

  fetchPrice = (apiEndPoint, source) => {
    // console.log(`Called from ${source}.`);
    fetch(apiEndPoint)
      .then(res => res.json())
      .then(data => {
        let { price } = data[0];
        this.setState({
          price: parseFloat(price).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        });
      });
  };

  currencyChange = evtKey => {
    clearInterval(this.apiRequest);
    const {
      url,
      tickerPath,
      apiKey,
      coinId,
      interval
    } = this.state.apiEndPoint;
    const currency = "convert=" + evtKey;
    const newApiEndPoint =
      url + tickerPath + apiKey + coinId + interval + currency;

    this.fetchPrice(newApiEndPoint, "Currency update once.");

    this.apiRequest = setInterval(() => {
      this.fetchPrice(newApiEndPoint, "Currency update interval.");
    }, 60000);

    this.setState({
      selectCurrency: evtKey
    });
  };

  selectCoinIcon = coin => {
    if (coin === "BTC") return bitcoin_logo;
    else if (coin === "ETH") return ethereum_logo;
    else return dash_logo;
  };

  render() {
    return (
      <div>
        <div>
          <h2>1 x {this.props.coin}</h2>
          <img
            src={this.selectCoinIcon(this.props.coin)}
            alt={`${this.props.coin}'s icon`}
            className="coin-icon"
          />
        </div>
        <Price price={this.state.price}></Price>
        <Currencies
          selectCurrency={this.state.selectCurrency}
          currencies={this.props.currencies}
          coin={this.props.coin}
          onChangeCurrency={evtKey => this.currencyChange(evtKey)}
        ></Currencies>
      </div>
    );
  }
}

export default Coin;

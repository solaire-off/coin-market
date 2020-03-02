import React, { Component } from "react";
import "./App.css";

import { connect } from "react-redux";
import {
  setViewStyle,
  setActiveTsyms,
  setSelectedCoins,
  addFavoriteCoins,
  removeFavoriteCoins,
  setViewFilter
} from "./actions/dashSettingsActions";

import { fetchGeneralInfo, fetchPriceList } from "./actions/coinListActions.js";

import Market from "./components/Market/Market";
import Header from "./components/Header";

class App extends Component {
  refreshMarketAction() {
    this.props.fetchPriceListAction();
    console.log("Refresh priceList by <Header />");
  }
  render() {
    return (
      <div className="App">
        <Header
          refreshPriceList={() => {
            this.refreshMarketAction();
          }}
        />
        <Market
          // Dash actions
          setViewStyle={this.props.setViewStyleAction}
          setActiveTsyms={this.props.setActiveTsymsAction}
          setSelectedCoins={this.props.setSelectedCoinsAction}
          removeFavoriteCoins={this.props.removeFavoriteCoinsAction}
          addFavoriteCoins={this.props.addFavoriteCoinsAction}
          setViewFilter={this.props.setViewFilterAction}
          // CoinList actions
          fetchGeneralInfo={this.props.fetchGeneralInfoAction}
          fetchPriceList={this.props.fetchPriceListAction}
          // Connect store from props
          dash={this.props.dash}
          coins={this.props.coins}
        />
      </div>
    );
  }
}

// connect data from store
const mapStateToProps = store => {
  return {
    dash: store.dash,
    coins: store.coins
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // Dash dispatch
    setViewStyleAction: viewStyle => dispatch(setViewStyle(viewStyle)),
    setActiveTsymsAction: activeTsyms => dispatch(setActiveTsyms(activeTsyms)),
    setSelectedCoinsAction: selectedCoins =>
      dispatch(setSelectedCoins(selectedCoins)),
    addFavoriteCoinsAction: name => dispatch(addFavoriteCoins(name)),
    removeFavoriteCoinsAction: name => dispatch(removeFavoriteCoins(name)),
    setViewFilterAction: filterName => dispatch(setViewFilter(filterName)),

    // Coins dispatch
    fetchGeneralInfoAction: () => dispatch(fetchGeneralInfo()),
    fetchPriceListAction: () => dispatch(fetchPriceList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

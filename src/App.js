import React, {Component} from 'react';
import './App.css';

import {connect} from 'react-redux';
import {
  setViewStyle,
  setActiveTsyms,
  setIsViewAllCoins,
  setSelectedCoins,
} from './actions/dashSettingsActions';

import {fetchGeneralInfo, fetchPriceList} from './actions/coinListActions.js';

import Market from './components/Market/Market';
import Header from './components/Header';

class App extends Component {
  refreshMarketAction(){
    this.props.fetchPriceListAction(
      this.props.dash.selectedCoins,
      this.props.dash.activeTsyms,
      this.props.dash.viewStyle,
      this.props.dash.isViewAllCoin,
    );
    console.log('Refresh priceList by <Header />');
  };
  render() {
    return (
      <div className="App">
        <Header refreshPriceList={() => {this.refreshMarketAction()}}  />
        <Market 
          // Dash actions
          setViewStyle={this.props.setViewStyleAction}
          setActiveTsyms={this.props.setActiveTsymsAction}
          setIsViewAllCoins={this.props.setIsViewAllCoinsAction}
          setSelectedCoins={this.props.setSelectedCoinsAction}

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
    coins: store.coins,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // Dash dispatch
    setViewStyleAction: viewStyle => dispatch(setViewStyle(viewStyle)),
    setIsViewAllCoinsAction: isViewAllCoin =>
      dispatch(setIsViewAllCoins(isViewAllCoin)),
    setActiveTsymsAction: activeTsyms => dispatch(setActiveTsyms(activeTsyms)),
    setSelectedCoinsAction: selectedCoins =>
      dispatch(setSelectedCoins(selectedCoins)),

    // Coins dispatch
    fetchGeneralInfoAction: (coins, tsyms, viewStyle, isViewAllCoin) =>
      dispatch(fetchGeneralInfo(coins, tsyms, viewStyle, isViewAllCoin)),
    fetchPriceListAction: (coins, tsyms, viewStyle, isViewAllCoin) =>
      dispatch(fetchPriceList(coins, tsyms, viewStyle, isViewAllCoin)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

import React, { Component } from "react";
import { coinListAll } from "../../constants";

import { Grid } from "@material-ui/core/";

import CoinCard from "../CoinCard/CoinCard";
import CoinCardDetail from "../CoinCardDetail/CoinCardDetail";
import Dash from "../Dash";

class Market extends Component {
  getGeneralInfoByCoinName(name) {
    try {
      return this.props.coins.generalInfo.filter(
        item => item.CoinInfo.Name === name
      )[0].CoinInfo;
    } catch {
      return null;
    }
  }
  checkIsThisFavoriteCoin(name) {
    if (this.props.dash.favoriteCoins.filter(item => item === name).length) {
      return true;
    }
    return false;
  }
  componentDidMount() {
    this.props.fetchGeneralInfo();

    this.cryptoSubscription = setInterval(
      () => this.props.fetchPriceList(),
      5000
    );
  }
  componentWillUnmount() {
    clearInterval(this.cryptoSubscription);
  }
  render() {
    const { priceList } = this.props.coins;
    const {
      selectedCoins,
      viewStyle,
      activeTsyms,
      favoriteCoins,
      viewFilter
    } = this.props.dash;

    const coinList =
      viewFilter === "VIEW_SELECTED"
        ? selectedCoins
        : viewFilter === "VIEW_ALL"
        ? coinListAll
        : favoriteCoins;

    console.log("Render <Market />");
    return (
      <div className="l-container l-container--market">
        <Grid container>
          <Grid className="c-card" item sm={12} lg={3}>
            <Dash
              selectedCoins={selectedCoins}
              viewStyle={viewStyle}
              activeTsyms={activeTsyms}
              favoriteCoins={favoriteCoins}
              viewFilter={viewFilter}
              setViewStyle={this.props.setViewStyle}
              setActiveTsyms={this.props.setActiveTsyms}
              setSelectedCoins={this.props.setSelectedCoins}
              fetchPriceList={this.props.fetchPriceList}
              setViewFilter={this.props.setViewFilter}
            />
          </Grid>
          <Grid className="c-card" item sm={12} lg={9}>
            <Grid container>
              {coinList &&
                coinList.map(name => (
                  <Grid
                    key={name}
                    className="c-card"
                    item
                    xs={12}
                    sm={viewStyle === "card" ? 6 : 12}
                    md={viewStyle === "card" ? 6 : 12}
                    lg={viewStyle === "card" ? 4 : 12}
                  >
                    {viewStyle === "card" ? (
                      <CoinCard
                        name={name}
                        coin={this.getGeneralInfoByCoinName(name)}
                        tsyms={activeTsyms}
                        priceList={priceList}
                        isFavorite={this.checkIsThisFavoriteCoin(name)}
                        addFavoriteCoins={this.props.addFavoriteCoins}
                        removeFavoriteCoins={this.props.removeFavoriteCoins}
                      />
                    ) : (
                      <CoinCardDetail
                        name={name}
                        coin={this.getGeneralInfoByCoinName(name)}
                        priceList={priceList}
                        isFavorite={this.checkIsThisFavoriteCoin(name)}
                        addFavoriteCoins={this.props.addFavoriteCoins}
                        removeFavoriteCoins={this.props.removeFavoriteCoins}
                      />
                    )}
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Market;

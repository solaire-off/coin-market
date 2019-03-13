import React, {Component} from 'react';
import {coinListAll} from '../../constants';

import {Grid} from '@material-ui/core/';

import CoinCard from '../CoinCard/CoinCard';
import CoinCardDetail from '../CoinCardDetail/CoinCardDetail';
import Dash from '../Dash';

class Market extends Component {
  getGeneralInfoByCoinName(name){
    try{
      return this.props.coins.generalInfo.filter((item) => item.CoinInfo.Name === name)[0].CoinInfo
    }
    catch{
      return null
    }
  }
  componentDidMount() {
    var { selectedCoins, isViewAllCoin, viewStyle, activeTsyms } = this.props.dash

    this.props.fetchGeneralInfo(
      selectedCoins,
      activeTsyms,
      viewStyle,
      isViewAllCoin,
    )
    
    this.cryptoSubscription = setInterval(
      () =>
        this.props.fetchPriceList(
          this.props.dash.selectedCoins,
          this.props.dash.activeTsyms,
          this.props.dash.viewStyle,
          this.props.dash.isViewAllCoin
      ),
    5000,
  );

}
componentWillUnmount() {
  clearInterval(this.cryptoSubscription);
}
render() {
  const { priceList  } = this.props.coins
  const { selectedCoins, isViewAllCoin, viewStyle, activeTsyms } = this.props.dash
  const coinList = isViewAllCoin ? coinListAll : selectedCoins;
  console.log('Render <Market />');
    return (
      <div className="l-container l-container--market">
        <Grid container>
          <Grid className="c-card" item sm={12} lg={3}>
            <Dash
              selectedCoins={selectedCoins}
              isViewAllCoin={isViewAllCoin}
              viewStyle={viewStyle}
              activeTsyms={activeTsyms}

              setViewStyle={this.props.setViewStyle}
              setActiveTsyms={this.props.setActiveTsyms}
              setIsViewAllCoins={this.props.setIsViewAllCoins}
              setSelectedCoins={this.props.setSelectedCoins}
              fetchPriceList={this.props.fetchPriceList}
            />
          </Grid>
          <Grid className="c-card" item sm={12} lg={9}>
            <Grid container>
              {coinList &&  coinList.map(name => (
                <Grid key={name} 
                  className="c-card" 
                  item 
                  xs={12} 
                  sm={viewStyle==="card" ? 6 : 12}  
                  md={viewStyle==="card" ? 6 : 12} 
                  lg={viewStyle==="card" ? 4 : 12} >
                  {viewStyle === 'card' ? (
                      <CoinCard
                        name={name}
                        coin={this.getGeneralInfoByCoinName(name)}
                        tsyms={activeTsyms}
                        priceList={priceList}
                      />
                  ): (
                      <CoinCardDetail
                        name={name}
                        coin={this.getGeneralInfoByCoinName(name)}
                        priceList={priceList}
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

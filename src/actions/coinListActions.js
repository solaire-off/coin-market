import { tsymsList, coinListAll } from '../constants';
import axios from 'axios';


export function setPriceList(priceList) {
  return {
    type: 'SET_PRICE_LIST',
    payload: priceList,
  }
}

export function setGeneralInfo(generalInfo) {
  return {
    type: 'SET_GENERAL_INFO',
    payload: generalInfo,
  }
}

export function fetchGeneralInfo() {
  return dispatch => {
    var coinsUrl = coinListAll.join(',')
    var url = 'https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=' + coinsUrl + '&tsym=USD'
    return axios
      .get(url)
      .then(response => {
        dispatch(setGeneralInfo(response.data.Data));
        dispatch(fetchPriceList())
      })
      .catch(error => {
        console.warn(error);
      });
  };
}

export function fetchPriceList() {
  return (dispatch, getState) => {
    const { selectedCoins, viewFilter, favoriteCoins } = getState().dash
    var coinsUrl = viewFilter === "VIEW_ALL" ? coinListAll : ( viewFilter === "VIEW_SELECTED" ? selectedCoins : favoriteCoins  );
    var tsymsUrl = tsymsList.join(',');
    var url =
      'https://min-api.cryptocompare.com/data/pricemulti?fsyms=' +
      coinsUrl.join(',') +
      '&tsyms=' +
      tsymsUrl;
    return axios
      .get(url)
      .then(response => {
        dispatch(setPriceList(response.data));
      })
      .catch(error => {
        console.warn(error);
      });
  };
}

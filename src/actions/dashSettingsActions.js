export function setViewStyle(viewStyle) {
  return {
    type: 'SET_VIEW_STYLE',
    payload: viewStyle,
  }
}

export function setActiveTsyms(activeTsyms) {
  return {
    type: 'SET_ACTIVE_TSYMS',
    payload: activeTsyms,
  }
}

export function setIsViewAllCoins(isViewAllCoin) {
  return {
    type: 'SET_IS_VIEW_ALL_COINS',
    payload: isViewAllCoin,
  }
}

export function setSelectedCoins(coinList) {
  return {
    type: 'SET_SELECTED_COINS',
    payload: coinList,
  }
}

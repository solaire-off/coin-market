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

export function setSelectedCoins(coinList) {
  return {
    type: 'SET_SELECTED_COINS',
    payload: coinList,
  }
}

export function setViewFilter(filter) {
  return {
    type: 'SET_VIEW_FILTER',
    payload: filter,
  }
}

export function addFavoriteCoins(name) {
  return {
    type: 'ADD_FAVORITE_COINS',
    payload: name,
  }
}

export function removeFavoriteCoins(name) {
  return {
    type: 'REMOVE_FAVORITE_COINS',
    payload: name,
  }
}



export const initialState = {
  selectedCoins: ['BTC', 'ETH', 'LTC','DASH', 'MLN', 'XRP'],
  isViewAllCoin: false,
  activeTsyms: 'USD',
  viewStyle: 'card',
}

export function dashSettingsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_VIEW_STYLE':
      return { ...state, viewStyle: action.payload}
    case 'SET_ACTIVE_TSYMS':
      return { ...state, activeTsyms: action.payload}
    case 'SET_IS_VIEW_ALL_COINS':
      return { ...state, isViewAllCoin: action.payload}
    case 'SET_SELECTED_COINS':
      return { ...state, selectedCoins: action.payload}
    default:
      return state
  }
}

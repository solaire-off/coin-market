export const initialState = {
  selectedCoins: ["BTC", "ETH", "LTC", "DASH", "MLN", "XRP"],
  viewFilter: "VIEW_SELECTED",
  activeTsyms: "USD",
  viewStyle: "card",
  favoriteCoins: []
};

export function dashSettingsReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_VIEW_STYLE":
      return { ...state, viewStyle: action.payload };
    case "SET_ACTIVE_TSYMS":
      return { ...state, activeTsyms: action.payload };
    case "SET_VIEW_FILTER":
      return { ...state, viewFilter: action.payload };
    case "SET_SELECTED_COINS":
      return { ...state, selectedCoins: action.payload };
    case "REMOVE_FAVORITE_COINS":
      return {
        ...state,
        favoriteCoins: state.favoriteCoins.filter(item => {
          return item !== action.payload;
        })
      };
    case "ADD_FAVORITE_COINS":
      return {
        ...state,
        favoriteCoins: [...state.favoriteCoins, action.payload]
      };
    default:
      return state;
  }
}

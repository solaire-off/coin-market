export const initialState = {
  priceList: [],
  generalInfo: []
};

export function coinListReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_PRICE_LIST":
      return { ...state, priceList: action.payload };
    case "SET_GENERAL_INFO":
      return { ...state, generalInfo: action.payload };
    default:
      return state;
  }
}

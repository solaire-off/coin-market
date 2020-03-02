import { combineReducers } from "redux";
import { dashSettingsReducer } from "./dashSettings";
import { coinListReducer } from "./coinList";

export const rootReducer = combineReducers({
  dash: dashSettingsReducer,
  coins: coinListReducer
});

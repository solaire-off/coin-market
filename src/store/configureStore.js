import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from '../reducers'
import { saveState, loadState } from '../localStorage';
import throttle from 'lodash/throttle';
// For fetch in actions (avalible return function from action)
import thunk from 'redux-thunk'


const initState = loadState()

export const store = createStore(
  rootReducer,
  initState,
  compose(applyMiddleware(thunk)),
);

store.subscribe(throttle(() => {
  saveState({
    dash : store.getState().dash 
  })
}), 1000)

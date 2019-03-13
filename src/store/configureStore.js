import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from '../reducers'
// For fetch in actions (avalible return function from action)
import thunk from 'redux-thunk'

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

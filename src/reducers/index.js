import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'

/**
 * Reducers
 */
import { mealsReducer } from './meals'
import { foodsReducer } from './foods'
import { notificationsReducer } from './notifications'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const reducers = combineReducers({
  meals: mealsReducer,
  foods: foodsReducer,
  notifications: notificationsReducer
})

const store = createStore(reducers, composeEnhancers(applyMiddleware(...[thunk]), persistState()))
export default store

import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

/**
 * Reducers
 */
import { mealsReducer } from './meals'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const reducers = combineReducers({
  meals: mealsReducer
})

const store = createStore(reducers, composeEnhancers(applyMiddleware(...[thunk])))
export default store

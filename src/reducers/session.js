import { ACTIONS } from '../constants/'

const initialState = {
  user: null
}

export const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SESSION.SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case ACTIONS.SESSION.LOGOUT:
      return {
        ...state,
        user: initialState.user
      }
    default:
      return state
  }
}

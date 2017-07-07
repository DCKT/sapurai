import { ACTIONS } from '../constants/'

const initialState = {
  all: []
}

export const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.MEALS.CREATE:
      return {
        ...state,
        all: [...state.all, action.payload]
      }
    default:
      return state
  }
}

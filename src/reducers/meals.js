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
    case ACTIONS.MEALS.REMOVE:
      return {
        ...state,
        all: state.all.filter(meal => meal.id !== action.payload.id)
      }
    default:
      return state
  }
}

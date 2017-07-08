import { ACTIONS } from '../constants/'

const initialState = {
  all: []
}

export const foodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.FOODS.CREATE:
      return {
        ...state,
        all: [...state.all, action.payload]
      }
    case ACTIONS.FOODS.REMOVE:
      return {
        ...state,
        all: state.all.filter(food => food.id !== action.payload.id)
      }
    default:
      return state
  }
}

import { ACTIONS } from '../constants/'

const initialState = {
  all: []
}

export const foodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.FOODS.REMOVE:
      return {
        ...state,
        all: state.all.filter(food => food.id !== action.payload.id)
      }
    case ACTIONS.FOODS.UPDATE_LIST:
      return {
        ...state,
        all: action.payload
      }
    default:
      return state
  }
}

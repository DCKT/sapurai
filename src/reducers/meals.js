import { ACTIONS } from '../constants/'

const initialState = {
  all: []
}

export const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.MEALS.ADD:
      return {
        ...state,
        all: [...state.all, action.payload]
      }
    case ACTIONS.MEALS.REMOVE_LIST:
      return {
        ...state,
        all: state.all.filter(meal => meal.id !== action.payload.id)
      }
    case ACTIONS.MEALS.ATTACH_FOOD:
      return {
        ...state,
        all: state.all.map(meal => {
          if (meal.id === action.payload.mealId) {
            return {
              ...meal,
              foods: meal.foods.concat(action.payload.foods)
            }
          } else {
            return meal
          }
        })
      }
    default:
      return state
  }
}

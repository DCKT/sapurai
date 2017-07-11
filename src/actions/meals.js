// @flow

import { ACTIONS } from '../constants/'

import type { Meal } from '../components/ui/MealBox'

export const createNewMeal = (meal: Meal) => dispatch => {
  return Promise.resolve(
    dispatch({
      type: ACTIONS.MEALS.CREATE,
      payload: {
        ...meal,
        foods: [],
        id: Date.now().toString()
      }
    })
  )
}

export const removeMeal = (id: string) => dispatch => {
  return Promise.resolve(
    dispatch({
      type: ACTIONS.MEALS.REMOVE,
      payload: {
        id
      }
    })
  )
}

export const attachFoodToMeal = (mealId: string, foods: Array<Food>) => dispatch => {
  return Promise.resolve(
    dispatch({
      type: ACTIONS.MEALS.ATTACH_FOOD,
      payload: {
        mealId,
        foods
      }
    })
  )
}

// @flow

import { ACTIONS } from '../constants/'

import type { Meal } from '../components/MealBox'

export const createNewMeal = (meal: Meal) => dispatch => {
  return Promise.resolve(
    dispatch({
      type: ACTIONS.MEALS.CREATE,
      payload: {
        ...meal,
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

// @flow

import { ACTIONS } from '../constants/'

import type { Meal } from '../components/MealBox'

export const createNewMeal = (meal: Meal) => dispatch => {
  return Promise.resolve(
    dispatch({
      type: ACTIONS.MEALS.CREATE,
      payload: {
        ...meal,
        id: Date.now()
      }
    })
  )
}

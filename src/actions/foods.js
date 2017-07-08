// @flow

import { ACTIONS } from '../constants/'

import type { Food } from '../components/form/form-create-food'

export const createNewFood = (food: Food) => dispatch => {
  return Promise.resolve(
    dispatch({
      type: ACTIONS.FOODS.CREATE,
      payload: {
        ...food,
        id: Date.now().toString()
      }
    })
  )
}

export const removeMeal = (id: string) => dispatch => {
  return Promise.resolve(
    dispatch({
      type: ACTIONS.FOODS.REMOVE,
      payload: {
        id
      }
    })
  )
}

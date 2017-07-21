// @flow

/**
 * Utils
 */
import { ACTIONS } from '../constants/'
import type { Food } from '../components/form/form-create-food'
import { app } from '../utils/firebase'

export const createNewFood = (food: Food) => dispatch => {
  const ref = app.database().ref(`foods/${food.name}`)

  return new Promise((resolve, reject) => {
    ref.once('value', snapshot => {
      const foodExist = snapshot.val()

      if (foodExist) {
        reject(new Error('exist'))
      } else {
        ref.set({
          ...food,
          id: Date.now().toString()
        })

        resolve(
          dispatch({
            type: ACTIONS.FOODS.CREATE
          })
        )
      }
    })
  })
}

export const removeFood = (id: string) => dispatch => {
  return Promise.resolve(
    dispatch({
      type: ACTIONS.FOODS.REMOVE,
      payload: {
        id
      }
    })
  )
}

export const updateFoodsList = (foods: Array<Food>) => dispatch => {
  return Promise.resolve(
    dispatch({
      type: ACTIONS.FOODS.UPDATE_LIST,
      payload: foods
    })
  )
}

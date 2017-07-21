// @flow

/**
 * Utils
 */
import { ACTIONS } from '../constants/'
import { app } from '../utils/firebase'
import type { Meal } from '../components/ui/MealBox'

export const createNewMeal = (meal: Meal) => (dispatch: Function, getState: Function) => {
  const { uid } = getState().session.user
  const id = Date.now()

  return app
    .database()
    .ref(`meals/${uid}/${id}`)
    .set({
      ...meal,
      id
    })
    .then(() =>
      dispatch({
        type: ACTIONS.MEALS.CREATE
      })
    )
}

export const addMealToList = (meal: Meal) => dispatch => {
  dispatch({
    type: ACTIONS.MEALS.ADD,
    payload: meal
  })
}

export const removeMeal = (id: string) => (dispatch, getState) => {
  const { uid } = getState().session.user

  return app.database().ref(`meals/${uid}/${id}`).remove().then(() =>
    dispatch({
      type: ACTIONS.MEALS.REMOVE
    })
  )
}

export const removeMealFromList = (id: string) => dispatch => {
  dispatch({
    type: ACTIONS.MEALS.REMOVE_LIST,
    payload: { id }
  })
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

export const updateMealsList = meals => dispatch => {
  return Promise.resolve(
    dispatch({
      type: ACTIONS.MEALS.UPDATE_LIST,
      payload: meals
    })
  )
}

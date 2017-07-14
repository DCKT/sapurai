/**
 * Utils
 */
import { app } from '../utils/firebase'
import { ACTIONS } from '../constants/'

export const getCurrentUser = () => dispatch => {
  return Promise.resolve(
    dispatch({
      type: ACTIONS.SESSION.GET_USER,
      payload: app.auth().currentUser
    })
  )
}

export const setUser = user => dispatch => {
  return Promise.resolve(
    dispatch({
      type: ACTIONS.SESSION.SET_USER,
      payload: user
    })
  )
}

export const logout = () => dispatch => {
  app.auth().signOut().then(() => {
    return dispatch({
      type: ACTIONS.SESSION.LOGOUT
    })
  })
}

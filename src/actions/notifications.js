// @flow

import { ACTIONS } from '../constants'

export const createNotification = (message: string) => dispatch => {
  return Promise.resolve(
    dispatch({
      type: ACTIONS.NOTIFICATIONS.CREATE,
      payload: message
    })
  )
}

export const removeNotification = (message: string) => dispatch => {
  return Promise.resolve(
    dispatch({
      type: ACTIONS.NOTIFICATIONS.REMOVE
    })
  )
}

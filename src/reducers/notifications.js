import { ACTIONS } from '../constants/'

const initialState = {
  notification: {
    isOpen: false,
    message: ''
  }
}

export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.NOTIFICATIONS.CREATE:
      return {
        ...state,
        notification: {
          isOpen: true,
          message: action.payload
        }
      }
    case ACTIONS.NOTIFICATIONS.REMOVE:
      return {
        ...state,
        notification: {
          isOpen: false,
          message: ''
        }
      }
    default:
      return state
  }
}

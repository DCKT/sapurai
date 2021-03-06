export const ACTIONS = {
  MEALS: {
    CREATE: 'MEALS/CREATE_MEAL',
    REMOVE: 'MEALS/REMOVE_MEAL',
    ATTACH_FOOD: 'MEALS/ATTACH_FOODS_TO_MEAL'
  },
  FOODS: {
    CREATE: 'FOODS/CREATE_FOOD',
    REMOVE: 'FOODS/REMOVE_FOOD'
  },
  NOTIFICATIONS: {
    CREATE: 'NOTIFICATIONS/CREATE_NOTIFICATION',
    REMOVE: 'NOTIFICATIONS/REMOVE_NOTIFICATION'
  },
  SESSION: {
    SIGN_IN: 'SESSION/SIGN_IN',
    SIGN_UP: 'SESSION/SIGN_UP',
    LOGOUT: 'SESSION/LOGOUT',
    GET_USER: 'SESSION/GET_CURRENT_USER',
    SET_USER: 'SESSION/SET_CURRENT_USER'
  }
}

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { IntlProvider } from 'react-intl'
import { BrowserRouter as Router } from 'react-router-dom'
import { find, toPairs } from 'lodash'

import { Page } from './components/page'

/**
 * Utils
 */
import registerServiceWorker from './registerServiceWorker'
import store from './reducers/'
import { setupIntl, getLanguage, getMessages } from './locales'
import { app } from './utils/firebase'

/**
 * Actions
 */
import { setUser } from './actions/session'
import { updateFoodsList } from './actions/foods'
import { updateMealsList, addMealToList, removeMealFromList } from './actions/meals'

const language = getLanguage()
const messages = getMessages(language)
setupIntl(language)

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <IntlProvider locale={language} messages={messages}>
        <MuiThemeProvider>
          <Router>
            <Page />
          </Router>
        </MuiThemeProvider>
      </IntlProvider>
    </Provider>,
    document.getElementById('root')
  )

registerServiceWorker()

let mealsListener = null

app.auth().onAuthStateChanged(user => {
  if (user) {
    const { uid } = user

    if (!mealsListener) {
      mealsListener = app.database().ref(`meals/${uid}`)
    }

    mealsListener.on('value', snapshot => {
      const meals = snapshot.val()
      const { foods } = store.getState()

      if (meals) {
        const mealsArray = Object.keys(meals).map(meal => meals[meal])
        console.log(foods)
        store.dispatch(
          updateMealsList(
            mealsArray.map(meal => {
              if (meal.foods) {
                meal.foods = toPairs(meal.foods).map(food => {
                  return find(foods.all, ({ id }) => {
                    return food[1].id.toString() === id.toString()
                  })
                })
              }

              return meal
            })
          )
        )
      }
    })

    mealsListener.on('child_added', data => {
      store.dispatch(addMealToList(data.val()))
    })

    mealsListener.on('child_removed', data => {
      store.dispatch(removeMealFromList(data.val().id))
    })

    store.dispatch(setUser(user)).then(render)
  } else {
    render()
  }
})

app.database().ref('foods').on('value', snapshot => {
  const list = snapshot.val()
  const foods = Object.keys(list).map(food => list[food])

  store.dispatch(updateFoodsList(foods))
})

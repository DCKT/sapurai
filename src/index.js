import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { IntlProvider } from 'react-intl'
import { BrowserRouter as Router } from 'react-router-dom'

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

app.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(setUser(user)).then(render)
  } else {
    render()
  }
})

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { IntlProvider } from 'react-intl'

/**
 * Pages
 */
import App from './pages/home'

/**
 * Utils
 */
import registerServiceWorker from './registerServiceWorker'
import store from './reducers/'
import { setupIntl, getLanguage, getMessages } from './locales'

const language = getLanguage()
const messages = getMessages(language)
setupIntl(language)

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={language} messages={messages}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()

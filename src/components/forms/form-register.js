// @flow

import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { injectIntl } from 'react-intl'
import firebase from 'firebase'

class BaseFormRegister extends React.Component {
  props: {
    intl: Object
  };

  state = {
    email: { value: '' },
    password: { value: '' }
  };

  render () {
    const { intl: { formatMessage } } = this.props
    const { email, password } = this.state

    return (
      <form onSubmit={this._onSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <TextField
          id="email"
          floatingLabelText={formatMessage({ id: 'page.register.form.email.label' })}
          onChange={this._updateInput}
          errorText={email.error}
          required
          fullWidth
        />
        <TextField
          id="password"
          floatingLabelText={formatMessage({ id: 'page.register.form.password.label' })}
          type="password"
          errorText={password.error}
          onChange={this._updateInput}
          required
          fullWidth
        />
        <br />
        <RaisedButton
          primary
          label={formatMessage({ id: 'page.register.form.submit' })}
          type="submit"
          fullWidth
        />
      </form>
    )
  }

  _updateInput = event => {
    const { id, value } = event.target

    this.setState(state => ({
      [id]: {
        value,
        error: ''
      }
    }))
  };

  _onSubmit = e => {
    e.preventDefault()

    const { intl: { formatMessage } } = this.props
    const { email, password } = this.state

    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .catch(({ code }) => {
        let error = {}

        if (code === 'auth/invalid-email') {
          error = {
            input: 'email',
            message: formatMessage({ id: 'page.register.form.error.invalidEmail' })
          }
        } else if (code === 'auth/user-not-found') {
          error = {
            input: 'email',
            message: formatMessage({ id: 'page.register.form.error.userNotFound' })
          }
        } else if (code === 'auth/wrong-password') {
          error = {
            input: 'password',
            message: formatMessage({ id: 'page.register.form.error.invalidPassword' })
          }
        } else if (code === 'auth/weak-password') {
          error = {
            input: 'password',
            message: formatMessage({ id: 'page.register.form.error.weakPassword' })
          }
        } else if (code === 'auth/email-already-in-use') {
          error = {
            input: 'email',
            message: formatMessage({ id: 'page.register.form.error.emailUsed' })
          }
        }

        this.setState(state => ({
          ...state,
          [error.input]: { ...state[error.input], error: error.message }
        }))
      })
  };
}

export const FormRegister = injectIntl(BaseFormRegister)

// @flow

import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { injectIntl } from 'react-intl'
import firebase from 'firebase'

class BaseFormLogin extends React.Component {
  state = {
    email: { value: '' },
    password: { value: '' }
  };

  render () {
    const { email, password } = this.state

    return (
      <form onSubmit={this._onSubmit}>
        <TextField
          id="email"
          floatingLabelText="Email"
          onChange={this._updateInput}
          errorText={email.error}
          required
          fullWidth
        />
        <TextField
          id="password"
          floatingLabelText="password"
          type="password"
          errorText={password.error}
          onChange={this._updateInput}
          required
          fullWidth
        />
        <br />
        <RaisedButton primary label="Sign in" type="submit" fullWidth />
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

  _onSubmit = () => {
    const { email, password } = this.state

    firebase.auth().signInWithEmailAndPassword(email.value, password.value).catch(({ code }) => {
      let error = {}

      if (code === 'auth/invalid-email') {
        error = {
          input: 'email',
          message: 'email invalid'
        }
      } else if (code === 'auth/user-not-found') {
        error = {
          input: 'email',
          message: 'user not found'
        }
      } else if (code === 'auth/wrong-password') {
        error = {
          input: 'password',
          message: 'wrong password'
        }
      }

      this.setState(state => ({
        ...state,
        [error.input]: { ...state[error.input], error: error.message }
      }))
    })
  };
}

export const FormLogin = injectIntl(BaseFormLogin)

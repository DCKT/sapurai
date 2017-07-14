// @flow

import React from 'react'
import styled from 'styled-components'
import { injectIntl } from 'react-intl'
import firebase from 'firebase'
import GoogleSigninButton from 'react-google-button'

/**
 * Utils
 */
import { app } from '../utils/firebase'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 64px);
`

type Props = {
  intl: Object
}

class BaseLogin extends React.Component {
  props: Props;

  state = {
    error: false
  };

  render () {
    const { intl: { formatMessage } } = this.props
    const { error } = this.state

    return (
      <Container>
        login
        <GoogleSigninButton onClick={this._googleLogin} />
        {error ? <p>An error occured</p> : null}
      </Container>
    )
  }

  _googleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    app.auth().signInWithPopup(provider).catch(_ => {
      this.setState(state => ({ ...state, error: true }))
    })
  };
}

export const Login = injectIntl(BaseLogin)

// @flow

import React from 'react'
import styled from 'styled-components'
import { injectIntl } from 'react-intl'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

/**
 * Components
 */
import { FormLogin } from '../components/forms/form-login'
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

const Form = styled(Paper)`
  width: 100%;
  max-width: 680px;
  padding: 30px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const FormSection = styled.div`
  width: 45%;
  display: flex;
  justify-content: center;
`

const FormSectionRight = styled(FormSection)`
  flex-direction: column;
`

const FormDivider = styled.div`
  width: 1px;
  height: 180px;
  background: #eee;
  margin: 0 2%;
`

const Title = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 24px;
  border-bottom: 1px solid #eee;
  padding-bottom: 25px;
  margin-bottom: 30px;
  position: relative;
`

const TitleRightLink = styled(Link)`
  position: absolute;
  right: 0;
  font-size: 14px;
`

const buttonStyle = {
  width: '100%',
  marginBottom: '10px'
}

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
        <Form>
          <Title>
            Login
            <TitleRightLink to="/register">Not registered yet ? Signup</TitleRightLink>
          </Title>
          <FormSection>
            <FormLogin />
          </FormSection>
          <FormDivider />
          <FormSectionRight>
            <RaisedButton
              label="Login with Google"
              icon={<FontIcon className="socicon-googleplus" />}
              backgroundColor="#F44336"
              labelColor="#fff"
              onClick={this._auth('google')}
              style={buttonStyle}
            />

            <RaisedButton
              label="Login with Twitter"
              icon={<FontIcon className="socicon-twitter" />}
              backgroundColor="#1da1f2"
              labelColor="#fff"
              onClick={this._auth('twitter')}
              style={buttonStyle}
            />

            <RaisedButton
              label="Login with Facebook"
              icon={<FontIcon className="socicon-facebook" />}
              backgroundColor="#365899"
              labelColor="#fff"
              onClick={this._auth('facebook')}
              style={{ width: '100%' }}
            />
          </FormSectionRight>
          {error ? <p>An error occured</p> : null}
        </Form>
      </Container>
    )
  }

  _auth = (type: string) => () => {
    let provider = null

    if (type === 'google') {
      provider = new firebase.auth.GoogleAuthProvider()
    } else if (type === 'facebook') {
      provider = new firebase.auth.FacebookAuthProvider()
    } else if (type === 'twitter') {
      provider = new firebase.auth.TwitterAuthProvider()
    }

    app.auth().signInWithPopup(provider).catch(_ => {
      this.setState(state => ({ ...state, error: true }))
    })
  };
}

export const Login = injectIntl(BaseLogin)

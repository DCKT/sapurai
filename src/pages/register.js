// @flow

import React from 'react'
import styled from 'styled-components'
import { injectIntl } from 'react-intl'
import Paper from 'material-ui/Paper'
import { Link } from 'react-router-dom'

/**
 * Components
 */
import { FormRegister } from '../components/forms/form-register'

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

const Title = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 24px;
  border-bottom: 1px solid #eee;
  padding-bottom: 25px;
  margin-bottom: 10px;
  position: relative;
`

const TitleRightLink = styled(Link)`
  position: absolute;
  right: 0;
  font-size: 14px;
`

type Props = {
  intl: Object
}

class BaseRegister extends React.Component {
  props: Props;

  render () {
    const { intl: { formatMessage } } = this.props

    return (
      <Container>
        <Form>
          <Title>
            {formatMessage({ id: 'page.register.title' })}
            <TitleRightLink to="/login">
              {formatMessage({ id: 'page.register.alreadyRegistered' })}
            </TitleRightLink>
          </Title>
          <FormRegister />
        </Form>
      </Container>
    )
  }
}

export const Register = injectIntl(BaseRegister)

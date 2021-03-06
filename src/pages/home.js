// @flow

import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { injectIntl, FormattedMessage } from 'react-intl'

/**
 * Components
 */
import { MealBox, type Meal } from '../components/ui/MealBox'
import { Menu } from '../components/ui/Menu'
import { Notification } from '../components/ui/Notification'

const Container = styled.div`
  display: flex;
  justify-content: 'center';
  margin: 20px auto;
`

const Left = styled.div`
  width: 25%;
  margin: auto;
`

const Right = styled.div`
  width: 70%;
  margin: auto;
`

type Props = {
  meals: Array<Meal>
}

class App extends React.Component {
  props: Props;

  state = {
    isDialogVisible: false
  };

  render () {
    const { meals } = this.props

    return (
      <div>
        <Container>
          <Left>
            <Menu />
          </Left>
          <Right>
            {meals.length
              ? meals.map((meal, i) => <MealBox key={i} data={meal} />)
              : <FormattedMessage id="home.nomeals" />}
          </Right>
        </Container>
        <Notification />
      </div>
    )
  }
}

const mapStateToProps = ({ meals }) => ({
  meals: meals.all
})

export default injectIntl(connect(mapStateToProps)(App))

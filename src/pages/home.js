// @flow

import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { injectIntl, FormattedMessage } from 'react-intl'

/**
 * Components
 */
import { MealBox, type Meal } from '../components/ui/MealBox'
import { Notification } from '../components/ui/Notification'

const Container = styled.div`margin: 20px auto;`

type Props = {
  meals: Array<Meal>
}

class App extends React.Component {
  props: Props;

  render () {
    const { meals } = this.props

    return (
      <div>
        <Container>
          {meals.length
            ? meals.map((meal, i) => <MealBox key={i} data={meal} />)
            : <FormattedMessage id="home.nomeals" />}
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

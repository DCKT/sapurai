// @flow

import React from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

/**
 * Components
 */
import { MealBox, type Meal } from '../components/MealBox'
import { FormCreateMeal } from '../components/forms/form-create-meal'

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
    const { isDialogVisible } = this.state

    return (
      <div>
        <AppBar
          title="Sapurai"
          iconElementRight={<FlatButton label="Add a new meal" />}
          onRightIconButtonTouchTap={this._showDialog}
        />
        <FormCreateMeal isDialogVisible={isDialogVisible} toggleDialog={this._toggleModal} />
        {meals.map((meal, i) => <MealBox key={i} data={meal} />)}
      </div>
    )
  }

  _showDialog = () => this.setState(state => ({ ...state, isDialogVisible: true }));
  _toggleModal = () =>
    this.setState(state => ({ ...state, isDialogVisible: !state.isDialogVisible }));
}

const mapStateToProps = ({ meals }) => ({
  meals: meals.all
})

export default connect(mapStateToProps)(App)

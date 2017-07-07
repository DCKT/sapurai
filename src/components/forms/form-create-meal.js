// @flow

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'

/**
 * Actions
 */
import { createNewMeal } from '../../actions/meals'

type Props = {
  createNewMeal: () => Promise<*>,
  toggleDialog: () => void,
  isDialogVisible: boolean
}

class BaseFormCreateMeal extends React.Component {
  props: Props;

  state = {
    mealName: ''
  };

  render () {
    const { toggleDialog, isDialogVisible } = this.props

    return (
      <Dialog
        title="Create a new meal"
        modal={false}
        open={isDialogVisible}
        onRequestClose={toggleDialog}
      >
        <form onSubmit={this._onSubmit}>
          <TextField
            hintText="Meal name"
            onChange={this._updateMealName}
            value={this.state.mealName}
          />
          <RaisedButton label="Add" primary />
        </form>
      </Dialog>
    )
  }

  _updateMealName = event => {
    const { value } = event.target
    this.setState(state => ({ ...state, mealName: value }))
  };

  _onSubmit = e => {
    const { mealName } = this.state
    const { createNewMeal, toggleDialog } = this.props

    e.preventDefault()

    if (mealName) {
      createNewMeal({ title: mealName }).then(() => toggleDialog())
    }
  };
}

const mapDispatchToProps = dispatch => ({
  createNewMeal: bindActionCreators(createNewMeal, dispatch)
})

export const FormCreateMeal = connect(null, mapDispatchToProps)(BaseFormCreateMeal)

// @flow

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import { injectIntl } from 'react-intl'

/**
 * Actions
 */
import { createNewMeal } from '../../actions/meals'
import { createNotification } from '../../actions/notifications'

type Props = {
  createNewMeal: () => Promise<*>,
  toggleDialog: () => void,
  createNotification: () => Promise<*>,
  isDialogVisible: boolean,
  intl: Object
}

class BaseFormCreateMeal extends React.Component {
  props: Props;

  state = {
    mealName: ''
  };

  render () {
    const { toggleDialog, isDialogVisible, intl: { formatMessage } } = this.props

    return (
      <Dialog
        title={formatMessage({ id: 'form.createMeal.title' })}
        modal={false}
        open={isDialogVisible}
        onRequestClose={toggleDialog}
      >
        <form onSubmit={this._onSubmit}>
          <TextField
            hintText={formatMessage({ id: 'form.createMeal.input.placeholder' })}
            onChange={this._updateMealName}
            value={this.state.mealName}
          />
          <RaisedButton
            label={formatMessage({ id: 'form.createMeal.submit' })}
            primary
            type="submit"
          />
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
    const { createNewMeal, createNotification, toggleDialog, intl: { formatMessage } } = this.props

    e.preventDefault()

    if (mealName) {
      createNewMeal({ title: mealName }).then(() => {
        this.setState(state => ({
          ...state,
          mealName: ''
        }))
        createNotification(formatMessage({ id: 'form.createMeal.successMessage' }))
        toggleDialog()
      })
    }
  };
}

const mapDispatchToProps = dispatch => ({
  createNewMeal: bindActionCreators(createNewMeal, dispatch),
  createNotification: bindActionCreators(createNotification, dispatch)
})

export const FormCreateMeal = injectIntl(connect(null, mapDispatchToProps)(BaseFormCreateMeal))

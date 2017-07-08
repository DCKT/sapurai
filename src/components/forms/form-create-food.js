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
import { createFood } from '../../actions/foods'

export type Brand = {
  name: string
}

export type Food = {
  id: string,
  name: string,
  brand?: Brand,
  quantity?: string,
  informations: {
    for: string,
    kcal: string,
    protein: string,
    carbohydrates: string,
    lipids: string
  }
}

type Props = {
  createFood: () => Promise<*>,
  toggleDialog: () => void,
  isDialogVisible: boolean,
  intl: Object
}

class BaseFormCreateFood extends React.Component {
  props: Props;

  state = {
    mealName: ''
  };

  render () {
    const { toggleDialog, isDialogVisible, intl: { formatMessage } } = this.props

    return (
      <Dialog
        title={formatMessage({ id: 'form.createFood.title' })}
        modal={false}
        open={isDialogVisible}
        onRequestClose={toggleDialog}
      >
        <form onSubmit={this._onSubmit}>
          <TextField
            hintText={formatMessage({ id: 'form.createFood.input.placeholder' })}
            onChange={this._updateMealName}
            value={this.state.mealName}
          />
          <RaisedButton
            label={formatMessage({ id: 'form.createFood.submit' })}
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
    const { createFood, toggleDialog } = this.props

    e.preventDefault()

    if (mealName) {
      createFood({ title: mealName }).then(() => toggleDialog())
    }
  };
}

const mapDispatchToProps = dispatch => ({
  createFood: bindActionCreators(createFood, dispatch)
})

export const FormCreateFood = injectIntl(connect(null, mapDispatchToProps)(BaseFormCreateFood))

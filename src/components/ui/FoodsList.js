// @flow

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Dialog from 'material-ui/Dialog'
import { injectIntl } from 'react-intl'
import FlatButton from 'material-ui/FlatButton'

/**
 * Components
 */
import type { Food } from '../forms/form-create-food'

/**
 * Actions
 */
import { removeFood } from '../../actions/foods'

type Props = {
  foods: Array<Food>,
  isDialogVisible: boolean,
  toggleDialog: Function,
  removeFood: Function,
  intl: Object
}

class BaseFoodsList extends React.Component {
  props: Props;

  render () {
    const { foods, isDialogVisible, toggleDialog, intl: { formatMessage } } = this.props

    return (
      <Dialog
        title={formatMessage({ id: 'foodsList.title' })}
        modal={false}
        open={isDialogVisible}
        onRequestClose={toggleDialog}
      >
        {foods.map((food, i) =>
          <div key={i}>
            {food.name}
            <FlatButton label="remove" onClick={this._removeFood(food.id)} />
          </div>
        )}
      </Dialog>
    )
  }

  _removeFood = (id: string) => () => {
    this.props.removeFood(id)
  };
}

const mapStateToProps = ({ foods }) => ({
  foods: foods.all
})

const mapDispatchToProps = dispatch => ({
  removeFood: bindActionCreators(removeFood, dispatch)
})

export const FoodsList = injectIntl(connect(mapStateToProps, mapDispatchToProps)(BaseFoodsList))

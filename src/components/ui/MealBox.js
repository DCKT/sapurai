// @flow

import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import { Card as MCard, CardActions, CardTitle } from 'material-ui/Card'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'

/**
 * Actions
 */
import { removeMeal } from '../../actions/meals'

/**
 * Components
 */
import { FormAddFood } from '../forms/form-add-food'

const Card = styled(MCard)`
  margin-bottom: 20px;
`

export type Food = {
  name: string,
  quantity: string
}

export type Meal = {
  title: string,
  id: number,
  foods?: Array<Food>
}

type Props = {
  data: Meal,
  intl: Object,
  removeMeal: () => Promise<*>
}

class BaseMealBox extends React.Component {
  props: Props;

  state = {
    isDialogVisible: false,
    isFormAddFoodDialogVisible: false
  };

  render () {
    const { isDialogVisible, isFormAddFoodDialogVisible } = this.state
    const { data, intl: { formatMessage } } = this.props
    const { title, foods, id } = data

    return (
      <Card>
        <CardTitle title={title} />

        <Dialog
          title="Remove meal"
          modal={false}
          open={isDialogVisible}
          onRequestClose={this._toggleDialog}
          actions={[
            <FlatButton label={formatMessage({ id: 'dialog.no' })} onClick={this._toggleDialog} />,
            <RaisedButton
              secondary
              label={formatMessage({ id: 'dialog.yes' })}
              onClick={this._removeMeal(id)}
            />
          ]}
        />

        <FormAddFood mealId={id} isDialogVisible={isFormAddFoodDialogVisible} />

        <CardActions>
          <FlatButton secondary label="Remove meal" onClick={this._toggleDialog} />
          <RaisedButton primary label="Add food" onClick={this._toggleFormAddFoodVisible} />
        </CardActions>
      </Card>
    )
  }

  _toggleDialog = () => {
    this.setState(state => ({ ...state, isDialogVisible: !state.isDialogVisible }))
  };

  _toggleFormAddFoodVisible = () => {
    this.setState(state => ({
      ...state,
      isFormAddFoodDialogVisible: !state.isFormAddFoodDialogVisible
    }))
  };

  _removeMeal = (id: string) => () => {
    this.props.removeMeal(id).then(() => this._toggleDialog())
  };
}

const mapDispatchToProps = dispatch => ({
  removeMeal: bindActionCreators(removeMeal, dispatch)
})

export const MealBox = injectIntl(connect(null, mapDispatchToProps)(BaseMealBox))

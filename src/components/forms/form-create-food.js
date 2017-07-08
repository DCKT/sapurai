// @flow

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MTextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'

/**
 * Actions
 */
import { createNewFood } from '../../actions/foods'

const TextField = styled(MTextField)`
  margin: 0 10px;
`

const Error = styled.p`color: #f44336;`

export type Brand = {
  name: string
}

export type Food = {
  id: string,
  name: string,
  brand?: Brand,
  baseQuantity: string,
  kcal: string,
  protein: string,
  carbohydrates: string,
  lipids: string
}

type Props = {
  createNewFood: () => Promise<*>,
  toggleDialog: () => void,
  isDialogVisible: boolean,
  intl: Object
}

class BaseFormCreateFood extends React.Component {
  props: Props;

  state = {
    formError: false,
    food: {
      name: {},
      brand: {},
      baseQuantity: {},
      kcal: {},
      protein: {},
      carbohydrates: {},
      lipids: {}
    }
  };

  render () {
    const { isDialogVisible, intl: { formatMessage } } = this.props
    const { food, formError } = this.state

    return (
      <Dialog
        title={formatMessage({ id: 'form.createFood.title' })}
        modal={false}
        open={isDialogVisible}
        onRequestClose={this._resetForm}
        actions={[
          <FlatButton label={formatMessage({ id: 'form.cancel' })} onClick={this._resetForm} />,
          <RaisedButton
            label={formatMessage({ id: 'form.createFood.submit' })}
            primary
            onClick={this._submitForm}
          />
        ]}
      >
        <form>
          {formError
            ? <Error>
              {formError}
            </Error>
            : null}

          {['name', 'brand', 'baseQuantity', 'protein', 'lipids', 'carbohydrates'].map((item, i) =>
            <TextField
              key={i}
              hintText={formatMessage({ id: `form.createFood.${item}.placeholder` })}
              floatingLabelText={formatMessage({ id: `form.createFood.${item}.label` })}
              floatingLabelFixed
              id={item}
              onChange={this._updateInput}
              value={food[item].value}
              errorText={food[item].error}
            />
          )}
        </form>
      </Dialog>
    )
  }

  _updateInput = event => {
    const { id, value } = event.target

    this.setState(state => ({
      ...state,
      food: {
        ...state.food,
        [id]: {
          value,
          error: ''
        }
      }
    }))
  };

  _resetForm = () => {
    this.setState(state => ({
      ...state,
      food: {
        name: {},
        brand: {},
        baseQuantity: {},
        kcal: {},
        protein: {},
        carbohydrates: {},
        lipids: {}
      }
    }))
    this.props.toggleDialog()
  };

  _submitForm = e => {
    e.preventDefault()

    const { food } = this.state
    const { createNewFood, toggleDialog, intl: { formatMessage } } = this.props

    const fieldsWithError = Object.keys(food).filter(key => !food[key].value)

    if (fieldsWithError.length) {
      const fieldsWithErrorObject = fieldsWithError.reduce((acc, fieldName) => {
        acc[fieldName] = { error: formatMessage({ id: 'form.required' }) }
        return acc
      }, {})

      this.setState(state => ({
        ...state,
        food: {
          ...state.food,
          ...fieldsWithErrorObject
        },
        formError: formatMessage({ id: 'form.createFood.fillAllFields' })
      }))

      return false
    } else {
      createNewFood(food).then(() => toggleDialog())
    }
  };
}

const mapDispatchToProps = dispatch => ({
  createNewFood: bindActionCreators(createNewFood, dispatch)
})

export const FormCreateFood = injectIntl(connect(null, mapDispatchToProps)(BaseFormCreateFood))

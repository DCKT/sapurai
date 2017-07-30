// @flow

import React from 'react'
import Dialog from 'material-ui/Dialog'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow as MTableRow,
  TableRowColumn
} from 'material-ui/Table'
import styled from 'styled-components'

/**
 * Actions
 */
import { attachFoodToMeal } from '../../actions/meals'
import { createNotification } from '../../actions/notifications'

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`

const TableRow = styled(MTableRow)`
  td {
    padding-top: 20px;
    padding-bottom: 20px;
    vertical-align: middle;
    }
`

type Props = {
  mealId: string,
  isDialogVisible: boolean,
  intl: Object,
  foods: Array<*>,
  attachFoodToMeal: Function,
  createNotification: Function,
  closeDialog: Function
}

class BaseFormAddFood extends React.Component {
  props: Props;

  state = {
    filter: '',
    selectedFoods: []
  };

  render () {
    const { isDialogVisible, intl: { formatMessage }, foods } = this.props
    const { filter } = this.state

    return (
      <Dialog
        title={formatMessage({ id: 'form.addFood.title' })}
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
        <Container>
          <Table height="300px" multiSelectable onRowSelection={this._onRowSelection}>
            <TableHeader adjustForCheckbox>
              <TableRow>
                <TableHeaderColumn colSpan="3" style={{ textAlign: 'center' }}>
                  <TextField
                    fullWidth
                    floatingLabelText={formatMessage({ id: 'form.addFood.search' })}
                    onChange={(e, searchText) =>
                      this.setState(state => ({ ...state, filter: searchText }))}
                  />
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox deselectOnClickaway={false}>
              {foods.filter(food => food.name.toLowerCase().includes(filter)).map((food, i) =>
                <TableRow
                  key={i}
                  selected={!!this.state.selectedFoods.filter(sfood => sfood.id === food.id).length}
                >
                  <TableRowColumn>
                    {food.name}
                  </TableRowColumn>
                  <TableRowColumn>
                    <p>
                      Pour {food.baseQuantity}g :{' '}
                    </p>
                    <div>
                      Proteines : {food.protein}g
                    </div>
                    <div>
                      Lipides : {food.lipids}g
                    </div>
                    <div>
                      Glucides : {food.carbohydrates}g
                    </div>
                  </TableRowColumn>
                  <TableRowColumn>
                    {food.kcal} kCal
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Container>
      </Dialog>
    )
  }

  _resetForm = () => {
    this.setState(state => ({
      selectedFoods: [],
      filter: ''
    }))

    this.props.closeDialog()
  };

  _onRowSelection = selectedRows => {
    this.setState((state, props) => ({
      ...state,
      selectedFoods: selectedRows.map(id => props.foods[id])
    }))
  };

  _submitForm = () => {
    const { attachFoodToMeal, createNotification, mealId, intl: { formatMessage } } = this.props
    const { selectedFoods } = this.state

    attachFoodToMeal(mealId, selectedFoods)
      .then(() => createNotification(formatMessage({ id: 'form.addFood.success' })))
      .then(() => this._resetForm())
  };
}

const mapStateToProps = ({ foods }) => ({
  foods: foods.all
})

const mapDispatchToProps = dispatch => ({
  attachFoodToMeal: bindActionCreators(attachFoodToMeal, dispatch),
  createNotification: bindActionCreators(createNotification, dispatch)
})

export const FormAddFood = injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(BaseFormAddFood)
)

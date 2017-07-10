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
  TableRow,
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

const Left = styled.div`width: 300px;`

const Right = styled.div`
  width: 60%;
  margin-left: 10%;
`

type Props = {
  mealId: string,
  isDialogVisible: boolean,
  intl: Object,
  foods: Array<*>,
  attachFoodToMeal: Function
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
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox>
              {foods.filter(food => food.name.toLowerCase().includes(filter)).map((food, i) =>
                <TableRow key={i}>
                  <TableRowColumn>
                    {i}
                  </TableRowColumn>
                  <TableRowColumn>
                    {food.name}
                  </TableRowColumn>
                  <TableRowColumn>
                    {food.kcal}
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Container>
      </Dialog>
    )
  }

  _onRowSelection = selectedRows => {
    console.log(selectedRows)
    // this.setState(state => ({
    //   ...state,
    //   selectedFoods: selectedRows
    // }))
  };

  _submitForm = () => {
    const { attachFoodToMeal, mealId } = this.props
    const { selectedFoods, createNotification, intl: { formatMessage } } = this.state

    attachFoodToMeal(
      mealId,
      this.props.foods.filter(food => selectedFoods.includes(food.id))
    ).then(() => createNotification(formatMessage({ id: 'form.addFood.success' })))
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

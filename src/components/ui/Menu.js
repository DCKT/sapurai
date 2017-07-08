// @flow

import React from 'react'
import Paper from 'material-ui/Paper'
import RMenu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import ListIcon from 'material-ui/svg-icons/action/list'
import { injectIntl } from 'react-intl'

/**
 * Components
 */
import { FormCreateMeal } from '../forms/form-create-meal'
import { FormCreateFood } from '../forms/form-create-food'
import { FoodsList } from './FoodsList'

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0'
}

type Props = {
  intl: Object
}

class BaseMenu extends React.Component {
  props: Props;
  state = {
    isMealDialogVisible: false,
    isProductDialogVisible: false,
    isFoodsListDialogVisible: false
  };

  render () {
    const { isMealDialogVisible, isProductDialogVisible, isFoodsListDialogVisible } = this.state
    const { intl: { formatMessage } } = this.props

    return (
      <Paper style={style}>
        <RMenu desktop width={320}>
          <MenuItem
            primaryText="Ajouter"
            rightIcon={<ArrowDropRight />}
            menuItems={[
              <MenuItem
                primaryText={formatMessage({ id: 'misc.meal' })}
                onTouchTap={this._toggleMealDialog}
              />,
              <Divider />,
              <MenuItem
                primaryText={formatMessage({ id: 'misc.product' })}
                onTouchTap={this._toggleProductDialog}
              />
            ]}
          />
          <Divider />
          <MenuItem
            primaryText="Voir la liste des produits"
            rightIcon={<ListIcon />}
            onTouchTap={this._toggleFoodsListDialog}
          />
        </RMenu>
        <FormCreateMeal
          isDialogVisible={isMealDialogVisible}
          toggleDialog={this._toggleMealDialog}
        />
        <FormCreateFood
          isDialogVisible={isProductDialogVisible}
          toggleDialog={this._toggleProductDialog}
        />
        <FoodsList
          isDialogVisible={isFoodsListDialogVisible}
          toggleDialog={this._toggleFoodsListDialog}
        />
      </Paper>
    )
  }
  _toggleMealDialog = () =>
    this.setState(state => ({ ...state, isMealDialogVisible: !state.isMealDialogVisible }));

  _toggleProductDialog = () =>
    this.setState(state => ({ ...state, isProductDialogVisible: !state.isProductDialogVisible }));

  _toggleFoodsListDialog = () =>
    this.setState(state => ({
      ...state,
      isFoodsListDialogVisible: !state.isFoodsListDialogVisible
    }));
}

export const Menu = injectIntl(BaseMenu)

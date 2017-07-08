import React from 'react'
import Paper from 'material-ui/Paper'
import RMenu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'

/**
 * Components
 */
import { FormCreateMeal } from '../forms/form-create-meal'

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0'
}

class BaseMenu extends React.Component {
  state = {
    isDialogVisible: false
  };

  render () {
    const { isDialogVisible } = this.state

    return (
      <Paper style={style}>
        <RMenu desktop width={320}>
          <MenuItem
            primaryText="Ajouter"
            rightIcon={<ArrowDropRight />}
            menuItems={[
              <MenuItem primaryText="Meal" onTouchTap={this._toggleModal} />,
              <MenuItem primaryText="Food" />
            ]}
          />
        </RMenu>
        <FormCreateMeal isDialogVisible={isDialogVisible} toggleDialog={this._toggleModal} />
      </Paper>
    )
  }
  _toggleModal = () =>
    this.setState(state => ({ ...state, isDialogVisible: !state.isDialogVisible }));
}

export const Menu = BaseMenu

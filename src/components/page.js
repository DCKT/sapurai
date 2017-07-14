// @flow

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route as BaseRoute, Redirect, Switch, withRouter } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Divider from 'material-ui/Divider'

/**
 * Pages
 */
import Home from '../pages/home'
import { Login } from '../pages/login'

/**
 * Actions
 */
import { logout } from '../actions/session'

export const Route = connect(({ cognito, session }) => ({
  user: session.user
}))(props => {
  const { user, isPrivate } = props

  if (isPrivate && !user) {
    return <Redirect to="/login" />
  }

  if (window.location.pathname === '/login' && user) {
    return <Redirect to="/" />
  }

  return <BaseRoute {...props} />
})

class BasePageContainer extends React.Component {
  props: {
    children: React$Element<*>,
    logout: Function,
    user: Object
  };
  state = {
    isDrawerOpen: false
  };

  render () {
    return (
      <div>
        <AppBar
          title="Sapurai"
          onLeftIconButtonTouchTap={this._openDrawer}
          iconElementRight={
            this.props.user
              ? <IconMenu
                iconButtonElement={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                  }
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                <MenuItem primaryText="Help" />
                <Divider />
                <MenuItem primaryText="Sign out" onClick={this.props.logout} />
              </IconMenu>
              : null
          }
        />
        <Drawer
          docked={false}
          width={300}
          open={this.state.isDrawerOpen}
          onRequestChange={isDrawerOpen => this.setState(state => ({ ...state, isDrawerOpen }))}
        />

        <Switch>
          {/* Public */}
          <Route path="/login" component={Login} />

          {/* Private */}
          <Route path="/" component={Home} exact isPrivate />
        </Switch>
      </div>
    )
  }

  _openDrawer = () => {
    this.setState(state => ({ ...state, isDrawerOpen: true }))
  };
}

const mapStateToProps = ({ session }) => ({
  user: session.user
})

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(logout, dispatch)
})

export const Page = withRouter(connect(mapStateToProps, mapDispatchToProps)(BasePageContainer))

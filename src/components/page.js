// @flow

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route as BaseRoute, Redirect, Switch, withRouter } from 'react-router-dom'
import styled from 'styled-components'

/**
 * Material components
 */
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Divider from 'material-ui/Divider'
import { Menu } from './ui/Menu'
/**
 * Pages
 */
import Home from '../pages/home'
import { Login } from '../pages/login'
import { Register } from '../pages/register'

/**
 * Actions
 */
import { logout } from '../actions/session'

/**
 * Utils
 */
import { isMobileOrTablet, breakpoint } from '../utils/responsive'

const Application = styled.div`
  padding-left: 256px;

  @media screen and (max-width: ${breakpoint.tablet}px) {
    padding-left: 0;
  }
`

const Content = styled.div`padding: 10px 20px;`

export const Route = connect(({ cognito, session }) => ({
  user: session.user
}))(props => {
  const { user, isPrivate } = props

  if (isPrivate && !user) {
    return <Redirect to="/login" />
  }

  if (['/login', '/register'].includes(window.location.pathname) && user) {
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
    const { isDrawerOpen } = this.state

    return (
      <Application>
        <AppBar
          title={isMobileOrTablet() ? 'Sapurai' : ''}
          onLeftIconButtonTouchTap={this._openDrawer}
          showMenuIconButton={isMobileOrTablet()}
          style={{ background: '#42A5F5' }}
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
          docked={!isMobileOrTablet()}
          width={256}
          open={isMobileOrTablet() ? isDrawerOpen : true}
          onRequestChange={isDrawerOpen => this.setState(state => ({ ...state, isDrawerOpen }))}
        >
          <Menu />
        </Drawer>
        <Content>
          <Switch>
            {/* Public */}
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />

            {/* Private */}
            <Route path="/" component={Home} exact isPrivate />
          </Switch>
        </Content>
      </Application>
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

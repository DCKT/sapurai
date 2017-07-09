// @flow

import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

/**
 * Actions
 */
import { removeNotification } from '../../actions/notifications'

type TNotification = {
  isOpen: boolean,
  message: string
}

type Props = {
  notification: TNotification,
  removeNotification: Function
}

class BaseNotification extends React.Component {
  props: Props;

  render () {
    const { notification, removeNotification } = this.props

    return (
      <Snackbar
        open={notification.isOpen}
        message={notification.message}
        autoHideDuration={2000}
        onRequestClose={removeNotification}
      />
    )
  }
}

const mapStateToProps = ({ notifications }) => ({
  notification: notifications.notification
})

const mapDispatchToProps = dispatch => ({
  removeNotification: bindActionCreators(removeNotification, dispatch)
})

export const Notification = connect(mapStateToProps, mapDispatchToProps)(BaseNotification)

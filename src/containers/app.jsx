import React, {
  Component,
  Fragment
} from 'react'
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import KeyHandler, {KEYPRESS} from 'react-key-handler';
import Notification, { notify } from 'reapop'
import NotificationTheme from 'reapop-theme-bootstrap'

import Device from './device'

import {
  Page,
  PageNotFound
} from '../components/layout'
import {
  SimpleCard
} from '../components/card'
import {
  Navbar
} from '../components/nav'

import {fetchDevicesLazy} from '../actions/device'

class App extends Component {

  constructor() {
    super()

    this.handleKeypress = this.handleKeypress.bind(this)
  }

  handleKeypress(e) {
    if (e.key == 'ä') {
      this.props.dispatch(notify({
        title: 'Hey There!',
        message: [
          'You are looking great today!',
          'That nobel price is yours!',
          'I can see you on the nature magazine cover!',
          'You are a superposition of awesome and great!'
        ][Math.floor(Math.random()*4)],
        status: 'success',
        dismissible: true,
        dismissAfter: 3000
      }))
    }
  }

  render() {
    const { devices, metrics } = this.props

    return (
      <Fragment>
        <Navbar />
        <Notification theme={NotificationTheme} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="ä" onKeyHandle={this.handleKeypress} />
        <div className="container mt-5">
          <Switch>
            <Route path="/" exact render={() => (
              <Page title="Dashboard">
                <div className="row row-cards">
                  {metrics.map((metric, index) => (
                    <div className="col-6 col-sm-4 col-lg-2" key={index}>
                      <SimpleCard {...metric} />
                    </div>
                  ))}
                </div>
              </Page>
            )} />
            <Route path="/devices" render={() => (
              <Page title="Devices">
                <div className="row">
                {devices.map((device, index) => (
                  <div className="col-8 offset-2 col-sm-6 offset-sm-0 col-md-5 col-lg-4 col-xl-3" key={index}>
                    <Device key={index} device={device} />
                  </div>
                ))}
                </div>
              </Page>
            )} />
            <Route component={PageNotFound}  />
          </Switch>
        </div>
      </Fragment>
    )
  }

}

const mapState = state => ({
  devices: state.devices,
  metrics: Object.values(state.system)
})

export default withRouter(connect(
  mapState
)(App))

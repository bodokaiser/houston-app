import {combineReducers} from 'redux'
import { reducer as notificationsReducer } from 'reapop'

import devicesReducers from './devices'
import systemReducers from './system'

export default combineReducers({
  notifications: notificationsReducer(),
  devices: devicesReducers,
  system: systemReducers
})

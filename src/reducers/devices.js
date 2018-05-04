import {createReducer} from 'redux-create-reducer'

import {
  UPDATE_DEVICE,
  RECEIVE_DEVICE_LIST,
  RECEIVE_DEVICE_UPDATE
} from '../actions/device'

function updateDevice(state, action) {
  return state.map(device => {
    if (device.name == action.device.name) {
      device = action.device
    }
    return device
  })
}

function requestDeviceList(state, action) {
  return state
}

function receiveDeviceList(state, action) {
  return action.devices
}

function requestDeviceUpdate(state, action) {
  return state
}

function receiveDeviceUpdate(state, action) {
  return state
}

export default createReducer([], {
  UPDATE_DEVICE: updateDevice,
  REQUEST_DEVICE_LIST: requestDeviceList,
  RECEIVE_DEVICE_LIST: receiveDeviceList,
  REQUEST_DEVICE_UPDATE: requestDeviceUpdate,
  RECEIVE_DEVICE_UPDATE: receiveDeviceUpdate
})

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
  return state
}

function requestDeviceUpdate(state, action) {
  return state
}

function receiveDeviceUpdate(state, action) {
  return state
}

export default createReducer([
  {
    id: 0,
    name: "Champion Board",
    amplitude: {
      mode: 'playback',
      const: {
        value: 1.0
      },
      sweep: {
        start: 0.0,
        stop: 0.2,
        duration: 1,
        nodwells: [true, true]
      },
      playback: {
        interval: 262e-9,
        trigger: false,
        duplex: true,
        data: [1.0, 0.4, 0.1, 0.15]
      },
    },
    frequency: {
      mode: 'sweep',
      const: {
        value: 10e6
      },
      sweep: {
        start: 1e6,
        stop: 2e6,
        duration: 1,
        nodwells: [true, true]
      },
      playback: {
        interval: 262e-6,
        trigger: false,
        duplex: true,
        data: [1e6, 1e6, 1e6]
      },
    },
    phase: {
      mode: 'const',
      const: {
        value: 0.0
      },
      sweep: {
        start: 0.0,
        stop: Math.PI,
        duration: 0,
        nodwells: [true, true]
      },
      playback: {
        interval: 262e-9,
        trigger: false,
        duplex: true,
        data: [0, 1.3, 2.0]
      },
    }
  },
  {
    id: 1,
    name: "Bad Board",
    amplitude: {
      mode: 'playback',
      const: {
        value: 1.0
      },
      sweep: {
        start: 0.0,
        stop: 1.0,
        duration: 1,
        nodwells: [true, true]
      },
      playback: {
        interval: 262e-9,
        trigger: false,
        duplex: true,
        data: [1.0, 0.4, 0.4, 0.4]
      },
    },
    frequency: {
      mode: 'const',
      const: {
        value: 3e6
      },
      sweep: {
        start: 10e6,
        stop: 20e6,
        duration: 1,
        nodwells: [true, true]
      },
      playback: {
        interval: 262e-9,
        trigger: false,
        duplex: true,
        data: [5e6, 2e6, 7e6]
      },
    },
    phase: {
      mode: 'const',
      const: {
        value: 0
      },
      sweep: {
        start: 0,
        stop: 2.7,
        duration: 1,
        nodwells: [true, true]
      },
      playback: {
        interval: 262e-9,
        trigger: false,
        duplex: true,
        data: [0, 5]
      },
    }
  }
], {
  UPDATE_DEVICE: updateDevice,
  REQUEST_DEVICE_LIST: requestDeviceList,
  RECEIVE_DEVICE_LIST: receiveDeviceList,
  REQUEST_DEVICE_UPDATE: requestDeviceUpdate,
  RECEIVE_DEVICE_UPDATE: receiveDeviceUpdate
})

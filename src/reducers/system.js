import {createReducer} from 'redux-create-reducer'

export default createReducer([
    {
      "name": "CPU Usage",
      "value": "50%"
    },
    {
      "name": "RAM Usage",
      "value": "60%"
    },
    {
      "name": "Disk Usage",
      "value": "30%"
    },
    {
      "name": "Uptime",
      "value": "30h"
    }
], {})

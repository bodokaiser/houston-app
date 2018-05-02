import React from 'react'

import {
  Control
} from 'react-redux-form'

function mapClassName(cname) {
  var str = 'btn btn-primary'

  if (cname) {
    str += ' ' + cname
  }

  return str
}

export const SubmitButton = ({ model, className, children }) => (
  <Control.button
    model={model}
    mapProps={{ className: mapClassName(className) }}
    disabled={{ valid: false }}>
    { children }
  </Control.button>
)

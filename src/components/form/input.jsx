import React, { Component } from 'react'
import { Control, actions } from 'react-redux-form'

import Quantity from './quantity'

const classNameRange = classNameMapper('form-control custom-range')
const classNameSelect = classNameMapper('selectgroup-input')
const classNameCustom = classNameMapper('custom-control-input')
const classNameControl = classNameMapper('form-control')

export const TextInput = (props) => {
  props.mapProps.className = classNameControl

  return (
    <Control.text {...props} />
  )
}

export const QuantityInput = ({ model, validators, sourceUnit, defaultUnit }) => (
  <Control
    model={model}
    mapProps={{
      onError: errorHandler,
      className: classNameControl
    }}
    validators={validators}
    sourceUnit={sourceUnit}
    defaultUnit={defaultUnit}
    component={Quantity} />
)

export const RangeInput = (props) => (
  <Control type="range" mapProps={{ className: classNameRange }} {...props} />
)

export const SelectInput = (props) => (
  <Control.radio mapProps={{ className: classNameSelect }} {...props} />
)

export const CheckboxInput = (props) => (
  <Control.checkbox mapProps={{ className: classNameCustom }} {...props} />
)

function classNameMapper(str) {
  return function mapClassName({ fieldValue }) {
    if (!fieldValue.valid) {
      return `${str} is-invalid`
    }

    return str
  }
}

function errorHandler({ model, dispatch }) {
  return function handlerError(error) {
    dispatch(actions.setValidity(model, { quantity: false }))
  }
}

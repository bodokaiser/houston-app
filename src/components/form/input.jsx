import React from 'react'
import {Control} from 'react-redux-form'
import convert from 'js-quantities'

const classNameRange = classNameMapper('form-control custom-range')
const classNameSelect = classNameMapper('selectgroup-input')
const classNameCustom = classNameMapper('custom-control-input')
const classNameControl = classNameMapper('form-control')

export const TextInput = (props) => (
  <Control.text updateOn="blur" mapProps={{ className: classNameControl }} {...props} />
)

export const QuantityInput = ({ sourceUnit, targetUnit, model }) => (
  <Control.text
    model={model}
    mapProps={{
      value: p => {
        console.log('quantity value', p, model)
        convert(p.modelValue, sourceUnit).toString(targetUnit)
      },
      className: classNameControl,
      onChange: p => {
        return e => {
          var value = convert(e.target.value).to(targetUnit).scalar
          console.log('value on change', value)

          p.onChange(value)
        }
      }
    }} />
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
  return function mapClassName(form) {
    if (!form.fieldValue.valid) {
      return `${str} is-invalid`
    }

    return str
  }
}

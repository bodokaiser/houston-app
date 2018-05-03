import React, {Fragment} from 'react'

import {
  TextInput,
  QuantityInput,
  SelectInput,
  CheckboxInput
} from './input'
import {
  InvalidFeedback
} from './feedback'

export const InputGroup = ({ model, label, prepend, append, value, parser, validators, messages, formatter, updateOn }) => (
  <Fragment>
    { label &&
    <label className="form-label" htmlFor={model}>
      { label }
    </label> }
    <div className="input-group">
      { prepend &&
      <div className="input-group-prepend">
        <div className="input-group-text">{ prepend }</div>
      </div> }
      <TextInput
        model={model}
        parser={parser}
        formatter={formatter}
        updateOn={updateOn}
        validators={validators} />
      <InvalidFeedback model={model} />
      { append &&
      <div className="input-group-append">
        <div className="input-group-text">{ append }</div>
      </div> }
    </div>
  </Fragment>
)

export const QuantityGroup = ({ model, label, validators, sourceUnit, defaultUnit }) => (
  <Fragment>
    { label &&
    <label className="form-label" htmlFor={model}>
      { label }
    </label> }
    <QuantityInput
      model={model}
      sourceUnit={sourceUnit}
      defaultUnit={defaultUnit}
      validators={validators} />
    <InvalidFeedback model={model} />
  </Fragment>
)

export const SelectGroup = ({ children }) => (
  <Fragment>
    <div className="selectgroup w-100">
      { children }
    </div>
  </Fragment>
)

export const SelectGroupOption = ({ model, icon, value }) => (
  <label className="selectgroup-item">
    <SelectInput model={model} value={value} />
    { icon &&
    <span className="selectgroup-button selectgroup-button-icon">
      <i className={`fe fe-${icon}`}></i>
    </span> }
  </label>
)

export const CheckboxGroup = ({ model, label }) => (
  <label className="custom-control custom-checkbox custom-control-inline">
    <CheckboxInput model={model} />
    <span className="custom-control-label">{ label }</span>
  </label>
)

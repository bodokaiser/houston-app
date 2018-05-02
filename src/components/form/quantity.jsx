import React, { Component } from 'react'
import convert from 'js-quantities'

class Quantity extends Component {

  constructor() {
    super()

    this.state = { value: '', init: true }
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  getRawValue() {
    if (this.state.init) {
      this.state.value = this.props.value
      this.state.init = false
    }

    return this.state.value
  }

  valueToString(value) {
    const { sourceUnit, defaultUnit } = this.props

    return convert(value, sourceUnit).toString(defaultUnit)
  }

  quantityToBase(quantity) {
    return convert(quantity).toBase().scalar
  }

  handleBlur(event) {
    this.setState({ value: event.target.value })

    var value = this.getRawValue()

    try {
      var quantity = this.quantityToBase(value)
    } catch(err) {
      if (err instanceof convert.Error) {
        this.props.onError()
        return this.props.onChange(0)
      } else {
        throw err
      }
    }
    if (!value) {
      this.props.onChange(null)
    } else {
      this.props.onChange(quantity)
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  render() {
    var value = this.getRawValue()

    try {
      value = this.valueToString(value)
    } catch(e) {}

    return (
      <input
        type="text"
        value={value}
        className={this.props.className}
        onBlur={this.handleBlur}
        onChange={this.handleChange} />
    )
  }

}

export default Quantity

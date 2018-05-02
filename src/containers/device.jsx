import React, {
  Component
} from 'react'
import {
  LocalForm,
  Fieldset,
  actions
} from 'react-redux-form'
import {connect} from 'react-redux'

import {
  isEmpty,
  isDecimal
} from 'validator'

import {
  updateDevice,
  submitDevice
} from '../actions/device'

import {
  InputGroup,
  QuantityGroup,
  SelectGroup,
  SelectGroupOption,
  CheckboxGroup
} from '../components/form/group'
import {
  TextInput,
  RangeInput
} from '../components/form/input'
import {
  SubmitButton
} from '../components/form/button'
import {
  CollapsableCard
} from '../components/card'

const ConstGroup = ({ sourceUnit, defaultUnit }) => (
  <Fieldset model=".const">
    <div className="row align-items-center">
      <div className="col">
        <QuantityGroup
          model=".value"
          sourceUnit={sourceUnit}
          defaultUnit={defaultUnit}
          validators={{ required, quantity }} />
      </div>
    </div>
  </Fieldset>
)

const SweepGroup = ({ sourceUnit, defaultUnit }) => (
  <Fieldset model=".sweep">
    <div className="row gutters-xs">
      <div className="col-4">
        <QuantityGroup
          model=".start"
          sourceUnit={sourceUnit}
          defaultUnit={defaultUnit}
          validators={{ required, quantity }} />
      </div>
      <div className="col-4">
        <QuantityGroup
          model=".stop"
          sourceUnit={sourceUnit}
          defaultUnit={defaultUnit}
          validators={{ required, quantity }} />
      </div>
      <div className="col-4">
        <QuantityGroup
          model=".duration"
          sourceUnit="s"
          defaultUnit="ms"
          validators={{ required, quantity }} />
      </div>
    </div>
    <div className="mt-3">
      <CheckboxGroup model=".noDwellLow" label="Hold Low" />
      <CheckboxGroup model=".noDwellHigh" label="Hold High" />
    </div>
  </Fieldset>
)

const PlaybackGroup = ({ sourceUnit, defaultUnit }) => (
  <Fieldset model=".playback">
    <div className="row gutters-xs">
      <div className="col-7">
        <InputGroup
          model=".data"
          validators={{ required }} />
      </div>
      <div className="col-5">
        <QuantityGroup
          model=".interval"
          sourceUnit="s"
          defaultUnit="ns"
          validators={{ required, quantity }} />
      </div>
    </div>
    <div className="mt-3">
      <CheckboxGroup model=".noDwellLow" label="Hold Low" />
      <CheckboxGroup model=".noDwellHigh" label="Hold High" />
    </div>
  </Fieldset>
)

const ModeGroup = () => (
  <SelectGroup model="local.mode">
    <SelectGroupOption model=".mode" value="const" icon="minus" />
    <SelectGroupOption model=".mode" value="sweep" icon="trending-up" />
    <SelectGroupOption model=".mode" value="playback" icon="activity" />
  </SelectGroup>
)

class Device extends Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  handleSubmit() {
    this.props.dispatch(submitDevice(this.props.device))
  }

  handleChange(device) {
    if (this.state.form && this.state.form.$form.valid) {
      this.props.dispatch(updateDevice(device))
    }
  }

  handleUpdate(form) {
    this.setState({ form })
  }

  render() {
    const { device } = this.props
    const { form } = this.state

    var alert = form && form.$form.errors.mode &&
      'You can only use one sweep and one playback at a time.'

    return (
      <CollapsableCard title={device.name} alert={alert}>
        <LocalForm
          initialState={device}
          validators={{
            '': {
              mode: modes()
            }
          }}
          onUpdate={form => this.handleUpdate(form)}
          onSubmit={device => this.handleSubmit(device)}
          onChange={device => this.handleChange(device)}>
          <div className="card-body">
              <div className="form-row">
                <div className="form-group col-sm-12">
                  <label className="form-label">
                    Amplitude
                  </label>
                  <Fieldset model=".amplitude">
                    <ModeGroup />
                    { device.amplitude.mode == 'const' &&
                    <ConstGroup sourceUnit="" defaultUnit="%" /> }
                    { device.amplitude.mode == 'sweep' &&
                    <SweepGroup sourceUnit="" defaultUnit="%" /> }
                    { device.amplitude.mode == 'playback' &&
                    <PlaybackGroup sourceUnit="" defaultUnit="%" /> }
                  </Fieldset>
                </div>
                <div className="form-group col-sm-12">
                  <label className="form-label">
                    Frequency
                  </label>
                  <Fieldset model=".frequency">
                    <ModeGroup />
                    { device.frequency.mode == 'const' &&
                    <ConstGroup sourceUnit="Hz" defaultUnit="MHz" /> }
                    { device.frequency.mode == 'sweep' &&
                    <SweepGroup sourceUnit="Hz" defaultUnit="MHz" /> }
                    { device.frequency.mode == 'playback' &&
                    <PlaybackGroup sourceUnit="Hz" defaultUnit="MHz" /> }
                  </Fieldset>
                </div>
                <div className="form-group col-sm-12">
                  <label className="form-label">
                    Phase Offset
                  </label>
                  <Fieldset model=".phase">
                    <ModeGroup />
                    { device.phase.mode == 'const' &&
                    <ConstGroup sourceUnit="rad" defaultUnit="rad" /> }
                    { device.phase.mode == 'sweep' &&
                    <SweepGroup sourceUnit="rad" defaultUnit="rad" /> }
                    { device.phase.mode == 'playback' &&
                    <PlaybackGroup /> }
                  </Fieldset>
                </div>
              </div>
          </div>
          <div className="card-footer text-right">
            <div className="d-flex">
              <button type="button" className="btn btn-outline-secondary">
                Reset
              </button>
              <SubmitButton className="ml-auto" model="local">
                Update
              </SubmitButton>
            </div>
          </div>
        </LocalForm>
      </CollapsableCard>
    )
  }

}

export default connect()(Device)

function modes() {
  return function(device) {
    var [nc, ns, np] = [0, 0, 0]

    var modes = [
      device.amplitude.mode,
      device.frequency.mode,
      device.phase.mode
    ]
    modes.forEach(m => {
      if (m == 'const') nc++
      if (m == 'sweep') ns++
      if (m == 'playback') np++
    })

    return np < 2 && ns < 2
  }
}

function required(value) {
  if (typeof value == 'string') return !isEmpty(value)

  if (value === undefined) return false
  if (value === null) return false

  return true
}

function quantity(value) {
  return value !== null && typeof value !== Number
}

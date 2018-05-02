import React, {
  Component
} from 'react'
import {
  LocalForm,
  Fieldset
} from 'react-redux-form'
import {connect} from 'react-redux'

import {
  updateDevice,
  submitDevice
} from '../actions/device'

import {
  modes,
  required,
  quantity,
  quantities
} from '../validators/device'

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

const ConstGroup = ({ append, parser, formatter }) => (
  <Fieldset model=".const">
    <div className="row align-items-center">
      <div className="col">
        <QuantityGroup
          model=".value"
          append={append}
          validators={{
            required: required()
          }} />
      </div>
    </div>
  </Fieldset>
)

const SweepGroup = ({ append }) => (
  <Fieldset model=".sweep">
    <div className="row gutters-xs">
      <div className="col-4">
        <InputGroup
          model=".start"
          append={append}
          validators={{
            required: required()
          }} />
      </div>
      <div className="col-4">
        <InputGroup
          model=".stop"
          append={append}
          validators={{
            required: required()
          }} />
      </div>
      <div className="col-4">
        <InputGroup
          model=".duration"
          append="ms"
          validators={{
            required: required()
          }} />
      </div>
    </div>
    <div className="mt-3">
      <CheckboxGroup model=".noDwellLow" label="Hold Low" />
      <CheckboxGroup model=".noDwellHigh" label="Hold High" />
    </div>
  </Fieldset>
)

const PlaybackGroup = ({ fromUnit, toUnit }) => (
  <Fieldset model=".playback">
    <div className="row gutters-xs">
      <div className="col-7">
        <InputGroup
          model=".data"
          validators={{
            required: required()
          }}
        />
      </div>
      <div className="col-5">
        <InputGroup
          model=".interval"
          validators={{
            required: required()
          }} />
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
      console.log('change device', device, this.state)
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
                    <ConstGroup
                      append="%"
                    /> }
                    { device.amplitude.mode == 'sweep' &&
                    <SweepGroup fromUnit="" toUnit="%" /> }
                    { device.amplitude.mode == 'playback' &&
                    <PlaybackGroup fromUnit="" toUnit="%" /> }
                  </Fieldset>
                </div>
                <div className="form-group col-sm-12">
                  <label className="form-label">
                    Frequency
                  </label>
                  <Fieldset model=".frequency">
                    <ModeGroup />
                    { device.frequency.mode == 'const' &&
                    <ConstGroup
                      append="MHz"
                    /> }
                    { device.frequency.mode == 'sweep' &&
                    <SweepGroup fromUnit="Hz" toUnit="MHz" /> }
                    { device.frequency.mode == 'playback' &&
                    <PlaybackGroup fromUnit="Hz" toUnit="MHz" /> }
                  </Fieldset>
                </div>
                <div className="form-group col-sm-12">
                  <label className="form-label">
                    Phase Offset
                  </label>
                  <Fieldset model=".phase">
                    <ModeGroup />
                    { device.phase.mode == 'const' &&
                    <ConstGroup sourceUnit="rad" targetUnit="rad" /> }
                    { device.phase.mode == 'sweep' &&
                    <SweepGroup fromUnit="rad" toUnit="rad" /> }
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

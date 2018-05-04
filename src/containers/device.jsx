import React, { Component, Fragment } from 'react'
import { LocalForm, Fieldset, actions } from 'react-redux-form'
import {connect} from 'react-redux'
import { isEmpty, isDecimal } from 'validator'

import { updateDevice, submitDevice, resetDevice } from '../actions/device'

import {
  InputGroup,
  QuantityGroup,
  SelectGroup,
  SelectGroupOption,
  CheckboxGroup
} from '../components/form/group'
import { SubmitButton } from '../components/form/button'
import { CollapsableCard } from '../components/card'
import { FormModal } from '../components/modal'

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
          model=".limits[0]"
          sourceUnit={sourceUnit}
          defaultUnit={defaultUnit}
          validators={{ required, quantity }} />
      </div>
      <div className="col-4">
        <QuantityGroup
          model=".limits[1]"
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
      <CheckboxGroup model=".nodwells[0]" label="No Dwell Low" />
      <CheckboxGroup model=".nodwells[1]" label="No Dwell High" />
    </div>
  </Fieldset>
)

const PlaybackGroup = ({ sourceUnit, defaultUnit }) => (
  <Fieldset model=".playback">
    <div className="row gutters-xs">
      <div className="col-7">
        <InputGroup
          model=".data"
          mapProps={{
            value: ({ value }) => {
              if (Array.isArray(value)) return value.join(', ')

              return value
            }
          }}
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
      <CheckboxGroup model=".trigger" label="Trigger" />
      <CheckboxGroup model=".duplex" label="Duplex" />
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

const NameModal = ({ open, onClose, onSave }) => (
  <FormModal title="Change Name" model=".name" open={open} onClose={onClose} onSave={onSave}>
    <div className="form-group col-sm-12">
      <label className="form-label">
        Name
      </label>
      <InputGroup model=".name" validators={{ required }} updateOn="change" />
    </div>
  </FormModal>
)

class Device extends Component {

  constructor(props) {
    super(props)

    this.state = { showModal: false }
    this.handleEdit = this.handleEdit.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
  }

  handleEdit() {
    this.setState({ showModal: true })
  }

  handleModalClose() {
    this.setState({ showModal: false })
  }

  handleSubmit() {
    const { device } = this.props

    function stringToFloatArray(str) {
      if (typeof str != 'string') return []

      return str.split(',').map(s => parseFloat(s))
    }

    // TODO: this should be handled by a custom control in the form
    // see https://github.com/davidkpiano/react-redux-form/issues/1143.
    this.props.dispatch(submitDevice({
      id: device.id,
      name: device.name,
      amplitude: {
        mode: device.amplitude.mode,
        const: device.amplitude.const,
        sweep: device.amplitude.sweep,
        playback: {
          ...device.amplitude.playback,
          data: stringToFloatArray(device.amplitude.playback.data)
        }
      },
      frequency: {
        mode: device.frequency.mode,
        const: device.frequency.const,
        sweep: device.frequency.sweep,
        playback: {
          ...device.frequency.playback,
          data: stringToFloatArray(device.frequency.playback.data)
        }
      },
      phase: {
        mode: device.phase.mode,
        const: device.phase.const,
        sweep: device.phase.sweep,
        playback: {
          ...device.phase.playback,
          data: stringToFloatArray(device.phase.playback.data)
        }
      }
    }))
  }

  handleChange(device) {
    if (this.state.form && this.state.form.$form.valid) {
      this.props.dispatch(updateDevice(device))
    }
  }

  handleUpdate(form) {
    this.setState({ form })
  }

  handleReset() {
    this.props.dispatch(resetDevice(this.props.device))
  }

  render() {
    const { device } = this.props
    const { form, showModal } = this.state

    var alert = form && form.$form.errors.mode &&
      'You can only use one sweep and one playback at a time.'

    return (
      <CollapsableCard title={device.name} alert={alert} onEdit={this.handleEdit}>
        <LocalForm
          initialState={device}
          validators={{
            '': {
              mode: modes()
            }
          }}
          onUpdate={this.handleUpdate}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}>
          <NameModal open={showModal} onClose={this.handleModalClose} />
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
              <button type="button" className="btn btn-outline-secondary" onClick={this.handleReset}>
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

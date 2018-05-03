import React, { Component } from 'react'

export const SimpleCard = ({ name, value }) => (
  <div className="card">
    <div className="card-body p-3 text-center">
      <div className="h1 mt-6">{ value }</div>
      <div className="text-muted mb-4">{ name }</div>
    </div>
  </div>
)

export class CollapsableCard extends Component {

  constructor() {
    super()

    this.state = { collapsed: false }
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleCollapseClick = this.handleCollapseClick.bind(this)
  }

  handleEditClick() {
    if (this.props.onEdit) this.props.onEdit()
  }

  handleCollapseClick() {
    const { collapsed } = this.state

    this.setState({ collapsed: !collapsed })
  }

  render() {
    const { collapsed } = this.state
    const { title, alert, children } = this.props

    return (
      <div className={`card ${(collapsed) ? 'card-collapsed' : ''}`}>
        <div className="card-status bg-blue"></div>
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
          <div className="card-options">
            <button className="btn btn-sm" type="click" onClick={this.handleEditClick}>
              <i className="fe fe-edit-2"></i>
            </button>
            <span className="card-options-collapse">
              <button className="btn btn-sm" type="click" onClick={this.handleCollapseClick}>
                <i className={`fe fe-chevron-${(collapsed) ? 'down' : 'up'}`}></i>
              </button>
            </span>
          </div>
        </div>
        { alert &&
        <div className="card-alert alert alert-danger mb-0">
          { alert }
        </div> }
        { children }
      </div>
    )
  }

}

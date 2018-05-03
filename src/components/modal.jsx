import React, { Component } from 'react'
import { Control } from 'react-redux-form'
import ReactModal from 'react-modal'

ReactModal.setAppElement('main')

export const FormModal = ({ title, model, open, children, onClose, onSave }) => (
  <ReactModal className="Modal__Bootstrap modal-dialog" isOpen={open} onRequestClose={onClose}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
          <button type="button" className="close" onClick={onClose}>
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="modal-body">
          { children }
        </div>
        <div className="modal-footer">
          <Control.reset model={model} className="btn btn-secondary" onClick={onClose}>Close</Control.reset>
          <button type="click" className="btn btn-primary" onClick={onClose}>Change</button>
        </div>
      </div>
    </div>
  </ReactModal>
)

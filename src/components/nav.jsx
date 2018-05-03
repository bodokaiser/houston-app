import React from 'react'
import {NavLink} from 'react-router-dom'

export const Navbar = () => (
  <nav className="navbar navbar-expand bg-light pt-0 pb-0">
    <ul className="nav nav-tabs border-0">
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" exact to="/">
          <i className="fe fe-home"></i> Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" to="/devices">
          <i className="fe fe-cpu"></i> Devices
        </NavLink>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="https://github.com/bodokaiser/houston">
          <i className="fe fe-github"></i> Source
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="https://godoc.org/github.com/bodokaiser/houston">
          <i className="fe fe-file-text"></i> Documentation
        </a>
      </li>
    </ul>
  </nav>
)

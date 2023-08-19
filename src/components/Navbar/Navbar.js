import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  return (
    <>
        <nav className="navbar navbar-dark navbar-expand-lg bg-primary" id="customNav">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/" id="heading">Flow Puzzle - Solver</Link>
    {props.isBoard ? <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/board">Board</Link>
        </li>
      </ul> : <></>}
      <ul className="navbar-nav" id="about">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/about" id="about">About</Link>
        </li>
      </ul>
  </div>
</nav>
    </>
  )
}

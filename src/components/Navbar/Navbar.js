import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
        <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Flow Puzzle - Solver</Link>
      <ul className="navbar-nav" id="about">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/about">About</Link>
        </li>
      </ul>
  </div>
</nav>
    </>
  )
}

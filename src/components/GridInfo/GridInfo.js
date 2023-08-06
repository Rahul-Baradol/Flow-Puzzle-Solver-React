import React from 'react'
import './GridInfo.css'

export default function GridInfo() {
  return (
    <>
    <div className="container customContainer">
      <h1 id="message">Choose the size of the board!</h1>
      <div className="top container">
        <button type="button" className="btn btn-outline-primary customBtns"><h5>4 x 4</h5></button>
        <button type="button" className="btn btn-outline-primary customBtns"><h5>5 x 5</h5></button>
        <button type="button" className="btn btn-outline-primary customBtns"><h5>6 x 6</h5></button>
      </div>

      <div className="bottom container">
        <button type="button" className="btn btn-outline-primary customBtns"><h5>7 x 7</h5></button>
        <button type="button" className="btn btn-outline-primary customBtns"><h5>8 x 8</h5></button>
        <button type="button" className="btn btn-outline-primary customBtns"><h5>9 x 9</h5></button>
      </div>
    </div>
    </>
  )
}

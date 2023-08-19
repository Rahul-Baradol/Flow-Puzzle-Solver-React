import React from 'react'
import { Link } from 'react-router-dom'
import './GridInfo.css'

export default function GridInfo(props) {
  props.setIsBoard(0);

  return (
    <>
    <div className="container customContainer">
      <h1 id="message">Choose the size of the board!</h1>
      <div className="top container">
        <Link to="/board/solve">
          <button type="button" className="btn btn-outline-primary customBtns"
                onClick={()=> {
                    props.setBoardSize(4);
                }}><h5>4 x 4</h5></button>
          <button type="button" className="btn btn-outline-primary customBtns" 
                onClick={()=> {
                  props.setBoardSize(5);
              }}><h5>5 x 5</h5></button>
          <button type="button" className="btn btn-outline-primary customBtns"
                onClick={()=> {
                  props.setBoardSize(6);
              }}><h5>6 x 6</h5></button>
        </Link>
      </div>

      {/* <div className="bottom container">
        <Link to="/board/solve">
          <button type="button" className="btn btn-outline-primary customBtns"
                onClick={()=> {
                  props.setBoardSize(7);
              }}><h5>7 x 7</h5></button>
          <button type="button" className="btn btn-outline-primary customBtns"
                  onClick={()=> {
                    props.setBoardSize(8);
                }}><h5>8 x 8</h5></button>
          <button type="button" className="btn btn-outline-primary customBtns"
                  onClick={()=> {
                    props.setBoardSize(9);
                }}><h5>9 x 9</h5></button>
        </Link>
      </div> */}

    </div>
    </>
  )
}

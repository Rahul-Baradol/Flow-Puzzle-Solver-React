import React, { useState } from 'react'
import './BoardSolver.css'
import ColorElement from './ColorElement/ColorElement';

export default function BoardSolver(props) {
  let size = props.boardSize;
  let val = (props.boardSize === 4 ? "four" : 
              (props.boardSize === 5 ? "five" : 
                (props.boardSize === 6 ? "six" : 
                  (props.boardSize === 7 ? "seven" : 
                    (props.boardSize === 8 ? "eight" : 
                      (props.boardSize === 9 ? "nine" : "unknown"))))));

  if (val === "unknown") {
    val = "five";
    size = 5;
  }

  const [currentColor, setCurrentColor] = useState("red");
  const [freqOfColor, setFreqOfColor] = useState(new Map([
      ["red", 0],
      ["yellow", 0],
      ["blue", 0],
      ["pink", 0]
  ]));

  return (
    <>
    <div className="main">
      <div className="options">
        <input onClick={()=> setCurrentColor("red")} type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" defaultChecked/>
        <label className="btn btn-outline-primary option" htmlFor="btnradio1">Red</label>

        <input onClick={()=> setCurrentColor("yellow")} type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off"/>
        <label className="btn btn-outline-primary option" htmlFor="btnradio2">Yellow</label>

        <input onClick={()=> setCurrentColor("blue")} type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off"/>
        <label className="btn btn-outline-primary option" htmlFor="btnradio3">Blue</label>

        <input onClick={()=> setCurrentColor("pink")} type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off"/>
        <label className="btn btn-outline-primary option" htmlFor="btnradio4">Pink</label>
      </div>
      <div id={val} className="board">
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
 
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 5}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 5}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 5}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 5}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 5}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 5}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 5}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 5}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 5}></ColorElement>
       
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
        
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
       
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
       
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
      </div>
    </div>
    </>
  )
}

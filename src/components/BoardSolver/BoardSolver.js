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

  // The color selected
  const [currentColor, setCurrentColor] = useState("red");
  
  // Maintaining the frequency of the colors to avoid frequency more than 2
  const [freqOfColor, setFreqOfColor] = useState(new Map([
      ["red", 0],
      ["yellow", 0],
      ["blue", 0],
      ["pink", 0]
  ]));

  // Coordinates of the colors present on the puzzle grid
  const [coord, setCoord] = useState(new Map([
    ["red", []],
    ["yellow", []],
    ["blue", []],
    ["pink", []]
  ]))

  // Grid with solution to the puzzle
  const [solutionGrid, setSolutionGrid] = useState(Array(81).fill("undef"));

  // Main clear state
  const [mainClear, setMainClear] = useState(0);

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
      
      <button onClick={() =>{
          console.log(coord)
      }} id="solve" type="button" className="btn btn-outline-primary">Solve!!</button>

        <button onClick={() =>{
            setSolutionGrid(Array(81).fill("undef"));
            setCoord(new Map([
              ["red", []],
              ["yellow", []],
              ["blue", []],
              ["pink", []]
            ]));
            setFreqOfColor(new Map([
              ["red", 0],
              ["yellow", 0],
              ["blue", 0],
              ["pink", 0]
          ]));
            setMainClear(mainClear ^ 1);
        }} id="clear" type="button" className="btn btn-outline-primary">Clear</button>

      <div id={val} className="board">
        <ColorElement id={0}  mainClear={mainClear}   solutionColor={solutionGrid[0]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement id={1}  mainClear={mainClear}   solutionColor={solutionGrid[1]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement id={2}  mainClear={mainClear}   solutionColor={solutionGrid[2]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement id={3}  mainClear={mainClear}   solutionColor={solutionGrid[3]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement id={4}  mainClear={mainClear}   solutionColor={solutionGrid[4]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement id={5}  mainClear={mainClear}   solutionColor={solutionGrid[5]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement id={6}  mainClear={mainClear}   solutionColor={solutionGrid[6]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement id={7}  mainClear={mainClear}   solutionColor={solutionGrid[7]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement id={8}  mainClear={mainClear}   solutionColor={solutionGrid[8]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement id={9}  mainClear={mainClear}   solutionColor={solutionGrid[9]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement id={10} mainClear={mainClear}   solutionColor={solutionGrid[10]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement id={11} mainClear={mainClear}   solutionColor={solutionGrid[11]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement id={12} mainClear={mainClear}   solutionColor={solutionGrid[12]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement id={13} mainClear={mainClear}   solutionColor={solutionGrid[13]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement id={14} mainClear={mainClear}   solutionColor={solutionGrid[14]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
        <ColorElement id={15} mainClear={mainClear}   solutionColor={solutionGrid[15]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 4}></ColorElement>
  
        <ColorElement id={16} mainClear={mainClear}   solutionColor={solutionGrid[16]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 5}></ColorElement>
        <ColorElement id={17} mainClear={mainClear}   solutionColor={solutionGrid[17]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 5}></ColorElement>
        <ColorElement id={18} mainClear={mainClear}   solutionColor={solutionGrid[18]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 5}></ColorElement>
        <ColorElement id={19} mainClear={mainClear}   solutionColor={solutionGrid[19]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 5}></ColorElement>
        <ColorElement id={20} mainClear={mainClear}   solutionColor={solutionGrid[20]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 5}></ColorElement>
        <ColorElement id={21} mainClear={mainClear}   solutionColor={solutionGrid[21]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 5}></ColorElement>
        <ColorElement id={22} mainClear={mainClear}   solutionColor={solutionGrid[22]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 5}></ColorElement>
        <ColorElement id={23} mainClear={mainClear}   solutionColor={solutionGrid[23]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 5}></ColorElement>
        <ColorElement id={24} mainClear={mainClear}   solutionColor={solutionGrid[24]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 5}></ColorElement>
        
        <ColorElement id={25} mainClear={mainClear}   solutionColor={solutionGrid[25]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
        <ColorElement id={26} mainClear={mainClear}   solutionColor={solutionGrid[26]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
        <ColorElement id={27} mainClear={mainClear}   solutionColor={solutionGrid[27]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
        <ColorElement id={28} mainClear={mainClear}   solutionColor={solutionGrid[28]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
        <ColorElement id={29} mainClear={mainClear}   solutionColor={solutionGrid[29]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
        <ColorElement id={30} mainClear={mainClear}   solutionColor={solutionGrid[30]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
        <ColorElement id={31} mainClear={mainClear}   solutionColor={solutionGrid[31]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
        <ColorElement id={32} mainClear={mainClear}   solutionColor={solutionGrid[32]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
        <ColorElement id={33} mainClear={mainClear}   solutionColor={solutionGrid[33]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
        <ColorElement id={34} mainClear={mainClear}   solutionColor={solutionGrid[34]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
        <ColorElement id={35} mainClear={mainClear}   solutionColor={solutionGrid[35]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 6}></ColorElement>
         
        <ColorElement id={36} mainClear={mainClear}   solutionColor={solutionGrid[36]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement id={37} mainClear={mainClear}   solutionColor={solutionGrid[37]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement id={38} mainClear={mainClear}   solutionColor={solutionGrid[38]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement id={39} mainClear={mainClear}   solutionColor={solutionGrid[39]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement id={40} mainClear={mainClear}   solutionColor={solutionGrid[40]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement id={41} mainClear={mainClear}   solutionColor={solutionGrid[41]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement id={42} mainClear={mainClear}   solutionColor={solutionGrid[42]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement id={43} mainClear={mainClear}   solutionColor={solutionGrid[43]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement id={44} mainClear={mainClear}   solutionColor={solutionGrid[44]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement id={45} mainClear={mainClear}   solutionColor={solutionGrid[45]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement id={46} mainClear={mainClear}   solutionColor={solutionGrid[46]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement id={47} mainClear={mainClear}   solutionColor={solutionGrid[47]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        <ColorElement id={48} mainClear={mainClear}   solutionColor={solutionGrid[48]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 7}></ColorElement>
        
        <ColorElement id={49} mainClear={mainClear}   solutionColor={solutionGrid[49]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement id={50} mainClear={mainClear}   solutionColor={solutionGrid[50]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement id={51} mainClear={mainClear}   solutionColor={solutionGrid[51]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement id={52} mainClear={mainClear}   solutionColor={solutionGrid[52]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement id={53} mainClear={mainClear}   solutionColor={solutionGrid[53]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement id={54} mainClear={mainClear}   solutionColor={solutionGrid[54]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement id={55} mainClear={mainClear}   solutionColor={solutionGrid[55]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement id={56} mainClear={mainClear}   solutionColor={solutionGrid[56]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement id={57} mainClear={mainClear}   solutionColor={solutionGrid[57]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement id={58} mainClear={mainClear}   solutionColor={solutionGrid[58]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement id={59} mainClear={mainClear}   solutionColor={solutionGrid[59]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement id={60} mainClear={mainClear}   solutionColor={solutionGrid[60]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement id={61} mainClear={mainClear}   solutionColor={solutionGrid[61]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement id={62} mainClear={mainClear}   solutionColor={solutionGrid[62]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        <ColorElement id={63} mainClear={mainClear}   solutionColor={solutionGrid[63]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 8}></ColorElement>
        
        <ColorElement id={64} mainClear={mainClear}   solutionColor={solutionGrid[64]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement id={65} mainClear={mainClear}   solutionColor={solutionGrid[65]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement id={66} mainClear={mainClear}   solutionColor={solutionGrid[66]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement id={67} mainClear={mainClear}   solutionColor={solutionGrid[67]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement id={68} mainClear={mainClear}   solutionColor={solutionGrid[68]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement id={69} mainClear={mainClear}   solutionColor={solutionGrid[69]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement id={70} mainClear={mainClear}   solutionColor={solutionGrid[70]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement id={71} mainClear={mainClear}   solutionColor={solutionGrid[71]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement id={72} mainClear={mainClear}   solutionColor={solutionGrid[72]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement id={73} mainClear={mainClear}   solutionColor={solutionGrid[73]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement id={74} mainClear={mainClear}   solutionColor={solutionGrid[74]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement id={75} mainClear={mainClear}   solutionColor={solutionGrid[75]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement id={76} mainClear={mainClear}   solutionColor={solutionGrid[76]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement id={77} mainClear={mainClear}   solutionColor={solutionGrid[77]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement id={78} mainClear={mainClear}   solutionColor={solutionGrid[78]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement id={79} mainClear={mainClear}   solutionColor={solutionGrid[79]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
        <ColorElement id={80} mainClear={mainClear}   solutionColor={solutionGrid[80]} coord={coord} setCoord={setCoord} freqOfColor={freqOfColor} setFreqOfColor={setFreqOfColor} color={currentColor} valid={size >= 9}></ColorElement>
      </div>
    </div>
    </>
  )
}

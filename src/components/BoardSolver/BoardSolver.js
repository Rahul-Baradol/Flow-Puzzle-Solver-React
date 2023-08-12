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

    // The color selected
    const [currentColor, setCurrentColor] = useState("red");

    // Maintaining the frequency of the colors to avoid frequency more than 2
    const [freqOfColor, setFreqOfColor] = useState(new Map([
        ["red", 0],
        ["yellow", 0],
        ["blue", 0],
        ["green", 0],
        ["orange", 0]
    ]));
  
    // Coordinates of the colors present on the puzzle grid
    // Unit of coord is ID
    const [coord, setCoord] = useState(new Map([
      ["red", []],
      ["yellow", []],
      ["blue", []],
      ["green", []],
      ["orange", []]
    ]))

    if (val === "unknown") {
      val = "five";
      size = 5;
    }

    // Grid with solution to the puzzle
    const [solutionGrid, setSolutionGrid] = useState(["undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef","undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef","undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef","undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef","undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef","undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef","undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef","undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef","undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef"]);
  
    // Main clear state
    const [mainClear, setMainClear] = useState(0);

  // ----------------------------------------------- Puzzle Solver ----------------------------------------------- //
  let n = size;
  let m = size;
  let grid = [[-1, -1, -1, -1, -1, -1, -1, -1, -1],
              [-1, -1, -1, -1, -1, -1, -1, -1, -1],
              [-1, -1, -1, -1, -1, -1, -1, -1, -1],
              [-1, -1, -1, -1, -1, -1, -1, -1, -1],
              [-1, -1, -1, -1, -1, -1, -1, -1, -1],
              [-1, -1, -1, -1, -1, -1, -1, -1, -1],
              [-1, -1, -1, -1, -1, -1, -1, -1, -1],
              [-1, -1, -1, -1, -1, -1, -1, -1, -1],
              [-1, -1, -1, -1, -1, -1, -1, -1, -1]];
              
 let vis =    [[0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0]];
  let colorX = [[] , [], [], [], [], [], [], [], [] , [], [], [], [], [], [], [], [] , [], [], [], [], [], [], [], [], []]
  let colorY = [[] , [], [], [], [], [], [], [], [] , [], [], [], [], [], [], [], [] , [], [], [], [], [], [], [], [], []]
  let colorsAccToFreeMoves = [];

  // if (color === "blue") colorCode = 1;
  //       if (color === "green") colorCode = 6;
  //       if (color === "orange") colorCode = 14;
  //       if (color === "pink") colorCode = 15;
  //       if (color === "red") colorCode = 17;
  //       if (color === "violet") colorCode = 21;
  //       if (color === "yellow") colorCode = 24;
  let colorCodeToColor = new Map([
    [1, "blue"],
    [6, "green"],
    [14, "orange"],
    [15, "pink"],
    [17, "red"],
    [21, "violet"],
    [24, "yellow"],
    [-1, "white"] 
  ]);

  let colorToColorCode = new Map([
    ["blue", 1],
    ["green", 6],
    ["orange", 14],
    ["pink", 15],
    ["red", 17],
    ["violet", 21],
    ["yellow", 24],
    ["white", -1] 
  ]);

  let solved = false;

  let dr = [-1, 0, 1, 0];
  let dc = [0, -1, 0, 1];
  
  // Recursive function which traces the path of a color -> Depth First Search
  function solveThisColor(row, col, ind) {
    let color = colorsAccToFreeMoves[ind][1];
    if (solved === 1) { 
      return;
    }

    let prev = grid[row][col];
    let prevVis = vis[row][col];

    if (colorX[color][1] === row && colorY[color][1] === col) {
      vis[row][col] = 1;
      colorManager(ind+1);
      vis[row][col] = prevVis;
      return;
    }

    vis[row][col] = 1;
    grid[row][col] = color;

    // Continuing with current state of the grid
    for (let i = 0; i < 4; i++) {
      let newRow = row + dr[i];
      let newCol = col + dc[i];
      if (newRow < n && newCol < m && newRow >= 0 && newCol >= 0) {
        if (vis[newRow][newCol] === 0 || (vis[newRow][newCol] === 2 && grid[newRow][newCol] === color)) {
          solveThisColor(newRow, newCol, ind);
        }

        if (solved) return;
      }
    }

    grid[row][col] = prev;
    vis[row][col] = prevVis;
  }

  function colorManager(ind) {
    if (ind >= colorsAccToFreeMoves.length) {
      let ok = 1;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          if (vis[i][j] === 0) {
            ok = 0;
          }
        }
      }

      if (ok === 1) {
        solved = 1;
      }
      return;
    }

    if (solved === 1) {
      return;
    }

    let color = colorsAccToFreeMoves[ind][1];
    let row = colorX[color][0];
    let col = colorY[color][0];
    solveThisColor(row, col, ind);
  }

  // Starts Solving the puzzle  
  function main() {
    coord.forEach((coordinateId, color) => {
      if (coordinateId.length === 2) {
        let startId = coordinateId[0], endId = coordinateId[1];
  
        let startX = Math.floor(startId / size);
        let startY = startId % size;
  
        let endX = Math.floor(endId / size);
        let endY = endId % size;
        
        let colorCode = colorToColorCode.get(color);
       
        grid[startX][startY] = colorCode;
        grid[endX][endY] = colorCode;
        
        colorX[colorCode].push(startX);
        colorY[colorCode].push(startY);
        
        colorX[colorCode].push(endX);
        colorY[colorCode].push(endY);

        vis[startX][startY] = 2;
        vis[endX][endY] = 2;
      }
    });

    // Returns the free moves available at position (r, c)
    let checkFreeMoves = (r, c) => {
      let freeMoves = 0;
      for (let k = 0; k < 4; k++) {
        let newR = r + dr[k];
        let newC = c + dc[k];
        freeMoves += newR >= 0 && newC >= 0 && newR < n && newC < m && (grid[newR][newC] === -1);
      }
      return freeMoves;
    };

    for (let colorCode = 0; colorCode < 26; colorCode++) {
      if (colorX[colorCode].length === 0) continue;
      let r1 = colorX[colorCode][0], c1 = colorY[colorCode][0];
      let r2 = colorX[colorCode][1], c2 = colorY[colorCode][1];

      let freeMoves1 = checkFreeMoves(r1, c1);
      let freeMoves2 = checkFreeMoves(r2, c2);  
      if (freeMoves1 > freeMoves2) {
        let tmp = colorX[colorCode][0];
        colorX[colorCode][0] = colorX[colorCode][1];
        colorX[colorCode][1] = tmp;
        
        tmp = colorY[colorCode][0];
        colorY[colorCode][0] = colorY[colorCode][1];
        colorY[colorCode][1] = tmp;

        tmp = freeMoves1;
        freeMoves1 = freeMoves2;
        freeMoves2 = tmp;
      }

      colorsAccToFreeMoves.push([freeMoves1, colorCode]);
    }
  
    // sorting in ascending order of free moves
    colorsAccToFreeMoves.sort();

    colorManager(0);

    if (solved === 0) {
      console.log("Unable to solve the puzzle :(");
      return;
    }

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        grid[i][j] = colorCodeToColor.get(grid[i][j]);
      }
    }
  }

  // ----------------------------------------------- React Component ----------------------------------------------- //

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

        <input onClick={()=> setCurrentColor("green")} type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off"/>
        <label className="btn btn-outline-primary option" htmlFor="btnradio4">Green</label>

        <input onClick={()=> setCurrentColor("orange")} type="radio" className="btn-check" name="btnradio" id="btnradio5" autoComplete="off"/>
        <label className="btn btn-outline-primary option" htmlFor="btnradio5">Orange</label>
      </div>
      
      <button onClick={() =>{
        let solve = true;
        coord.forEach((coordinateId, color) => {
          if (coordinateId.length % 2) {
            solve = false;
          }
        });

        if (solve) {
          main();  
          let solutionTmp = [];
          for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
              solutionTmp.push(grid[i][j]);
            }
          }

          setSolutionGrid(solutionTmp);
        } else {
          console.log("Enter valid coordinates.");
        }
      }} id="solve" type="button" className="btn btn-outline-primary">Solve!!</button>

        <button onClick={() =>{
            setSolutionGrid(Array(81).fill("undef"));
            setCoord(new Map([
              ["red", []],
              ["yellow", []],
              ["blue", []],
              ["green", []],
              ["orange", []]
            ]));
            setFreqOfColor(new Map([
              ["red", 0],
              ["yellow", 0],
              ["blue", 0],
              ["green", 0],
              ["orange", 0]
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

import React, { useEffect, useState } from 'react'
import './BoardSolver.css'
import ColorElement from './ColorElement/ColorElement';
import AlertMessage from './AlertMessage/AlertMessage'

export default function BoardSolver(props) {

  useEffect(()=> {
    props.setIsBoard(1);
  }, [])

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
        ["orange", 0],
        ["cyan", 0],
        ["pink", 0],
        ["lightgreen", 0],
        ["lightblue", 0]
    ]));
  
    // Coordinates of the colors present on the puzzle grid
    // Unit of coord is ID
    const [coord, setCoord] = useState(new Map([
      ["red", []],
      ["yellow", []],
      ["blue", []],
      ["green", []],
      ["orange", []],
      ["cyan", []],
      ["pink", []],
      ["lightgreen", []],
      ["lightblue", []]
    ]))

    if (val === "unknown") {
      val = "five";
      size = 5;
    }

    // Grid with solution to the puzzle
    const [solutionGrid, setSolutionGrid] = useState(["undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef","undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef","undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef","undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef","undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef","undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef","undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef","undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef","undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef", "undef"]);
  
    // Main clear state
    const [mainClear, setMainClear] = useState(0);

    // Disable Solve Button
    const [disableSolve, setDisableSolve] = useState(0);

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
  
  let parent = []
  
  // Disjoint Set/ Union Find/ Merge Set -> Start
  function intializeDisjointSet(countOfNodes) {
    parent = [];
    for (let i = 0; i <= countOfNodes; i++) {
      parent.push(i);
    }
  }

  function findParent(node) {
    let ultimateParent = node;
    
    // Finding the ultimate parent
    while (parent[ultimateParent] !== ultimateParent) {
      ultimateParent = parent[ultimateParent];
    }

    // Path compression
    while (parent[node] !== node) {
      let previousNode = parent[node];
      parent[node] = ultimateParent;
      node = previousNode;
    }

    return ultimateParent;
  }

  function Union(x, y) {
    let px = findParent(x);
    let py = findParent(y);
    parent[px] = parent[py];
  }
  // Disjoint Set/ Union Find/ Merge Set -> End

  let colorX = [[] , [], [], [], [], [], [], [], [] , [], [], [], [], [], [], [], [] , [], [], [], [], [], [], [], [], []]
  let colorY = [[] , [], [], [], [], [], [], [], [] , [], [], [], [], [], [], [], [] , [], [], [], [], [], [], [], [], []]
  let colorsAccToFreeMoves = [];

  let colorCodeToColor = new Map([
    [0, "white"],
    [1, "red"],
    [2, "yellow"],
    [3, "blue"],
    [4, "green"],
    [5, "orange"],
    [6, "cyan"],
    [7, "pink"],
    [8, "lightgreen"],
    [9, "lightblue"]
  ]);

  let colorToColorCode = new Map([
    ["white", 0],
    ["red", 1],
    ["yellow", 2],
    ["blue", 3],
    ["green", 4],
    ["orange", 5],
    ["cyan", 6],
    ["pink", 7],
    ["lightgreen", 8],
    ["lightblue", 9]
  ]);

  let solved = false;

  let dr = [-1, 0, 1, 0];
  let dc = [0, -1, 0, 1];

  // Checks if there is a colour which cannot be connected 
  function checkForStuckColors(ind) {
    let stuckColorExists = false;

    for (let index = ind+1; index < colorsAccToFreeMoves.length; index++) {
      let element = colorsAccToFreeMoves[index];

      let color = element[1];

      let colorStartPosX = colorX[color][0];
      let colorStartPosY = colorY[color][0];

      let colorEndPosX = colorX[color][1];
      let colorEndPosY = colorY[color][1];

      let checkerGrid = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0]];

      let labelGrid = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0]];

      for (let row = 0; row < n; row++) {
        for (let col = 0; col < m; col++) {
          if (vis[row][col] === 0) {
            checkerGrid[row][col] = 1;
          }

          if (row === colorStartPosX && col === colorStartPosY) {
            checkerGrid[row][col] = 1;
          }

          if (row === colorEndPosX && col === colorEndPosY) {
            checkerGrid[row][col] = 1;
          }
        }
      }

      // Initializes the parent list of Disjoint Set
      intializeDisjointSet(n * m);
      let currentLabel = 0;

      for (let row = 0; row < n; row++) {
        for (let col = 0; col < m; col++) {
          if (checkerGrid[row][col] === 0) continue;
          let top = 0;
          let left = 0;

          if (col-1 >= 0 && checkerGrid[row][col-1] === 1) {
              left = labelGrid[row][col-1];
          }

          if (row-1 >= 0 && checkerGrid[row-1][col] === 1) {
              top = labelGrid[row-1][col];
          }
          
          if (top === 0 && left === 0) {
              currentLabel++;
              labelGrid[row][col] = currentLabel;
          }

          if (top !== 0 && left === 0) {
              labelGrid[row][col] = findParent(top);
          }

          if (top === 0 && left !== 0) {
              labelGrid[row][col] = findParent(left);
          }

          if (top !== 0 && left !== 0) {
              Union(top, left);
              labelGrid[row][col] = findParent(left);
          }
        }
      }

      let startParent = findParent(labelGrid[colorStartPosX][colorStartPosY]);
      let endParent = findParent(labelGrid[colorEndPosX][colorEndPosY]);

      // Check if the two positions of the color belong to the same component
      if (startParent !== endParent) {
        stuckColorExists = true;
        break;
      } 
    }

    return stuckColorExists;
  }
  
  // Function which returns true if the current state of the grid is solvable or returns false otherwise
  function performValidityCheck(ind, currentColor) {
    if (checkForStuckColors(ind)) {
      return false;
    }
    
    return true;
  }

  // Recursive function which traces the path of a color -> Depth First Search
  function solvePuzzle(row, col, ind) {
    if (solved === 1) { 
      return;
    }

    if (ind === colorsAccToFreeMoves.length) {
      let ok = 1;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          if (vis[i][j] === 0)
            ok = 0;
        }
      }

      if (ok === 1) {
        solved = 1;
      }
      return;
    }

    let color = colorsAccToFreeMoves[ind][1];

    let prev = grid[row][col];
    let prevVis = vis[row][col];

    if (colorX[color][1] === row && colorY[color][1] === col) {
      vis[row][col] = 1;
      
      // Move to next color state
        if (ind+1 === colorsAccToFreeMoves.length) {
          solvePuzzle(-1, -1, ind+1);
        } else {
          let newColor = colorsAccToFreeMoves[ind+1][1];
          let nextRow = colorX[newColor][0];
          let nextCol = colorY[newColor][0];
          solvePuzzle(nextRow, nextCol, ind+1);
        }
      // End

      vis[row][col] = prevVis;
      return;
    }

    vis[row][col] = 1;
    grid[row][col] = color;

    // Checking if the current state of the grid is solvable
    let isValidState = performValidityCheck(ind, color);
    if (!isValidState) {
      vis[row][col] = prevVis;
      grid[row][col] = prev;
      return; 
    }

    // Continuing with current state of the grid
    for (let i = 0; i < 4; i++) {
      let newRow = row + dr[i];
      let newCol = col + dc[i];
      if (newRow < n && newCol < m && newRow >= 0 && newCol >= 0) {
        if (vis[newRow][newCol] === 0 || (vis[newRow][newCol] === 2 && grid[newRow][newCol] === color)) {
          solvePuzzle(newRow, newCol, ind);
        }

        if (solved) return;
      }
    }

    grid[row][col] = prev;
    vis[row][col] = prevVis;
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

    // colorManager(0);
    let startColor = colorsAccToFreeMoves[0][1];
    let startX = colorX[startColor][0];
    let startY = colorY[startColor][0];
    solvePuzzle(startX, startY, 0);
  
    if (solved === 0) {
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
      <AlertMessage alert={props.alert}></AlertMessage>
      <div className="options">
        <input onClick={()=> setCurrentColor("red")} type="radio" className="btn-check" name="btnradio" id="red" autoComplete="off" defaultChecked/>
        <label id="redLabel" className="option" htmlFor="red"></label>

        <input onClick={()=> setCurrentColor("yellow")} type="radio" className="btn-check" name="btnradio" id="yellow" autoComplete="off"/>
        <label id="yellowLabel" className="option" htmlFor="yellow"></label>

        <input onClick={()=> setCurrentColor("blue")} type="radio" className="btn-check" name="btnradio" id="blue" autoComplete="off"/>
        <label id="blueLabel" className="option" htmlFor="blue"></label>

        <input onClick={()=> setCurrentColor("green")} type="radio" className="btn-check" name="btnradio" id="green" autoComplete="off"/>
        <label id="greenLabel" className="option" htmlFor="green"></label>

        <input onClick={()=> setCurrentColor("orange")} type="radio" className="btn-check" name="btnradio" id="orange" autoComplete="off"/>
        <label id="orangeLabel" className="option" htmlFor="orange"></label>

        <input onClick={()=> setCurrentColor("cyan")} type="radio" className="btn-check" name="btnradio" id="cyan" autoComplete="off"/>
        <label id="cyanLabel" className="option" htmlFor="cyan"></label>

        <input onClick={()=> setCurrentColor("pink")} type="radio" className="btn-check" name="btnradio" id="pink" autoComplete="off"/>
        <label id="pinkLabel" className="option" htmlFor="pink"></label>

        <input onClick={()=> setCurrentColor("lightgreen")} type="radio" className="btn-check" name="btnradio" id="lightgreen" autoComplete="off"/>
        <label id="lightgreenLabel" className="option" htmlFor="lightgreen"></label>

        <input onClick={()=> setCurrentColor("lightblue")} type="radio" className="btn-check" name="btnradio" id="lightblue" autoComplete="off"/>
        <label id="lightblueLabel" className="option" htmlFor="lightblue"></label>
      </div>
      
      <button id="solve" type="button" disabled={disableSolve} className="btn btn-outline-primary" onClick={() =>{
        let solve = true;
        let count = 0;
        
        coord.forEach((coordinateId, color) => {
          if (coordinateId.length % 2) {
            solve = false;
          }
          count += coordinateId.length;
        });
        
        if (solve && count) {
          setDisableSolve(1);
          // Starts solving the puzzle
          main();

          // Shows the puzzle to the user if exists
          let solutionTmp = [];
          for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
              solutionTmp.push(grid[i][j]);
            }
          }

          props.showAlert(
            solved ? "Puzzle is solved as follows!" : "Could not find the solution to the given puzzle",
            solved ? "success" : "primary",
            1  
          );

          setTimeout(()=> {
            props.showAlert(
              "Click on Clear to clear the board!",
              "primary",
              0
            );
          }, 3000);
          
          setSolutionGrid(solutionTmp);
        } else {
          props.showAlert(
            "Enter valid color configuration",
            "warning",
            1
          );
        }
      }}>Solve!!</button>

      <button id="clear" type="button" className="btn btn-outline-primary" onClick={() =>{
          props.showAlert(
            "Select two position for any color that you pick and lets see if a solution exists in which entire board can be filled connecting two ends of a color!",
            "primary",
            1
          );

          setDisableSolve(0);
          setSolutionGrid(Array(81).fill("undef"));
          setCoord(new Map([
            ["red", []],
            ["yellow", []],
            ["blue", []],
            ["green", []],
            ["orange", []],
            ["cyan", []],
            ["pink", []],
            ["lightgreen", []],
            ["lightblue", []]
          ]));
          setFreqOfColor(new Map([
            ["red", 0],
            ["yellow", 0],
            ["blue", 0],
            ["green", 0],
            ["orange", 0],
            ["cyan", 0],
            ["pink", 0],
            ["lightgreen", 0],
            ["lightblue", 0]
        ]));
        setMainClear(mainClear ^ 1);
        
        grid =  [[-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1]];
              
        vis =   [[0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]];
      }} >Clear</button>

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

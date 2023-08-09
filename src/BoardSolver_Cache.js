import React, { useState } from 'react'
import './BoardSolver.css'

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
  const [selectedIndex, setSelectedIndex] = useState(null);
  const items = [];

  for (let i = 1; i <= size * size; i++) {
    let style = {};
    if(selectedIndex !== null && i === selectedIndex){
        style = {
            backgroundColor: currentColor
        };
    }
    items.push(<div onClick={() => changeColor(i)} className="border border-gray-600 text-center" style={style}>
      {i}
    </div>)
  }
  function changeColor(index) {
    setSelectedIndex(index);
  }

  let test = (event) => {
    
  }

  return (
    <>
    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
      <input onClick={test} type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" defaultChecked/>
      <label className="btn btn-outline-primary" htmlFor="btnradio1">Red</label>

      <input onClick={test} type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off"/>
      <label className="btn btn-outline-primary" htmlFor="btnradio2">Yellow</label>

      <input onClick={test} type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off"/>
      <label className="btn btn-outline-primary" htmlFor="btnradio3">Blue</label>
      <input onClick={test} type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off"/>
      <label className="btn btn-outline-primary" htmlFor="btnradio4">Green</label>
    </div>
    <div id={val} className="board">
      {items}
    </div>
    </>
  );
}


// export default function BoardSolver(props) {
  // let size = props.boardSize;
  // let val = (props.boardSize === 4 ? "four" : 
  //             (props.boardSize === 5 ? "five" : 
  //               (props.boardSize === 6 ? "six" : 
  //                 (props.boardSize === 7 ? "seven" : 
  //                   (props.boardSize === 8 ? "eight" : 
  //                     (props.boardSize === 9 ? "nine" : "unknown"))))));

  // if (val === "unknown") {
  //   val = "five";
  //   size = 5;
  // }

  // const [colorSelected1, changeColor1] = useState("red");
  // const [colorSelected2, changeColor2] = useState("white");
  // const [colorSelected3, changeColor3] = useState("white");
  // const [colorSelected4, changeColor4] = useState("white");
  // const [colorSelected5, changeColor5] = useState("white");
  // const [colorSelected6, changeColor6] = useState("white");
  // const [colorSelected7, changeColor7] = useState("white");
  // const [colorSelected8, changeColor8] = useState("white");
  // const [colorSelected9, changeColor9] = useState("white");
  // const [colorSelected10, changeColor10] = useState("white");
  // const [colorSelected11, changeColor11] = useState("white");
  // const [colorSelected12, changeColor12] = useState("white");
  // const [colorSelected13, changeColor13] = useState("white");
  // const [colorSelected14, changeColor14] = useState("white");
  // const [colorSelected15, changeColor15] = useState("white");
  // const [colorSelected16, changeColor16] = useState("white");

  // let change = (event)=> {
    
  // }

  // return (
  //   <>
  //     <div id={val} className="board">      



  //     {/*  <div id="1" onClick={change} className="option" style={{display: (size >= 4) ? 'block' : 'none',
  //                                     backgroundColor: colorSelected1}}>Hello</div>
  //       <div className="option" style={{display: (size >= 4) ? 'block' : 'none' ,
  //                                     backgroundColor: colorSelected2}}>Hello</div>
  //       <div className="option" style={{display: (size >= 4) ? 'block' : 'none' ,
  //                                     backgroundColor: colorSelected3}}>Hello</div>
  //       <div className="option" style={{display: (size >= 4) ? 'block' : 'none' ,
  //                                     backgroundColor: colorSelected4}}>Hello</div>
  //       <div className="option" style={{display: (size >= 4) ? 'block' : 'none' ,
  //                                     backgroundColor: colorSelected5}}>Hello</div>
  //       <div className="option" style={{display: (size >= 4) ? 'block' : 'none' ,
  //                                     backgroundColor: colorSelected6}}>Hello</div>
  //       <div className="option" style={{display: (size >= 4) ? 'block' : 'none' ,
  //                                     backgroundColor: colorSelected7}}>Hello</div>
  //       <div className="option" style={{display: (size >= 4) ? 'block' : 'none' ,
  //                                     backgroundColor: colorSelected8}}>Hello</div>
  //       <div className="option" style={{display: (size >= 4) ? 'block' : 'none' ,
  //                                     backgroundColor: colorSelected9}}>Hello</div>
  //       <div className="option" style={{display: (size >= 4) ? 'block' : 'none' ,
  //                                     backgroundColor: colorSelected10}}>Hello</div>
  //       <div className="option" style={{display: (size >= 4) ? 'block' : 'none' ,
  //                                     backgroundColor: colorSelected11}}>Hello</div>
  //       <div className="option" style={{display: (size >= 4) ? 'block' : 'none' ,
  //                                     backgroundColor: colorSelected12}}>Hello</div>
  //       <div className="option" style={{display: (size >= 4) ? 'block' : 'none' ,
  //                                     backgroundColor: colorSelected13}}>Hello</div>
  //       <div className="option" style={{display: (size >= 4) ? 'block' : 'none' ,
  //                                     backgroundColor: colorSelected14}}>Hello</div>
  //       <div className="option" style={{display: (size >= 4) ? 'block' : 'none' ,
  //                                     backgroundColor: colorSelected15}}>Hello</div>
  //       <div className="option" style={{display: (size >= 4) ? 'block' : 'none' ,
  //                                     backgroundColor: colorSelected16}}>Hello</div>

  //       <div className="option" style={{display: (size >= 5) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 5) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 5) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 5) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 5) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 5) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 5) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 5) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 5) ? 'block' : 'none' }}>Hello</div>

  //       <div className="option" style={{display: (size >= 6) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 6) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 6) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 6) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 6) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 6) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 6) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 6) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 6) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 6) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 6) ? 'block' : 'none' }}>Hello</div>

  //       <div className="option" style={{display: (size >= 7) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 7) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 7) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 7) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 7) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 7) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 7) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 7) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 7) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 7) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 7) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 7) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 7) ? 'block' : 'none' }}>Hello</div>

  //       <div className="option" style={{display: (size >= 8) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 8) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 8) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 8) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 8) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 8) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 8) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 8) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 8) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 8) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 8) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 8) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 8) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 8) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 8) ? 'block' : 'none' }}>Hello</div>

  //       <div className="option" style={{display: (size >= 9) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 9) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 9) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 9) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 9) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 9) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 9) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 9) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 9) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 9) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 9) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 9) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 9) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 9) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 9) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 9) ? 'block' : 'none' }}>Hello</div>
  //       <div className="option" style={{display: (size >= 9) ? 'block' : 'none' }}>Hello</div> */}
  //     </div>
  //   </>  
  // )
// }

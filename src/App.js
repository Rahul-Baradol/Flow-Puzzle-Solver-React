import { useState } from "react";
import GridInfo from "./components/GridInfo/GridInfo";
import BoardSolver from "./components/BoardSolver/BoardSolver";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"
import About from "./components/About/About";

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

function App() {
  const [boardSize, setBoardSize] = useState(5);
  const [alert, setAlert] = useState({
    message: "Select two position for any color that you pick and lets see if a solution exists in which entire board can be filled connecting two ends of a color!",
    type: "primary"
  });

  let showAlert = (msg, typ, dismiss) => {
    setAlert({
      message: msg,
      type: typ
    })

    if (dismiss) {
      setTimeout(()=>{
        setAlert({
          message: "Select two position for any color that you pick and lets see if a solution exists in which entire board can be filled connecting two ends of a color!",
          type: "primary"
        });
      }, 3000)
    }
  };

  return (
    <> 
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<GridInfo setBoardSize={setBoardSize}/>}></Route>
          <Route path="/board" element={
            <BoardSolver boardSize={boardSize} showAlert={showAlert} alert={alert}/>
          }>
          </Route>
          <Route path="/about" element={<About/>}></Route>
        </Routes>

        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;

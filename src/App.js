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

  return (
    <> 
      <BrowserRouter>
        <Navbar></Navbar>

        <Routes>
          <Route path="/" element={<GridInfo setBoardSize={setBoardSize}/>}></Route>
          <Route path="/board" element={
              <BoardSolver boardSize={boardSize}/>}>    
          </Route>
          <Route path="/about" element={<About/>}></Route>
        </Routes>

        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;

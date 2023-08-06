import GridInfo from "./components/GridInfo/GridInfo";
import Navbar from "./components/NavbarComp/Navbar";
import Footer from "./components/Footer/Footer"
import About from "./components/About/About";

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

function App() {
  return (
    <> 
      <BrowserRouter>
        <Navbar></Navbar>

        <Routes>
          <Route path="/" element={<GridInfo/>}></Route>
          <Route path="/about" element={<About/>}></Route>
        </Routes>

        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;

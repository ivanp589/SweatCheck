import React from 'react';
//Pages
import Home from './pages/Home';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";


//styled components
import {StyledContainer} from './components/Styles';

//Loader css
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import{ BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <StyledContainer>
        <Routes>

          <Route path="/signup" element={<Signup/>} />

          
          <Route path="/login" element={<Login/>} />

          
          <Route path="/dashboard" element={<Dashboard/>} />

          
          <Route path="/" element={<Home/>} />


        </Routes>
      </StyledContainer>
    </Router>
  );
}

export default App;

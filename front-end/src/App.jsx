// import React from "react";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>

    </BrowserRouter>
  )
  
}

export default App; 
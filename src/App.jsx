import React from "react"
import Navbar from "./Components/Navbar/Navbar"
import Hero from "./Components/Hero/Hero"
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Manufacturers from './Components/Manufacturers/ManufacturersDashboard';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';

const App = () => {

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/manufacturers" element={<Manufacturers />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </BrowserRouter>

  )
}

export default App
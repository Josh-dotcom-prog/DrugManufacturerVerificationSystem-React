import React from "react"
import Navbar from "./Components/Navbar/Navbar"
import Hero from "./Components/Hero/Hero"
import Footer from "./Components/Footer/Footer"
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Add more routes as needed */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
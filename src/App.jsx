import React from "react"
import Navbar from "./Components/Navbar/Navbar"
import Hero from "./Components/Hero/Hero"
import AdminLogin from './Components/Auth/AdminLogin';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Manufacturers from './Components/Manufacturers/ManufacturersDashboard';
import ResultSection from "./Components/Drug Verification/ResultSection";
import AdminDashboard from "./Components/Administrators/AdminDashboard";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import UserRegistration from "./Components/Auth/UserRegistration";

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
            <Route path="/manufacturers" element={<Manufacturers />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/resultsection" element={<ResultSection />} />
            <Route path="/userregistration" element={<UserRegistration />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
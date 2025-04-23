// src/App.jsx
import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import AdminLogin from './Components/Auth/AdminLogin';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import ResultSection from "./Components/Drug Verification/ResultSection";
import AdminDashboard from "./Components/Administrators/AdminDashboard";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserRegistration from "./Components/Auth/UserRegistration";
import Layout from './Components/Layout/Layout';
import Drugs from "./Components/Manufacturers/Drugs";
import Batches from "./Components/Manufacturers/Batches";
import ManufacturersDashboard from "./Components/Manufacturers/ManufacturersDashboard";
import ManufacturerTable from "./Components/Administrators/ManufacturerTable";
import Approvals from "./Components/Administrators/Approvals";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Layout route with Navbar */}
          <Route element={<Layout />}>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Routes without Layout (no Navbar) */}
          <Route path="/manufacturersdashboard" element={<ManufacturersDashboard />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/resultsection" element={<ResultSection />} />
          <Route path="/userregistration" element={<UserRegistration />} />
          <Route path="/drugs" element={<Drugs />} />
          <Route path="/batches" element={<Batches />} />
          <Route path="/manufacturertable" element={<ManufacturerTable />} />
          <Route path="approvals" element={<Approvals />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

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
import ManufacturersDashboard from "./Components/Manufacturers/ManufacturersDashboard";
import ManufacturerTable from "./Components/Administrators/ManufacturerTable";
import Approvals from "./Components/Administrators/Approvals";
import DrugQRCode from "./Components/Manufacturers/DrugQRCode";
import DrugVerification from "./Components/Drug Verification/DrugVerification";
import ManufacturerDetails from "./Components/Administrators/ManufacturerDetails";
import DrugDetails from "./Components/Manufacturers/DrugDetails";
import Activation from "./Components/Manufacturers/Activation";

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

          <Route path="/manufacturertable" element={<ManufacturerTable />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="/qrcode" element={<DrugQRCode />} />
          <Route path="/verification" element={<DrugVerification />} />
          <Route path="/manufacturerdetails" element={<ManufacturerDetails />} />
          <Route path="/drugdetails/:id" element={<DrugDetails />} />
          <Route path="/activation" element={<Activation />} />
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

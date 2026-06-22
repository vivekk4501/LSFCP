import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import "./styles/App.css";

import Navbar from "./components/Navbar";
import DataManager from "./components/DataManager";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import FIRRegister from "./pages/FIRRegister";
import Summarization from "./pages/Summarization";
import FIRClassification from "./pages/FIRClassification";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Evidence from "./pages/Evidence";
import CaseDetails from "./pages/CaseDetails";
import Reports from "./pages/Reports";
import CaseAnalysis from "./pages/CaseAnalysis";

function AppContent() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Navigate to="/profile" />} />
        <Route path="/fir-register" element={<FIRRegister />} />
        <Route path="/summarize" element={<Summarization />} />
        <Route path="/fir" element={<FIRClassification />} />
        <Route path="/history" element={<History />} />
        <Route path="/case/:id" element={<CaseDetails />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/data-manager" element={<DataManager />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/evidence" element={<Evidence />} />
        <Route path="/analysis" element={<CaseAnalysis />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
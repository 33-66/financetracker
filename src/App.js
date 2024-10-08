// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContext } from './context/AuthContext'; 
import React, { useContext , useEffect} from 'react';
// import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const { auth } = useContext(AuthContext);

  // Debugging: Check auth state
  useEffect(() => {
    console.log('Current Auth State:', auth);
  }, [auth]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="pt-16"> {/* To offset the fixed Navbar height */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Features />
                  <CTA />
                </>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard/>
                </ProtectedRoute>
              }
            />
            {/* Add more routes as needed */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

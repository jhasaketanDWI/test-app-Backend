import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Raise from './pages/entrepreneur/Raise';
import EntrepreneurDashboard from './pages/entrepreneur/EntrepreneurDashboard';
import Invest from './pages/investor/Invest';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PasswordChange from './pages/auth/PasswordChange';
import About from './pages/About';
import EntrepreneurProfile from './pages/entrepreneur/EntrepreneurProfile';
import EntrepreneurMessages from './pages/entrepreneur/EntrepreneurMessages';
import InvestorDashboard from './pages/investor/InvestorDashboard';
import InvestorMessages from './pages/investor/InvestorMessages';
import InvestorProfile from './pages/investor/InvestorProfile';

import { ThemeProvider } from '@mui/material/styles';
import getTheme from './theme/theme';
// import AdminNav from './components/AdminNav'; // Removed, does not exist
// import UserManagament from './pages/admin/UserManagament'; // Removed, does not exist
import PlatformOverview from './pages/admin/PlatformOverview';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMessages from './pages/admin/AdminMessages';
import PlatformManagament from './pages/admin/PlatformManagament';

import { useState, useMemo } from 'react';



const seedMockUsers = () => {
  const users = [
    {
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      name: 'Admin User',
    },
    {
      email: 'investor1@example.com',
      password: 'investor123',
      role: 'investor',
      name: 'Investor One',
    },
    {
      email: 'entrepreneur1@example.com',
      password: 'entre123',
      role: 'entrepreneur',
      name: 'Entrepreneur One',
    },
  ];
  users.forEach(user => {
    if (!localStorage.getItem(`user_${user.email}`)) {
      localStorage.setItem(`user_${user.email}`, JSON.stringify(user));
    }
  });
};


const App = () => {
  const [mode, setMode] = useState('dark');
  const theme = useMemo(() => getTheme(mode), [mode]);

  // Seed mock users on app load
  React.useEffect(() => {
    seedMockUsers();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header mode={mode} setMode={setMode} />
        {/* AdminNav removed; Header handles navigation for all roles */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password-change" element={<PasswordChange />} />
          
          {/* Protected entrepreneur routes */}
          <Route path="/raise" element={<ProtectedRoute allowedRoles={['entrepreneur']}><Raise /></ProtectedRoute>} />
          <Route path="/entrepreneur/dashboard" element={<ProtectedRoute allowedRoles={['entrepreneur']}><EntrepreneurDashboard /></ProtectedRoute>} />
          <Route path="/entrepreneur/profile" element={<ProtectedRoute allowedRoles={['entrepreneur']}><EntrepreneurProfile /></ProtectedRoute>} />
          <Route path="/entrepreneur/messages" element={<ProtectedRoute allowedRoles={['entrepreneur']}><EntrepreneurMessages /></ProtectedRoute>} />
          <Route path="/entrepreneur/auth/passwordchange" element={<ProtectedRoute allowedRoles={['entrepreneur']}><PasswordChange /></ProtectedRoute>} />
          
          {/* Protected investor routes */}
          <Route path="/invest" element={<ProtectedRoute allowedRoles={['investor']}><Invest /></ProtectedRoute>} />
          <Route path="/investor/dashboard" element={<ProtectedRoute allowedRoles={['investor']}><InvestorDashboard /></ProtectedRoute>} />
          <Route path="/investor/messages" element={<ProtectedRoute allowedRoles={['investor']}><InvestorMessages /></ProtectedRoute>} />
          <Route path="/investor/profile" element={<ProtectedRoute allowedRoles={['investor']}><InvestorProfile /></ProtectedRoute>} />
          <Route path="/investor/passwordchange" element={<ProtectedRoute allowedRoles={['investor']}><PasswordChange /></ProtectedRoute>} />
          
          {/* Protected admin routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard mode={mode} setMode={setMode} /></ProtectedRoute>} />
          <Route path="/admin/platform-overview" element={<ProtectedRoute allowedRoles={['admin']}><PlatformOverview /></ProtectedRoute>} />
          <Route path="/admin/admin-messages" element={<ProtectedRoute allowedRoles={['admin']}><AdminMessages /></ProtectedRoute>} />
          <Route path="/admin/platform-management" element={<ProtectedRoute allowedRoles={['admin']}><PlatformManagament /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;

import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
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
          <Route path="/raise" element={<Raise />} />
          <Route path="/entrepreneur/dashboard" element={<EntrepreneurDashboard />} />
          <Route path="/entrepreneur/profile" element={<EntrepreneurProfile />} />
          <Route path="/entrepreneur/messages" element={<EntrepreneurMessages />} />
          <Route path="/invest" element={<Invest />} />
          <Route path="/investor/messages" element={<InvestorMessages />} />
          <Route path="/investor/profile" element={<InvestorProfile />} />
          <Route path="/investor/passwordchange" element={<PasswordChange />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password-change" element={<PasswordChange />} />
          <Route path="/entrepreneur/auth/passwordchange" element={<PasswordChange />} />
          <Route path="/investor/dashboard" element={<InvestorDashboard />} />
          {/* Admin routes */}
          {/* <Route path="/admin/user-management" element={<UserManagament />} /> */}
          <Route path="/admin/dashboard" element={<AdminDashboard mode={mode} setMode={setMode} />} />
          <Route path="/admin/platform-overview" element={<PlatformOverview />} />
          <Route path="/admin/admin-messages" element={<AdminMessages />} />
          <Route path="/admin/platform-management" element={<PlatformManagament />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;

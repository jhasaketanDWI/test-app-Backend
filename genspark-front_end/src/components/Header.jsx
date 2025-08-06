import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import { AppBar, Toolbar, Typography, Button, IconButton, Tooltip, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { BsInfoCircle, BsBarChart, BsCurrencyDollar, BsBoxArrowInRight, BsStars, BsSpeedometer2, BsEnvelope, BsPerson, BsBoxArrowRight, BsClipboardData, BsPeople, BsMegaphone } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';
import mylogo from '../assets/images/mylogo.png';


const Header = ({ mode, setMode }) => {
  const navigate = useNavigate();
  const isLight = mode === 'light';
  const [user, setUser] = useState(authService.getCurrentUser());
  const [role, setRole] = useState(user?.role);
  const location = useLocation();

  // Update user/role on route change or storage event
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setRole(currentUser?.role);
  }, [location]);
  
  useEffect(() => {
    const syncUser = () => {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
      setRole(currentUser?.role);
    };
    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      authService.logout();
      setUser(null);
      setRole(null);
      navigate('/login');
    }
  };

  const isAdmin = role === 'admin';
  const isEntrepreneur = role === 'entrepreneur';
  const isInvestor = role === 'investor';

  // Admin dropdown options
  const adminNavOptions = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <BsSpeedometer2 style={{ marginRight: 8 }} /> },
    { label: 'Platform Overview', path: '/admin/platform-overview', icon: <BsClipboardData style={{ marginRight: 8 }} /> },
    { label: 'Platform Management', path: '/admin/platform-management', icon: <BsPeople style={{ marginRight: 8 }} /> },
    { label: 'Announcements', path: '/admin/admin-messages', icon: <BsMegaphone style={{ marginRight: 8 }} /> },
  ];
  const [adminNav, setAdminNav] = useState(adminNavOptions[0].path);

  const handleAdminNavChange = (event) => {
    const value = event.target.value;
    setAdminNav(value);
    navigate(value);
  };

  return (
    <AppBar position="sticky" sx={theme => ({ top: 0, zIndex: 1201, bgcolor: theme.palette.primary.main })}>
      <Toolbar
        sx={{
          '& > :not(.MuiTypography-root)': {
            fontSize: '12px !important',
          },
        }}
      >
        <Typography
          variant="h6"
          sx={theme => ({ 
            flexGrow: 1, 
            color: theme.palette.secondary.main, 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
           })}
          onClick={() => navigate('/')}
        >
          <img
            src={mylogo}
            alt="GenSpark logo"
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              marginRight: 8,
              objectFit: 'cover',
              background: 'transparent',
            }}
          />
          GenSpark
        </Typography>
        
        {/* Admin dropdown menu for navigation */}
        {user && isAdmin && (
          <FormControl sx={{ minWidth: 180, mr: 2 }} size="small">
            <InputLabel id="admin-nav-label" sx={{ color: 'secondary.main' }}>Admin</InputLabel>
            <Select
              labelId="admin-nav-label"
              id="admin-nav-select"
              value={adminNav}
              label="Admin"
              onChange={handleAdminNavChange}
              sx={{ color: 'secondary.main', fontWeight: 700, background: 'rgba(255,255,255,0.04)', borderRadius: 1 }}
            >
              {adminNavOptions.map(opt => (
                <MenuItem value={opt.path} key={opt.path}>
                  {opt.icon}{opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        
        <Button
          sx={theme => ({
            color: theme.palette.secondary.main,
            position: 'relative',
            transition: 'color 0.2s, transform 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            '&:hover': {
              color: theme.palette.secondary.main,
              transform: 'scale(1.08)',
            },
            '&:after': {
              content: '""',
              display: 'block',
              position: 'absolute',
              left: 8,
              right: 8,
              bottom: 4,
              height: 2,
              borderRadius: 2,
              background: theme.palette.secondary.main,
              opacity: 0,
              transition: 'opacity 0.2s, background 0.2s',
            },
            '&:hover:after': {
              opacity: 1,
              background: theme.palette.secondary.main,
            },
          })}
          onClick={() => navigate('/about')}
        >
          <BsInfoCircle style={{ fontSize: 18, marginRight: 4 }} /> About
        </Button>
        
        {/* Show Raise only for not logged in or entrepreneur */}
        {(!user || isEntrepreneur) && !isAdmin && (
          <Button
            sx={theme => ({
              color: theme.palette.secondary.main,
              position: 'relative',
              transition: 'color 0.2s, transform 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '&:hover': {
                color: theme.palette.secondary.main,
                transform: 'scale(1.08)',
              },
              '&:after': {
                content: '""',
                display: 'block',
                position: 'absolute',
                left: 8,
                right: 8,
                bottom: 4,
                height: 2,
                borderRadius: 2,
                background: theme.palette.secondary.main,
                opacity: 0,
                transition: 'opacity 0.2s, background 0.2s',
              },
              '&:hover:after': {
                opacity: 1,
                background: theme.palette.secondary.main,
              },
            })}
            onClick={() => navigate(user ? '/raise' : '/login')}
          >
            <BsBarChart style={{ fontSize: 18, marginRight: 4 }} /> Raise
          </Button>
        )}
        
        {/* Show Invest only for not logged in or investor */}
        {(!user || isInvestor) && !isAdmin && (
          <Button
            sx={theme => ({
              color: theme.palette.secondary.main,
              position: 'relative',
              transition: 'color 0.2s, transform 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '&:hover': {
                color: theme.palette.secondary.main,
                transform: 'scale(1.08)',
              },
              '&:after': {
                content: '""',
                display: 'block',
                position: 'absolute',
                left: 8,
                right: 8,
                bottom: 4,
                height: 2,
                borderRadius: 2,
                background: theme.palette.secondary.main,
                opacity: 0,
                transition: 'opacity 0.2s, background 0.2s',
              },
              '&:hover:after': {
                opacity: 1,
                background: theme.palette.secondary.main,
              },
            })}
            onClick={() => navigate(user ? '/invest' : '/login')}
          >
            <BsCurrencyDollar style={{ fontSize: 18, marginRight: 4 }} /> Invest
          </Button>
        )}
        
        {/* Entrepreneur Dashboard button */}
        {user && isEntrepreneur && !isAdmin && (
          <Button
            sx={theme => ({
              color: theme.palette.secondary.main,
              position: 'relative',
              transition: 'color 0.2s, transform 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontWeight: 700,
              '&:hover': {
                color: theme.palette.secondary.main,
                transform: 'scale(1.08)',
              },
              '&:after': {
                content: '""',
                display: 'block',
                position: 'absolute',
                left: 8,
                right: 8,
                bottom: 4,
                height: 2,
                borderRadius: 2,
                background: theme.palette.secondary.main,
                opacity: 0,
                transition: 'opacity 0.2s, background 0.2s',
              },
              '&:hover:after': {
                opacity: 1,
                background: theme.palette.secondary.main,
              },
            })}
            onClick={() => navigate('/entrepreneur/dashboard')}
          >
            <BsSpeedometer2 style={{ fontSize: 18, marginRight: 4 }} /> Dashboard
          </Button>
        )}
        
        {/* Investor Dashboard button */}
        {user && isInvestor && !isAdmin && (
          <Button
            sx={theme => ({
              color: theme.palette.secondary.main,
              position: 'relative',
              transition: 'color 0.2s, transform 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontWeight: 700,
              '&:hover': {
                color: theme.palette.secondary.main,
                transform: 'scale(1.08)',
              },
              '&:after': {
                content: '""',
                display: 'block',
                position: 'absolute',
                left: 8,
                right: 8,
                bottom: 4,
                height: 2,
                borderRadius: 2,
                background: theme.palette.secondary.main,
                opacity: 0,
                transition: 'opacity 0.2s, background 0.2s',
              },
              '&:hover:after': {
                opacity: 1,
                background: theme.palette.secondary.main,
              },
            })}
            onClick={() => navigate('/investor/dashboard')}
          >
            <BsSpeedometer2 style={{ fontSize: 18, marginRight: 4 }} /> Dashboard
          </Button>
        )}
        
        {/* Messages, Profile, Logout for logged in users */}
        {user && (
          <>
            <Button
              sx={theme => ({
                color: theme.palette.secondary.main,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                position: 'relative',
                transition: 'color 0.2s, transform 0.2s',
                '&:hover': {
                  color: theme.palette.secondary.main,
                  transform: 'scale(1.08)',
                },
                '&:after': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  left: 8,
                  right: 8,
                  bottom: 4,
                  height: 2,
                  borderRadius: 2,
                  background: theme.palette.secondary.main,
                  opacity: 0,
                  transition: 'opacity 0.2s, background 0.2s',
                },
                '&:hover:after': {
                  opacity: 1,
                  background: theme.palette.secondary.main,
                },
              })}
              onClick={() => {
                if (isEntrepreneur) navigate('/entrepreneur/messages');
                else if (isInvestor) navigate('/investor/messages');
                else if (isAdmin) navigate('/admin/admin-messages?tab=messages');
              }}
            >
              <BsEnvelope style={{ fontSize: 17, marginRight: 3 }} /> Messages
            </Button>
            
            {(!isAdmin) && (
              <Button
                sx={theme => ({
                  color: theme.palette.secondary.main,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  position: 'relative',
                  transition: 'color 0.2s, transform 0.2s',
                  '&:hover': {
                    color: theme.palette.secondary.main,
                    transform: 'scale(1.08)',
                  },
                  '&:after': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    left: 8,
                    right: 8,
                    bottom: 4,
                    height: 2,
                    borderRadius: 2,
                    background: theme.palette.secondary.main,
                    opacity: 0,
                    transition: 'opacity 0.2s, background 0.2s',
                  },
                  '&:hover:after': {
                    opacity: 1,
                    background: theme.palette.secondary.main,
                  },
                })}
                onClick={() => {
                  if (isEntrepreneur) navigate('/entrepreneur/profile');
                  else if (isInvestor) navigate('/investor/profile');
                }}
              >
                <BsPerson style={{ fontSize: 17, marginRight: 3 }} /> Profile
              </Button>
            )}
            
            <Button 
              sx={theme => ({ 
                color: theme.palette.secondary.main, 
                fontWeight: 600, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1 
              })} 
              onClick={handleLogout}
            >
              <BsBoxArrowRight style={{ fontSize: 17, marginRight: 3 }} /> Logout
            </Button>
          </>
        )}
        
        {/* Login for not logged in users */}
        {!user && (
          <Button
            sx={theme => ({
              color: theme.palette.secondary.main,
              position: 'relative',
              transition: 'color 0.2s, transform 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '&:hover': {
                color: theme.palette.secondary.main,
                transform: 'scale(1.08)',
              },
              '&:after': {
                content: '""',
                display: 'block',
                position: 'absolute',
                left: 8,
                right: 8,
                bottom: 4,
                height: 2,
                borderRadius: 2,
                background: theme.palette.secondary.main,
                opacity: 0,
                transition: 'opacity 0.2s, background 0.2s',
              },
              '&:hover:after': {
                opacity: 1,
                background: theme.palette.secondary.main,
              },
            })}
            onClick={() => navigate('/login')}
          >
            <BsBoxArrowInRight style={{ fontSize: 18, marginRight: 4 }} /> Login
          </Button>
        )}
        
        <Tooltip title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}>
          <IconButton
            onClick={() => setMode(isLight ? 'dark' : 'light')}
            sx={theme => ({ ml: 2, color: theme.palette.secondary.main })}
            aria-label="toggle light/dark mode"
          >
            {isLight ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

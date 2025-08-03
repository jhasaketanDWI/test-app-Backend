import React from 'react';
import mylogo from '../assets/images/mylogo.png';
import { Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box component="footer" sx={theme => ({
      px: { xs: 2, md: 8 },
      py: 4,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      borderTop: `1px solid ${theme.palette.secondary.main}22`,
      mt: 8,
      position: 'relative',
      zIndex: 1202
    })}>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 1200,
        mx: 'auto',
        width: '100%',
        gap: { xs: 2, md: 4 }
      }}>
        {/* Logo, Name, Tagline, and Links in a single row/column */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 1.5, md: 4 }
        }}>
          {/* Logo, Name, Tagline */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, mr: { md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={mylogo}
                alt="GenSpark logo"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  marginRight: 16,
                  objectFit: 'cover',
                  background: 'transparent',
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1 }}>GenSpark</Typography>
            </Box>
            <Typography variant="subtitle2" sx={{ color: '#a259ff', fontWeight: 600, letterSpacing: 1, mt: 0.5 }}>
              Connect, Create, Capitalize
            </Typography>
          </Box>
          {/* Links */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 3 }}>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              sx={theme => ({
                fontWeight: 500,
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
                  bottom: 0,
                  height: 2,
                  borderRadius: 2,
                  background: theme.palette.primary.main,
                  opacity: 0,
                  transition: 'opacity 0.2s, background 0.2s',
                },
                '&:hover:after': {
                  opacity: 1,
                  background: theme.palette.primary.main,
                },
              })}
            >
              Terms and Conditions
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              sx={theme => ({
                fontWeight: 500,
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
                  bottom: 0,
                  height: 2,
                  borderRadius: 2,
                  background: theme.palette.primary.main,
                  opacity: 0,
                  transition: 'opacity 0.2s, background 0.2s',
                },
                '&:hover:after': {
                  opacity: 1,
                  background: theme.palette.primary.main,
                },
              })}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              sx={theme => ({
                fontWeight: 500,
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
                  bottom: 0,
                  height: 2,
                  borderRadius: 2,
                  background: theme.palette.primary.main,
                  opacity: 0,
                  transition: 'opacity 0.2s, background 0.2s',
                },
                '&:hover:after': {
                  opacity: 1,
                  background: theme.palette.primary.main,
                },
              })}
              onClick={e => { e.preventDefault(); navigate('/about'); }}
            >
              Contact
            </Link>
            <Link
              component="button"
              color="inherit"
              underline="hover"
              sx={theme => ({
                fontWeight: 500,
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
                  bottom: 0,
                  height: 2,
                  borderRadius: 2,
                  background: theme.palette.primary.main,
                  opacity: 0,
                  transition: 'opacity 0.2s, background 0.2s',
                },
                '&:hover:after': {
                  opacity: 1,
                  background: theme.palette.primary.main,
                },
              })}
              onClick={() => navigate('/login?admin=true')}
            >
              Admin Login
            </Link>
          </Box>
        </Box>
      </Box>
      <Typography variant="body2" align="center" sx={theme => ({ mt: 3, color: theme.palette.text.secondary })}>
        © 2025 GenSpark - Connect, Create, Capitalize - All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

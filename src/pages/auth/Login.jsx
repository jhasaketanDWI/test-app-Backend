

import React, { useState, useRef, useEffect } from 'react';
import BackgroundAnimation from '../../theme/BackgroundAnimation';
import { Box, Typography, TextField, Button, InputAdornment, IconButton, Card } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminLogin = new URLSearchParams(location.search).get('admin') === 'true';
  const pageTitle = isAdminLogin ? "Admin Portal" : "Login";

  useEffect(() => {
    const card = cardRef.current;
    const title = titleRef.current;
    const formElements = formRef.current?.children;
    if (card && title) {
      // Initial state - solid white box, no rotation, with shadow
      gsap.set(card, {
        scale: 1,
        opacity: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.12)',
        background: '#fff',
        transformOrigin: 'center center',
      });
      gsap.set(title, {
        opacity: 0,
        scale: 0.5,
        y: -20
      });
      if (formElements) {
        gsap.set(formElements, {
          opacity: 0,
          scale: 0.8,
          y: 20
        });
      }
      // Animation timeline - morph from white box to 3D card
      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(card, {
        background: 'linear-gradient(145deg, #ffffff, #f8f8f8, #f0f0f0, #f8f8f8)',
        boxShadow: 'none',
        rotateX: 60,
        rotateY: 45,
        rotateZ: 15,
        duration: 0.3,
        ease: 'power2.out',
      })
        .to(card, {
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          delay: 0.1,
        })
        .to(title, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.2,
          ease: 'back.out(1.7)',
        }, '-=0.4');
      if (formElements) {
        tl.to(formElements, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.15,
          stagger: 0.02,
          ease: 'back.out(1.7)',
        }, '-=0.3');
      }
      tl.to(card, {
        y: -5,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      }, '+=0.5');
    }
  }, [pageTitle]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Try to find user by email or phone in localStorage
      let user = null;
      if (email) {
        user = localStorage.getItem(`user_${email.toLowerCase()}`);
        if (!user && /^\d{10,}$/.test(email.replace(/[^\d]/g, ''))) {
          user = localStorage.getItem(`user_${email}`);
        }
      }
      if (user) {
        try {
          const userData = JSON.parse(user);
          if (userData.password === password) {
            // Set currentUser for header
            localStorage.setItem('currentUser', JSON.stringify(userData));
            if (userData.role === 'entrepreneur') {
              navigate('/entrepreneur/dashboard');
              return;
            } else if (userData.role === 'investor') {
              navigate('/investor/dashboard');
              return;
            } else if (userData.role === 'admin') {
              navigate('/admin/dashboard');
              return;
            }
          } else {
            setError('Invalid password.');
            return;
          }
        } catch {
          setError('Login error.');
          return;
        }
      } else {
        setError('User not found.');
        return;
      }
    }, 1200);
  };

  return (
    <>
      <BackgroundAnimation />
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
        <Card ref={cardRef} className="form-card" elevation={8} sx={{
          borderRadius: 0,
          boxShadow: 'none',
          background: 'linear-gradient(145deg, #ffffff, #f8f8f8, #f0f0f0, #f8f8f8)',
          boxSizing: 'border-box',
          transformStyle: 'preserve-3d',
          width: { xs: '100%', sm: 280, md: 320 },
          maxWidth: 320,
          minWidth: 240,
          px: { xs: 1, sm: 2 },
          py: 2.5,
          mx: 'auto',
          overflow: 'visible',
          minHeight: 300,
          position: 'relative',
          zIndex: 10,
          transition: 'none',
          '&::before': {
            // Right face
            content: '""',
            position: 'absolute',
            top: 0,
            right: -50,
            width: '50px',
            height: '100%',
            background: 'linear-gradient(135deg, #fff 80%, #e0e0e0 100%)',
            boxShadow: `inset 2px 0 4px rgba(0,0,0,0.08),inset -2px 0 4px rgba(0,0,0,0.10),0 0 8px rgba(180,180,180,0.10)`,
            transformOrigin: 'left center',
            transform: 'rotateY(90deg)',
            borderRadius: '0 8px 8px 0',
            zIndex: -1,
          },
          '&::after': {
            // Left face
            content: '""',
            position: 'absolute',
            top: 0,
            left: -50,
            width: '50px',
            height: '100%',
            background: 'linear-gradient(225deg, #fff 80%, #e0e0e0 100%)',
            boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.08),inset 2px 0 4px rgba(0,0,0,0.10),0 0 8px rgba(180,180,180,0.10)',
            borderRadius: '8px 0 0 8px',
            zIndex: 1,
            pointerEvents: 'none',
            transformOrigin: 'right center',
            transform: 'rotateY(-90deg)',
          },
          '&::bottom': {
            // Bottom face
            content: '""',
            position: 'absolute',
            bottom: -50,
            left: 0,
            right: 0,
            height: '50px',
            background: 'linear-gradient(0deg, #fff 80%, #e0e0e0 100%)',
            boxShadow: `inset 0 2px 4px rgba(0,0,0,0.08),inset 0 -2px 4px rgba(0,0,0,0.10),0 0 8px rgba(180,180,180,0.10)`,
            transformOrigin: 'center top',
            transform: 'rotateX(-90deg)',
            borderRadius: '0 0 8px 8px',
            zIndex: -2,
          },
        }}>
          <Typography ref={titleRef} className="form-title" variant="h5" align="center" sx={{
            mb: 2.5,
            fontWeight: 700,
            color: '#333',
            textShadow: '0 2px 8px rgba(0,0,0,0.2)',
            fontSize: 20,
            minHeight: 30,
            perspective: '1000px',
            transformStyle: 'preserve-3d',
            zIndex: 2,
            position: 'relative'
          }}>
            {pageTitle}
          </Typography>
          <form ref={formRef} onSubmit={handleLogin} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextField
              label=""
              placeholder="Email/Phone"
              type="text"
              fullWidth
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              sx={{
                mb: 1.5,
                background: 'transparent',
                borderRadius: 2,
                border: '1px solid #4a90e2',
                input: { color: '#333', fontSize: 14, py: 0.8 },
                minHeight: 36,
                fontSize: 14,
                transition: 'all 0.3s ease',
                '& .MuiInputBase-input::placeholder': {
                  color: '#666',
                  opacity: 1
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                  '&:hover': {
                    background: 'transparent',
                  },
                  '&.Mui-focused': {
                    background: 'transparent',
                  },
                  outline: 'none',
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:focus-within': {
                    outline: 'none',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  outline: 'none',
                  '&:focus': {
                    outline: 'none',
                  },
                },
                zIndex: 2,
                position: 'relative'
              }}
              InputLabelProps={{ style: { display: 'none' } }}
            />
            <TextField
              label=""
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: 1 }}>
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      size="small"
                      sx={{
                        color: '#666',
                        '&:hover': {
                          color: '#333',
                          backgroundColor: 'rgba(0,0,0,0.05)'
                        }
                      }}
                    >
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 0.5,
                background: 'transparent',
                borderRadius: 2,
                border: '1px solid #4a90e2',
                input: { color: '#333', fontSize: 14, py: 0.8 },
                minHeight: 36,
                fontSize: 14,
                transition: 'all 0.3s ease',
                '& .MuiInputBase-input::placeholder': {
                  color: '#666',
                  opacity: 1
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                  '&:hover': {
                    background: 'transparent',
                  },
                  '&.Mui-focused': {
                    background: 'transparent',
                  },
                  outline: 'none',
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:focus-within': {
                    outline: 'none',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  outline: 'none',
                  '&:focus': {
                    outline: 'none',
                  },
                },
                zIndex: 2,
                position: 'relative'
              }}
              InputLabelProps={{ style: { display: 'none' } }}
            />
            {error && (
              <Typography variant="body2" color="error" align="center" sx={{ mb: 1, fontSize: 12 }}>{error}</Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ fontWeight: 700, borderRadius: 2, py: 1.2, bgcolor: '#a259ff', color: '#fff', '&:hover': { bgcolor: '#fff', color: '#a259ff' } }}
            >
              {loading ? 'Authenticating...' : (isAdminLogin ? 'Access Portal' : 'Login')}
            </Button>
          </form>
          {/* Forgot Password and Register links */}
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button
              variant="text"
              size="small"
              sx={{ color: '#4a90e2', fontWeight: 500, textTransform: 'none', letterSpacing: 0, '&:hover': { textDecoration: 'underline', bgcolor: 'transparent' } }}
              onClick={() => navigate('/password-change')}
            >
              Forgot Password?
            </Button>
            { !isAdminLogin && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" sx={{ display: 'inline', color: '#666', fontSize: 14 }}>
                  Don't have an account?{' '}
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  sx={{ color: '#a259ff', fontWeight: 600, textTransform: 'none', letterSpacing: 0, '&:hover': { textDecoration: 'underline', bgcolor: 'transparent' } }}
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </Box>
            )}
          </Box>
        </Card>
      </Box>
    </>
  );
}

export default Login;

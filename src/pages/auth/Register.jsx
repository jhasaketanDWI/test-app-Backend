import React, { useState, useRef, useEffect } from 'react';
import BackgroundAnimation from '../../theme/BackgroundAnimation';
import { Box, Typography, TextField, Button, InputAdornment, IconButton, Card, Alert, Collapse } from '@mui/material';
import { Visibility, VisibilityOff, CheckCircle, ErrorOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const passwordChecks = [
  { label: 'At least 8 characters', test: v => v.length >= 8 },
  { label: 'One uppercase letter', test: v => /[A-Z]/.test(v) },
  { label: 'One lowercase letter', test: v => /[a-z]/.test(v) },
  { label: 'One number', test: v => /[0-9]/.test(v) },
  { label: 'One symbol', test: v => /[^A-Za-z0-9]/.test(v) },
];

const textFieldSx = {
  borderRadius: 2,
  minHeight: 36,
  fontSize: 14,
  transition: 'all 0.3s ease',
  zIndex: 2,
  position: 'relative',
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: '#4a90e2',
  },
  '& .MuiOutlinedInput-root': {
    '& input': { color: '#333', fontSize: 14, py: 0.8 },
  },
};

function PasswordField({ placeholder, value, onChange, show, setShow, endAdornment, ...props }) {
  return (
    <TextField
      placeholder={placeholder}
      type={show ? 'text' : 'password'}
      fullWidth
      required
      value={value}
      onChange={onChange}
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" sx={{ mr: 1 }}>
            <IconButton onClick={() => setShow(p => !p)} size="small" sx={{ color: '#666', '&:hover': { color: '#333', backgroundColor: 'rgba(0,0,0,0.05)' } }}>
              {show ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </IconButton>
          </InputAdornment>
        ),
        ...endAdornment,
      }}
      sx={{ mb: 0.5, ...textFieldSx }}
      InputLabelProps={{ shrink: true }}
      {...props}
    />
  );
}

const Register = () => {
  const [role, setRole] = useState('investor');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  // Removed unused: otp, otpSent
  const [phoneOtp, setPhoneOtp] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordChecks, setShowPasswordChecks] = useState(false);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const card = cardRef.current;
    const title = titleRef.current;
    const formElements = formRef.current?.children;
    if (card && title) {
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
      gsap.set(title, { opacity: 0, scale: 0.5, y: -20 });
      if (formElements) {
        gsap.set(formElements, { opacity: 0, scale: 0.8, y: 20 });
      }
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
  }, []);

  const handleSendPhoneOtp = () => {
    const phoneValid = /^\d{10,}$/.test(phone.replace(/[^\d]/g, ''));
    if (!phoneValid) {
      setOtpError('Enter a valid phone number');
      setPhoneOtpSent(false);
      return;
    }
    setPhoneOtpSent(true);
    setOtpError('');
    setTimeout(() => setPhoneOtp(''), 1000);
  };

  const handleSendEmailOtp = () => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      setOtpError('Enter a valid email');
      setEmailOtpSent(false);
      return;
    }
    setEmailOtpSent(true);
    setOtpError('');
    setTimeout(() => setEmailOtp(''), 1000);
  };

  const handleVerifyPhoneOtp = () => {
    if (phoneOtp === '123456') {
      setPhoneVerified(true);
      setOtpError('');
      setOtpSuccess('Phone OTP verified!');
    } else {
      setOtpError('Invalid phone OTP');
      setOtpSuccess('');
    }
  };

  const handleVerifyEmailOtp = () => {
    if (emailOtp === '123456') {
      setEmailVerified(true);
      setOtpError('');
      setOtpSuccess('Email OTP verified!');
    } else {
      setOtpError('Invalid email OTP');
      setOtpSuccess('');
    }
  };

  const handleRegister = e => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');
    if (!allValid || !passwordsMatch) {
      setShowPasswordChecks(true);
      return;
    }
    setShowPasswordChecks(false);
    setLoading(true);
    // Save user info to localStorage for demo/mock auth
    setTimeout(() => {
      setLoading(false);
      // Save by email and phone (if both provided)
      const userData = { role, name, phone, email, password };
      if (email) {
        localStorage.setItem(`user_${email.toLowerCase()}`, JSON.stringify(userData));
      }
      if (phone) {
        localStorage.setItem(`user_${phone}`, JSON.stringify(userData));
      }
      setRegisterSuccess('Registration successful!');
      setTimeout(() => navigate('/login'), 1200);
    }, 1200);
  };

  const passwordStatus = passwordChecks.map(rule => rule.test(password));
  const allValid = passwordStatus.every(Boolean);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  return (
    <>
      <BackgroundAnimation />
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
        <Card ref={cardRef} elevation={8} sx={{
          borderRadius:5,
          boxShadow: 'none',
          background: 'linear-gradient(145deg, #ffffff, #f8f8f8, #f0f0f0, #f8f8f8)',
          boxSizing: 'border-box',
          transformStyle: 'preserve-3d',
          width: { xs: '100%', sm: 320, md: 340 },
          maxWidth: 360,
          minWidth: 220,
          px: { xs: 1, sm: 2 },
          py: 2,
          mx: 'auto',
          overflow: 'visible',
          minHeight: 340,
          position: 'relative',
          zIndex: 10,
          transition: 'none',
        }}>
          <Typography ref={titleRef} variant="h5" align="center" sx={{ mb: 2.5, fontWeight: 700, color: '#333', textShadow: '0 2px 8px rgba(0,0,0,0.2)', fontSize: 20, minHeight: 30, perspective: '1000px', transformStyle: 'preserve-3d', zIndex: 2, position: 'relative' }}>
            Create an account now!
          </Typography>
          <form ref={formRef} onSubmit={handleRegister} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1, justifyContent: 'center' }}>
              <Button variant={role === 'investor' ? 'contained' : 'outlined'} size="small" sx={{ fontWeight: 600, borderRadius: 2, bgcolor: role === 'investor' ? '#a259ff' : '#fff', color: role === 'investor' ? '#fff' : '#a259ff', borderColor: '#a259ff', '&:hover': { bgcolor: '#a259ff', color: '#fff', borderColor: '#a259ff' } }} onClick={e => { e.preventDefault(); setRole('investor'); }}>Investor</Button>
              <Button variant={role === 'entrepreneur' ? 'contained' : 'outlined'} size="small" sx={{ fontWeight: 600, borderRadius: 2, bgcolor: role === 'entrepreneur' ? '#a259ff' : '#fff', color: role === 'entrepreneur' ? '#fff' : '#a259ff', borderColor: '#a259ff', '&:hover': { bgcolor: '#a259ff', color: '#fff', borderColor: '#a259ff' } }} onClick={e => { e.preventDefault(); setRole('entrepreneur'); }}>Entrepreneur</Button>
            </Box>
            <TextField placeholder="Full Name" type="text" fullWidth required value={name} onChange={e => setName(e.target.value)} variant="outlined" sx={{ mb: 1, background: 'transparent', borderRadius: 2, input: { color: '#333', fontSize: 14, py: 0.8 }, minHeight: 36, fontSize: 14, transition: 'all 0.3s ease', zIndex: 2, position: 'relative', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#4a90e2' }, '&:hover fieldset': { borderColor: '#4a90e2' }, '&.Mui-focused fieldset': { borderColor: '#4a90e2' } } }} InputLabelProps={{ shrink: false }} />
            <TextField 
              placeholder="Phone" 
              type="tel" 
              fullWidth 
              required 
              value={phone} 
              onChange={e => setPhone(e.target.value)} 
              variant="outlined" 
              sx={{ mb: 1, background: 'transparent', borderRadius: 2, input: { color: '#333', fontSize: 14, py: 0.8 }, minHeight: 36, fontSize: 14, transition: 'all 0.3s ease', zIndex: 2, position: 'relative', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#4a90e2' }, '&:hover fieldset': { borderColor: '#4a90e2' }, '&.Mui-focused fieldset': { borderColor: '#4a90e2' } } }} 
              InputLabelProps={{ shrink: false }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: 1 }}>
                    {phoneVerified ? (
                      <CheckCircle fontSize="small" sx={{ color: 'green' }} />
                    ) : (
                      <ErrorOutline fontSize="small" sx={{ color: '#b71c1c' }} />
                    )}
                  </InputAdornment>
                )
              }}
            />
            {!phoneVerified && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Button variant="outlined" size="small" sx={{ color: '#a259ff', borderColor: '#a259ff', fontWeight: 600, borderRadius: 2, '&:hover': { bgcolor: '#a259ff', color: '#fff', borderColor: '#a259ff' } }} onClick={handleSendPhoneOtp} disabled={phoneOtpSent || !phone}>
                  {phoneOtpSent ? 'OTP Sent' : 'Send OTP'}
                </Button>
                {phoneOtpSent && (
                  <>
                    <TextField placeholder="Enter OTP" type="text" value={phoneOtp} onChange={e => setPhoneOtp(e.target.value)} variant="outlined" sx={{ background: 'transparent', borderRadius: 2, input: { color: '#333', fontSize: 14, py: 0.8 }, minHeight: 36, fontSize: 14, width: 120, transition: 'all 0.3s ease', zIndex: 2, position: 'relative', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#4a90e2' }, '&:hover fieldset': { borderColor: '#4a90e2' }, '&.Mui-focused fieldset': { borderColor: '#4a90e2' } } }} InputLabelProps={{ shrink: false }} />
                    <Button variant="contained" size="small" sx={{ bgcolor: '#a259ff', color: '#fff', fontWeight: 700, borderRadius: 2, px: 2, '&:hover': { bgcolor: '#fff', color: '#a259ff' } }} onClick={handleVerifyPhoneOtp}>
                      Verify
                    </Button>
                  </>
                )}
              </Box>
            )}
            <TextField 
              placeholder="Email" 
              type="email" 
              fullWidth 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              variant="outlined" 
              sx={{ mb: 1, background: 'transparent', borderRadius: 2, input: { color: '#333', fontSize: 14, py: 0.8 }, minHeight: 36, fontSize: 14, transition: 'all 0.3s ease', zIndex: 2, position: 'relative', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#4a90e2' }, '&:hover fieldset': { borderColor: '#4a90e2' }, '&.Mui-focused fieldset': { borderColor: '#4a90e2' } } }} 
              InputLabelProps={{ shrink: false }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: 1 }}>
                    {emailVerified ? (
                      <CheckCircle fontSize="small" sx={{ color: 'green' }} />
                    ) : (
                      <ErrorOutline fontSize="small" sx={{ color: '#b71c1c' }} />
                    )}
                  </InputAdornment>
                )
              }}
            />
            {phoneVerified && !emailVerified && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Button variant="outlined" size="small" sx={{ color: '#a259ff', borderColor: '#a259ff', fontWeight: 600, borderRadius: 2, '&:hover': { bgcolor: '#a259ff', color: '#fff', borderColor: '#a259ff' } }} onClick={handleSendEmailOtp} disabled={emailOtpSent || !email}>
                  {emailOtpSent ? 'OTP Sent' : 'Send OTP'}
                </Button>
                {emailOtpSent && (
                  <>
                    <TextField placeholder="Enter OTP" type="text" value={emailOtp} onChange={e => setEmailOtp(e.target.value)} variant="outlined" sx={{ background: 'transparent', borderRadius: 2, input: { color: '#333', fontSize: 14, py: 0.8 }, minHeight: 36, fontSize: 14, width: 120, transition: 'all 0.3s ease', zIndex: 2, position: 'relative', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#4a90e2' }, '&:hover fieldset': { borderColor: '#4a90e2' }, '&.Mui-focused fieldset': { borderColor: '#4a90e2' } } }} InputLabelProps={{ shrink: false }} />
                    <Button variant="contained" size="small" sx={{ bgcolor: '#a259ff', color: '#fff', fontWeight: 700, borderRadius: 2, px: 2, '&:hover': { bgcolor: '#fff', color: '#a259ff' } }} onClick={handleVerifyEmailOtp}>
                      Verify
                    </Button>
                  </>
                )}
              </Box>
            )}
            <Collapse in={!!otpError}><Alert severity="error" sx={{ mb: 1 }}>{otpError}</Alert></Collapse>
            {/* Removed phone/email OTP verified success message */}
            <Collapse in={!!registerError}><Alert severity="error" sx={{ mb: 1 }}>{registerError}</Alert></Collapse>
            <Collapse in={!!registerSuccess}><Alert severity="success" sx={{ mb: 1 }}>{registerSuccess}</Alert></Collapse>
            <PasswordField
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              show={showPassword}
              setShow={setShowPassword}
            />
            {showPasswordChecks && !allValid && (
              <Box sx={{ mb: 1, pl: 1 }}>
                {passwordChecks.map((rule, i) => (
                  <Typography key={rule.label} variant="caption" sx={{ color: passwordStatus[i] ? 'green' : '#b71c1c', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {passwordStatus[i] ? <CheckCircle fontSize="inherit" sx={{ color: 'green' }} /> : <ErrorOutline fontSize="inherit" sx={{ color: '#b71c1c' }} />} {rule.label}
                  </Typography>
                ))}
              </Box>
            )}
            <PasswordField
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              show={showConfirmPassword}
              setShow={setShowConfirmPassword}
            />
            {confirmPassword && password && (
              <Typography variant="caption" sx={{ color: passwordsMatch ? 'green' : '#b71c1c', pl: 1, fontWeight: 600 }}>
                {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ fontWeight: 700, borderRadius: 2, py: 1.2, bgcolor: '#a259ff', color: '#fff', '&:hover': { bgcolor: '#fff', color: '#a259ff' } }}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
            <Box sx={{ mt: 1, textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: '#666' }}>
                Already have an account?{' '}
                <Button variant="text" size="small" sx={{ color: '#a259ff', textTransform: 'none', fontWeight: 600, minWidth: 0, p: 0, ml: 0.5 }} onClick={() => navigate('/login')}>
                  Login
                </Button>
              </Typography>
            </Box>
          </form>
        </Card>
      </Box>
    </>
  );
};

export default Register;

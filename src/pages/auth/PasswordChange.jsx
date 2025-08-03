import React, { useState, useRef, useEffect } from 'react';
import BackgroundAnimation from '../../theme/BackgroundAnimation';
import { Box, Typography, TextField, Button, InputAdornment, IconButton, Card, Alert, Collapse } from '@mui/material';
import { Visibility, VisibilityOff, CheckCircle, ErrorOutline } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const passwordChecks = [
  { label: 'At least 8 characters', test: v => v.length >= 8 },
  { label: 'One uppercase letter', test: v => /[A-Z]/.test(v) },
  { label: 'One lowercase letter', test: v => /[a-z]/.test(v) },
  { label: 'One number', test: v => /[0-9]/.test(v) },
  { label: 'One symbol', test: v => /[^A-Za-z0-9]/.test(v) },
];

const PasswordChange = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const initialMode = urlParams.get('mode') === 'forgot' ? 'forgot' : 'change';
  
  const [mode, setMode] = useState(initialMode); // 'change' or 'forgot'
  const [method, setMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changeError, setChangeError] = useState('');
  const [changeSuccess, setChangeSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordChecks, setShowPasswordChecks] = useState(false);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);

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
      // Remove floating card animation
      // tl.to(card, {
      //   y: -5,
      //   ease: 'sine.inOut',
      //   yoyo: true,
      //   repeat: -1,
      //   duration: 12 // Further increased duration for even slower floating movement
      // }, '+=0.5');
    }
  }, []);

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtpError('');
    setOtpSuccess('');
    setTimeout(() => setOtp(''), 1000);
  };

  const handleVerifyOtp = () => {
    if (otp === '123456') {
      setOtpVerified(true);
      setOtpError('');
      setOtpSuccess('OTP verified!');
    } else {
      setOtpError('Invalid OTP');
      setOtpSuccess('');
    }
  };

  const handleChangePassword = e => {
    e.preventDefault();
    setChangeError('');
    setChangeSuccess('');
    if (!allValid || !passwordsMatch) {
      setShowPasswordChecks(true);
      return;
    }
    setShowPasswordChecks(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setChangeSuccess('Password changed successfully!');
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
          borderRadius: 3,
          boxShadow: 'none',
          background: 'linear-gradient(145deg, #ffffff, #f8f8f8, #f0f0f0, #f8f8f8)',
          boxSizing: 'border-box',
          transformStyle: 'preserve-3d',
          width: { xs: '100%', sm: 320, md: 360 },
          maxWidth: 400,
          minWidth: 240,
          px: { xs: 1, sm: 2 },
          py: 2.5,
          mx: 'auto',
          overflow: 'visible',
          minHeight: 340,
          position: 'relative',
          zIndex: 10,
          transition: 'none',
        }}>
          <Typography ref={titleRef} variant="h5" align="center" sx={{ mb: 2.5, fontWeight: 700, color: '#333', textShadow: '0 2px 8px rgba(0,0,0,0.2)', fontSize: 20, minHeight: 30, perspective: '1000px', transformStyle: 'preserve-3d', zIndex: 2, position: 'relative' }}>
            {mode === 'change' ? 'Change Password' : 'Forgot Password'}
          </Typography>
          <Button variant="text" size="small" sx={{ color: '#a259ff', textTransform: 'none', fontWeight: 600, minWidth: 0, p: 0, mb: 1 }} onClick={() => setMode(mode === 'change' ? 'forgot' : 'change')}>
            {mode === 'change' ? 'Don\'t remember password? Use Email/Phone instead!' : 'Reset using old password?'}
          </Button>
          <form ref={formRef} onSubmit={handleChangePassword} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mode === 'change' ? (
              <>
                <TextField
                  placeholder="Old Password"
                  type={showOldPassword ? 'text' : 'password'}
                  fullWidth
                  required
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ mr: 1 }}>
                        <IconButton onClick={() => setShowOldPassword(p => !p)} size="small" sx={{ color: '#666', '&:hover': { color: '#333', backgroundColor: 'rgba(0,0,0,0.05)' } }}>
                          {showOldPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  sx={{ mb: 0.5, background: 'transparent', borderRadius: 2, border: 'none', input: { color: '#333', fontSize: 14, py: 0.8 }, minHeight: 36, fontSize: 14, transition: 'all 0.3s ease', zIndex: 2, position: 'relative' }}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  placeholder="New Password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ mr: 1 }}>
                        <IconButton onClick={() => setShowPassword(p => !p)} size="small" sx={{ color: '#666', '&:hover': { color: '#333', backgroundColor: 'rgba(0,0,0,0.05)' } }}>
                          {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  sx={{ mb: 0.5, background: 'transparent', borderRadius: 2, border: 'none', input: { color: '#333', fontSize: 14, py: 0.8, '::placeholder': { color: '#666', opacity: 1 } }, minHeight: 36, fontSize: 14, transition: 'all 0.3s ease', zIndex: 2, position: 'relative' }}
                  InputLabelProps={{ shrink: true }}
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
                <TextField
                  placeholder="Confirm New Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  fullWidth
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ mr: 1 }}>
                        <IconButton onClick={() => setShowConfirmPassword(p => !p)} size="small" sx={{ color: '#666', '&:hover': { color: '#333', backgroundColor: 'rgba(0,0,0,0.05)' } }}>
                          {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  sx={{ mb: 0.5, background: 'transparent', borderRadius: 2, border: 'none', input: { color: '#333', fontSize: 14, py: 0.8, '::placeholder': { color: '#666', opacity: 1 } }, minHeight: 36, fontSize: 14, transition: 'all 0.3s ease', zIndex: 2, position: 'relative' }}
                  InputLabelProps={{ shrink: true }}
                />
                {confirmPassword && password && (
                  <Typography variant="caption" sx={{ color: passwordsMatch ? 'green' : '#b71c1c', pl: 1, fontWeight: 600 }}>
                    {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                  </Typography>
                )}
                <Collapse in={!!changeError}><Alert severity="error" sx={{ mb: 1 }}>{changeError}</Alert></Collapse>
                <Collapse in={!!changeSuccess}><Alert severity="success" sx={{ mb: 1 }}>{changeSuccess}</Alert></Collapse>
                <Button type="submit" variant="contained" color="primary" disabled={loading || !oldPassword || !password || !confirmPassword} sx={{ fontWeight: 700, borderRadius: 2, py: 1.2, bgcolor: '#a259ff', color: '#fff', '&:hover': { bgcolor: '#fff', color: '#a259ff' } }}>
                  {loading ? 'Changing...' : 'Change Password'}
                </Button>
              </>
            ) : (
              <>
                <Box sx={{ display: 'flex', gap: 1, mb: 1, justifyContent: 'center' }}>
                  <Button variant={method === 'email' ? 'contained' : 'outlined'} size="small" sx={{ fontWeight: 600, borderRadius: 2, bgcolor: method === 'email' ? '#a259ff' : '#fff', color: method === 'email' ? '#fff' : '#a259ff', borderColor: '#a259ff', '&:hover': { bgcolor: '#a259ff', color: '#fff', borderColor: '#a259ff' } }} onClick={e => { e.preventDefault(); setMethod('email'); }}>Email</Button>
                  <Button variant={method === 'phone' ? 'contained' : 'outlined'} size="small" sx={{ fontWeight: 600, borderRadius: 2, bgcolor: method === 'phone' ? '#a259ff' : '#fff', color: method === 'phone' ? '#fff' : '#a259ff', borderColor: '#a259ff', '&:hover': { bgcolor: '#a259ff', color: '#fff', borderColor: '#a259ff' } }} onClick={e => { e.preventDefault(); setMethod('phone'); }}>Phone</Button>
                </Box>
                {method === 'email' ? (
                  <Box sx={{ mb: 1 }}>
                    <Box sx={{ position: 'relative' }}>
                      <TextField placeholder="Email" type="email" fullWidth required value={email} onChange={e => setEmail(e.target.value)} sx={{ background: 'transparent', borderRadius: 2, border: 'none', input: { color: '#333', fontSize: 14, py: 0.8 }, minHeight: 36, fontSize: 14, transition: 'all 0.3s ease', zIndex: 2, position: 'relative' }} InputLabelProps={{ shrink: false }} />
                      {/* OTP status icon on field */}
                      {(email || otpSent) && (
                        otpVerified ? <CheckCircle fontSize="small" sx={{ color: 'green', position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }} /> : <ErrorOutline fontSize="small" sx={{ color: '#b71c1c', position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }} />
                      )}
                    </Box>
                    {!otpVerified && (
                    <Typography variant="caption" sx={{ color: '#666', mt: 0.5, display: 'block', textAlign: 'center' }}>
                      Please verify your email
                    </Typography>
                    )}
                  </Box>
                ) : (
                  <Box sx={{ mb: 1 }}>
                    <Box sx={{ position: 'relative' }}>
                      <TextField placeholder="Phone" type="tel" fullWidth required value={phone} onChange={e => setPhone(e.target.value)} sx={{ background: 'transparent', borderRadius: 2, border: 'none', input: { color: '#333', fontSize: 14, py: 0.8 }, minHeight: 36, fontSize: 14, transition: 'all 0.3s ease', zIndex: 2, position: 'relative' }} InputLabelProps={{ shrink: false }} />
                      {/* OTP status icon on field */}
                      {(phone || otpSent) && (
                        otpVerified ? <CheckCircle fontSize="small" sx={{ color: 'green', position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }} /> : <ErrorOutline fontSize="small" sx={{ color: '#b71c1c', position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }} />
                      )}
                    </Box>
                    {!otpVerified && (
                    <Typography variant="caption" sx={{ color: '#666', mt: 0.5, display: 'block', textAlign: 'center' }}>
                      Please verify your phone
                    </Typography>
                    )}
                  </Box>
                )}
                {!otpVerified && (
                  !otpSent ? (
                    <Button variant="outlined" size="small" sx={{ mb: 1, color: '#a259ff', borderColor: '#a259ff', fontWeight: 600, borderRadius: 2, '&:hover': { bgcolor: '#a259ff', color: '#fff', borderColor: '#a259ff' } }} onClick={handleSendOtp} disabled={!(method === 'email' ? email : phone)}>
                      Send OTP
                    </Button>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <TextField label="OTP" placeholder="Enter OTP" type="text" fullWidth value={otp} onChange={e => setOtp(e.target.value)} sx={{ background: 'transparent', borderRadius: 2, border: '1px solid #4a90e2', input: { color: '#333', fontSize: 14, py: 0.8 }, minHeight: 36, fontSize: 14, transition: 'all 0.3s ease', zIndex: 2, position: 'relative' }} InputLabelProps={{ shrink: true }} />
                      <Button variant="contained" size="small" sx={{ bgcolor: '#a259ff', color: '#fff', fontWeight: 700, borderRadius: 2, px: 2, '&:hover': { bgcolor: '#fff', color: '#a259ff' } }} onClick={handleVerifyOtp}>
                        Verify
                      </Button>
                    </Box>
                  )
                )}
                {/* No OTP status text shown, only icon above */}
                <Collapse in={!!changeError}><Alert severity="error" sx={{ mb: 1 }}>{changeError}</Alert></Collapse>
                <Collapse in={!!changeSuccess}><Alert severity="success" sx={{ mb: 1 }}>{changeSuccess}</Alert></Collapse>
{!otpVerified ? (
                  <Box sx={{ position: 'relative', mb: 0.5 }}>
                    <Box sx={{ 
                      height: 36,
                      border: 'none',
                      borderRadius: 2,
                      background: '#f5f5f5',
                      display: 'flex',
                      alignItems: 'center',
                      px: 1.5,
                      color: '#666',
                      fontSize: 14
                    }}>
                      New Password
                    </Box>
                  </Box>
                ) : (
                  <TextField 
                    placeholder="New Password" 
                    type={showPassword ? 'text' : 'password'} 
                    fullWidth 
                    required 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    InputProps={{ 
                      endAdornment: (
                        <InputAdornment position="end" sx={{ mr: 1 }}>
                          <IconButton onClick={() => setShowPassword(p => !p)} size="small" sx={{ color: '#666', '&:hover': { color: '#333', backgroundColor: 'rgba(0,0,0,0.05)' } }}>
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      placeholder: 'New Password'
                    }} 
                    sx={{ 
                      mb: 0.5, 
                      background: 'transparent', 
                      borderRadius: 2, 
                      border: 'none',
                      '& .MuiOutlinedInput-root': { 
                        border: 'none',
                        '& fieldset': { border: 'none' },
                        '& input': { 
                          color: '#333', 
                          fontSize: 14, 
                          py: 0.8,
                          '&::placeholder': {
                            color: '#666 !important',
                            opacity: '1 !important',
                            fontWeight: '400 !important'
                          }
                        }
                      },
                      minHeight: 36, 
                      fontSize: 14, 
                      transition: 'all 0.3s ease', 
                      zIndex: 2, 
                      position: 'relative' 
                    }} 
                    InputLabelProps={{ shrink: false }} 
                  />
                )}
                {showPasswordChecks && !allValid && (
                  <Box sx={{ mb: 1, pl: 1 }}>
                    {passwordChecks.map((rule, i) => (
                      <Typography key={rule.label} variant="caption" sx={{ color: passwordStatus[i] ? 'green' : '#b71c1c', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {passwordStatus[i] ? <CheckCircle fontSize="inherit" sx={{ color: 'green' }} /> : <ErrorOutline fontSize="inherit" sx={{ color: '#b71c1c' }} />} {rule.label}
                      </Typography>
                    ))}
                  </Box>
                )}
{!otpVerified ? (
                  <Box sx={{ position: 'relative', mb: 0.5 }}>
                    <Box sx={{ 
                      height: 36,
                      border: 'none',
                      borderRadius: 2,
                      background: '#f5f5f5',
                      display: 'flex',
                      alignItems: 'center',
                      px: 1.5,
                      color: '#666',
                      fontSize: 14
                    }}>
                      Confirm New Password
                    </Box>
                  </Box>
                ) : (
                  <TextField 
                    placeholder="Confirm New Password" 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    fullWidth 
                    required 
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)} 
                    InputProps={{ 
                      endAdornment: (
                        <InputAdornment position="end" sx={{ mr: 1 }}>
                          <IconButton onClick={() => setShowConfirmPassword(p => !p)} size="small" sx={{ color: '#666', '&:hover': { color: '#333', backgroundColor: 'rgba(0,0,0,0.05)' } }}>
                            {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      placeholder: 'Confirm New Password'
                    }} 
                    sx={{ 
                      mb: 0.5, 
                      background: 'transparent', 
                      borderRadius: 2, 
                      border: 'none',
                      '& .MuiOutlinedInput-root': { 
                        border: 'none',
                        '& fieldset': { border: 'none' },
                        '& input': { 
                          color: '#333', 
                          fontSize: 14, 
                          py: 0.8,
                          '&::placeholder': {
                            color: '#666 !important',
                            opacity: '1 !important',
                            fontWeight: '400 !important'
                          }
                        }
                      },
                      minHeight: 36, 
                      fontSize: 14, 
                      transition: 'all 0.3s ease', 
                      zIndex: 2, 
                      position: 'relative' 
                    }} 
                    InputLabelProps={{ shrink: false }} 
                  />
                )}
                {confirmPassword && password && (
                  <Typography variant="caption" sx={{ color: passwordsMatch ? 'green' : '#b71c1c', pl: 1, fontWeight: 600 }}>
                    {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                  </Typography>
                )}
                <Button type="submit" variant="contained" color="primary" disabled={loading || !otpVerified || !password || !confirmPassword} sx={{ fontWeight: 700, borderRadius: 2, py: 1.2, bgcolor: '#a259ff', color: '#fff', '&:hover': { bgcolor: '#fff', color: '#a259ff' } }}>
                  {loading ? 'Changing...' : 'Change Password'}
                </Button>
              </>
            )}
          </form>
        </Card>
      </Box>
    </>
  );
};

export default PasswordChange;

import React, { useState, useEffect, useRef } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Avatar as MuiAvatar, InputAdornment, IconButton as MuiIconButton,
  Card, Typography, Button, Avatar, Box, Grid, Divider, IconButton, Container, Chip
} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { 
  Email, 
  Phone, 
  Business, 
  LocationOn, 
  Security,
  Edit,
  Logout,
  AttachMoney,
  Group,
  TrendingUp
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { gsap } from 'gsap';
import ContentAnimation from '../../theme/ContentAnimation';
import BackgroundAnimation from '../../theme/BackgroundAnimation';
import { useTheme } from '@mui/material/styles';

const InvestorProfile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@investor.com",
    phone: "+1 555 123 4567",
    company: "Venture Capital Group",
    industry: "Venture Capital",
    location: "New York, NY",
    avatar: "",
    investmentFocus: "CleanTech, SaaS, FinTech",
    portfolioSize: "12",
    totalInvested: "$2M",
    description: "Experienced investor with a focus on early-stage startups in technology and sustainability.",
    achievements: [
      "Invested in 12 startups",
      "$2M total invested",
      "3 successful exits",
      "Mentor at StartupHub"
    ],
    verificationDocs: {
      id: null,
      bank: null,
      source: null,
      support: null,
      agreement: null
    },
    verified: false
  });
  // Dialog state for document upload
  const [docDialogOpen, setDocDialogOpen] = useState(false);

  // Verification logic: all docs uploaded = verified
  useEffect(() => {
    const allDocsUploaded = Object.values(user.verificationDocs).every(Boolean);
    if (allDocsUploaded && !user.verified) {
      setUser(u => ({ ...u, verified: true }));
    }
  }, [user.verificationDocs]);
  const [editData, setEditData] = useState(() => ({ email: user.email, phone: user.phone, password: '', avatar: user.avatar }));
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const [editError, setEditError] = useState('');

  // Animation refs
  const cardRef = useRef(null);
  const avatarRef = useRef(null);
  const statsRefs = useRef([]);
  const achievementRefs = useRef([]);

  useEffect(() => {
    const card = cardRef.current;
    const avatar = avatarRef.current;

    if (card) {
      gsap.set(card, { 
        scale: 0.8, 
        opacity: 0, 
        y: 50,
        filter: 'blur(10px)'
      });
      gsap.set(avatar, {
        scale: 0,
        rotation: 180,
        opacity: 0
      });
      gsap.set(statsRefs.current, {
        x: -50,
        opacity: 0,
        scale: 0.8
      });
      gsap.set(achievementRefs.current, {
        y: 30,
        opacity: 0
      });
      const tl = gsap.timeline();
      tl.to(card, {
        scale: 1,
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: "power2.out"
      })
      .to(avatar, {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.5")
      .to(statsRefs.current, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.3")
      .to(achievementRefs.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.2");
    }
  }, []);

  // ... UI rendering similar to EntrepreneurProfile, but for investor fields ...

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <BackgroundAnimation />
      <Container maxWidth="md" sx={{ pt: 10 }}>
        <ContentAnimation direction="up">
          <Card ref={cardRef} sx={{ borderRadius: 4, p: 4, boxShadow: 6, background: theme.palette.mode === 'dark' ? 'rgba(30,30,40,0.75)' : 'rgba(255,255,255,0.85)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar ref={avatarRef} src={avatarPreview} sx={{ width: 100, height: 100, fontSize: 40, bgcolor: theme.palette.primary.main }}>{user.name[0]}</Avatar>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h5" fontWeight={700}>{user.name}</Typography>
                  {user.verified ? (
                    <CheckCircleIcon sx={{ color: '#2196f3', fontSize: 28 }} titleAccess="Verified Investor" />
                  ) : (
                    <Typography variant="subtitle2" sx={{ color: '#ff1744', fontWeight: 700, ml: 1 }}>(Not Verified)</Typography>
                  )}
                </Box>
                <Typography variant="subtitle1" color="text.secondary">{user.company}</Typography>
                <Typography variant="body2" color="text.secondary">{user.industry}</Typography>
                <Typography variant="body2" color="text.secondary">{user.location}</Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton onClick={() => setEditOpen(true)} color="secondary"><Edit /></IconButton>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Verification Documents</Typography>
            <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => setDocDialogOpen(true)}>
              {Object.values(user.verificationDocs).every(Boolean) ? 'All Documents Uploaded' : 'Upload Verification Documents'}
            </Button>
            {user.verified && (
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon sx={{ color: '#2196f3', fontSize: 24 }} />
                <Typography color="#2196f3" fontWeight={700}>Verified Investor</Typography>
              </Box>
            )}
      {/* Upload Verification Documents Dialog */}
      <Dialog open={docDialogOpen} onClose={() => setDocDialogOpen(false)} maxWidth="sm" fullWidth
        PaperProps={{
          sx: theme => ({
            bgcolor: theme.palette.primary.main,
            border: `2.5px solid ${theme.palette.primary.dark}`,
            borderRadius: 4,
            boxShadow: '0 8px 32px 0 rgba(44,44,44,0.18)',
            color: theme.palette.secondary.main,
          })
        }}
      >
        <DialogTitle sx={theme => ({
          color: theme.palette.secondary.main,
          fontWeight: 800,
          fontSize: 26,
          letterSpacing: 0.5,
          textAlign: 'center',
          bgcolor: 'transparent',
        })}>
          Upload Verification Documents
        </DialogTitle>
        <DialogContent sx={theme => ({
          bgcolor: 'transparent',
          color: theme.palette.secondary.main,
          px: { xs: 1, sm: 4 },
          py: 2,
        })}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Button component="label" variant={user.verificationDocs.id ? "contained" : "outlined"} color="secondary" fullWidth sx={theme => ({
              color: user.verificationDocs.id ? theme.palette.primary.main : theme.palette.secondary.main,
              fontWeight: 700,
              border: `2px solid ${theme.palette.secondary.main}`,
              bgcolor: user.verificationDocs.id ? theme.palette.secondary.main : 'transparent',
              '&:hover': {
                bgcolor: theme.palette.secondary.dark,
                color: theme.palette.primary.main,
              },
            })}>
              {user.verificationDocs.id ? `ID Uploaded: ${user.verificationDocs.id.name || 'File'}` : "Upload Government-issued Photo ID (passport or driver’s license)"}
              <input type="file" accept="image/*,.pdf" hidden onChange={e => {
                const file = e.target.files[0];
                if (file) setUser(u => ({ ...u, verificationDocs: { ...u.verificationDocs, id: file } }));
              }} />
            </Button>
            <Button component="label" variant={user.verificationDocs.bank ? "contained" : "outlined"} color="secondary" fullWidth sx={theme => ({
              color: user.verificationDocs.bank ? theme.palette.primary.main : theme.palette.secondary.main,
              fontWeight: 700,
              border: `2px solid ${theme.palette.secondary.main}`,
              bgcolor: user.verificationDocs.bank ? theme.palette.secondary.main : 'transparent',
              '&:hover': {
                bgcolor: theme.palette.secondary.dark,
                color: theme.palette.primary.main,
              },
            })}>
              {user.verificationDocs.bank ? `Bank Statement Uploaded: ${user.verificationDocs.bank.name || 'File'}` : "Upload Bank Statement showing available funds"}
              <input type="file" accept="image/*,.pdf" hidden onChange={e => {
                const file = e.target.files[0];
                if (file) setUser(u => ({ ...u, verificationDocs: { ...u.verificationDocs, bank: file } }));
              }} />
            </Button>
            <Button component="label" variant={user.verificationDocs.source ? "contained" : "outlined"} color="secondary" fullWidth sx={theme => ({
              color: user.verificationDocs.source ? theme.palette.primary.main : theme.palette.secondary.main,
              fontWeight: 700,
              border: `2px solid ${theme.palette.secondary.main}`,
              bgcolor: user.verificationDocs.source ? theme.palette.secondary.main : 'transparent',
              '&:hover': {
                bgcolor: theme.palette.secondary.dark,
                color: theme.palette.primary.main,
              },
            })}>
              {user.verificationDocs.source ? `Source Explanation Uploaded: ${user.verificationDocs.source.name || 'File'}` : "Upload Written Explanation of Money Source"}
              <input type="file" accept="image/*,.pdf,.txt" hidden onChange={e => {
                const file = e.target.files[0];
                if (file) setUser(u => ({ ...u, verificationDocs: { ...u.verificationDocs, source: file } }));
              }} />
            </Button>
            <Button component="label" variant={user.verificationDocs.support ? "contained" : "outlined"} color="secondary" fullWidth sx={theme => ({
              color: user.verificationDocs.support ? theme.palette.primary.main : theme.palette.secondary.main,
              fontWeight: 700,
              border: `2px solid ${theme.palette.secondary.main}`,
              bgcolor: user.verificationDocs.support ? theme.palette.secondary.main : 'transparent',
              '&:hover': {
                bgcolor: theme.palette.secondary.dark,
                color: theme.palette.primary.main,
              },
            })}>
              {user.verificationDocs.support ? `Supporting Doc Uploaded: ${user.verificationDocs.support.name || 'File'}` : "Upload Supporting Document (tax return, business income proof, or inheritance letter)"}
              <input type="file" accept="image/*,.pdf" hidden onChange={e => {
                const file = e.target.files[0];
                if (file) setUser(u => ({ ...u, verificationDocs: { ...u.verificationDocs, support: file } }));
              }} />
            </Button>
            <Button component="label" variant={user.verificationDocs.agreement ? "contained" : "outlined"} color="secondary" fullWidth sx={theme => ({
              color: user.verificationDocs.agreement ? theme.palette.primary.main : theme.palette.secondary.main,
              fontWeight: 700,
              border: `2px solid ${theme.palette.secondary.main}`,
              bgcolor: user.verificationDocs.agreement ? theme.palette.secondary.main : 'transparent',
              '&:hover': {
                bgcolor: theme.palette.secondary.dark,
                color: theme.palette.primary.main,
              },
            })}>
              {user.verificationDocs.agreement ? `Agreement Uploaded: ${user.verificationDocs.agreement.name || 'File'}` : "Upload Signed Agreement stating money source is legitimate"}
              <input type="file" accept="image/*,.pdf" hidden onChange={e => {
                const file = e.target.files[0];
                if (file) setUser(u => ({ ...u, verificationDocs: { ...u.verificationDocs, agreement: file } }));
              }} />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: 'transparent', px: 3, pb: 2 }}>
          <Button onClick={() => setDocDialogOpen(false)} color="secondary" variant="contained" sx={theme => ({
            fontWeight: 700,
            bgcolor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            borderRadius: 2,
            px: 4,
            '&:hover': {
              bgcolor: theme.palette.secondary.dark,
              color: theme.palette.primary.main,
            },
          })}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box ref={el => statsRefs.current[0] = el}>
                  <Typography variant="subtitle2" color="text.secondary">Investment Focus</Typography>
                  <Typography variant="body1" fontWeight={600}>{user.investmentFocus}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box ref={el => statsRefs.current[1] = el}>
                  <Typography variant="subtitle2" color="text.secondary">Portfolio Size</Typography>
                  <Typography variant="body1" fontWeight={600}>{user.portfolioSize}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box ref={el => statsRefs.current[2] = el}>
                  <Typography variant="subtitle2" color="text.secondary">Total Invested</Typography>
                  <Typography variant="body1" fontWeight={600}>{user.totalInvested}</Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ my: 3 }} />
            <Typography variant="subtitle2" color="text.secondary">About</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{user.description}</Typography>
            <Typography variant="subtitle2" color="text.secondary">Achievements</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {user.achievements.map((ach, idx) => (
                <Chip key={idx} label={ach} color="primary" ref={el => achievementRefs.current[idx] = el} />
              ))}
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" color="secondary" onClick={() => navigate('/investor/passwordchange')}>Change Password</Button>
              <Button variant="outlined" color="secondary" onClick={() => navigate('/investor/dashboard')}>Back to Dashboard</Button>
            </Box>
          </Card>
        </ContentAnimation>
      </Container>
      {/* Edit Profile Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={editData.email}
            onChange={e => setEditData({ ...editData, email: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              )
            }}
          />
          <TextField
            margin="dense"
            label="Phone"
            type="tel"
            fullWidth
            value={editData.phone}
            onChange={e => setEditData({ ...editData, phone: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              )
            }}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={editData.password}
            onChange={e => setEditData({ ...editData, password: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Security />
                </InputAdornment>
              )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} color="primary">Cancel</Button>
          <Button onClick={() => setEditOpen(false)} color="secondary" variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InvestorProfile;

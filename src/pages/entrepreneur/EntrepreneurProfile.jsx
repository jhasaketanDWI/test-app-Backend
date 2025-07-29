import React, { useState, useEffect, useRef } from "react";
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

const EntrepreneurProfile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [user, setUser] = useState({
    name: "Sarah Johnson",
    email: "sarah@ecotech.com",
    phone: "+1 234 567 8900",
    company: "EcoTech Solutions",
    industry: "CleanTech",
    location: "San Francisco, CA",
    avatar: "",
    fundingGoal: "$500,000",
    currentStage: "Series A",
    teamSize: "8",
    fundingRaised: "$120K",
    description: "Revolutionary solar panel technology that increases efficiency by 40% while reducing costs.",
    achievements: [
      "40% efficiency improvement",
      "3 major partnerships", 
      "Patent pending technology",
      "$120K raised so far"
    ]
  });
  // These must be after user is defined
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
      // Initial state
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
      // Animation timeline
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

  const handleEditProfileOpen = () => {
    setEditData({ email: user.email, phone: user.phone, password: '', avatar: user.avatar });
    setAvatarPreview(user.avatar);
    setEditError('');
    setEditOpen(true);
  };

  const handleEditProfileClose = () => {
    setEditOpen(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatarPreview(ev.target.result);
        setEditData((prev) => ({ ...prev, avatar: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfileSave = () => {
    // Simulate password check (replace with real auth in production)
    if (editData.password !== 'password123') {
      setEditError('Password is incorrect.');
      return;
    }
    setUser((prev) => ({ ...prev, email: editData.email, phone: editData.phone, avatar: editData.avatar }));
    setEditOpen(false);
  };

  const handleChangePassword = () => {
    navigate('/entrepreneur/auth/passwordchange');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/Entrepreneur/Dashboard');
  };

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', zIndex: 2, pt: { xs: 7, md: 10 }, px: { xs: 2, md: 4 } }}>
      <BackgroundAnimation />
      <ContentAnimation direction="left">
        <Typography variant="h4" fontWeight={800} sx={{ color: theme.palette.secondary.main, mb: 3, letterSpacing: 1 }}>
          Entrepreneur Profile
        </Typography>
      </ContentAnimation>
      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 2 }}>
        <Card ref={cardRef} sx={{
          maxWidth: 900,
          mx: 'auto',
          p: 4,
          borderRadius: 4,
          backgroundColor: theme.palette.background.paper,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 20px 60px rgba(74, 144, 226, 0.12)'
        }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
              Entrepreneur Profile
            </Typography>
            <IconButton onClick={handleLogout} sx={{ color: theme.palette.secondary.main }}>
              <Logout />
            </IconButton>
          </Box>
          {/* Profile Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar 
              ref={avatarRef}
              sx={{ 
                width: 100, 
                height: 100, 
                mr: 3,
                backgroundColor: theme.palette.secondary.main,
                fontSize: 40,
                border: `3px solid ${theme.palette.primary.main}`
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1 }}>
                {user.name}
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                {user.company} • {user.industry}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                {user.description}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={handleEditProfileOpen}
                sx={{
                  borderColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.main,
                  fontWeight: 600,
                  mr: 2,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover
                  }
                }}
              >
                Edit Profile
              </Button>
      {/* Edit Profile Dialog */}
      <Dialog open={editOpen} onClose={handleEditProfileClose} maxWidth="xs" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <MuiAvatar src={avatarPreview} sx={{ width: 80, height: 80, mb: 1 }} />
            <label htmlFor="avatar-upload">
              <input
                accept="image/*"
                id="avatar-upload"
                type="file"
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
              />
              <MuiIconButton color="primary" component="span">
                <PhotoCamera />
              </MuiIconButton>
            </label>
          </Box>
          <TextField
            label="Email"
            name="email"
            value={editData.email}
            onChange={handleEditInputChange}
            fullWidth
            type="email"
            variant="outlined"
          />
          <TextField
            label="Phone"
            name="phone"
            value={editData.phone}
            onChange={handleEditInputChange}
            fullWidth
            type="tel"
            variant="outlined"
          />
          <TextField
            label="Password (required to save)"
            name="password"
            value={editData.password}
            onChange={handleEditInputChange}
            fullWidth
            type="password"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end"><Security /></InputAdornment>
            }}
            helperText="Enter your password to confirm changes. (Demo: password123)"
            error={!!editError}
          />
          {editError && (
            <Typography color="error" variant="body2">{editError}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditProfileClose}>Cancel</Button>
          <Button variant="contained" onClick={handleEditProfileSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
              <Button
                variant="outlined"
                startIcon={<Email />}
                onClick={() => navigate('/entrepreneur/messages')}
                sx={{
                  borderColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.main,
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover
                  }
                }}
              >
                Messages
              </Button>
            </Box>
          </Box>
          <Divider sx={{ mb: 4, borderColor: theme.palette.divider }} />
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={3}>
              <Card 
                ref={el => statsRefs.current[0] = el}
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  backgroundColor: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 3
                }}
              >
                <AttachMoney sx={{ fontSize: 40, color: theme.palette.secondary.main, mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.secondary.main, mb: 1 }}>
                  {user.fundingGoal}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Funding Goal
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card 
                ref={el => statsRefs.current[1] = el}
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  backgroundColor: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 3
                }}
              >
                <TrendingUp sx={{ fontSize: 40, color: theme.palette.secondary.main, mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.secondary.main, mb: 1 }}>
                  {user.currentStage}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Current Stage
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card 
                ref={el => statsRefs.current[2] = el}
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  backgroundColor: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 3
                }}
              >
                <Group sx={{ fontSize: 40, color: theme.palette.secondary.main, mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.secondary.main, mb: 1 }}>
                  {user.teamSize}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Team Size
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card 
                ref={el => statsRefs.current[3] = el}
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  backgroundColor: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 3
                }}
              >
                <AttachMoney sx={{ fontSize: 40, color: theme.palette.secondary.main, mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.secondary.main, mb: 1 }}>
                  {user.fundingRaised}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Funding Raised
                </Typography>
              </Card>
            </Grid>
          </Grid>
          {/* Achievements */}
          <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 3 }}>
            Key Achievements
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {user.achievements.map((achievement, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Chip
                  ref={el => achievementRefs.current[index] = el}
                  label={achievement}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    py: 1,
                    px: 2,
                    backgroundColor: theme.palette.secondary.light,
                    color: theme.palette.secondary.contrastText,
                    fontWeight: 600,
                    '& .MuiChip-label': {
                      whiteSpace: 'normal',
                      textAlign: 'center',
                      color: theme.palette.secondary.contrastText
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
          {/* Contact Information */}
          <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 3 }}>
            Contact Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, backgroundColor: theme.palette.background.default, borderRadius: 2 }}>
                <Email sx={{ color: theme.palette.secondary.main, mr: 2 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Email</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>{user.email}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, backgroundColor: theme.palette.background.default, borderRadius: 2 }}>
                <Phone sx={{ color: theme.palette.secondary.main, mr: 2 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Phone</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>{user.phone}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, backgroundColor: theme.palette.background.default, borderRadius: 2 }}>
                <Business sx={{ color: theme.palette.secondary.main, mr: 2 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Company</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>{user.company}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, backgroundColor: theme.palette.background.default, borderRadius: 2 }}>
                <LocationOn sx={{ color: theme.palette.secondary.main, mr: 2 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Location</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>{user.location}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'center' }}>
            <Button 
              variant="outlined"
              startIcon={<Security />}
              onClick={handleChangePassword}
              sx={{ 
                color: theme.palette.secondary.main,
                borderColor: theme.palette.secondary.main,
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover
                }
              }}
            >
              Change Password
            </Button>
            <Button 
              variant="contained"
              onClick={() => navigate('/entrepreneur/dashboard')}
              sx={{ 
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
                fontWeight: 700,
                '&:hover': {
                  backgroundColor: theme.palette.secondary.dark
                }
              }}
            >
              Back to Dashboard
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default EntrepreneurProfile;

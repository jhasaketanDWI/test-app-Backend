

import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Box, Typography, TextField, Button, Card, CardContent, Grid, MenuItem, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ContentAnimation from '../../theme/ContentAnimation';
import BackgroundAnimation from '../../theme/BackgroundAnimation';
import placeholderPitch from '../../assets/images/ContactCall.jpg';

const ideaTypes = [
  'FinTech', 'HealthTech', 'EdTech', 'E-Commerce', 'AI/ML', 'SaaS', 'Other'
];

const Raise = () => {
  const theme = useTheme();
  const [form, setForm] = useState({
    ideaType: '',
    businessName: '',
    details: '',
    minInvestment: '',
    video: null,
    videoUrl: '',
  });

  // For viewing full details
  const [detailsDialog, setDetailsDialog] = useState({ open: false, pitch: null });

  // Add missing uploading state
  const [uploading, setUploading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const placeholderVideo = "https://www.w3schools.com/html/mov_bbb.mp4";
  const [pitches, setPitches] = useState([
    {
      id: 1,
      businessName: 'EcoCharge: Portable Solar Power Banks',
      ideaType: 'Product',
      details: 'Affordable, portable solar power banks for off-grid and emergency use.',
      minInvestment: 5000,
      videoUrl: '',
      likes: 32,
    },
    {
      id: 2,
      businessName: 'Farm2Table: Local Produce Delivery',
      ideaType: 'Service',
      details: 'Connecting local farmers to urban consumers with a subscription delivery model.',
      minInvestment: 10000,
      videoUrl: '',
      likes: 21,
    },
    {
      id: 3,
      businessName: 'SkillUp: Microlearning App',
      ideaType: 'App',
      details: 'Bite-sized, gamified learning modules for upskilling professionals.',
      minInvestment: 8000,
      videoUrl: '',
      likes: 17,
    },
    {
      id: 4,
      businessName: 'AquaPure: Smart Water Filters',
      ideaType: 'Product',
      details: 'IoT-enabled water filters with real-time quality monitoring.',
      minInvestment: 12000,
      videoUrl: '',
      likes: 28,
    },
    {
      id: 5,
      businessName: 'GreenCommute: E-bike Sharing',
      ideaType: 'Service',
      details: 'Urban e-bike sharing platform for eco-friendly commuting.',
      minInvestment: 15000,
      videoUrl: '',
      likes: 24,
    },
    {
      id: 6,
      businessName: 'PetPal: On-demand Pet Care',
      ideaType: 'App',
      details: 'Marketplace for trusted pet sitters and walkers, bookable via app.',
      minInvestment: 6000,
      videoUrl: '',
      likes: 19,
    },
    {
      id: 7,
      businessName: 'ReVamp: Upcycled Furniture Studio',
      ideaType: 'Product',
      details: 'Handcrafted furniture from reclaimed materials, custom orders available.',
      minInvestment: 7000,
      videoUrl: '',
      likes: 15,
    },
    {
      id: 8,
      businessName: 'HealthHive: Community Wellness Platform',
      ideaType: 'App',
      details: 'Connects users to local wellness events, classes, and health coaches.',
      minInvestment: 9000,
      videoUrl: '',
      likes: 22,
    },
    {
      id: 9,
      businessName: 'ByteBites: Healthy Vending Machines',
      ideaType: 'Product',
      details: 'Smart vending machines stocked with healthy snacks for offices and schools.',
      minInvestment: 11000,
      videoUrl: '',
      likes: 18,
    },
    {
      id: 10,
      businessName: 'SafeNest: Smart Home Security',
      ideaType: 'Product',
      details: 'Affordable, AI-powered home security kits for renters and homeowners.',
      minInvestment: 13000,
      videoUrl: '',
      likes: 27,
    },
    {
      id: 11,
      businessName: 'TutorLoop: Peer Tutoring Platform',
      ideaType: 'App',
      details: 'Connects students for peer-to-peer tutoring and study groups.',
      minInvestment: 4000,
      videoUrl: '',
      likes: 13,
    },
    {
      id: 12,
      businessName: 'UrbanRoots: Rooftop Farming Kits',
      ideaType: 'Product',
      details: 'DIY kits for rooftop vegetable gardens in urban apartments.',
      minInvestment: 9500,
      videoUrl: '',
      likes: 20,
    },
  ]);
  const handleVideo = e => {
    const file = e.target.files[0];
    if (file) {
      setForm(f => ({ ...f, video: file, videoUrl: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUploading(true);
    setTimeout(() => {
      setPitches(prev => [
        {
          ...form,
          id: Date.now(),
        },
        ...prev
      ]);
      setForm({ ideaType: '', businessName: '', details: '', minInvestment: '', video: null, videoUrl: '' });
      setUploading(false);
    }, 1200);
  };

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 7, md: 10 }, px: { xs: 2, md: 4 }, maxWidth: '100%', mx: 'auto', position: 'relative', zIndex: 2 }}>
      <BackgroundAnimation />
      <ContentAnimation direction="left">
        <Typography variant="h4" fontWeight={800} sx={{ color: theme.palette.secondary.main, mb: 2, letterSpacing: 1 }}>
          Raise Capital: Upload Your Pitch
        </Typography>
      </ContentAnimation>
      <Box sx={{ mb: 4 }}>
        <Card elevation={8} sx={{ borderRadius: 4, bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Pitch Details
            </Typography>
            <form onSubmit={handleSubmit} autoComplete="off">
              <TextField
                select
                label="Idea Type"
                name="ideaType"
                value={form.ideaType}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              >
                {ideaTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </TextField>
              <TextField
                label="Business Name"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Business Details / Pitch"
                name="details"
                value={form.details}
                onChange={handleChange}
                fullWidth
                required
                multiline
                minRows={3}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Minimum Investment Per Investor"
                name="minInvestment"
                value={form.minInvestment}
                onChange={handleChange}
                fullWidth
                required
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                component="label"
                sx={{ mb: 2, fontWeight: 700, borderRadius: 2, bgcolor: theme.palette.secondary.main, color: theme.palette.primary.main, '&:hover': { bgcolor: theme.palette.primary.main, color: theme.palette.secondary.main } }}
              >
                {form.video ? 'Change Pitch Video' : 'Upload Pitch Video'}
                <input type="file" accept="video/*" hidden onChange={handleVideo} />
              </Button>
              {form.videoUrl && (
                <Box sx={{ mb: 2 }}>
                  <video src={form.videoUrl} controls style={{ width: '100%', maxWidth: 320, borderRadius: 8, background: '#000' }} />
                </Box>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={uploading}
                  sx={{ fontWeight: 700, borderRadius: 2, py: 1.2, bgcolor: theme.palette.secondary.main, color: theme.palette.primary.main, '&:hover': { bgcolor: theme.palette.primary.main, color: theme.palette.secondary.main } }}
                >
                  {uploading ? 'Uploading...' : 'Submit Pitch'}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ mt: 6, mb: 2, width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ mb: 3, mt: 1, color: theme.palette.secondary.main, zIndex: 10, px: 2, py: 1, bgcolor: theme.palette.background.paper, borderRadius: 2, boxShadow: 1 }}
          >
            My Uploaded Pitches
          </Typography>
        </Box>
        {pitches.length === 0 ? (
          <Card elevation={4} sx={{ borderRadius: 4, bgcolor: theme.palette.background.paper, color: theme.palette.text.secondary, minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, flexDirection: 'column', width: 340, mx: 'auto' }}>
            <img src={placeholderPitch} alt="Pitch Placeholder" style={{ width: 120, opacity: 0.5, marginBottom: 12, borderRadius: 8 }} />
            <Typography variant="body2">No pitches uploaded yet. Your submitted pitches will appear here.</Typography>
          </Card>
        ) : (
          <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
              {pitches.map((pitch, idx) => (
                <Box key={pitch.id} sx={{
                  flex: '0 0 320px',
                  maxWidth: 320,
                  minWidth: 280,
                  display: 'flex',
                  justifyContent: 'center',
                  mx: { xs: 'auto', md: 0 },
                  mb: 4,
                  ...(pitches.length % 2 === 1 && idx === pitches.length - 1 ? { marginLeft: 'auto', marginRight: 'auto' } : {})
                }}>
                  <Card elevation={6} sx={{
                    borderRadius: 4,
                    mb: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    width: 320,
                    height: 260,
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(30,30,40,0.65)'
                      : 'rgba(255,255,255,0.65)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1.5px solid rgba(255,255,255,0.25)',
                    color: theme.palette.text.primary,
                    justifyContent: 'space-between',
                  }}>
                    <CardContent sx={{ position: 'relative', zIndex: 2, flex: '1 1 auto', display: 'flex', flexDirection: 'column', p: 2 }}>
                    {/* Video section at the top of the card (only if user uploaded) */}
                    {pitch.videoUrl && !pitch.videoUrl.startsWith('http') && (
                      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                        <video src={pitch.videoUrl} controls style={{ width: '100%', maxWidth: 220, height: 80, borderRadius: 8, background: '#000' }} />
                      </Box>
                    )}
                      <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5, color: theme.palette.text.primary }}>{pitch.businessName}</Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.primary, mb: 0.5 }}>Type: {pitch.ideaType}</Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.primary, mb: 1 }}>Min Investment: ${pitch.minInvestment}</Typography>
                      {/* Likes section */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, justifyContent: 'flex-end' }}>
                        <span role="img" aria-label="like" style={{ fontSize: 20, color: theme.palette.secondary.main }}>👍</span>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{pitch.likes}</Typography>
                      </Box>
                      {/* View Details and Edit buttons moved lower */}
                      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        <Button size="small" variant="contained" sx={{ bgcolor: '#fff', color: '#111', boxShadow: 1, '&:hover': { bgcolor: '#f3f3f3' } }} onClick={() => setDetailsDialog({ open: true, pitch })}>
                          View Details
                        </Button>
                        <Button size="small" variant="outlined" sx={{ color: theme.palette.secondary.main, borderColor: theme.palette.secondary.main, fontWeight: 600 }} onClick={() => alert('Edit functionality coming soon!')}>
                          Edit
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
            {/* Details Dialog - moved outside the map so it renders only once */}
            <Dialog open={detailsDialog.open} onClose={() => setDetailsDialog({ open: false, pitch: null })} maxWidth="sm" fullWidth>
              <DialogTitle>Pitch Details</DialogTitle>
              <DialogContent dividers>
                {detailsDialog.pitch && (
                  <>
                    {/* Video at the top, only if uploaded */}
                    {detailsDialog.pitch.videoUrl && (
                      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <video
                          src={detailsDialog.pitch.videoUrl}
                          controls
                          style={{ width: '100%', maxWidth: 400, borderRadius: 8, background: '#000' }}
                        />
                      </Box>
                    )}
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>{detailsDialog.pitch.businessName}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}><b>Type:</b> {detailsDialog.pitch.ideaType}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}><b>Min Investment:</b> ${detailsDialog.pitch.minInvestment}</Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>{detailsDialog.pitch.details}</Typography>
                  </>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDetailsDialog({ open: false, pitch: null })} color="primary" variant="contained">Close</Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Raise;

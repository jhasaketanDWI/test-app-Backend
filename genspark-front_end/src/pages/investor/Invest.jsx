import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Grid, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ContentAnimation from '../../theme/ContentAnimation';
import BackgroundAnimation from '../../theme/BackgroundAnimation';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const investments = [
  {
    id: 1,
    businessName: 'EcoCharge: Portable Solar Power Banks',
    ideaType: 'Product',
    details: 'Affordable, portable solar power banks for off-grid and emergency use.',
    minInvestment: 5000,
    likes: 32,
  },
  {
    id: 2,
    businessName: 'Farm2Table: Local Produce Delivery',
    ideaType: 'Service',
    details: 'Connecting local farmers to urban consumers with a subscription delivery model.',
    minInvestment: 10000,
    likes: 21,
  },
  {
    id: 3,
    businessName: 'SkillUp: Microlearning App',
    ideaType: 'App',
    details: 'Bite-sized, gamified learning modules for upskilling professionals.',
    minInvestment: 8000,
    likes: 17,
  },
  {
    id: 4,
    businessName: 'AquaPure: Smart Water Filters',
    ideaType: 'Product',
    details: 'IoT-enabled water filters with real-time quality monitoring.',
    minInvestment: 12000,
    likes: 28,
  },
  {
    id: 5,
    businessName: 'GreenCommute: E-bike Sharing',
    ideaType: 'Service',
    details: 'Affordable e-bike sharing for urban commuters.',
    minInvestment: 15000,
    likes: 35,
  },
  {
    id: 6,
    businessName: 'SolarSmart: Solar Panel Installation',
    ideaType: 'Service',
    details: 'Affordable solar panel installation for homes and businesses.',
    minInvestment: 20000,
    likes: 40,
  },
  {
    id: 7,
    businessName: 'HealthTrack: Wearable Health Monitors',
    ideaType: 'Product',
    details: 'Wearable devices for real-time health monitoring.',
    minInvestment: 18000,
    likes: 25,
  },
  {
    id: 8,
    businessName: 'EduConnect: Online Tutoring Platform',
    ideaType: 'App',
    details: 'Connecting students with expert tutors online.',
    minInvestment: 7000,
    likes: 22,
  },
];

const Invest = () => {
  const theme = useTheme();
  const [detailsDialog, setDetailsDialog] = useState({ open: false, investment: null });
  const [likedInvestments, setLikedInvestments] = useState([]);
  const [bookmarkedInvestments, setBookmarkedInvestments] = useState([]);

  const handleInvest = (id) => {
    alert(`Investing in project ID: ${id}`);
  };

  const handleViewDetails = (investment) => {
    setDetailsDialog({ open: true, investment });
  };

  const toggleLike = (id) => {
    setLikedInvestments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleBookmark = (id) => {
    setBookmarkedInvestments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <BackgroundAnimation />
      <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 900, mx: 'auto', pt: { xs: 8, md: 10 }, px: { xs: 2, md: 4 } }}>
        <ContentAnimation direction="left">
          <Typography variant="h4" fontWeight={800} sx={{ color: theme.palette.secondary.main, mb: 2, letterSpacing: 1 }}>
            Browse Investments
          </Typography>
        </ContentAnimation>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
          {investments.map((inv) => (
            <Box key={inv.id} sx={{
              flex: '0 0 320px',
              maxWidth: 320,
              minWidth: 280,
              display: 'flex',
              justifyContent: 'center',
              mx: { xs: 'auto', md: 0 },
              mb: 4,
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
                  <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5, color: theme.palette.text.primary }}>{inv.businessName}</Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.primary, mb: 0.5 }}>Type: {inv.ideaType}</Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.primary, mb: 1 }}>Min Investment: ${inv.minInvestment}</Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1, justifyContent: 'space-between' }}>
                    <Button size="small" variant="contained" sx={{ bgcolor: '#fff', color: '#111', boxShadow: 1, '&:hover': { bgcolor: '#f3f3f3' } }} onClick={() => handleViewDetails(inv)}>
                      View Details
                    </Button>
                    <Button size="small" variant="outlined" sx={{ color: theme.palette.secondary.main, borderColor: theme.palette.secondary.main, fontWeight: 600 }} onClick={() => handleInvest(inv.id)}>
                      Invest
                    </Button>
                  </Box>
                </CardContent>
                <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <IconButton
                    sx={{ color: likedInvestments.includes(inv.id) ? theme.palette.primary.main : theme.palette.secondary.main }}
                    onClick={() => toggleLike(inv.id)}
                  >
                    <ThumbUpIcon />
                  </IconButton>
                  <IconButton
                    sx={{ color: bookmarkedInvestments.includes(inv.id) ? theme.palette.primary.main : theme.palette.secondary.main }}
                    onClick={() => toggleBookmark(inv.id)}
                  >
                    <BookmarkIcon />
                  </IconButton>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
      {/* Details Dialog */}
      <Dialog open={detailsDialog.open} onClose={() => setDetailsDialog({ open: false, investment: null })} maxWidth="sm" fullWidth>
        <DialogTitle>{detailsDialog.investment?.businessName}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>Type: {detailsDialog.investment?.ideaType}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>Details: {detailsDialog.investment?.details}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>Minimum Investment: ${detailsDialog.investment?.minInvestment}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>Likes: {detailsDialog.investment?.likes}</Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <video controls style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }}>
              <source src="/path/to/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialog({ open: false, investment: null })} color="primary">Close</Button>
          <Button onClick={() => alert('Investment details saved!')} color="secondary" variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Invest;

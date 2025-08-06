import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ContentAnimation from '../../theme/ContentAnimation';
import BackgroundAnimation from '../../theme/BackgroundAnimation';

// Example data (replace with real data from backend or context)
const pitch = {
  uploaded: true,
  status: 'Under Review', // or 'Approved', 'Rejected', 'Draft', etc.
  lastUpdated: '2025-07-28',
  businessName: 'SparkTech Solutions',
  sector: 'FinTech',
  fundingGoal: '$100,000',
  videoUrl: 'https://example.com/pitch.mp4',
};

const EntrepreneurDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // Demo data for messages and profile summary
  const messages = [
    { name: 'Investor A', lastMessage: 'We are reviewing your pitch.', time: '2 hours ago', unread: 1 },
    { name: 'Investor B', lastMessage: 'Can you share more financials?', time: '1 day ago', unread: 0 },
    { name: 'Investor C', lastMessage: 'Excited to connect!', time: '3 days ago', unread: 2 },
  ];
  const profile = {
    name: 'Priya Sharma',
    business: 'EcoCharge',
    sector: 'CleanTech',
    location: 'Bangalore, India',
    achievements: [
      'Raised $50K seed',
      'Winner: Green Startup 2024',
      'Featured in StartupMag',
    ],
  };

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', zIndex: 1, bgcolor: theme.palette.background.default }}>
      <BackgroundAnimation />
      <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 1300, mx: 'auto', pt: { xs: 8, md: 10 }, px: { xs: 2, md: 4 } }}>
        <ContentAnimation direction="left">
          <Typography variant="h4" fontWeight={800} align="center" sx={{ color: theme.palette.secondary.main, mb: 4, letterSpacing: 1 }}>
            Entrepreneur Dashboard
          </Typography>
        </ContentAnimation>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 0,
            alignItems: 'stretch',
            justifyContent: 'center',
            width: '100%',
            maxWidth: 1100,
            mx: 'auto',
          }}
        >
          {/* Raise/Pitch Summary */}
          <Box sx={{ flex: 1, minWidth: 0, display: 'flex' }}>
            <ContentAnimation direction="up" delay={0.1}>
              <Card elevation={8} sx={{ borderRadius: 4, bgcolor: theme.palette.background.paper, color: theme.palette.text.primary, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 420 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 2, textAlign: 'center', letterSpacing: 0.5 }}>Raise / Pitch</Typography>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Chip
                      label={pitch.uploaded ? pitch.status : 'No Pitch Uploaded'}
                      color={pitch.status === 'Approved' ? 'success' : pitch.status === 'Rejected' ? 'error' : 'warning'}
                      sx={{ fontWeight: 700, fontSize: 15, px: 2, py: 0.5, mb: 1 }}
                    />
                    {pitch.uploaded && (
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        Last updated: {pitch.lastUpdated}
                      </Typography>
                    )}
                  </Box>
                  {pitch.uploaded ? (
                    <>
                      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>{pitch.businessName}</Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>Sector: {pitch.sector}</Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>Funding Goal: {pitch.fundingGoal}</Typography>
                      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                        <video src={pitch.videoUrl} controls style={{ width: '100%', maxWidth: 220, borderRadius: 8, marginBottom: 8, background: '#000' }} />
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                          (Preview only. To update, go to Raise page.)
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        sx={{ mt: 2, fontWeight: 700, borderRadius: 2, color: theme.palette.secondary.main, borderColor: theme.palette.secondary.main, '&:hover': { bgcolor: theme.palette.secondary.main, color: theme.palette.primary.main } }}
                        onClick={() => navigate('/raise')}
                      >
                        Update Pitch
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      sx={{ mt: 2, fontWeight: 700, borderRadius: 2, bgcolor: theme.palette.secondary.main, color: theme.palette.primary.main, '&:hover': { bgcolor: theme.palette.primary.main, color: theme.palette.secondary.main } }}
                      onClick={() => navigate('/raise')}
                    >
                      Upload Pitch
                    </Button>
                  )}
                </CardContent>
              </Card>
            </ContentAnimation>
          </Box>
          {/* Messages Summary */}
          <Box sx={{ flex: 1, minWidth: 0, display: 'flex' }}>
            <ContentAnimation direction="up" delay={0.2}>
              <Card elevation={8} sx={{ borderRadius: 4, bgcolor: theme.palette.background.paper, color: theme.palette.text.primary, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 420 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 2, textAlign: 'center', letterSpacing: 0.5 }}>Recent Messages</Typography>
                  {messages.map((msg, idx) => (
                    <Box key={idx} sx={{ mb: 2, p: 1.5, border: `1px solid ${theme.palette.divider}`, borderRadius: 2, background: msg.unread ? theme.palette.action.selected : 'transparent' }}>
                      <Typography variant="subtitle2" fontWeight={600}>{msg.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{msg.lastMessage}</Typography>
                      <Typography variant="caption" color="text.secondary">{msg.time} {msg.unread > 0 && <Chip label={msg.unread} size="small" color="secondary" sx={{ ml: 1 }} />}</Typography>
                    </Box>
                  ))}
                  <Button variant="outlined" color="secondary" fullWidth sx={{ fontWeight: 600, mt: 2 }} onClick={() => navigate('/entrepreneur/messages')}>Go to Messages</Button>
                </CardContent>
              </Card>
            </ContentAnimation>
          </Box>
          {/* Profile Summary */}
          <Box sx={{ flex: 1, minWidth: 0, display: 'flex' }}>
            <ContentAnimation direction="up" delay={0.3}>
              <Card elevation={8} sx={{ borderRadius: 4, bgcolor: theme.palette.background.paper, color: theme.palette.text.primary, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 420 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 2, textAlign: 'center', letterSpacing: 0.5 }}>Profile Overview</Typography>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600}>{profile.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{profile.business}</Typography>
                    <Typography variant="body2" color="text.secondary">{profile.sector}</Typography>
                    <Typography variant="body2" color="text.secondary">{profile.location}</Typography>
                  </Box>
                  <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}`, mb: 2 }} />
                  <Box sx={{ mt: 2, mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                    {profile.achievements.map((ach, idx) => (
                      <Chip key={idx} label={ach} color="primary" size="small" />
                    ))}
                  </Box>
                  <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 1, fontWeight: 600 }} onClick={() => navigate('/entrepreneur/profile')}>View Profile</Button>
                </CardContent>
              </Card>
            </ContentAnimation>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EntrepreneurDashboard;

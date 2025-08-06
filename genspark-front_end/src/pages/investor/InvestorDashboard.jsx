import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ContentAnimation from '../../theme/ContentAnimation';
import BackgroundAnimation from '../../theme/BackgroundAnimation';

// Example data (replace with real data from backend or context)
const investments = [
  {
    id: 1,
    businessName: 'SparkTech Solutions',
    sector: 'FinTech',
    amountInvested: '$10,000',
    status: 'Active',
    lastUpdated: '2025-07-28',
  },
  // Add more investments as needed
];

const InvestorDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // Profile summary (static for demo, replace with real data as needed)
  const profile = {
    name: 'John Doe',
    company: 'Venture Capital Group',
    industry: 'Venture Capital',
    location: 'New York, NY',
    investmentFocus: 'CleanTech, SaaS, FinTech',
    portfolioSize: '12',
    totalInvested: '$2M',
    achievements: [
      'Invested in 12 startups',
      '$2M total invested',
      '3 successful exits',
      'Mentor at StartupHub',
    ],
  };
  // Recent messages summary (static for demo)
  const messages = [
    { name: 'Priya Sharma', company: 'EcoCharge', lastMessage: 'Thank you for your interest! I have sent the pitch deck.', time: '1 hour ago', unread: 1, status: 'online' },
    { name: 'Ravi Patel', company: 'Farm2Table', lastMessage: 'Looking forward to your feedback on our business model.', time: '3 hours ago', unread: 0, status: 'offline' },
    { name: 'Aisha Khan', company: 'SkillUp', lastMessage: 'Let me know if you have any questions about the app.', time: '2 days ago', unread: 2, status: 'online' },
  ];
  // Investment opportunities summary (static for demo)
  const investList = [
    { businessName: 'EcoCharge: Portable Solar Power Banks', ideaType: 'Product', minInvestment: 5000, likes: 32 },
    { businessName: 'Farm2Table: Local Produce Delivery', ideaType: 'Service', minInvestment: 10000, likes: 21 },
    { businessName: 'SkillUp: Microlearning App', ideaType: 'App', minInvestment: 8000, likes: 17 },
  ];

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <BackgroundAnimation />
      <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 1200, mx: 'auto', pt: { xs: 8, md: 10 }, px: { xs: 2, md: 4 } }}>
        <ContentAnimation direction="left">
          <Typography variant="h4" fontWeight={800} sx={{ color: theme.palette.secondary.main, mb: 2, letterSpacing: 1 }}>
            Investor Dashboard
          </Typography>
        </ContentAnimation>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'stretch', justifyContent: 'center', width: '100%' }}>
          {/* Profile Summary */}
          <Box sx={{ flex: 1, minWidth: 0, display: 'flex' }}>
            <ContentAnimation direction="up" delay={0.1}>
              <Card elevation={8} sx={{ borderRadius: 4, bgcolor: theme.palette.background.paper, color: theme.palette.text.primary, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 420 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 2, textAlign: 'center', letterSpacing: 0.5 }}>Profile Overview</Typography>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600}>{profile.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{profile.company}</Typography>
                    <Typography variant="body2" color="text.secondary">{profile.industry}</Typography>
                    <Typography variant="body2" color="text.secondary">{profile.location}</Typography>
                  </Box>
                  <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}`, mb: 2 }} />
                  <Typography variant="body2" sx={{ mt: 1 }}><b>Focus:</b> {profile.investmentFocus}</Typography>
                  <Typography variant="body2"><b>Portfolio:</b> {profile.portfolioSize}</Typography>
                  <Typography variant="body2"><b>Total Invested:</b> {profile.totalInvested}</Typography>
                  <Box sx={{ mt: 2, mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {profile.achievements.map((ach, idx) => (
                      <Chip key={idx} label={ach} color="primary" size="small" />
                    ))}
                  </Box>
                  <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 1, fontWeight: 600 }} onClick={() => navigate('/investor/profile')}>View Profile</Button>
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
                      <Typography variant="subtitle2" fontWeight={600}>{msg.name} <span style={{ fontWeight: 400, color: theme.palette.text.secondary }}>({msg.company})</span></Typography>
                      <Typography variant="body2" color="text.secondary">{msg.lastMessage}</Typography>
                      <Typography variant="caption" color="text.secondary">{msg.time} {msg.unread > 0 && <Chip label={msg.unread} size="small" color="secondary" sx={{ ml: 1 }} />}</Typography>
                    </Box>
                  ))}
                  <Button variant="outlined" color="secondary" fullWidth sx={{ fontWeight: 600, mt: 2 }} onClick={() => navigate('/investor/messages')}>Go to Messages</Button>
                </CardContent>
              </Card>
            </ContentAnimation>
          </Box>
          {/* Investment Opportunities Summary */}
          <Box sx={{ flex: 1, minWidth: 0, display: 'flex' }}>
            <ContentAnimation direction="up" delay={0.3}>
              <Card elevation={8} sx={{ borderRadius: 4, bgcolor: theme.palette.background.paper, color: theme.palette.text.primary, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 420 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 2, textAlign: 'center', letterSpacing: 0.5 }}>Investment Opportunities</Typography>
                  {investList.map((inv, idx) => (
                    <Box key={idx} sx={{ mb: 2, p: 1.5, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
                      <Typography variant="subtitle2" fontWeight={600}>{inv.businessName}</Typography>
                      <Typography variant="body2" color="text.secondary">Type: {inv.ideaType}</Typography>
                      <Typography variant="body2" color="text.secondary">Min Investment: ${inv.minInvestment}</Typography>
                      <Typography variant="caption" color="text.secondary">Likes: {inv.likes}</Typography>
                    </Box>
                  ))}
                  <Button variant="contained" color="primary" fullWidth sx={{ fontWeight: 600, mt: 2 }} onClick={() => navigate('/invest')}>Browse Investments</Button>
                </CardContent>
              </Card>
            </ContentAnimation>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InvestorDashboard;

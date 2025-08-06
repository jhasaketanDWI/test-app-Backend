
import React, { useMemo } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
// import Header from '../../components/Header'; // Use global header from App.jsx
import ContentAnimation from '../../theme/ContentAnimation';
import BackgroundAnimation from '../../theme/BackgroundAnimation';

const summaryCards = [
  {
    title: 'Platform Overview',
    description: 'View analytics and financials at a glance.',
    path: '/admin/platform-overview',
    actions: [
      'Check analytics and platform health',
      'Review financial summaries',
      'Monitor user activity and growth',
    ],
  },
  {
    title: 'Platform Management',
    description: 'Manage users, content, and moderation.',
    path: '/admin/platform-management',
    actions: [
      'Add, edit, or remove users',
      'Moderate content and manage platform rules',
      'Assign admin roles and permissions',
    ],
  },
  {
    title: 'Announcements',
    description: 'View and send admin announcements.',
    path: '/admin/admin-messages',
    actions: [
      'Send announcements to all users',
      'View system messages',
      'Manage admin communications',
    ],
  },
];

const AdminDashboard = ({ mode, setMode }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Get admin name from localStorage if available
  const adminName = useMemo(() => {
    try {
      const adminData = localStorage.getItem('user_admin@example.com');
      if (adminData) {
        const parsed = JSON.parse(adminData);
        return parsed.name || 'Admin';
      }
    } catch (e) {}
    return 'Admin';
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.default, color: theme.palette.text.primary, position: 'relative', zIndex: 2 }}>
      <BackgroundAnimation />
      <ContentAnimation direction="left">
        <Box sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 2, color: theme.palette.secondary.main }}>
            Welcome, {adminName}!
          </Typography>
          <Typography variant="h3" fontWeight={800} sx={{ mb: 3 }}>
            Admin Dashboard
          </Typography>
          <Typography variant="h6" fontWeight={500} sx={{ mb: 4 }}>
            Summary of all key admin sections. Click a card heading to manage or view details.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 4, justifyContent: 'center', alignItems: 'stretch' }}>
            {summaryCards.map(card => (
              <Card
                key={card.title}
                sx={theme => ({
                  flex: 1,
                  minWidth: 300,
                  maxWidth: 420,
                  height: 260,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  boxShadow: 6,
                  background: `linear-gradient(120deg, ${theme.palette.primary.light} 60%, ${theme.palette.primary.main} 100%)`,
                  color: theme.palette.secondary.main,
                })}
              >
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', color: theme => theme.palette.secondary.main }}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={theme => ({
                      color: theme.palette.secondary.main,
                      cursor: 'pointer',
                      mb: 2,
                      textDecoration: 'underline',
                      transition: 'color 0.2s, background 0.2s',
                      borderRadius: 2,
                      px: 1,
                      '&:hover': {
                        color: theme.palette.secondary.dark,
                        background: 'linear-gradient(90deg, #7c3aed 0%, #4f46e5 100%)',
                        textDecoration: 'underline',
                        boxShadow: '0 2px 12px 0 rgba(124,58,237,0.18)',
                      },
                      '&:active, &:focus': {
                        color: theme.palette.secondary.main,
                        background: 'none',
                        boxShadow: 'none',
                      },
                    })}
                    onClick={() => navigate(card.path)}
                  >
                    {card.title}
                  </Typography>
                  <Typography variant="body1" sx={theme => ({ mb: 2, color: theme.palette.secondary.main })}>{card.description}</Typography>
                  <Box component="ul" sx={theme => ({ pl: 3, mb: 0, color: theme.palette.secondary.main, fontSize: 15 })}>
                    {card.actions && card.actions.map((action, idx) => (
                      <li key={idx} style={{ marginBottom: 4 }}>{action}</li>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </ContentAnimation>
    </Box>
  );
};

export default AdminDashboard;

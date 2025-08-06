// ...existing code...
import React from 'react';
import { Button, Box, Typography, Grid, Paper, Avatar } from '@mui/material';
import ContentAnimation from '../theme/ContentAnimation';
import BackgroundAnimation from '../theme/BackgroundAnimation';


// GenSpark SRS-inspired placeholder data
const featuredLogos = [
  'YourStory', 'Inc42', 'TechCrunch', 'Economic Times', 'VCCircle', 'Startup India', 'NASSCOM', 'Forbes', 'Entrepreneur', 'Your VC Here',
];

// Add missing industries and testimonials arrays
const industries = [
  'AI & Data Science',
  'Fintech',
  'HealthTech',
  'EdTech',
  'SaaS & Cloud',
  'Consumer Tech',
  'Green Energy',
  'E-commerce',
  'Logistics',
  'Social Impact',
];

const testimonials = [
  {
    name: 'Priya Sharma',
    company: 'FinEdge AI',
    text: "GenSpark's investor-matching algorithm helped us secure our first round in weeks. The dashboard made pitching and tracking interest seamless.",
  },
  {
    name: 'Rohit Mehra',
    company: 'GreenGrid',
    text: 'As a first-time founder, GenSpark gave me the confidence and tools to connect with the right investors and mentors.',
  },
  {
    name: 'Anjali Patel',
    company: 'Angel Investor',
    text: 'The due diligence and deal flow curation on GenSpark is top-notch. I discovered two promising startups in a single week.',
  },
];


import Footer from '../components/Footer';


import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Animated Background at lowest z-index */}
      <BackgroundAnimation />
      {/* All content above background */}
      <Box sx={theme => ({ position: 'relative', zIndex: 2, minHeight: '100vh', color: theme.palette.text.primary, px: { xs: 2, md: 8 }, pt: '96px', pb: '80px', background: 'none', overflowX: 'hidden' })}>
        {/* Hero Section */}
        <ContentAnimation direction="left">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" fontWeight={700} gutterBottom>
          Connect, Create, Capitalize.
        </Typography>
        <Typography variant="h5" sx={theme => ({ color: theme.palette.text.primary })} gutterBottom>
          India’s Smartest Startup & Investor Network
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
          GenSpark connects ambitious founders with visionary investors. Discover, pitch, and invest in the next wave of Indian innovation—all in one seamless platform.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={theme => ({
            fontWeight: 600,
            borderRadius: 8,
            px: 4,
            py: 1.5,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            boxShadow: 3,
            mr: 2,
            '&:hover': { bgcolor: theme.palette.secondary.main, color: theme.palette.primary.main },
          })}
          onClick={() => navigate('/login')}
        >
          Explore Opportunities
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={theme => ({
            fontWeight: 600,
            borderRadius: 8,
            px: 4,
            py: 1.5,
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            boxShadow: 3,
            '&:hover': { bgcolor: theme.palette.primary.main, color: theme.palette.secondary.main },
          })}
          onClick={() => navigate('/about')}
        >
          Know More
        </Button>
        </Box>
        </ContentAnimation>
      {/* Featured In */}
      <ContentAnimation direction="right">
      <Box sx={{ textAlign: 'center', mb: 6, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="subtitle1" sx={theme => ({ color: theme.palette.text.secondary })} gutterBottom>
          Featured In
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {featuredLogos.map((logo) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={logo}>
              <Paper elevation={4} sx={theme => ({
                p: 2,
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: 3,
                textAlign: 'center',
                minHeight: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `2px solid ${theme.palette.background.paper}`,
                boxShadow: `0 2px 16px 0 ${theme.palette.background.paper}22`
              })}>
                <Typography variant="caption" sx={theme => ({ fontWeight: 700, fontSize: 16, color: theme.palette.text.primary })}>{logo}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      </ContentAnimation>
      {/* Industries */}
      <ContentAnimation direction="left">
      <Box sx={{ mb: 8, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Sectors We Ignite
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {industries.map((industry) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={industry}>
              <Paper elevation={4} sx={theme => ({
                p: 3,
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: 3,
                textAlign: 'center',
                minHeight: 90,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `2px solid ${theme.palette.background.paper}`,
                boxShadow: `0 2px 16px 0 ${theme.palette.background.paper}22`
              })}>
                <Typography variant="body1" sx={theme => ({ fontWeight: 700, fontSize: 18, color: theme.palette.text.primary })}>{industry}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      </ContentAnimation>
      {/* Testimonials */}
      <ContentAnimation direction="right">
      <Box sx={{ mb: 8, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Success Stories from the GenSpark Community
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {testimonials.map((t) => (
            <Grid item xs={12} sm={6} md={4} key={t.name}>
              <Paper elevation={6} sx={theme => ({ p: 4, bgcolor: theme.palette.background.default, borderRadius: 4, minHeight: 210, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 24px 0 #a259ff22' })}>
                <Avatar sx={{ bgcolor: '#a259ff', width: 56, height: 56, mb: 2, fontSize: 28 }}>{t.name[0]}</Avatar>
                <Typography variant="subtitle1" fontWeight={700} sx={theme => ({ color: theme.palette.text.primary, mb: 0.5 })}>{t.name}</Typography>
                <Typography variant="caption" sx={theme => ({ color: theme.palette.text.secondary, mb: 2 })}>{t.company}</Typography>
                <Typography variant="body2" sx={theme => ({ color: theme.palette.text.secondary, textAlign: 'center', fontStyle: 'italic' })}>{t.text}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      </ContentAnimation>
      {/* Call to Action */}
      <ContentAnimation direction="left">
      <Box sx={{ textAlign: 'center', mb: 8 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Ready to Spark Your Journey?
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
        Whether you’re a founder seeking capital or an investor scouting the next unicorn, GenSpark is your launchpad. Join a trusted, growing network and unlock new possibilities.
      </Typography>
      <Button
        variant="contained"
        sx={theme => ({
          fontWeight: 600,
          borderRadius: 8,
          px: 4,
          py: 1.5,
          mr: 2,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.secondary.main,
          boxShadow: 3,
          '&:hover': { bgcolor: theme.palette.secondary.main, color: theme.palette.primary.main },
        })}
        onClick={() => navigate('/register')}
      >
        For Investors
      </Button>
      <Button
        variant="contained"
        sx={theme => ({
          fontWeight: 600,
          borderRadius: 8,
          px: 4,
          py: 1.5,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.secondary.main,
          boxShadow: 3,
          '&:hover': { bgcolor: theme.palette.secondary.main, color: theme.palette.primary.main },
        })}
        onClick={() => navigate('/register')}
      >
        For Entrepreneurs
      </Button>
      </Box>
      </ContentAnimation>
      {/* Blog/Info Section Placeholder */}
      <ContentAnimation direction="right">
      <Box sx={{ mb: 8, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Insights & Resources
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={6} sx={theme => ({ p: 4, bgcolor: theme.palette.background.paper, borderRadius: 4, minHeight: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 24px 0 #a259ff22' })}>
              <Typography variant="subtitle1" sx={{ color: '#a259ff', fontWeight: 700, mb: 1 }} gutterBottom>
                How to Pitch: A Founder’s Guide
              </Typography>
              <Typography variant="body2" sx={theme => ({ color: theme.palette.text.secondary, textAlign: 'center' })}>
                Step-by-step tips for crafting a winning pitch and attracting the right investors on GenSpark.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={6} sx={theme => ({ p: 4, bgcolor: theme.palette.background.paper, borderRadius: 4, minHeight: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 24px 0 #a259ff22' })}>
              <Typography variant="subtitle1" sx={{ color: '#a259ff', fontWeight: 700, mb: 1 }} gutterBottom>
                Investor Playbook: What to Look For
              </Typography>
              <Typography variant="body2" sx={theme => ({ color: theme.palette.text.secondary, textAlign: 'center' })}>
                Key metrics, red flags, and best practices for evaluating startups and building your portfolio.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={6} sx={theme => ({ p: 4, bgcolor: theme.palette.background.paper, borderRadius: 4, minHeight: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 24px 0 #a259ff22' })}>
              <Typography variant="subtitle1" sx={{ color: '#a259ff', fontWeight: 700, mb: 1 }} gutterBottom>
                GenSpark Platform Roadmap
              </Typography>
              <Typography variant="body2" sx={theme => ({ color: theme.palette.text.secondary, textAlign: 'center' })}>
                See what’s coming next: new features, role-based dashboards, and AI-powered matchmaking for founders and investors.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      </ContentAnimation>
    </Box>
  </>
);

}

export default Home;

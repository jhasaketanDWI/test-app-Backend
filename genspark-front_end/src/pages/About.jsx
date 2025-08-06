
import React from 'react';

import { Container, Typography, Grid, Paper, Button, Box } from '@mui/material';
import { BsChatDotsFill, BsEnvelopeFill, BsPhoneFill, BsChatTextFill } from 'react-icons/bs';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import BackgroundAnimation from '../theme/BackgroundAnimation';
import ContentAnimation from '../theme/ContentAnimation';



const About = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <>
      <BackgroundAnimation />
      <Box sx={{ position: 'relative', zIndex: 2, minHeight: '100vh', pb: 8 }}>
        <ContentAnimation direction="left">
          <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
            <Typography variant="h4" align="center" fontWeight={800} gutterBottom sx={{ letterSpacing: 1 }}>
              About GenSpark
            </Typography>
            <Typography align="center" sx={{ mb: 4, fontSize: '1.2rem' }}>
              GenSpark is a modern web platform designed to connect Indian entrepreneurs and angel investors. Our mission is to help startups and investors build lasting, profitable relationships that drive innovation and business growth.
            </Typography>
            <Grid container spacing={5} justifyContent="center">
              <Grid item xs={12} md={6}>
                <Paper elevation={4} sx={{ p: 4, borderRadius: 4, bgcolor: theme.palette.background.paper, color: theme.palette.text.primary, minHeight: 320 }}>
                  <Typography variant="h5" fontWeight={700} gutterBottom>For Investors</Typography>
                  <Typography sx={{ mb: 2 }}>
                    • Discover curated startup pitches from across India<br />
                    • Like, watchlist, and connect with promising entrepreneurs<br />
                    • Direct messaging and meeting scheduling<br />
                    • Access to a growing network of innovators<br />
                    • Secure, role-based access and admin support
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: theme.palette.secondary.main, color: theme.palette.primary.main, fontWeight: 700, borderRadius: 2, px: 4, py: 1.2, mt: 2, '&:hover': { bgcolor: theme.palette.primary.main, color: theme.palette.secondary.main } }}
                    onClick={() => navigate('/register')}
                  >
                    Join as Investor
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={4} sx={{ p: 4, borderRadius: 4, bgcolor: theme.palette.background.paper, color: theme.palette.text.primary, minHeight: 320 }}>
                  <Typography variant="h5" fontWeight={700} gutterBottom>For Entrepreneurs</Typography>
                  <Typography sx={{ mb: 2 }}>
                    • Register and create a compelling profile<br />
                    • Upload video pitches and business details<br />
                    • Connect with verified investors<br />
                    • Manage your startup’s journey and communications<br />
                    • Benefit from a trusted, secure platform
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: theme.palette.secondary.main, color: theme.palette.primary.main, fontWeight: 700, borderRadius: 2, px: 4, py: 1.2, mt: 2, '&:hover': { bgcolor: theme.palette.primary.main, color: theme.palette.secondary.main } }}
                    onClick={() => navigate('/register')}
                  >
                    Join as Entrepreneur
                  </Button>
                </Paper>
              </Grid>
            </Grid>
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>Inspired by the Best</Typography>
              <Typography sx={{ mb: 2 }}>
                GenSpark draws inspiration from leading platforms like the Indian Investment Network, focusing on simplicity, trust, and meaningful connections. We connect users from all industries, helping them find the right partners to grow their businesses.
              </Typography>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>Join Our Community</Typography>
              <Typography>
                Whether you are looking to invest or seeking investment, GenSpark is your gateway to India’s vibrant startup ecosystem. Join us and be part of a growing network of innovators and investors.
              </Typography>
            {/* Contact Section */}
            <Box sx={{ mt: 6, mb: 2, textAlign: 'center' }}>
              <Typography variant="h5" fontWeight={800} gutterBottom sx={{ letterSpacing: 1, mb: 3 }}>Need More Help?</Typography>
              <Grid container spacing={4} justifyContent="center">
                {/* Text Us */}
                <Grid item xs={12} sm={6} md={3}>
                  <ContentAnimation direction="left">
                    <Paper elevation={6} sx={{ p: 4, borderRadius: 4, bgcolor: theme.palette.background.paper, color: theme.palette.text.primary, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <BsChatTextFill style={{
                          position: 'absolute',
                          top: -24,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: 80,
                          color: theme.palette.primary.main,
                          opacity: 0.08,
                          zIndex: 0
                        }} />
                        <BsChatTextFill style={{ fontSize: 32, color: '#a259ff', marginBottom: 8, zIndex: 1, position: 'relative' }} />
                      </Box>
                      <Typography variant="h6" fontWeight={700}>Text us at</Typography>
                      <Typography variant="h5" fontWeight={900} sx={{ color: theme.palette.secondary.main, textShadow: '0 1px 8px rgba(0,0,0,0.18)', mb: 1 }}>309-650-8582</Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>Message and data rates may apply</Typography>
                      <Button
                        variant="contained"
                        sx={{ bgcolor: theme.palette.secondary.main, color: theme.palette.primary.main, fontWeight: 700, borderRadius: 2, px: 4, py: 1.2, mt: 1, '&:hover': { bgcolor: theme.palette.primary.main, color: theme.palette.secondary.main } }}
                        href="sms:3096508582"
                      >
                        Send Text
                      </Button>
                    </Paper>
                  </ContentAnimation>
                </Grid>
                {/* Chat Now */}
                <Grid item xs={12} sm={6} md={3}>
                  <ContentAnimation direction="right">
                    <Paper elevation={6} sx={{ p: 4, borderRadius: 4, bgcolor: theme.palette.background.paper, color: theme.palette.text.primary, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <BsChatDotsFill style={{
                          position: 'absolute',
                          top: -24,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: 80,
                          color: theme.palette.primary.main,
                          opacity: 0.08,
                          zIndex: 0
                        }} />
                        <BsChatDotsFill style={{ fontSize: 32, color: '#a259ff', marginBottom: 8, zIndex: 1, position: 'relative' }} />
                      </Box>
                      <Typography variant="h6" fontWeight={700}>Chat with a specialist</Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>Available 7am-11pm IST, 24/7</Typography>
                      <Button
                        variant="contained"
                        sx={{ bgcolor: theme.palette.secondary.main, color: theme.palette.primary.main, fontWeight: 700, borderRadius: 2, px: 4, py: 1.2, mt: 1, '&:hover': { bgcolor: theme.palette.primary.main, color: theme.palette.secondary.main } }}
                        href="#"
                      >
                        Start Chat
                      </Button>
                    </Paper>
                  </ContentAnimation>
                </Grid>
                {/* Call Us */}
                <Grid item xs={12} sm={6} md={3}>
                  <ContentAnimation direction="left">
                    <Paper elevation={6} sx={{ p: 4, borderRadius: 4, bgcolor: theme.palette.background.paper, color: theme.palette.text.primary, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <BsPhoneFill style={{
                          position: 'absolute',
                          top: -24,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: 80,
                          color: theme.palette.primary.main,
                          opacity: 0.08,
                          zIndex: 0
                        }} />
                        <BsPhoneFill style={{ fontSize: 32, color: '#a259ff', marginBottom: 8, zIndex: 1, position: 'relative' }} />
                      </Box>
                      <Typography variant="h6" fontWeight={700}>Call us at</Typography>
                      <Typography variant="h5" fontWeight={900} sx={{ color: theme.palette.secondary.main, textShadow: '0 1px 8px rgba(0,0,0,0.18)', mb: 1 }}>1-866-983-8582</Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>Available 7am-11pm CT, 7 days a week</Typography>
                      <Button
                        variant="contained"
                        sx={{ bgcolor: theme.palette.secondary.main, color: theme.palette.primary.main, fontWeight: 700, borderRadius: 2, px: 4, py: 1.2, mt: 1, '&:hover': { bgcolor: theme.palette.primary.main, color: theme.palette.secondary.main } }}
                        href="tel:18669838582"
                      >
                        Call Now
                      </Button>
                    </Paper>
                  </ContentAnimation>
                </Grid>
                {/* Email Us */}
                <Grid item xs={12} sm={6} md={3}>
                  <ContentAnimation direction="right">
                    <Paper elevation={6} sx={{ p: 4, borderRadius: 4, bgcolor: theme.palette.background.paper, color: theme.palette.text.primary, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <BsEnvelopeFill style={{
                          position: 'absolute',
                          top: -24,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: 80,
                          color: theme.palette.primary.main,
                          opacity: 0.08,
                          zIndex: 0
                        }} />
                        <BsEnvelopeFill style={{ fontSize: 32, color: '#a259ff', marginBottom: 8, zIndex: 1, position: 'relative' }} />
                      </Box>
                      <Typography variant="h6" fontWeight={700}>Send us an email</Typography>
                      <Typography variant="h5" fontWeight={900} sx={{ color: theme.palette.secondary.main, textShadow: '0 1px 8px rgba(0,0,0,0.18)', mb: 1 }}>help@genspark.in</Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>We'd love to hear from you!</Typography>
                      <Button
                        variant="contained"
                        sx={{ bgcolor: theme.palette.secondary.main, color: theme.palette.primary.main, fontWeight: 700, borderRadius: 2, px: 4, py: 1.2, mt: 1, '&:hover': { bgcolor: theme.palette.primary.main, color: theme.palette.secondary.main } }}
                        href="mailto:help@genspark.in"
                      >
                        Send Email
                      </Button>
                    </Paper>
                  </ContentAnimation>
                </Grid>
              </Grid>
            </Box>
            </Box>
          </Container>
        </ContentAnimation>
      </Box>
    </>
  );
};

export default About;

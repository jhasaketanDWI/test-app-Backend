import React, { useState, useRef, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Box, 
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  IconButton,
  Badge
} from '@mui/material';
import { 
  Send,
  Message,
  VideoCall,
  AttachFile,
  MoreVert,
  Person,
  Business
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import ContentAnimation from '../../theme/ContentAnimation';
import BackgroundAnimation from '../../theme/BackgroundAnimation';
import { useTheme } from '@mui/material/styles';

const EntrepreneurMessages = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  // Animation refs
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  const conversations = [
    {
      id: 1,
      name: 'Michael Chen',
      type: 'Investor',
      company: 'TechVentures Capital',
      lastMessage: 'I\'m interested in learning more about your revenue model.',
      time: '2 hours ago',
      unread: 2,
      avatar: 'MC',
      status: 'online'
    },
    {
      id: 2,
      name: 'Sarah Williams',
      type: 'Investor',
      company: 'GreenTech Investments',
      lastMessage: 'Your sustainability metrics are impressive. Let\'s schedule a call.',
      time: '1 day ago',
      unread: 0,
      avatar: 'SW',
      status: 'offline'
    },
    {
      id: 3,
      name: 'David Rodriguez',
      type: 'Investor',
      company: 'Innovation Fund',
      lastMessage: 'Thank you for the detailed pitch presentation.',
      time: '3 days ago',
      unread: 1,
      avatar: 'DR',
      status: 'online'
    },
    {
      id: 4,
      name: 'Emma Thompson',
      type: 'Mentor',
      company: 'StartupHub',
      lastMessage: 'Here are some suggestions for your go-to-market strategy.',
      time: '1 week ago',
      unread: 0,
      avatar: 'ET',
      status: 'offline'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Michael Chen',
      message: 'Hi Sarah, I watched your pitch video and I\'m very impressed with your EcoTech solution.',
      time: '10:30 AM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      message: 'Thank you Michael! I\'m excited to discuss the opportunity further.',
      time: '10:45 AM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Michael Chen',
      message: 'I\'m particularly interested in your revenue model. Can you share more details about your pricing strategy?',
      time: '11:00 AM',
      isOwn: false
    },
    {
      id: 4,
      sender: 'You',
      message: 'Absolutely! We have a tiered pricing model based on installation size. I can send you our detailed pricing sheet.',
      time: '11:15 AM',
      isOwn: true
    }
  ];

  useEffect(() => {
    // GSAP entrance animation
    const container = containerRef.current;
    const title = titleRef.current;

    if (container && title) {
      gsap.set(container, { opacity: 0, y: 50 });
      gsap.set(title, { opacity: 0, scale: 0.8 });

      const tl = gsap.timeline();
      tl.to(title, { 
        opacity: 1, 
        scale: 1, 
        duration: 1, 
        ease: "elastic.out(1, 0.5)" 
      })
      .to(container, { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power3.out" 
      }, "-=0.5");
    }
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to backend
      setNewMessage('');
    }
  };

  const handleScheduleCall = () => {
    setOpenDialog(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', zIndex: 2, pt: { xs: 7, md: 10 }, px: { xs: 2, md: 4 }, background: theme.palette.background.default }}>
      <BackgroundAnimation />
      <ContentAnimation direction="left">
        <Box
          sx={{
            display: 'inline-block',
            px: 4,
            py: 2,
            mb: 3,
            borderRadius: 4,
            background: 'rgba(0,200,83,0.18)',
            backdropFilter: 'blur(18px) saturate(180%)',
            WebkitBackdropFilter: 'blur(18px) saturate(180%)',
            // border removed for cleaner look
            boxShadow: '0 4px 24px 0 rgba(0,200,83,0.10)',
            textAlign: 'center',
            mx: 'auto',
          }}
        >
          <Typography
            ref={titleRef}
            variant="h4"
            fontWeight={800}
            sx={{
              color: theme.palette.primary.main,
              letterSpacing: 1,
              textShadow: '0 4px 16px rgba(0,200,83,0.10)',
            }}
          >
            Messages & Communications
          </Typography>
        </Box>
      </ContentAnimation>
      <Container maxWidth="xl">
        <Box ref={containerRef} sx={{ display: 'flex', height: '70vh', gap: 2 }}>
          {/* Conversations List */}
          <Card sx={{ 
            width: '350px', 
            borderRadius: 3,
            background: 'rgba(0, 200, 83, 0.18)', // green glass
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '2px solid rgba(0, 200, 83, 0.22)',
            boxShadow: '0 8px 32px 0 rgba(0,200,83,0.10)',
            position: 'relative',
            overflow: 'hidden',
            '::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              background: 'linear-gradient(120deg, rgba(0,200,83,0.10) 0%, rgba(120,0,255,0.08) 100%)',
              pointerEvents: 'none',
              zIndex: 1
            }
          }}>
            <CardContent sx={{ p: 0, height: '100%' }}>
              <Box sx={{ 
                p: 2, 
                borderBottom: '1px solid #eee',
                background: 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                border: '1px solid rgba(255,255,255,0.25)',
                color: theme.palette.secondary.main,
                boxShadow: '0 4px 24px 0 rgba(0,0,0,0.04)'
              }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Conversations
                </Typography>
              </Box>
              <Box sx={{
                background: 'rgba(255,255,255,0.72)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                borderRadius: 3,
                border: '1.5px solid rgba(0,200,83,0.10)',
                boxShadow: '0 2px 12px 0 rgba(0,200,83,0.06)',
                p: 1,
                height: 'calc(100% - 80px)',
                overflowY: 'auto',
              }}>
                {conversations.map((conversation, index) => (
                  <ListItem 
                    key={conversation.id}
                    button
                    selected={selectedConversation === index}
                    onClick={() => setSelectedConversation(index)}
                    sx={{
                      borderBottom: '1px solid #e0f2f1',
                      borderRadius: 2,
                      mb: 1,
                      background: selectedConversation === index ? 'rgba(0,200,83,0.13)' : 'transparent',
                      transition: 'background 0.2s',
                      '&:hover': {
                        background: 'rgba(0,200,83,0.10)',
                      },
                      '&.Mui-selected': {
                        background: 'rgba(0,200,83,0.18)',
                        borderLeft: `4px solid ${theme.palette.secondary.main}`,
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Badge
                        color={conversation.status === 'online' ? 'success' : 'default'}
                        variant="dot"
                        overlap="circular"
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                      >
                        <Avatar sx={{ 
                          bgcolor: conversation.status === 'online' ? theme.palette.success.main : theme.palette.grey[500],
                          fontWeight: 700 
                        }}>
                          {conversation.avatar}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#222' }}>
                            {conversation.name}
                          </Typography>
                          {conversation.unread > 0 && (
                            <Chip 
                              label={conversation.unread} 
                              size="small" 
                              color="primary" 
                              sx={{ minWidth: 20, height: 20, fontSize: '0.7rem' }}
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="caption" color="primary" sx={{ fontWeight: 600, color: '#009e4f' }}>
                            {conversation.type} • {conversation.company}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#333' }} noWrap>
                            {conversation.lastMessage}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#666' }}>
                            {conversation.time}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </Box>
            </CardContent>
          </Card>
          {/* Chat Area */}
          <Card sx={{ 
            flex: 1, 
            borderRadius: 3,
            background: 'rgba(120,0,255,0.13)', // purple glass
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '2px solid rgba(120,0,255,0.18)',
            boxShadow: '0 8px 32px 0 rgba(120,0,255,0.10)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            transition: 'background 0.3s',
            '::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              background: 'linear-gradient(120deg, rgba(120,0,255,0.10) 0%, rgba(0,200,255,0.08) 100%)',
              pointerEvents: 'none',
              zIndex: 1
            }
          }}>
            {/* Chat Header */}
            <Box sx={{ 
              p: 2, 
              borderBottom: '1.5px solid rgba(120,0,255,0.18)',
              background: 'rgba(120,0,255,0.10)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              border: '1.5px solid rgba(120,0,255,0.18)',
              color: theme.palette.secondary.main,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 4px 24px 0 rgba(120,0,255,0.06)',
              position: 'relative',
              overflow: 'hidden',
              '::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
                background: 'linear-gradient(120deg, rgba(120,0,255,0.10) 0%, rgba(0,200,255,0.08) 100%)',
                pointerEvents: 'none',
                zIndex: 1
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                  {conversations[selectedConversation].avatar}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
                    {conversations[selectedConversation].name}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, color: theme.palette.text.secondary }}>
                    {conversations[selectedConversation].company}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton 
                  onClick={handleScheduleCall}
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.secondary.main,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    mr: 1,
                    '&:hover': {
                      bgcolor: theme.palette.action.hover,
                      color: theme.palette.secondary.dark
                    }
                  }}
                >
                  <VideoCall />
                </IconButton>
                <IconButton 
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.secondary.main,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    '&:hover': {
                      bgcolor: theme.palette.action.hover,
                      color: theme.palette.secondary.dark
                    }
                  }}
                >
                  <MoreVert />
                </IconButton>
              </Box>
            </Box>
            {/* Messages */}
            <Box sx={{ 
              flex: 1, 
              p: 2, 
              overflowY: 'auto',
              background: 'rgba(120,0,255,0.07)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: 3,
            }}>
              {messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    mb: 2,
                    display: 'flex',
                    justifyContent: message.isOwn ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '70%',
                      p: 2,
                      borderRadius: message.isOwn ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                      boxShadow: '0 2px 10px rgba(120,0,255,0.10)',
                      ...(message.id === 1 || message.id === 3
                        ? {
                            background: '#111',
                            color: '#fff',
                          }
                        : message.isOwn
                        ? {
                            background: 'linear-gradient(120deg, #318118ff 0%, #1b740fff 100%)',
                            color: '#fff',
                          }
                        : message.sender === 'Michael Chen'
                        ? {
                            background: 'rgba(120,0,255,0.18)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1.5px solid rgba(120,0,255,0.25)',
                            color: '#fff',
                          }
                        : {
                            background: 'rgba(255,255,255,0.18)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255,255,255,0.18)',
                            color: theme.palette.text.primary,
                          }),
                    }}
                  >
                    <Typography variant="body1" sx={{ mb: 0.5 }}>
                      {message.message}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        opacity: 0.7,
                        fontSize: '0.7rem',
                      }}
                    >
                      {message.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            {/* Message Input */}
            <Box sx={{ 
              p: 2, 
              borderTop: '1.5px solid rgba(120,0,255,0.18)',
              background: 'rgba(120,0,255,0.10)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <IconButton 
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.secondary.main,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: '0 2px 8px rgba(156, 6, 6, 0.04)',
                    '&:hover': {
                      bgcolor: theme.palette.action.hover,
                      color: theme.palette.secondary.dark
                    }
                  }}
                >
                  <AttachFile />
                </IconButton>
                <TextField
                  fullWidth
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      '&:hover fieldset': {
                        borderColor: theme.palette.secondary.main,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.secondary.main,
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.secondary.main,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    minWidth: 48,
                    minHeight: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                      bgcolor: theme.palette.action.hover,
                      color: theme.palette.secondary.dark
                    }
                  }}
                >
                  <Send />
                </Button>
              </Box>
            </Box>
          </Card>
        </Box>
      </Container>
      {/* Schedule Call Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ 
          background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
          color: theme.palette.secondary.contrastText,
          fontWeight: 700
        }}>
          Schedule Video Call
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Schedule a video call with {conversations[selectedConversation].name} to discuss your venture in detail.
          </Typography>
          <TextField
            fullWidth
            label="Preferred Date & Time"
            type="datetime-local"
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="Meeting Topic"
            placeholder="e.g., Investment Discussion, Partnership Opportunity"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Additional Notes"
            multiline
            rows={3}
            placeholder="Any specific topics you'd like to discuss..."
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: theme.palette.text.secondary }}>
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={() => {
              setOpenDialog(false);
              // Handle call scheduling
            }}
            sx={{
              background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
              '&:hover': {
                background: `linear-gradient(90deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.primary.dark} 100%)`,
              }
            }}
          >
            Schedule Call
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EntrepreneurMessages;

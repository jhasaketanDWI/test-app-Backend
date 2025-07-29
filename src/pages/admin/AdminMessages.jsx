import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, Paper, Tabs, Tab, Divider, Avatar, IconButton } from '@mui/material';
import { SpeakerNotes, Forum } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import ContentAnimation from '../../theme/ContentAnimation';
import BackgroundAnimation from '../../theme/BackgroundAnimation';

const initialAnnouncements = [
  { id: 1, sender: 'Admin', content: 'Welcome to the platform!', date: '2025-07-29' },
  { id: 2, sender: 'Admin', content: 'System maintenance scheduled for Friday.', date: '2025-07-28' },
];

const initialConversations = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'J',
    lastMessage: 'Thank you for the update!',
    time: '09:30',
    unread: 2,
    messages: [
      { id: 1, sender: 'Admin', message: 'Hello John, how can I help you?', time: '09:00', isOwn: true },
      { id: 2, sender: 'John Doe', message: 'Thank you for the update!', time: '09:30', isOwn: false },
    ],
  },
  {
    id: 2,
    name: 'Priya Sharma',
    avatar: 'P',
    lastMessage: 'Can you help me with my account?',
    time: 'Yesterday',
    unread: 0,
    messages: [
      { id: 1, sender: 'Admin', message: 'Hi Priya, what do you need help with?', time: 'Yesterday', isOwn: true },
      { id: 2, sender: 'Priya Sharma', message: 'Can you help me with my account?', time: 'Yesterday', isOwn: false },
    ],
  },
];

const AdminMessages = () => {
  const theme = useTheme();
  const location = useLocation();
  // Default tab: 0 (Announcements), but if ?tab=messages, set to 1
  const [tab, setTab] = useState(0);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('tab') === 'messages') setTab(1);
    else setTab(0);
  }, [location.search]);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState(0); // index in conversations
  const [newMessage, setNewMessage] = useState('');

  // Announcement send handler
  const handleSendAnnouncement = () => {
    if (newAnnouncement.trim()) {
      setAnnouncements([
        { id: Date.now(), sender: 'Admin', content: newAnnouncement, date: new Date().toISOString().slice(0, 10) },
        ...announcements
      ]);
      setNewAnnouncement('');
    }
  };

  // Message send handler
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const updatedConversations = [...conversations];
      const conv = { ...updatedConversations[selectedConversation] };
      conv.messages = [
        ...conv.messages,
        { id: Date.now(), sender: 'Admin', message: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isOwn: true }
      ];
      conv.lastMessage = newMessage;
      conv.time = 'Now';
      updatedConversations[selectedConversation] = conv;
      setConversations(updatedConversations);
      setNewMessage('');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.default, color: theme.palette.text.primary, position: 'relative', zIndex: 2 }}>
      <BackgroundAnimation />
      <ContentAnimation direction="left">
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>Admin Announcements & Messages</Typography>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{ mb: 3,
              '& .MuiTab-root': {
                color: '#fff',
                fontWeight: 700,
              },
              '& .Mui-selected': {
                color: '#fff !important',
              },
              '& .MuiTab-root:focus': {
                color: '#fff',
              },
              '& .MuiTab-root:active': {
                color: '#fff',
              },
            }}
            TabIndicatorProps={{ style: { background: '#7c3aed' } }}
          >
            <Tab
              icon={<SpeakerNotes sx={{ color: '#fff' }} />}
              label="Announcements"
              component="button"
              onClick={e => { e.preventDefault(); setTab(0); }}
            />
            <Tab
              icon={<Forum sx={{ color: '#fff' }} />}
              label="Messages"
              component="button"
              onClick={e => { e.preventDefault(); setTab(1); }}
            />
          </Tabs>
          <Divider sx={{ mb: 3 }} />
          {tab === 0 && (
            <Box>
              <Paper
                sx={{
                  p: 3,
                  mb: 3,
                  borderRadius: 4,
                  background: theme => theme.palette.mode === 'dark' ? 'rgba(40,40,60,0.95)' : '#f7f7fc',
                  border: theme => `1.5px solid ${theme.palette.primary.light}`,
                  boxShadow: '0 4px 24px 0 rgba(124,58,237,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <TextField
                  label="Send Announcement"
                  value={newAnnouncement}
                  onChange={e => setNewAnnouncement(e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                  placeholder="Send Announcement"
                  InputProps={{
                    sx: {
                      background: '#fff',
                      '& input::placeholder': {
                        color: '#7c3aed',
                        opacity: newAnnouncement ? 0 : 1,
                        fontWeight: 700,
                        transition: 'opacity 0.2s',
                      },
                    },
                  }}
                  sx={{
                    mb: 2,
                    background: '#fff',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: 'transparent',
                      color: '#222',
                      border: '2px solid #7c3aed',
                    },
                    '& .MuiInputLabel-root': {
                      color: '#7c3aed',
                      fontWeight: 700,
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleSendAnnouncement}
                  sx={theme => ({
                    fontWeight: 700,
                    px: 4,
                    py: 1.2,
                    borderRadius: 2,
                    boxShadow: '0 2px 8px 0 rgba(124,58,237,0.10)',
                    background: theme.palette.secondary.main,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      background: theme.palette.secondary.dark,
                    },
                  })}
                >
                  Send
                </Button>
              </Paper>
              <List>
                {announcements.map(msg => (
                  <ListItem key={msg.id} alignItems="flex-start">
                    <ListItemText
                      primary={msg.content}
                      secondary={`From: ${msg.sender} | Date: ${msg.date}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          {tab === 1 && (
            <Box sx={{ display: 'flex', gap: 3 }}>
              {/* Conversation List */}
              <Paper
                sx={{
                  minWidth: 260,
                  maxWidth: 320,
                  p: 0,
                  borderRadius: 4,
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: theme => theme.palette.mode === 'dark' ? 'rgba(40,40,60,0.95)' : '#f7f7fc',
                  border: theme => `1.5px solid ${theme.palette.primary.light}`,
                  boxShadow: '0 4px 24px 0 rgba(124,58,237,0.08)',
                }}
              >
                <List>
                  {conversations.map((conv, idx) => (
                    <ListItem
                      key={conv.id}
                      button
                      selected={selectedConversation === idx}
                      onClick={() => setSelectedConversation(idx)}
                      sx={{
                        borderLeft: selectedConversation === idx ? '4px solid #7c3aed' : '4px solid transparent',
                        background: selectedConversation === idx ? 'rgba(124,58,237,0.08)' : 'transparent',
                        transition: 'background 0.2s',
                        borderRadius: 2,
                        mx: 1,
                        my: 1,
                      }}
                    >
                      <Avatar sx={{ mr: 2 }}>{conv.avatar}</Avatar>
                      <ListItemText
                        primary={conv.name}
                        secondary={
                          <>
                            <Typography variant="caption" color="primary">
                              {conv.lastMessage}
                            </Typography>
                            <br />
                            <Typography variant="caption" color="text.secondary">
                              {conv.time}
                            </Typography>
                          </>
                        }
                      />
                      {conv.unread > 0 && (
                        <Box sx={{ ml: 1, bgcolor: '#7c3aed', color: '#fff', borderRadius: 2, px: 1, fontSize: 12 }}>{conv.unread}</Box>
                      )}
                    </ListItem>
                  ))}
                </List>
              </Paper>
              {/* Chat Area */}
              <Paper
                sx={{
                  flex: 1,
                  borderRadius: 4,
                  p: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 400,
                  background: theme => theme.palette.mode === 'dark' ? 'rgba(40,40,60,0.97)' : '#fff',
                  border: theme => `1.5px solid ${theme.palette.primary.light}`,
                  boxShadow: '0 4px 24px 0 rgba(124,58,237,0.08)',
                }}
              >
                {/* Chat Header */}
                <Box sx={{ p: 2.5, borderBottom: '1.5px solid #eee', display: 'flex', alignItems: 'center', gap: 2, background: 'rgba(124,58,237,0.04)' }}>
                  <Avatar>{conversations[selectedConversation].avatar}</Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>{conversations[selectedConversation].name}</Typography>
                    <Typography variant="caption" color="text.secondary">User</Typography>
                  </Box>
                </Box>
                {/* Messages */}
                <Box sx={{ flex: 1, p: 2, overflowY: 'auto', background: 'rgba(124,58,237,0.02)' }}>
                  {conversations[selectedConversation].messages.map((message) => (
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
                          background: message.isOwn ? 'linear-gradient(120deg, #7c3aed 0%, #4f46e5 100%)' : '#f7f7fc',
                          color: message.isOwn ? '#fff' : '#222',
                          boxShadow: '0 2px 10px rgba(124,58,237,0.10)',
                        }}
                      >
                        <Typography variant="body1" sx={{ mb: 0.5 }}>{message.message}</Typography>
                        <Typography variant="caption" sx={{ opacity: 0.7, fontSize: '0.7rem' }}>{message.time}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
                {/* Message Input */}
                <Box sx={{ p: 2.5, borderTop: '1.5px solid #eee', background: 'rgba(124,58,237,0.04)' }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                      fullWidth
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                      variant="outlined"
                      size="small"
                    sx={{
                      background: '#fff',
                      borderRadius: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        background: 'transparent',
                        color: '#222',
                        border: '2px solid #7c3aed',
                      },
                      '& .MuiInputLabel-root': {
                        color: '#7c3aed',
                        fontWeight: 700,
                      },
                    }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      sx={theme => ({
                        minWidth: 48,
                        minHeight: 48,
                        fontWeight: 700,
                        borderRadius: 2,
                        boxShadow: '0 2px 8px 0 rgba(124,58,237,0.10)',
                        background: theme.palette.secondary.main,
                        color: theme.palette.primary.main,
                        '&:hover': {
                          background: theme.palette.secondary.dark,
                        },
                      })}
                    >
                      Send
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Box>
          )}
        </Box>
      </ContentAnimation>
    </Box>
  );
};

export default AdminMessages;

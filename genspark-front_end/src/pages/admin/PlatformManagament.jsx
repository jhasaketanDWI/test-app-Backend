import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Divider, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Avatar, List, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@mui/material';
import { Close, Delete, CheckCircle, Cancel, Message, Settings, Security, Update, Storage, SupervisorAccount, Build, Warning } from '@mui/icons-material';
import ContentAnimation from '../../theme/ContentAnimation';

const managementActions = [
  {
    label: 'User Management',
    icon: <SupervisorAccount sx={{ color: '#4f46e5', fontSize: 36 }} />,
    description: 'View, edit, or remove users and manage permissions.',
    action: 'Manage Users',
    isUserManagement: true,
  },
  {
    label: 'System Settings',
    icon: <Settings sx={{ color: '#7c3aed', fontSize: 36 }} />,
    description: 'Configure platform preferences and global settings.',
    action: 'Edit Settings',
  },
  {
    label: 'Security Controls',
    icon: <Security sx={{ color: '#009e4f', fontSize: 36 }} />,
    description: 'Manage authentication, roles, and security policies.',
    action: 'Security Center',
  },
  {
    label: 'Data Backups',
    icon: <Storage sx={{ color: '#ffb300', fontSize: 36 }} />,
    description: 'View and manage platform data backups effectively.',
    action: 'Backup Manager',
  },
  {
    label: 'System Updates',
    icon: <Update sx={{ color: '#ff6b6b', fontSize: 36 }} />,
    description: 'Check for and whether to roll-out system updates.',
    action: 'Update System',
  },
  {
    label: 'Maintenance Tools',
    icon: <Build sx={{ color: '#4f46e5', fontSize: 36 }} />,
    description: 'Access logs, diagnostics, and maintenance utilities.',
    action: 'Open Tools',
  },
];

// Dummy user data
const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@email.com', status: 'pending', avatar: '', document: 'alice_id.pdf' },
  { id: 2, name: 'Bob Smith', email: 'bob@email.com', status: 'active', avatar: '', document: 'bob_passport.jpg' },
  { id: 3, name: 'Carol Lee', email: 'carol@email.com', status: 'declined', avatar: '', document: 'carol_license.pdf' },
  { id: 4, name: 'David Kim', email: 'david@email.com', status: 'active', avatar: '', document: 'david_id_card.png' },
  { id: 5, name: 'Eva Green', email: 'eva@email.com', status: 'pending', avatar: '', document: 'eva_verification.pdf' },
];

function UserManagementDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Manage Users
        <IconButton onClick={onClose}><Close /></IconButton>
      </DialogTitle>
      <DialogContent>
        <List>
          {users.map(user => (
            <ListItem key={user.id} secondaryAction={
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Approve"><span><IconButton color="success" disabled={user.status==='active'}><CheckCircle /></IconButton></span></Tooltip>
                <Tooltip title="Decline"><span><IconButton color="error" disabled={user.status==='declined'}><Cancel /></IconButton></span></Tooltip>
                <Tooltip title="Terminate"><span><IconButton color="warning"><Delete /></IconButton></span></Tooltip>
                <Tooltip title="Message"><span><IconButton color="primary"><Message /></IconButton></span></Tooltip>
              </Box>
            }>
              <ListItemAvatar>
                <Avatar src={user.avatar} alt={user.name} />
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary={<>
                  <span>{user.email}</span>
                  {user.status === 'active' && <span style={{ color: '#009e4f', marginLeft: 8 }}>(Active)</span>}
                  {user.status === 'pending' && <span style={{ color: '#ffb300', marginLeft: 8 }}>(Pending)</span>}
                  {user.status === 'declined' && <span style={{ color: '#ff6b6b', marginLeft: 8 }}>(Declined)</span>}
                  <br />
                  <span style={{ color: '#7c3aed', fontWeight: 500 }}>
                    Document: {user.document ? (
                      <a href={`#`} style={{ color: '#7c3aed', textDecoration: 'underline' }} download>{user.document}</a>
                    ) : 'No document uploaded'}
                  </span>
                </>}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
}

const systemStatus = [
  {
    label: 'Platform Health',
    value: 'Operational',
    icon: <CheckCircle sx={{ color: '#009e4f', fontSize: 32 }} />,
    color: '#009e4f',
  },
  {
    label: 'Pending Updates',
    value: '1',
    icon: <Update sx={{ color: '#ffb300', fontSize: 32 }} />,
    color: '#ffb300',
  },
  {
    label: 'Security Alerts',
    value: '0',
    icon: <Warning sx={{ color: '#ff6b6b', fontSize: 32 }} />,
    color: '#ff6b6b',
  },
  {
    label: 'Storage Usage',
    value: '78%',
    icon: <Storage sx={{ color: '#7c3aed', fontSize: 32 }} />,
    color: '#7c3aed',
  },
];

const actionCardColors = [
  { bg: 'linear-gradient(120deg, #e0f7fa 60%, #b2ebf2 100%)', border: '#00bcd4', label: '#00838f', btn: 'linear-gradient(90deg, #00bcd4 60%, #009688 100%)' }, // teal
  { bg: 'linear-gradient(120deg, #fff3e0 60%, #ffe0b2 100%)', border: '#ff9800', label: '#e65100', btn: 'linear-gradient(90deg, #ff9800 60%, #ffb300 100%)' }, // orange
  { bg: 'linear-gradient(120deg, #e3f2fd 60%, #bbdefb 100%)', border: '#2196f3', label: '#1565c0', btn: 'linear-gradient(90deg, #2196f3 60%, #1976d2 100%)' }, // blue
  { bg: 'linear-gradient(120deg, #e8f5e9 60%, #c8e6c9 100%)', border: '#43a047', label: '#1b5e20', btn: 'linear-gradient(90deg, #43a047 60%, #388e3c 100%)' }, // green
  { bg: 'linear-gradient(120deg, #fce4ec 60%, #f8bbd0 100%)', border: '#ec407a', label: '#ad1457', btn: 'linear-gradient(90deg, #ec407a 60%, #d81b60 100%)' }, // pink
  { bg: 'linear-gradient(120deg, #f3e5f5 60%, #d1c4e9 100%)', border: '#7c3aed', label: '#512da8', btn: 'linear-gradient(90deg, #7c3aed 60%, #4f46e5 100%)' }, // purple
];

const ActionCard = ({ icon, label, description, action, colorIdx, onManageUsers }) => {
  const color = actionCardColors[colorIdx % actionCardColors.length];
  return (
    <Card
      sx={{
        minWidth: 220,
        maxWidth: 340,
        minHeight: 240,
        height: 260,
        borderRadius: 3,
        boxShadow: 4,
        p: 1,
        background: color.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'stretch',
        border: `2px solid ${color.border}`,
        transition: 'box-shadow 0.2s, border 0.2s',
        '&:hover': {
          boxShadow: `0 8px 32px 0 ${color.border}22`,
          border: `2px solid ${color.label}`,
        },
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, height: '100%', width: '100%', justifyContent: 'space-between' }}>
        {icon}
        <Typography variant="h6" fontWeight={700} sx={{ mt: 1, color: color.label }}>{label}</Typography>
        <Typography variant="body2" sx={{ my: 1, color: '#333', flexGrow: 1 }} align="center">{description}</Typography>
        <Button
          variant="contained"
          sx={{ mt: 1, borderRadius: 2, background: color.btn, color: '#fff', fontWeight: 700, textTransform: 'none', px: 3, py: 1, fontSize: 15, boxShadow: 2 }}
          onClick={label === 'User Management' && onManageUsers ? onManageUsers : undefined}
        >
          {action}
        </Button>
      </CardContent>
    </Card>
  );
};

const StatusCard = ({ icon, label, value, color }) => (
  <Card
    sx={{
      minWidth: 180,
      borderRadius: 3,
      boxShadow: 2,
      p: 1,
      background: 'linear-gradient(120deg, #fff 70%, #f3e8ff 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: `2px solid ${color}`,
    }}
  >
    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
      {icon}
      <Typography variant="h6" fontWeight={700} sx={{ mt: 1, color }}>{label}</Typography>
      <Typography variant="h5" fontWeight={800} sx={{ my: 1, color }}>{value}</Typography>
    </CardContent>
  </Card>
);



const PlatformManagament = () => {
  const [userDialogOpen, setUserDialogOpen] = React.useState(false);
  const handleManageUsers = () => setUserDialogOpen(true);
  const handleCloseUserDialog = () => setUserDialogOpen(false);
  return (
    <ContentAnimation direction="up">
      <Box sx={{ minHeight: '100vh', p: { xs: 2, md: 5 }, bgcolor: 'linear-gradient(120deg, #f7f7fc 60%, #e0e7ff 100%)' }}>
        {/* ...existing content... */}
        <Box sx={{ mb: 5, p: { xs: 2, md: 4 }, borderRadius: 4, background: 'linear-gradient(90deg, #ede9fe 60%, #f3e8ff 100%)', boxShadow: '0 4px 24px 0 rgba(124,58,237,0.10)' }}>
          <Typography variant="h3" fontWeight={800} sx={{ mb: 2, color: '#000' }}>
            Platform Management
          </Typography>
          <Typography variant="h6" fontWeight={500} sx={{ mb: 2, color: '#1a1a1a' }}>
            Manage all aspects of your platform from one place. Access user controls, system settings, security, and maintenance tools to ensure smooth operation and growth.
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <Box sx={{ flex: 2 }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1, color: '#000' }}>
                Management Actions
              </Typography>
              <Grid container spacing={3} alignItems="stretch">
                {managementActions.map((action, idx) => (
                  <Grid item xs={12} sm={6} md={4} key={action.label} sx={{ display: 'flex', alignItems: 'stretch' }}>
                    <ActionCard
                      {...action}
                      colorIdx={idx}
                      onManageUsers={action.isUserManagement ? handleManageUsers : undefined}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box sx={{ flex: 1, bgcolor: 'linear-gradient(120deg, #fff 70%, #f3e8ff 100%)', borderRadius: 3, p: 3, boxShadow: 2, minWidth: 240, border: '2px solid #e0e7ff' }}>
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2, color: '#4f46e5', fontSize: 24 }}>System Status</Typography>
              <Grid container spacing={2}>
                {systemStatus.map(status => (
                  <Grid item xs={12} sm={6} key={status.label}>
                    <StatusCard {...status} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 4 }} />
        <Box>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 2, color: '#fff', textShadow: '0 2px 8px rgba(44,44,44,0.18)' }}>
            Admin Tools & Utilities
          </Typography>
          <Grid container spacing={3}>
            {managementActions.slice(3).map((action, idx) => (
              <Grid item xs={12} sm={6} md={4} key={action.label}>
                <ActionCard {...action} colorIdx={idx + 3} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <UserManagementDialog open={userDialogOpen} onClose={handleCloseUserDialog} />
      </Box>
    </ContentAnimation>
  );
};

export default PlatformManagament;

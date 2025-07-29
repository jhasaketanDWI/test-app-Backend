import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Divider } from '@mui/material';
import { TrendingUp, People, MonetizationOn, BarChart, AccountBalance, Assessment } from '@mui/icons-material';
import ContentAnimation from '../../theme/ContentAnimation';

const platformStats = [
	{
		label: 'Active Users',
		value: '12,340',
		icon: <People sx={{ color: '#7c3aed', fontSize: 36 }} />,
		description: 'Users active in the last 30 days',
	},
	{
		label: 'New Signups (This Month)',
		value: '1,120',
		icon: <TrendingUp sx={{ color: '#4f46e5', fontSize: 36 }} />,
		description: 'Users registered in the last 30 days',
	},
	{
		label: 'Verified Users',
		value: '9,800',
		icon: <People sx={{ color: '#009e4f', fontSize: 36 }} />,
		description: 'Users with verified email/identity',
	},
	{
		label: 'Total Projects',
		value: '1,024',
		icon: <BarChart sx={{ color: '#ffb300', fontSize: 36 }} />,
		description: 'Projects launched on the platform',
	},
	{
		label: 'Projects Funded',
		value: '860',
		icon: <BarChart sx={{ color: '#7c3aed', fontSize: 36 }} />,
		description: 'Projects that reached funding goal',
	},
	{
		label: 'Avg. Session Time',
		value: '18m 22s',
		icon: <Assessment sx={{ color: '#ff6b6b', fontSize: 36 }} />,
		description: 'Average user session duration',
	},
	{
		label: 'Daily Active Users',
		value: '2,340',
		icon: <People sx={{ color: '#4f46e5', fontSize: 36 }} />,
		description: 'Users active today',
	},
	{
		label: 'Avg. Engagement Rate',
		value: '67%',
		icon: <Assessment sx={{ color: '#009e4f', fontSize: 36 }} />,
		description: 'Users who interact with content weekly',
	},
];

const financialStats = [
	{
		label: 'Total Revenue',
		value: '$1,200,000',
		icon: <MonetizationOn sx={{ color: '#ffb300', fontSize: 36 }} />,
		description: 'All-time platform revenue',
	},
	{
		label: 'Funds Raised',
		value: '$3,450,000',
		icon: <AccountBalance sx={{ color: '#009e4f', fontSize: 36 }} />,
		description: 'Total funds raised by entrepreneurs',
	},
	{
		label: 'Avg. Investment',
		value: '$27,800',
		icon: <MonetizationOn sx={{ color: '#7c3aed', fontSize: 36 }} />,
		description: 'Average investment per project',
	},
	{
		label: 'Payouts Processed',
		value: '$980,000',
		icon: <AccountBalance sx={{ color: '#4f46e5', fontSize: 36 }} />,
		description: 'Total payouts to users',
	},
	{
		label: 'Pending Withdrawals',
		value: '$42,000',
		icon: <AccountBalance sx={{ color: '#ff6b6b', fontSize: 36 }} />,
		description: 'Withdrawals requested but not yet processed',
	},
	{
		label: 'Platform Fees Collected',
		value: '$120,000',
		icon: <MonetizationOn sx={{ color: '#4f46e5', fontSize: 36 }} />,
		description: 'Total fees collected by the platform',
	},
	{
		label: 'Avg. Payout Time',
		value: '2.3 days',
		icon: <Assessment sx={{ color: '#ffb300', fontSize: 36 }} />,
		description: 'Average time to process payouts',
	},
	{
		label: 'Refunds Issued',
		value: '$8,200',
		icon: <MonetizationOn sx={{ color: '#ff6b6b', fontSize: 36 }} />,
		description: 'Total refunds issued to users',
	},
];

const StatCard = ({ icon, label, value, description, variant }) => {
	let cardStyles = {
		minWidth: 220,
		borderRadius: 3,
		boxShadow: 4,
		p: 1,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		transition: 'box-shadow 0.2s, border 0.2s',
	};
	let valueColor = '#1a1a1a';
	let labelColor = '#333';
	if (variant === 'platform') {
		cardStyles.background = 'linear-gradient(120deg, #e0e7ff 60%, #f3e8ff 100%)';
		cardStyles.border = '2px solid #7c3aed';
		cardStyles['&:hover'] = {
			boxShadow: '0 8px 32px 0 rgba(124,58,237,0.13)',
			border: '2px solid #a259ff',
		};
		valueColor = '#4f46e5';
		labelColor = '#7c3aed';
	} else if (variant === 'financial') {
		cardStyles.background = 'linear-gradient(120deg, #fffbe6 60%, #ffe0b2 100%)';
		cardStyles.border = '2px solid #ffb300';
		cardStyles['&:hover'] = {
			boxShadow: '0 8px 32px 0 rgba(255,179,0,0.13)',
			border: '2px solid #009e4f',
		};
		valueColor = '#ffb300';
		labelColor = '#009e4f';
	}
	return (
		<Card sx={cardStyles}>
			<CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
				{icon}
				<Typography variant="h4" fontWeight={800} sx={{ my: 1, color: valueColor }}>{value}</Typography>
				<Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5, color: labelColor, letterSpacing: 0.2 }}>{label}</Typography>
				<Typography variant="body2" sx={{ color: '#444' }} align="center">{description}</Typography>
			</CardContent>
		</Card>
	);
};



const PlatformOverview = () => (
  <ContentAnimation direction="up">
	<Box sx={{ minHeight: '100vh', p: { xs: 2, md: 5 }, bgcolor: 'linear-gradient(120deg, #f7f7fc 60%, #e0e7ff 100%)' }}>
	  {/* ...existing content... */}
	  <Box sx={{ mb: 5, p: { xs: 2, md: 4 }, borderRadius: 4, background: 'linear-gradient(90deg, #ede9fe 60%, #f3e8ff 100%)', boxShadow: '0 4px 24px 0 rgba(124,58,237,0.10)' }}>
		<Typography variant="h3" fontWeight={800} sx={{ mb: 2, color: '#000' }}>
		  Platform Overview
		</Typography>
		<Typography variant="h6" fontWeight={500} sx={{ mb: 2, color: '#1a1a1a' }}>
		  Get a comprehensive look at platform health, user engagement, and financial performance. Use these insights to make data-driven decisions and monitor growth.
		</Typography>
		<Box sx={{ mt: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
		  <Box sx={{ flex: 2 }}>
			<Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1, color: '#000' }}>
			  Insights & Highlights
			</Typography>
			<ul style={{ margin: 0, paddingLeft: 20, color: '#333', fontSize: 16 }}>
			  <li>Platform user base is steadily growing, with <b>1,120 new signups</b> this month and <b>67%</b> weekly engagement.</li>
			  <li>Funding activity remains strong: <b>860 projects</b> have been fully funded, and <b>$3.45M</b> has been raised by entrepreneurs.</li>
			  <li>Average session time is <b>18m 22s</b>, indicating high user engagement and content value.</li>
			  <li>Platform revenue and fees are healthy, with <b>$1.2M</b> in total revenue and <b>$120K</b> in fees collected.</li>
			  <li>All payouts are processed within <b>2.3 days</b> on average, ensuring user trust and satisfaction.</li>
			</ul>
		  </Box>
		  <Box
			sx={{
			  flex: 1,
			  position: 'relative',
			  borderRadius: 3,
			  p: 0.5,
			  minWidth: 260,
			  background: 'linear-gradient(120deg, #a259ff 0%, #4f46e5 100%)',
			  boxShadow: '0 4px 24px 0 rgba(124,58,237,0.10)',
			  '& > .quick-stats-inner': {
				borderRadius: 2.5,
				background: 'linear-gradient(120deg, #f7f7fc 70%, #ede9fe 100%)',
				p: 3,
				boxShadow: 2,
				border: 'none',
				position: 'relative',
				zIndex: 1,
			  },
			}}
		  >
			<Box className="quick-stats-inner">
			  <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1, color: '#000', fontSize: 28 }}>Quick Stats</Typography>
			  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
				<Typography variant="body2" sx={{ color: '#1a1a1a' }}><b>Active Users Today:</b> 2,340</Typography>
				<Typography variant="body2" sx={{ color: '#1a1a1a' }}><b>Projects Launched:</b> 1,024</Typography>
				<Typography variant="body2" sx={{ color: '#1a1a1a' }}><b>Funds Raised:</b> $3,450,000</Typography>
				<Typography variant="body2" sx={{ color: '#1a1a1a' }}><b>Avg. Investment:</b> $27,800</Typography>
				<Typography variant="body2" sx={{ color: '#1a1a1a' }}><b>Pending Withdrawals:</b> $42,000</Typography>
			  </Box>
			</Box>
		  </Box>
		</Box>
	  </Box>
	  <Box sx={{ mb: 6 }}>
		<Typography variant="h5" fontWeight={700} sx={{ mb: 2, color: '#fff', textShadow: '0 2px 8px rgba(44,44,44,0.18)' }}>
		  Platform Statistics
		</Typography>
		<Grid container spacing={3}>
		  {platformStats.map(stat => (
			<Grid item xs={12} sm={6} md={3} key={stat.label}>
			  <StatCard {...stat} variant="platform" />
			</Grid>
		  ))}
		</Grid>
	  </Box>
	  <Divider sx={{ my: 4 }} />
	  <Box>
		<Typography variant="h5" fontWeight={700} sx={{ mb: 2, color: '#fff', textShadow: '0 2px 8px rgba(44,44,44,0.18)' }}>
		  Financial Statistics
		</Typography>
		<Grid container spacing={3}>
		  {financialStats.map(stat => (
			<Grid item xs={12} sm={6} md={3} key={stat.label}>
			  <StatCard {...stat} variant="financial" />
			</Grid>
		  ))}
		</Grid>
	  </Box>
	</Box>
  </ContentAnimation>
);

export default PlatformOverview;

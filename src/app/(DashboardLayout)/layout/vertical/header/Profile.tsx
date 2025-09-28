import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Stack } from '@mui/system';
import { useMainStore } from '@/app/store';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const { data: session, status } = useSession();
  const { logout } = useMainStore();
  const router = useRouter();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await logout();
    router.push('/auth/auth1/login');
  };

  if (status !== 'authenticated') {
    return null; // Don't render anything if not authenticated
  }

  return (
    <Box>
      <Button
        size="large"
        aria-label="user profile"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        sx={{
          display: 'flex',
          gap: 2,
        }}
        onClick={handleClick}
      >
        <Avatar
          src={"/images/profile/user1.jpg"} // Placeholder image
          alt={session.user?.name || 'User'}
          sx={{ width: 45, height: 45 }}
        />
        {lgUp && (
          <Box textAlign="left">
            <Typography variant="h6" color="textPrimary">
              {session.user?.name || 'User'}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {session.user?.role || 'User'}
            </Typography>
          </Box>
        )}
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{ '& .MuiMenu-paper': { width: '250px', p: 2 } }}
      >
        <Box>
          <Stack direction="row" py={1} spacing={2} alignItems="center">
            <Avatar
              src={"/images/profile/user1.jpg"}
              alt={session.user?.name || 'User'}
              sx={{ width: 60, height: 60 }}
            />
            <Box>
              <Typography variant="h6" color="textPrimary" fontWeight={600}>
                {session.user?.name || 'User'}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {session.user?.role || 'User'}
              </Typography>
            </Box>
          </Stack>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogout}
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
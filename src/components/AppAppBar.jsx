import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';
import Sitemark from './SitemarkIcon';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar({isAuth, setIsAuth  }) {
  const [open, setOpen] = React.useState(false);

  const handleLogout = () => {
      signOut(auth)
        .then(() => {
          localStorage.removeItem('isAuth'); // Remove isAuth from localStorage
          setIsAuth(false); // Update isAuth state
          navigate('/login'); // Redirect to login page after logout
        })
        .catch((error) => {
          console.error('Error signing out:', error);
        });
    };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navItems = [
    { path: '/', link: 'Home' },
    // Conditionally include "Create Post" link if user is authenticated
    ...(isAuth ? [{ path: '/create', link: 'Create' }] : []),
    { path: '/about', link: 'About' },
    { path: '/blogs', link: '' },
    { path: '/contact', link: 'Contact' },
  ];
  
  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
          <h1 className="text-4xl font-bold text-base bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
  FRONTPAGE
</h1>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }} className="lg:flex gap-5 ml-9">
             {navItems.map(({ path, link }) => (
                        <button className='text-white' key={path}>
                          <NavLink
                            className={({ isActive }) => (isActive ? 'text-blue-500' : 'hover:text-blue-500')}
                            to={path}
                          >
                            {link}
                          </NavLink>
                        </button>
                      ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
          {isAuth ? (
  <button
    onClick={handleLogout}
    className="bg-red-500 px-6 py-2 font-medium rounded hover:bg-white hover:text-red-500 transition-all duration-200 ease-in"
  >
    Log Out
  </button>
) : (
  <>
    <NavLink to="/login">
      <Button color="primary" variant="text" size="small">
        Sign in
      </Button>
    </NavLink>
    <NavLink to="/signUp">
      <Button color="primary" variant="contained" size="small">
        Sign up
      </Button>
    </NavLink>
  </>
)}
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem>Features</MenuItem>
                <MenuItem>Testimonials</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth>
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth>
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
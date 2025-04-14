import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';

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

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navItems = [
    { path: '/', link: 'Home' },
    { path: '/about', link: 'About' },
    
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
                <NavLink
                  key={path}
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive 
                        ? 'text-blue-500 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-500 hover:bg-blue-50'
                    }`
                  }
                  to={path}
                >
                  {link}
                </NavLink>
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
            <ColorModeIconDropdown />
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton 
              aria-label="Menu button" 
              onClick={toggleDrawer(true)}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                  width: '100%',
                  maxWidth: 'lg',
                  mx: 'auto',
                  borderRadius: '0 0 12px 12px',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.paper' }}>
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
                {navItems.map(({ path, link }) => (
                  <MenuItem key={path} onClick={toggleDrawer(false)}>
                    <NavLink
                      className={({ isActive }) => 
                        `w-full px-4 py-2 rounded-md ${
                          isActive 
                            ? 'text-blue-500 bg-blue-50' 
                            : 'text-gray-700 hover:text-blue-500'
                        }`
                      }
                      to={path}
                    >
                      {link}
                    </NavLink>
                  </MenuItem>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, p: 2 }}>
                  <ColorModeIconDropdown />
                </Box>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
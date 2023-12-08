import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';

const pages = ['Home', 'Gallery', 'Contact Us'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'transparent',
    transition: 'background-color 0.5s ease-out',
  },
  appBarScrolled: {
    backgroundColor: '#ca9345', // change this to your desired color
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    color: 'orange',
    textDecoration: 'none',
  },
  linkScrolled: {
    color: '#000', // change this to your desired color
    textDecoration: 'none',
  },
}));

// const LINK = styled(Link)`
//   color: orange;
//   text-decoration:none;
//   margin-right:10%;

// `;
function Header() {
  const classes = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [PermissionsAllowed, setPermissionsAllowed] = useState([]);
  const {
    permissions,
    designa,
    designation,
    designationSelected,
    PermissionsSocket,
  } = useSelector((state) => state.functionReducer);
  console.log('PermissionsSocket', PermissionsSocket);
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [cur, handlePageChange] = React.useState(0);
  const [section, setSection] = React.useState(0);

  useEffect(() => {
    setPermissionsAllowed(PermissionsSocket);
  }, [PermissionsSocket]);
  let per = PermissionsAllowed?.filter(
    (obj) => Object.keys(obj)[0] === 'Truck'
  );
  let values = per?.map((e) => e.Truck);
  console.log('values', values);

  return (
    <AppBar
      position="fixed"
      className={scrolled ? classes.appBarScrolled : classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <img src="https://img.icons8.com/external-icongeek26-flat-icongeek26/64/null/external-truck-vehicles-icongeek26-flat-icongeek26-1.png" />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <span style={{ color: 'orange' }}>HIGHWAY</span>
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography textAlign="center">
                <Link
                  to="/"
                  className={scrolled ? classes.linkScrolled : classes.link}
                  style={{ outline: 'none', textDecoration: 'none' }}
                >
                  <Button variant="success" style={{ outline: 'none' }}>
                    Home
                  </Button>
                </Link>
                <Link
                  to="/gallery"
                  className={scrolled ? classes.linkScrolled : classes.link}
                  style={{ outline: 'none', textDecoration: 'none' }}
                >
                  <Button variant="success" style={{ outline: 'none' }}>
                    Gallery
                  </Button>
                </Link>

                <Link
                  to="/contactUs"
                  className={scrolled ? classes.linkScrolled : classes.link}
                  style={{ outline: 'none', textDecoration: 'none' }}
                >
                  <Button variant="success" style={{ outline: 'none' }}>
                    Contact&nbsp;Us
                  </Button>
                </Link>
                <Link
                  to="/truck"
                  className={scrolled ? classes.linkScrolled : classes.link}
                  style={{ outline: 'none', textDecoration: 'none' }}
                >
                  <Button variant="success" style={{ outline: 'none' }}>
                    Trucks
                  </Button>
                </Link>
                <Link
                  to="/routes"
                  className={scrolled ? classes.linkScrolled : classes.link}
                  style={{ outline: 'none', textDecoration: 'none' }}
                >
                  <Button variant="success" style={{ outline: 'none' }}>
                    Routes
                  </Button>
                </Link>
                <Link
                  to="/permissions"
                  className={scrolled ? classes.linkScrolled : classes.link}
                  style={{ outline: 'none', textDecoration: 'none' }}
                >
                  <Button variant="success" style={{ outline: 'none' }}>
                    Permissions
                  </Button>
                </Link>
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          HIGHWAY
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Link
            to="/gallery"
            className={scrolled ? classes.linkScrolled : classes.link}
            style={{ outline: 'none', textDecoration: 'none' }}
          >
            <Button variant="success" style={{ outline: 'none' }}>
              Gallery
            </Button>
          </Link>

          <Link
            to="/contactUs"
            className={scrolled ? classes.linkScrolled : classes.link}
            style={{ outline: 'none', textDecoration: 'none' }}
          >
            <Button variant="success" style={{ outline: 'none' }}>
              Contact&nbsp;Us
            </Button>
          </Link>
          <Link
            to="/driverDetails"
            className={scrolled ? classes.linkScrolled : classes.link}
            style={{ outline: 'none', textDecoration: 'none' }}
          >
            <Button variant="success" style={{ outline: 'none' }}>
              Driver
            </Button>
          </Link>
          <Link
            to="/dashboard"
            className={scrolled ? classes.linkScrolled : classes.link}
            style={{ outline: 'none', textDecoration: 'none' }}
          >
            <Button variant="success" style={{ outline: 'none' }}>
              Dashboard
            </Button>
          </Link>
          <Link
            to="/truck"
            className={scrolled ? classes.linkScrolled : classes.link}
            style={{ outline: 'none', textDecoration: 'none' }}
          >
            <Button variant="success" style={{ outline: 'none' }}>
              Trucks
            </Button>
          </Link>
          <Link
            to="/routes"
            className={scrolled ? classes.linkScrolled : classes.link}
            style={{ outline: 'none', textDecoration: 'none' }}
          >
            <Button variant="success" style={{ outline: 'none' }}>
              Routes
            </Button>
          </Link>
          <Link
            to="/permissions"
            className={scrolled ? classes.linkScrolled : classes.link}
            style={{ outline: 'none', textDecoration: 'none' }}
          >
            <Button variant="success" style={{ outline: 'none' }}>
              Permissions
            </Button>
          </Link>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">
                <Link
                  to="/auth/login"
                  className={scrolled ? classes.linkScrolled : classes.link}
                >
                  Login
                </Link>
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

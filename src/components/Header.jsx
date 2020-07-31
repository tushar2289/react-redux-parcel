import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import { drawerWidth } from './Drawer';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { setCurrentLocation } from '../features/currentlocation/slice';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

const Header = ({ handleDrawerToggle }) => {
  const dispatch = useDispatch();

  const getCurrentLocation = () => {
    if (!window.navigator.geolocation) {
      handleClick();
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          dispatch(setCurrentLocation({ lat, lng }));
        },
        () => {
          handleClick();
        }
      );
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Grid justify="space-between" alignContent="center" container>
          <Grid item>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap style={{ marginTop: '6px' }}>
              Places Nearby
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip title="Get current location">
              <IconButton
                aria-label="Get current location"
                color="inherit"
                onClick={getCurrentLocation}
                data-testid="get_location_button"
              >
                <LocationSearchingIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Please provide permission to capture location
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

Header.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default Header;

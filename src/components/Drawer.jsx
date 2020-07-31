import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Badge from '@material-ui/core/Badge';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import TrainIcon from '@material-ui/icons/Train';
import LocalAirportIcon from '@material-ui/icons/LocalAirport';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GitHubIcon from '@material-ui/icons/GitHub';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Typography } from '@material-ui/core';
import {
  enablePlaceType,
  getPlaceTypes,
} from '../features/filters/placeTypeSlice';
import {
  RESTAURANT,
  BANK,
  HOSPITAL,
  ATM,
  AIRPORT,
  SUPERMARKET,
  TRAIN_STATION,
  GAS_STATION,
  SHOPPING_MALL,
} from '../constants/mapPlaceTypes';
import { setTheme, getTheme } from '../features/themeselector/slice';
import { getPlaces } from '../features/places/slice';

export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  legend: {
    marginLeft: theme.spacing(2),
    color: theme.palette.text.primary,
  },
}));

const getIcon = (type) => {
  switch (type) {
    case RESTAURANT:
      return <RestaurantIcon />;
    case BANK:
      return <AccountBalanceIcon />;
    case HOSPITAL:
      return <LocalHospitalIcon />;
    case ATM:
      return <LocalAtmIcon />;
    case AIRPORT:
      return <LocalAirportIcon />;
    case SUPERMARKET:
      return <LocalGroceryStoreIcon />;
    case TRAIN_STATION:
      return <TrainIcon />;
    case GAS_STATION:
      return <LocalGasStationIcon />;
    case SHOPPING_MALL:
      return <LocalMallIcon />;
  }
};

const Drawer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { theme } = useSelector(getTheme, shallowEqual);

  const toggleTheme = function () {
    dispatch(setTheme(event.target.checked ? 'dark' : 'light'));
  };

  const badgeCount = {
    [RESTAURANT]: 0,
    [BANK]: 0,
    [HOSPITAL]: 0,
    [ATM]: 0,
    [AIRPORT]: 0,
    [TRAIN_STATION]: 0,
    [SUPERMARKET]: 0,
    [GAS_STATION]: 0,
    [SHOPPING_MALL]: 0,
  };

  const { places } = useSelector(getPlaces, shallowEqual);

  const placeTypes = useSelector(getPlaceTypes, shallowEqual);

  const handleChange = (event) => {
    dispatch(
      enablePlaceType({ type: event.target.name, value: event.target.checked })
    );
  };

  places.forEach((place) => {
    if (place.types.indexOf(RESTAURANT) != -1) badgeCount[RESTAURANT]++;
    else if (place.types.indexOf(BANK) != -1) badgeCount[BANK]++;
    else if (place.types.indexOf(HOSPITAL) != -1) badgeCount[HOSPITAL]++;
    else if (place.types.indexOf(ATM) != -1) badgeCount[ATM]++;
    else if (place.types.indexOf(AIRPORT) != -1) badgeCount[AIRPORT]++;
    else if (place.types.indexOf(TRAIN_STATION) != -1)
      badgeCount[TRAIN_STATION]++;
    else if (place.types.indexOf(SUPERMARKET) != -1) badgeCount[SUPERMARKET]++;
    else if (place.types.indexOf(GAS_STATION) != -1) badgeCount[GAS_STATION]++;
    else if (place.types.indexOf(SHOPPING_MALL) != -1)
      badgeCount[SHOPPING_MALL]++;
  });

  return (
    <Box marginTop={2} style={{ height: '100%' }}>
      <Box
        display="flex"
        flexDirection="column"
        alignContent="space-between"
        style={{ height: '100%' }}
      >
        <Box flexGrow={1}>
          <FormControl component="fieldset" style={{ width: '100%' }}>
            <FormLabel className={classes.legend} component="legend">
              Choose a type of place
            </FormLabel>
            <FormGroup>
              <List>
                {Object.keys(placeTypes).map((key) => (
                  <ListItem key={key}>
                    <ListItemIcon>
                      <Badge
                        badgeContent={badgeCount[placeTypes[key].type]}
                        color="primary"
                      >
                        {getIcon(placeTypes[key].type)}
                      </Badge>
                    </ListItemIcon>
                    <ListItemText primary={placeTypes[key].label} />
                    <ListItemSecondaryAction>
                      <FormControlLabel
                        control={
                          <Switch
                            edge="end"
                            checked={placeTypes[key].isOn}
                            onChange={handleChange}
                            inputProps={{
                              'aria-labelledby': placeTypes[key].type,
                            }}
                            name={placeTypes[key].type}
                          />
                        }
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </FormGroup>
            {/* <FormHelperText>Be careful</FormHelperText> */}
          </FormControl>
        </Box>
        <Box textAlign="center" padding={2}>
          <Grid
            component="div"
            container
            style={{ justifyContent: 'center', paddingBottom: '16px' }}
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Tooltip title="Light theme">
                <Brightness5Icon />
              </Tooltip>
            </Grid>
            <Grid item>
              <Switch
                checked={theme === 'dark'}
                onChange={toggleTheme}
                name="theme"
              />
            </Grid>
            <Grid item>
              <Tooltip title="Dark theme">
                <Brightness3Icon />
              </Tooltip>
            </Grid>
          </Grid>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            paddingBottom={2}
          >
            <GitHubIcon fontSize="small" />
            <Box paddingLeft={1}>
              <Link
                color="textPrimary"
                href="https://github.com/tushar2289"
                onClick={(event) => event.preventDefault()}
              >
                tushar2289
              </Link>
            </Box>
          </Box>
          <Typography variant="body1">
            Made with <FavoriteIcon fontSize="small" color="error" /> in India
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Drawer;

import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import LocalHospitalOutlinedIcon from '@material-ui/icons/LocalHospitalOutlined';
import TrainOutlinedIcon from '@material-ui/icons/TrainOutlined';
import LocalAirportOutlinedIcon from '@material-ui/icons/LocalAirportOutlined';
import LocalGasStationOutlinedIcon from '@material-ui/icons/LocalGasStationOutlined';
import LocalGroceryStoreOutlinedIcon from '@material-ui/icons/LocalGroceryStoreOutlined';
import LocalAtmOutlinedIcon from '@material-ui/icons/LocalAtmOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';

import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Skeleton from '@material-ui/lab/Skeleton';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import RestaurantPlaceholder from '../assets/placeholder_images/restaurant.png';
import BankPlaceholder from '../assets/placeholder_images/bank.png';
import HospitalPlaceholder from '../assets/placeholder_images/hospital.png';
import AtmPlaceholder from '../assets/placeholder_images/atm.png';
import GasStationPlaceholder from '../assets/placeholder_images/gas_station.jpg';
import TrainStationPlaceholder from '../assets/placeholder_images/train_station.jpeg';
import ShoppingMallPlaceholder from '../assets/placeholder_images/shopping_mall.webp';
import SupermarketPlaceholder from '../assets/placeholder_images/supermarket.jpg';
import AirportPlaceholder from '../assets/placeholder_images/airport.jpg';

import { setSelectedPlace, getPlaces } from '../features/places/slice';
import {
  RESTAURANT,
  BANK,
  HOSPITAL,
  SHOPPING_MALL,
  GAS_STATION,
  ATM,
  AIRPORT,
  TRAIN_STATION,
  SUPERMARKET,
} from '../constants/mapPlaceTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: 'white',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)',
  },
  selected: {
    background:
      'linear-gradient(to top, rgba(63,81,181,0.9) 0%, rgba(63,81,181,0.5) 70%, rgba(63,81,181,0) 100%)',
  },
}));

function renderLoading() {
  return [1, 2, 3].map((key) => (
    <Box key={key}>
      <Skeleton variant="rect" width={310} height={118} animation="wave" />
      <Box pt={0.5}>
        <Skeleton />
        <Skeleton width="60%" />
      </Box>
    </Box>
  ));
}

function getPlaceholderImage(types) {
  if (types.indexOf(RESTAURANT) != -1) return RestaurantPlaceholder;
  else if (types.indexOf(BANK) != -1) return BankPlaceholder;
  else if (types.indexOf(HOSPITAL) != -1) return HospitalPlaceholder;
  else if (types.indexOf(ATM) != -1) return AtmPlaceholder;
  else if (types.indexOf(AIRPORT) != -1) return AirportPlaceholder;
  else if (types.indexOf(TRAIN_STATION) != -1) return TrainStationPlaceholder;
  else if (types.indexOf(SUPERMARKET) != -1) return SupermarketPlaceholder;
  else if (types.indexOf(GAS_STATION) != -1) return GasStationPlaceholder;
  else if (types.indexOf(SHOPPING_MALL) != -1) return ShoppingMallPlaceholder;
}

function getIcon(types) {
  if (types.indexOf(RESTAURANT) != -1)
    return <RestaurantOutlinedIcon style={{ color: 'white' }} />;
  else if (types.indexOf(BANK) != -1)
    return <AccountBalanceOutlinedIcon style={{ color: 'white' }} />;
  else if (types.indexOf(HOSPITAL) != -1)
    return <LocalHospitalOutlinedIcon style={{ color: 'white' }} />;
  else if (types.indexOf(ATM) != -1)
    return <LocalAtmOutlinedIcon style={{ color: 'white' }} />;
  else if (types.indexOf(AIRPORT) != -1)
    return <LocalAirportOutlinedIcon style={{ color: 'white' }} />;
  else if (types.indexOf(TRAIN_STATION) != -1)
    return <TrainOutlinedIcon style={{ color: 'white' }} />;
  else if (types.indexOf(SUPERMARKET) != -1)
    return <LocalGroceryStoreOutlinedIcon style={{ color: 'white' }} />;
  else if (types.indexOf(GAS_STATION) != -1)
    return <LocalGasStationOutlinedIcon style={{ color: 'white' }} />;
  else if (types.indexOf(SHOPPING_MALL) != -1)
    return <LocalMallOutlinedIcon style={{ color: 'white' }} />;
}

function getRatingComponent(place) {
  return (
    <Box>
      <Rating
        name="size-small"
        defaultValue={place.rating}
        size="small"
        precision={0.5}
        readOnly
      />
    </Box>
  );
}

function ListView() {
  const dispatch = useDispatch();

  const { places, isLoading } = useSelector(getPlaces, shallowEqual);

  const classes = useStyles();

  function setSelected(place) {
    dispatch(setSelectedPlace(place));
  }

  return (
    <div className={classes.root}>
      {isLoading ? (
        renderLoading()
      ) : (
        <GridList className={classes.gridList} cols={3.5}>
          {places.map((tile) => (
            <GridListTile key={tile.id} onClick={() => setSelected(tile)}>
              <LazyLoadImage
                src={tile.photo ? tile.photo : getPlaceholderImage(tile.types)}
                alt={tile.name}
                className="MuiGridListTile-imgFullWidth"
              ></LazyLoadImage>
              <GridListTileBar
                title={tile.name}
                subtitle={getRatingComponent(tile)}
                classes={{
                  root: tile.selected ? classes.selected : classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton aria-label={`star ${tile.name}`}>
                    {getIcon(tile.types)}
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      )}
    </div>
  );
}

export default ListView;

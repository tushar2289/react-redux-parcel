import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  fetchPlaces,
  removePlaces,
  setSelectedPlace,
  setSelectedNone,
  resetPlaces,
  resetError,
  getPlaces,
} from '../features/places/slice';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import mapStyles from '../constants/mapStyles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {
  RESTAURANT,
  BANK,
  HOSPITAL,
  ATM,
  AIRPORT,
  TRAIN_STATION,
  SUPERMARKET,
  GAS_STATION,
  SHOPPING_MALL,
} from '../constants/mapPlaceTypes';
import {
  resetPlaceType,
  getPlaceTypes,
} from '../features/filters/placeTypeSlice';
import BaseLocationIcon from '../assets/base_location.png';
import { getCurrentLocation } from '../features/currentlocation/slice';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const mapContainerStyle = {
  width: '100%',
  height: 'calc(100vh - 180px - 64px)',
};

let center = {
  lat: 19.170078,
  lng: 72.860186,
};

const libraries = ['places'];

function GoogleMapView() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const map = React.useRef();

  const options = {
    styles: mapStyles[theme.palette.type],
    disableDefaultUI: true,
    zoomControl: true,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  const onLoad = React.useCallback((mapInstance) => {
    map.current = mapInstance;
    fetchNearbyPlaces(RESTAURANT);
  });

  const fetchNearbyPlaces = (type) => {
    if (map.current) dispatch(fetchPlaces(type, center, map.current));
  };

  const currentLocation = useSelector(getCurrentLocation);

  const { places, error } = useSelector(getPlaces, shallowEqual);

  const placeTypes = useSelector(getPlaceTypes, shallowEqual);

  const panTo = React.useCallback((lat, lng) => {
    center = { lat, lng };
    if (map.current) {
      map.current.panTo({ lat, lng });
      map.current.setZoom(15);
      fetchNearbyPlaces(RESTAURANT);
    }
  });

  React.useEffect(() => {
    if (currentLocation.lat && currentLocation.lng) {
      dispatch(resetPlaces());
      dispatch(resetPlaceType());
      panTo(currentLocation.lat, currentLocation.lng);
    }
  }, [currentLocation]);

  React.useEffect(() => {
    if (placeTypes.restaurant.isOn) fetchNearbyPlaces(RESTAURANT);
    else dispatch(removePlaces(RESTAURANT));
  }, [placeTypes.restaurant.isOn]);

  React.useEffect(() => {
    if (placeTypes.bank.isOn) fetchNearbyPlaces(BANK);
    else dispatch(removePlaces(BANK));
  }, [placeTypes.bank.isOn]);

  React.useEffect(() => {
    if (placeTypes.hospital.isOn) fetchNearbyPlaces(HOSPITAL);
    else dispatch(removePlaces(HOSPITAL));
  }, [placeTypes.hospital.isOn]);

  React.useEffect(() => {
    if (placeTypes.atm.isOn) fetchNearbyPlaces(ATM);
    else dispatch(removePlaces(ATM));
  }, [placeTypes.atm.isOn]);

  React.useEffect(() => {
    if (placeTypes.airport.isOn) fetchNearbyPlaces(AIRPORT);
    else dispatch(removePlaces(AIRPORT));
  }, [placeTypes.airport.isOn]);

  React.useEffect(() => {
    if (placeTypes.train_station.isOn) fetchNearbyPlaces(TRAIN_STATION);
    else dispatch(removePlaces(TRAIN_STATION));
  }, [placeTypes.train_station.isOn]);

  React.useEffect(() => {
    if (placeTypes.supermarket.isOn) fetchNearbyPlaces(SUPERMARKET);
    else dispatch(removePlaces(SUPERMARKET));
  }, [placeTypes.supermarket.isOn]);

  React.useEffect(() => {
    if (placeTypes.gas_station.isOn) fetchNearbyPlaces(GAS_STATION);
    else dispatch(removePlaces(GAS_STATION));
  }, [placeTypes.gas_station.isOn]);

  React.useEffect(() => {
    if (placeTypes.shopping_mall.isOn) fetchNearbyPlaces(SHOPPING_MALL);
    else dispatch(removePlaces(SHOPPING_MALL));
  }, [placeTypes.shopping_mall.isOn]);

  function setSelected(place) {
    dispatch(setSelectedPlace(place));
  }

  function renderInfoWindow(places) {
    const place = places.find((place) => place.selected);
    if (!place) return null;
    return (
      <InfoWindow
        position={{ lat: place.lat, lng: place.lng }}
        onCloseClick={() => dispatch(setSelectedNone())}
      >
        <Box>
          <Typography variant="caption" color="primary">
            {place.name}
          </Typography>
        </Box>
      </InfoWindow>
    );
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(resetError());
  };

  const renderMap = () => {
    return (
      <>
        <GoogleMap
          onLoad={onLoad}
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
          options={options}
        >
          {places.map((place) => {
            return (
              <Marker
                key={place.id}
                position={{ lat: place.lat, lng: place.lng }}
                animation={window.google.maps.Animation.DROP}
                icon={{
                  url: place.icon,
                  scaledSize: new window.google.maps.Size(24, 24),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(12, 12),
                }}
                onClick={() => setSelected(place)}
              ></Marker>
            );
          })}
          {renderInfoWindow(places)}
          {currentLocation.lat && currentLocation.lng ? (
            <Marker
              key="Base location"
              position={{ lat: currentLocation.lat, lng: currentLocation.lng }}
              animation={window.google.maps.Animation.DROP}
              icon={{
                url: BaseLocationIcon,
                scaledSize: new window.google.maps.Size(50, 50),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(25, 25),
              }}
              onClick={() => null}
            ></Marker>
          ) : null}
        </GoogleMap>
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? (
    renderMap()
  ) : (
    <Skeleton variant="rect" width={'100%'} height={400} animation="wave" />
  );
}

export default GoogleMapView;

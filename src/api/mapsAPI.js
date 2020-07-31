export async function getNearbyPlaces(type, center, map) {
  const location = new window.google.maps.LatLng(center.lat, center.lng);
  const request = {
    location,
    type,
    rankBy: window.google.maps.places.RankBy.DISTANCE,
  };

  const service = new window.google.maps.places.PlacesService(map);
  const places = await convertCallbackToAsyncAwait(service, request);
  const serializedPlaces = places.map(serializePlace);
  return serializedPlaces;
}

const convertCallbackToAsyncAwait = (service, request) => {
  return new Promise((resolve) => {
    service.nearbySearch(request, (r) => {
      resolve(r);
    });
  });
};

const serializePlace = (place) => {
  return {
    lat: place.geometry.location.lat(),
    lng: place.geometry.location.lng(),
    name: place.name,
    icon: place.icon,
    id: place.id,
    photo: place.photos?.length > 0 ? place.photos[0].getUrl() : null,
    rating: place.rating,
    types: place.types,
    user_ratings_total: place.user_ratings_total,
  };
};

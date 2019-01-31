import { SET_COORDS, SET_CITY } from './actionTypes';
import { API_KEY } from '../constants';
import googleMapsAPI from '../api/googleMapsAPI';

export const setCoordinates = coords => ({
  type: SET_COORDS,
  payload: {
    coords
  }
});

export const setCity = (coords) => async dispatch => {
  const { lat, long } = coords;
  const locationInfo = await googleMapsAPI.get(`/geocode/json?latlng=${lat},${long}&key=${API_KEY}`);
  const addressComponents = locationInfo.data.results[0].address_components;

  let cityComponents = {};

  addressComponents.forEach(comp => {
    switch (comp.types[0]) {
      case 'country':
        cityComponents['country'] = { long_name: comp.long_name, short_name: comp.short_name }
        break;
      case 'administrative_area_level_1':
        cityComponents['administrative_area_level_1'] = { long_name: comp.long_name, short_name: comp.short_name }
        break;
      case 'locality':
        cityComponents['locality'] = { long_name: comp.long_name, short_name: comp.short_name }
        break;
      default:
        break;
    }
  });

  dispatch({ type: SET_CITY, payload: cityComponents });
}
import { SET_COORDS, SET_CITY } from './actionTypes';
import { API_KEY } from '../constants';
import googleMapsAPI from '../api/googleMaps';

export const setCoordinates = coords => ({
  type: SET_COORDS,
  payload: {
    coords
  }
});

export const setCity = (coords) => async dispatch => {
  const { lat, long } = coords;
  let link = `/geocode/json?result_type=locality&latlng=${lat},${long}&key=${API_KEY}`
  const locationInfo = await googleMapsAPI.get(link);
  let cityComponents = {
    status: locationInfo.data.status
  };

  if (cityComponents.status === 'OK') {
    locationInfo.data.results[0].address_components.forEach(comp => {
      switch (comp.types[0]) {
        case 'locality':
          cityComponents.locality = { long_name: comp.long_name, short_name: comp.short_name }
          break;

        case 'administrative_area_level_1':
          cityComponents.admin_area = { long_name: comp.long_name, short_name: comp.short_name }
          break;

        case 'country':
          cityComponents.country = { long_name: comp.long_name, short_name: comp.short_name }
          break;

        default:
          break;
      }
    });

    if (cityComponents.admin_area) {
      if (cityComponents.admin_area.short_name === cityComponents.locality.long_name) {
        cityComponents.admin_area = undefined;
      }
    }

    cityComponents.formatted_address = locationInfo.data.results[0].formatted_address;
  }

  dispatch({ type: SET_CITY, payload: cityComponents });
}
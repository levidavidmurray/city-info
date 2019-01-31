import { SET_LOCATION } from './actionTypes';

export const setLocation = coords => ({
  type: SET_LOCATION,
  payload: {
    coords
  }
});
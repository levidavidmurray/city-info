import { SET_CITY } from '../actionTypes';

export default function(state = [], action) {
  switch (action.type) {
    case SET_CITY:
      const cityLocation = action.payload;
      return [...state, cityLocation];

    default:
      return state;
  }
}
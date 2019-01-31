import { SET_COORDS } from '../actionTypes';
import { DEFAULT_LOCATION } from '../../constants';

export default function(state = [DEFAULT_LOCATION], action) {
  switch (action.type) {
    case SET_COORDS:
      const { coords } = action.payload;
      return [...state, coords];

    default:
      return state;
  }
}
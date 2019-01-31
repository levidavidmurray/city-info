import { SET_LOCATION } from '../actionTypes';
import { DEFAULT_LOCATION } from '../../constants';

export default function(state = [DEFAULT_LOCATION], action) {
  switch (action.type) {
    case SET_LOCATION:
      const { coords } = action.payload;
      return [...state, coords];

    default:
      return state;
  }
}
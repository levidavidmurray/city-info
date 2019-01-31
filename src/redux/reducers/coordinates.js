import { SET_COORDS } from '../actionTypes';

export default function(state = [], action) {
  switch (action.type) {
    case SET_COORDS:
      const { coords } = action.payload;
      return [...state, coords];

    default:
      return state;
  }
}
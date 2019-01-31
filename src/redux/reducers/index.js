import { combineReducers } from 'redux';
import coordinates from './coordinates';
import cityLocation from './cityLocation';

export default combineReducers({ coordinates, cityLocation });
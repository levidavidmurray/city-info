import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setCoordinates, setCity } from './redux/actions';

import StaticMap from './components/StaticMap';
import CityName from './components/CityName';
import CitySummary from './components/CitySummary';
import ForecastWeek from './components/ForecastWeek';
import LoaderFS from './components/LoaderFS';

import { DEFAULT_COORDINATES } from './constants';
import './components/scss/App.scss';

class App extends Component  {

  constructor(props) {
    super(props);

    this.getClientCoordinates();
  }

  componentDidUpdate() {
    const { cityLocation, coords, setCity } = this.props;

    if (cityLocation === undefined && coords) {
      setCity(this.props.coords);
    }
  }

  getClientCoordinates() {
    // Success callback calls action to store location in redux store
    const success = position => {
      this.props.setCoordinates({
        lat: position.coords.latitude,
        long: position.coords.longitude
      });
    };

    const error = () => {
      // If location access is denied, we set location to DEFAULT_COORDINATES
      this.props.setCoordinates(DEFAULT_COORDINATES);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

  render() {
    if (!this.props.cityLocation)
      return <LoaderFS />

    return (
      <div>
        <StaticMap />
        <CityName />
        <div className="content">
          <CitySummary />
          <ForecastWeek />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const coords = state.coordinates[state.coordinates.length - 1];
  const cityLocation = state.cityLocation[state.cityLocation.length - 1];
  
  return { coords, cityLocation };
}

export default connect(
  mapStateToProps,
  { setCoordinates, setCity }
)(App);
import React from 'react';

import { connect } from 'react-redux';
import { setCoordinates } from './redux/actions';

import MapBackground from './components/MapBackground';
import { DEFAULT_LOCATION } from './constants';
import './components/css/App.css';

class App extends React.Component  {
  getLocation() {
    const success = position => {
      this.props.setCoordinates({
        lat: position.coords.latitude,
        long: position.coords.longitude
      });
    };

    const error = () => {
      this.props.setCoordinates(DEFAULT_LOCATION);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    return (
      <div>
        <MapBackground />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const coords = state.coordinates[state.coordinates.length - 1];
  return { coords };
}

export default connect(
  mapStateToProps,
  { setCoordinates }
)(App);
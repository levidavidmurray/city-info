import React from 'react';

import { connect } from 'react-redux';
import { setCoordinates, setCity } from './redux/actions';

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

  renderStaticMap() {
    if (this.props.cityLocation) {
      return <MapBackground />;
    }

    // TODO: Add semantic-ui-react, replace with semantic loader
    return <div>Please allow location access...</div>;
  }

  componentDidMount() {
    this.getLocation();
  }

  componentDidUpdate() {
    const { cityLocation, coords, setCity } = this.props;

    if (cityLocation === undefined && coords) {
      setCity(this.props.coords);
    }
  }

  render() {
    return (
      <div>
        {this.renderStaticMap()}
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
import React from 'react';

import { connect } from 'react-redux';
import { setLocation } from './redux/actions';

import MapBackground from './components/MapBackground';
import { DEFAULT_LOCATION } from './constants';
import './components/css/App.css';

class App extends React.Component  {
  getLocation() {
    const success = position => {
      this.props.setLocation({
        lat: position.coords.latitude, 
        long: position.coords.longitude
      });
    };

    const error = () => {
      this.props.setLocation(DEFAULT_LOCATION);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    return (
      <div>
        <div>
          {this.props.coords.long}
          <br/>
          {this.props.coords.lat}
        </div>
        <MapBackground />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { coords: state.location[state.location.length - 1] };
}

export default connect(
  mapStateToProps,
  { setLocation }
)(App);
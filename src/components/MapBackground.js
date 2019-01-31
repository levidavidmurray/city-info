import React from 'react';

import { connect } from 'react-redux';
import { setCity } from '../redux/actions';

import './css/MapBackground.css';
import { API_KEY } from '../constants';

class App extends React.Component {

  // TODO: functionality to build static API link based on store data
  staticMap = `https://maps.googleapis.com/maps/api/staticmap?center=Victoria+BC&zoom=12&size=640x360&scale=2&maptype=satellite&key=${API_KEY}`;

  componentDidMount() {
    const coords = this.props.geoInfo.coordinates;
    this.props.setCity(coords[coords.length - 1]);
  }

  render() {
    return (
      <div>
        <div className="static-map">
          <img src={this.staticMap} alt="Satellite shot of city" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { geoInfo: state };
}

export default connect(
  mapStateToProps,
  { setCity }
)(App);
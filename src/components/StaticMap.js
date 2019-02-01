import React, { Component } from 'react';

import { connect } from 'react-redux';

import './css/StaticMap.scss';
import { API_KEY } from '../constants';

class StaticMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      staticMapLink: ''
    };
  }

  getStaticMapLink(cityLocation) {
    let { locality, admin_area, country } = cityLocation;

    if (cityLocation.admin_area === undefined)
      admin_area = { long_name: '' };

    let link = `https://maps.googleapis.com/maps/api/staticmap?center=`;
    link += `${locality.long_name}+${admin_area.long_name}+${country.long_name}`;
    link += `BC&zoom=12&size=640x360&scale=2&maptype=satellite&key=${API_KEY}`;

    link = link.replace(' ', '+');

    return link;
  }

  componentDidMount() {
    const { cityLocation } = this.props;

    if (cityLocation.status !== 'ZERO_RESULTS') {
      this.setState({
        staticMapLink: this.getStaticMapLink(cityLocation)
      });
    }
  }

  render() {
    return (
      <div className="static-map">
        <img src={this.state.staticMapLink} alt="Satellite shot of city" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    coords: state.coordinates[state.coordinates.length - 1],
    cityLocation: state.cityLocation[state.cityLocation.length -1]
  };
}

export default connect(
  mapStateToProps,
  null
)(StaticMap);
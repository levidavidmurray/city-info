import React, { Component } from 'react';

import { connect } from 'react-redux';

import './css/LocationName.scss';

class LocationName extends Component {
  render() {
    const { formatted_address } = this.props.cityLocation;
    return (
      <div className="location-name">
        <h1>{ formatted_address }</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { cityLocation } = state;
  cityLocation = cityLocation[cityLocation.length - 1];

  return { cityLocation };
}

export default connect(
  mapStateToProps,
  null
)(LocationName);
import React, { Component } from 'react';

import { connect } from 'react-redux';

import './scss/CityName.scss';

class CityName extends Component {
  render() {
    const { formatted_address } = this.props.cityLocation;
    return (
      <div className="city-name">
        <div className="header">
          <div className="border"></div>
          <h1>{ formatted_address }</h1>
        </div>
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
)(CityName);
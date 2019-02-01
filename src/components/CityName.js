import React, { Component } from 'react';

import { connect } from 'react-redux';

import './scss/CityName.scss';
import { PLAY_ANIMATIONS } from '../constants';

class CityName extends Component {
  render() {
    const { locality, admin_area, country } = this.props.cityLocation;

    let formatted_address = `${locality.long_name}, `;
    formatted_address += admin_area ? `${admin_area.short_name}, `: '';
    formatted_address += `${country.long_name}`;

    let animNameDrop = PLAY_ANIMATIONS ? 'name-drop' : '';
    let animBorderSize = PLAY_ANIMATIONS ? 'border-size' : '';

    return (
      <div className="city-name">
        <div className="header">
          <div className={`border ${animBorderSize}`}></div>
          <h1 className={animNameDrop}>{ formatted_address }</h1>
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
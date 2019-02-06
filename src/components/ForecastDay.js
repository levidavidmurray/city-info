import React, { Component } from 'react';

import { PLAY_ANIMATIONS } from '../constants';

class ForecastDay extends Component {

  getUnitChange() {
    const { currentUnit, changeUnit } = this.props;

    if (currentUnit === 'f') {
      return (
        <div className="unit-change">
          <span onClick={ () => changeUnit() } className="change-fn">&deg;C</span>
          <span className="separator">|</span>
          <span className="disabled">&deg;F</span>
        </div>
      );
    }

    return (
      <div className="unit-change">
        <span className="disabled">&deg;C</span>
        <span className="separator">|</span>
        <span onClick={ () => changeUnit() } className="change-fn">&deg;F</span>
      </div>
    );
  }

  getAnimStyle(animDelay) {
    const css = {
      opacity: '0',
      position: 'relative',
      top: '50px',
      animation: `day-fade-in 0.8s ${animDelay} forwards`
    };

    return PLAY_ANIMATIONS ? css : {};
  }

  render() {
    const { day, currentUnit } = this.props;
    let temp = day.dayTempC;
    let weatherDescription = day.weather[0].description;
    let date = day.dayDate.split(' ');
    let dayOfWeek = date[0];

    weatherDescription = weatherDescription.split(' ').map(word => {
      return word[0].toUpperCase() + word.substr(1, word.length);
    }).join(' ');

    if (currentUnit === 'f')
      temp = day.dayTempF;

    return (
      <div className="day" style={this.getAnimStyle(day.animDelay)}>
        <div className="condition-box">
          <img src={process.env.PUBLIC_URL + "/img/weather.png"} alt="weather condition" />
          <span>{ weatherDescription }</span>
        </div>
        <div className="temp">
          <div className="degrees">
            <p>{ temp }</p>
          </div>
          { this.getUnitChange() }
        </div>
        <div className="day-of-week">
          <p>{ dayOfWeek }</p>
        </div>
      </div>
    );
  }
}

export default ForecastDay;
import React, { Component } from 'react';

import { connect } from 'react-redux';

import ForecastDay from './ForecastDay';
import openWeather from '../api/openWeather';
import { OPENWEATHER_KEY } from '../constants';
import './scss/Forecast.scss';

const getDelayMap = () => {
  const iterVal = 0.15;
  let animDelay = 2.5;
  let delayMap = {};

  for(let i = 0; i < 5; i++) {
    delayMap[i] = (animDelay += iterVal) + 's';
  }

  return delayMap;
}

class ForecastWeek extends Component {
  
  constructor(props) {
    super(props);

    this.changeUnit = this.changeUnit.bind(this);

    this.state = {
      forecast: null,
      unit: 'c'
    };
  }

  componentWillMount() {
    this.getForecast();
  }
  
  async getForecast() {
    const forecastReq = await openWeather.get('/forecast', {
      params: {
        lat: this.props.lat,
        lon: this.props.long,
        APPID: OPENWEATHER_KEY,
        units: 'metric'
      }
    });
    
    this.setState({
      forecast: forecastReq.data
    });
  }

  getForecastDays() {
    const forecast = this.state.forecast;
    const animDelayMap = getDelayMap();

    if (!forecast)
      return '';

    let forecastDays = [];
    let i = 0;

    forecast.list.forEach(weather => {
      const temp = Math.round(weather.main.temp);
      if (weather.dt_txt.endsWith('12:00:00')) {
        weather['animDelay'] = animDelayMap[i];
        weather['dayDate'] = new Date(weather.dt * 1000).toDateString();
        weather['dayTempC'] = temp;
        weather['dayTempF'] = Math.round((temp * 1.8) + 32);
        forecastDays.push(weather);
        i++;
      }
    });

    return forecastDays.map(day => {
      return <ForecastDay 
              key={day.dayDate} 
              day={day} 
              currentUnit={this.state.unit}
              changeUnit={this.changeUnit} 
              />;
    });
  }

  changeUnit() {
    switch(this.state.unit) {
      case 'c':
        this.setState({ unit: 'f' });
        break;

      case 'f':
        this.setState({ unit: 'c' });
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <div className="forecast">{ this.getForecastDays() }</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lat: state.coordinates[state.coordinates.length - 1].lat,
    long: state.coordinates[state.coordinates.length - 1].long
  };
}

export default connect(
  mapStateToProps,
  null
)(ForecastWeek);
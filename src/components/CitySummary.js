import React, { Component } from 'react';

import { connect } from 'react-redux';

import wikiSummary from '../api/wikiSummary';
import './scss/CitySummary.scss';
import { PLAY_ANIMATIONS } from '../constants';

class CitySummary extends Component {

  constructor(props) {
    super(props);

    this.getCitySummary();

    this.state = {
      summary: '',
      link: ''
    }
  }

  async getCitySummary() {
    const { locality, admin_area, country } = this.props.cityLocation;

    let summaryText;
    let summaryRequest;

    try {
      summaryRequest = await wikiSummary.get(`/${locality.long_name}, ${admin_area.long_name}`);
      summaryText = summaryRequest.data.extract;
    } catch(err) {
      summaryRequest = await wikiSummary.get(`/${locality.long_name}, ${country.long_name}`);
      summaryText = summaryRequest.data.extract;
    }

    this.setState({
      summary: await summaryText,
      link: await summaryRequest.data.content_urls.desktop.page
    });
  }

  render() {
    let summary = this.state.summary;
    if (summary.length > 600) {
      summary = summary.substr(0, 600);
      summary += '...'
    }

    let animFadeIn = PLAY_ANIMATIONS ? 'summary-fade-in' : '';


    return (
      <div className={`city-summary ${animFadeIn}`}>
        <p>{summary}
          <a href={this.state.link} target="_blank" rel="noopener noreferrer">Wikipedia</a>
        </p>
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
)(CitySummary);
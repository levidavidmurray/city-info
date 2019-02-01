import React, { Component } from 'react';

import { connect } from 'react-redux';

import wikiSummary from '../api/wikiSummary';
import './scss/CitySummary.scss';

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
      if (admin_area.long_name === locality.long_name)
        throw Error;

      summaryRequest = await wikiSummary.get(`/${locality.long_name}, ${admin_area.long_name}`);
      summaryText = summaryRequest.data.extract;
    } catch(err) {
      summaryRequest = await wikiSummary.get(`/${locality.long_name}, ${country.long_name}`);
      summaryText = summaryRequest.data.extract;
    }

    console.log(await summaryRequest);

    this.setState({
      summary: await summaryText,
      link: await summaryRequest.data.content_urls.desktop.page
    });
  }

  render() {
    return (
      <div className="city-summary">
        <p>{this.state.summary}
          <a href={this.state.link} target="_blank">Wikipedia</a>
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
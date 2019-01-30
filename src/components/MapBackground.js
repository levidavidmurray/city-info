import React from 'react';

import './css/MapBackground.css';

class App extends React.Component {

  apiKey = 'AIzaSyA8Ex18-IyOD1QlRIvZavFar1a46Phlpz8';

  staticMap = `https://maps.googleapis.com/maps/api/staticmap?center=Victoria+BC&zoom=12&size=640x360&scale=2&maptype=satellite&key=${this.apiKey}`;

  render() {
    return (
      <div>
        <div class="static-map">
          <div class="overlay"></div>
          <img src={this.staticMap} />
        </div>
      </div>
    );
  }
}

export default App;
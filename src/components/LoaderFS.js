import React from 'react';

import { Dimmer, Loader } from 'semantic-ui-react';

const LoaderFS = () => (
  <Dimmer active>
    <Loader content='Waiting for location access...' size='huge' />
  </Dimmer>
);

export default LoaderFS;
/**
 * This component renders a huge steering wheel, which denotes we are in the
 * steering mode (camera follows mouse cursor).
 */
import appEvents from './service/appEvents.js';
import React from 'react';

class steeringIndicator extends React.Component {
  constructor() {
    super();
    this.showSteeringMode = false;
    this.updateSteering = this.updateSteering.bind(this);
    appEvents.showSteeringMode.on(this.updateSteering);
  }

  render() {
    if (!this.showSteeringMode) return null;

    return (
      <div className='steering'>
        <div className='inner'></div>
      </div>
    );
  };

  updateSteering(isVisible) {
    this.showSteeringMode = isVisible;
    this.forceUpdate();
  }
}

export default steeringIndicator;

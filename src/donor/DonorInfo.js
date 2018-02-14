import React, { Component } from 'react';


//TODO: either use this component or get rid of it
class DonorInfo extends Component {
  render() {
    return(
      <div className="tile is-parent">
        <div className="tile is-child box  hero is-primary">
          <p className="subtitle">
                Northwest Mothers Milk Bank is a not-for-profit donor milk bank established in 2008. 
                Our mission is based on the belief that every baby deserves access to human milk. 
                We carry out this mission through the safe collection and distribution of
                human donor milk, education, advocacy, and research.
          </p>
        </div>
      </div>
    );
  }
}

export default DonorInfo;
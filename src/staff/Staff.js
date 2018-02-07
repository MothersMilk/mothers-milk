import React, { Component } from 'react';

import AllDonations from '../donations/AllDonations';

class Staff extends Component {
  render() {
    return(
      <div>
        <AllDonations staffView={true}/>
      </div>
    );
  }
}
 
export default Staff;
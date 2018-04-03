import React, { Component } from 'react';

import AllDonations from '../donations/AllDonations';
import AllSupplyRequests from '../supplyRequest/AllSupplyRequests';

class Staff extends Component {
  render() {
    return(
      <div>
        <AllDonations staffView={true}/>
        <AllSupplyRequests staffView={true}/>
      </div>
    );
  }
}
 
export default Staff;
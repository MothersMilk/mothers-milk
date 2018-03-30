import React, { Component } from 'react';
import { connect } from 'react-redux';
import DonorView from '../donor/DonorView';

class Volunteer extends Component {
  render() {
    return(
      <div>
        <DonorView/>
      </div>
    );
  }
}
 
export default connect(
  null,
  null
)(Volunteer);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DonorView from '../donor/DonorView';

class Volunteer extends Component {
  render() {
    const { volunteerDropSite } = this.props;

    return(
      <div>
        <DonorView volunteerDropSite={volunteerDropSite}/>
      </div>
    );
  }
}
 
export default connect(
  ({ auth }) => ({ volunteerDropSite : auth.user.myDropSite }),
  null
)(Volunteer);
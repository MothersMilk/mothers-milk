import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import DonorView from '../donor/DonorView';
import Admin from '../admin/Admin';
import Staff from '../staff/Staff';
import Volunteer from '../volunteer/Volunteer';

class Home extends Component {
  
  render(){
    const { user } = this.props;
    const isAdmin = user ? user.roles.includes('admin') : false;
    const isStaff = user ? user.roles.includes('staff') : false;
    const isVolunteer = user && user.roles.includes('volunteer');

    let view = <DonorView/>;
    if (isAdmin) view = <Admin/>;
    if (isStaff) view = <Staff/>;
    if (isVolunteer) view = <Volunteer/>;

    return(
      <div>
        <Header/>
        {user ? view :
          <main>
            <img className="home" alt="baby" src="/images/babyincubator.jpg"/>
          </main>
        }
      </div>
    );
  }
}

export default connect(({ auth }) => ({
  error: auth.error,
  user: auth.user
}),
null
)(Home);
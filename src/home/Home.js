import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import DonorView from '../donor/DonorView';
import Admin from '../admin/Admin';
import Staff from '../staff/Staff';

class Home extends Component {
  
  render(){
    const { user } = this.props;
    const isAdmin = user ? user.roles.includes('admin') : false;
    const isStaff = user ? user.roles.includes('staff') : false;
    let view = isAdmin ? <Admin/> : <DonorView/> ;
    view = isStaff ? <Staff/> : view;

    return(
      <div>
        <Header/>
        {user ? view :
          <main>
            <img className="home" alt="baby" src="/images/babyfeet.jpeg"/>
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
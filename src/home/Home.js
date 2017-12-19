import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import DonorView from '../donor/DonorView';
import Admin from '../admin/Admin';

class Home extends Component {
  
  render(){
    const { user } = this.props;
    const isAdmin = user ? user.roles.includes('admin') : false;
    const view = isAdmin ? <Admin/> : <DonorView/> ;
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

export default connect(
  ({ auth }) => ({ user: auth.user }),
  null
)(Home);
import React, { Component } from 'react';
import HomeInfo from './HomeInfo';
import DropSites from '../dropSites/DropSites';
import AddDonation from '../donations/AddDonations';
import SupplyRequest from '../supplyRequest/SupplyRequest';
import Header from './Header';
import Footer from './Footer';
import { loadDropSites } from '../dropSites/actions';
import { loadDonations } from '../donations/actions';
import { connect } from 'react-redux';
import '../style/mystyle.css';


class Home extends Component {

  render() {

    const { user, donations } = this.props;
    user && this.props.loadDropSites();
    //user && this.props.loadDonations();

    return (
      <div>
        <Header/>
        <h1>Welcome { user ? user.name : '' }and thank you for your generosity.</h1><br/>
        
        <AddDonation/>
        <DropSites/>
        <SupplyRequest/>
        <HomeInfo/>
        <div className="need-space"></div>
        <div className="container is-fluid">
          <div className="need-space"></div>
          <div className="tile is-ancestor">  
          </div>
          <div className="need-space"></div>
        </div>
        <Footer/>
      </div>
    );
  }
}



export default connect(
  ({ auth, donations }) => ({ user: auth.user, donations }),
  { loadDropSites, loadDonations }
)(Home);
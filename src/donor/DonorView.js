import React, { Component } from 'react';
import Donations from '../donations/Donations';
import SupplyRequest from '../supplyRequest/SupplyRequest';
import { loadDropSites } from '../dropSites/actions';
import { connect } from 'react-redux';


class DonorView extends Component {
  componentDidMount() {
    this.props.loadDropSites();
  }

  render() {
    const { user } = this.props;

    return (
      <div className="container is-fluid" id="container-padding">
        <div className="container is-fluid">
          <div className="tile is-child box hero is-warning">
            <h1 className="title">Welcome { user ? user.name : '' }</h1>
            <h2 className="subtitle">Thank you for participating in the milk drop program.</h2>
          </div>
        </div>
        <div className="container is-fluid">
          <div>
            <Donations/>
            <SupplyRequest/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ auth, donations }) => ({ user: auth.user, donations }),
  { loadDropSites }
)(DonorView);
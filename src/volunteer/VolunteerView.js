import React, { Component } from 'react';
import VolunteerDonations from './VolunteerDonations';
import { loadDropSites } from '../dropSites/actions';
import { connect } from 'react-redux';


class VolunteerView extends Component {
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
          </div>
        </div>
        <div className="container is-fluid">
          <div>
            <VolunteerDonations/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ auth }) => ({ user: auth.user }),
  { loadDropSites }
)(VolunteerView);
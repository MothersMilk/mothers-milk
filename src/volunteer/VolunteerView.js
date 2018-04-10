import React, { Component } from 'react';
import VolunteerDonations from './VolunteerDonations';
import { loadDropSites } from '../dropSites/actions';
import { connect } from 'react-redux';


class VolunteerView extends Component {

  constructor(){
    super();
    this.state = {
      volunteerDropSite: ''
    };
  }
  componentDidMount() {
    this.props.loadDropSites().then(() => {
      const volunteerDropSite = this.props.dropSites.find(d => d._id === this.props.user.myDropSite);
      this.setState({ volunteerDropSite });
    });
  }

  render() {
    const { user } = this.props;
    const { volunteerDropSite } = this.state;
    return (
      <div className="container is-fluid" id="container-padding">
        <div className="container is-fluid">
          <div className="tile is-child box hero is-warning">
            <h1 className="title">Welcome { user ? user.name : '' }</h1>
            <h3 className="title">Your Milk Drop location is { volunteerDropSite ? volunteerDropSite.name : '' }</h3>
          </div>
        </div>
        <div className="container is-fluid">
          <div>
            <VolunteerDonations volunteerDropSite={volunteerDropSite.name}/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ auth, dropSites }) => ({ user: auth.user, dropSites }),
  { loadDropSites }
)(VolunteerView);
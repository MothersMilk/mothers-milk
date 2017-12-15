import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllDonations from '../donations/AllDonations';
import AllDropSites from '../dropSites/AllDropSites';
import AllUsers from '../users/AllUsers';
import { signup } from '../home/actions';
import { addDropSite } from '../dropSites/actions';


class Admin extends Component {

  handleSignUp = event => {
    event.preventDefault();
    const { email, password, name, roles } = event.target.elements;
    this.props.signup(
      { 
        name: name.value,
        email: email.value,
        password: password.value, 
        roles: roles.value
      });
  }

  handleAddDropSite = event => {
    event.preventDefault();
    const { address, name, hours } = event.target.elements;
    this.props.addDropSite(
      { 
        name: name.value,
        hours: hours.value,
        address: address.value
      });
  }

  render(){
    return(
      <div>
        <br/>
        <AllDonations/>
        <div className="need-space"></div>
        <AllDropSites/>
        <h3><strong>Create New DropSite:</strong></h3>
        <form onSubmit={event => this.handleAddDropSite(event)}>
          <label>Name: <input name="name"/></label>
          <label>Address: <input name="address"/></label>
          <label>Hours: <input name="hours"/></label>
          <input type="submit" ></input>
        </form>
        <br/>
        <AllUsers/>
        <div className="need-space"></div>
        <h3><strong>Create New User:</strong></h3>
        <form onSubmit={event => this.handleSignUp(event)}>
          <label>name: <input name="name"/></label>
          <label>role: 
            <select name="roles">
              <option key="0" value="donor">Donor</option>
              <option key="1" value="staff">Staff</option>
              <option key="2" value="admin">Admin</option>
              <option key="3" value="volunteer">Volunteer</option>
            </select>
          </label>
          <label>email: <input name="email"/></label>
          <label>password: <input type="password" name="password"/></label>
          <input type="submit" ></input>
          <div className="need-space"></div>
          <div className="need-space"></div>
          <div className="need-space"></div>
          <div className="need-space"></div>
        </form>
      </div>
    );
  }
}

export default connect(({ auth }) => ({
  error: auth.error,
  user: auth.user
}),
{ signup, addDropSite }
)(Admin);
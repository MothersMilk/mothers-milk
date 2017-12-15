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
        <br/>
        <AllDropSites/>
        <form onSubmit={event => this.handleAddDropSite(event)}>
          <label>Name: <input name="name"/></label>
          <label>Address: <input name="address"/></label>
          <label>Hours: <input name="hours"/></label>
          <input type="submit" ></input>
        </form>
        <br/>
        <AllUsers/>
        <h3>Create New User:</h3>
        <form onSubmit={event => this.handleSignUp(event)}>
          <label>name: <input name="name"/></label>
          <label>role: <select name="roles">
            <option key="0" value="donor">Donor</option>
            <option key="1" value="staff">Staff</option>
            <option key="2" value="admin">Admin</option>
          </select>
          </label>
          <label>email: <input name="email"/></label>
          <label>password: <input type="password" name="password"/></label>
          <input type="submit" ></input>
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
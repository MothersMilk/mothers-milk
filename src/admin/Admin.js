import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllDonations from '../donations/AllDonations';
import AllDropSites from '../dropSites/AllDropSites';
import AllUsers from '../users/AllUsers';
import { signup } from '../home/actions';
import { addDropSite } from '../dropSites/actions';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      mmbIdWarning: false
    };
  }

  handleSignUp = event => {
    event.preventDefault();
    const { email, password, name, roles, mmbId } = event.target.elements;
    if (roles.value === 'donor' && !mmbId.value) {
      this.setState({ mmbIdWarning: true });
      return;
    }
    event.persist();
    try {
      this.props.signup(
        { 
          mmbId: mmbId.value,
          name: name.value,
          email: email.value,
          password: password.value, 
          roles: roles.value
        })
        .then(() => {
          event.target.reset();
          this.setState({ mmbIdWarning: false });
        });
    }
    catch(err) {
      throw err;
    }
  }

  handleAddDropSite = event => {
    event.preventDefault();
    const { address, name, hours } = event.target.elements;
    event.persist();
    try{
      this.props.addDropSite(
        { 
          name: name.value,
          hours: hours.value,
          address: address.value
        })
        .then(() => event.target.reset());
    }
    catch(err) {
      throw err;
    }
  }

  render() {
    const { mmbIdWarning } = this.state;

    return(
      <div>
        <br/>
        <AllDonations/>
        <div className="need-space"></div>
        <AllDropSites/>
        <h3><strong>Create New DropSite:</strong></h3>
        <form onSubmit={this.handleAddDropSite}>
          <label>Name: <input name="name"/></label>
          <label>Address: <input name="address"/></label>
          <label>Hours: <input name="hours"/></label>
          <input type="submit" ></input>
        </form>
        <br/>
        <AllUsers/>
        <div className="need-space"></div>
        { mmbIdWarning && <span className="tag is-danger">Donors must have an MMB ID</span> }
        <h3><strong>Create New User:</strong></h3>
        <form onSubmit={this.handleSignUp}>
          <label>MMB ID#: <input name="mmbId"/></label>
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
          <button className={this.props.loading ? 'button is-loading' : 'button'} type="submit" >Submit</button>
          {this.props.error ? <div className="button is-danger">Failed to create user. Check required fields</div> : null }
          <div className="need-space"></div>
          <div className="need-space"></div>
          <div className="need-space"></div>
          <div className="need-space"></div>
        </form>
      </div>
    );
  }
}
 
export default connect(({ auth, loading, error }) => ({
  error,
  user: auth.user,
  loading
}),
{ signup, addDropSite }
)(Admin);
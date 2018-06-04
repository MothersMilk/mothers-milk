import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import AllDonations from '../donations/AllDonations';
import AllDropSites from '../dropSites/AllDropSites';
import AllUsers from '../users/AllUsers';
import { signup } from '../home/actions';
import { addDropSite } from '../dropSites/actions';
import AllSupplyRequests from '../supplyRequest/AllSupplyRequests';

class Admin extends PureComponent {
  constructor() {
    super();
    this.state = {
      mmbIdWarning: false,
      volunteerSelected: false
    };
  }

  handleVolunteerSelected = ({ target }) => {
    if (target.value === 'volunteer') this.setState({ volunteerSelected: true });
    else this.setState({ volunteerSelected: false });
  }

  handleSignUp = event => {
    event.preventDefault();
    const { email, password, name, roles, mmbId, dropSite } = event.target.elements;
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
          roles: roles.value,
          myDropSite: dropSite ? dropSite.value : null
        })
        .then(() => {
          event.target.reset();
          this.setState({ mmbIdWarning: false, volunteerSelected: false });
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
    const { mmbIdWarning, volunteerSelected } = this.state;

    return(
      <div>
        <br/>
        <AllDonations/>
        <div className="need-space"></div>
        <AllSupplyRequests/>
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
            <select name="roles" onChange={this.handleVolunteerSelected}>
              <option key="0" value="donor">Donor</option>
              <option key="1" value="staff">Staff</option>
              <option key="2" value="admin">Admin</option>
              <option key="3" value="volunteer">Volunteer</option>
            </select>
          </label>
          <label>email: <input name="email"/></label>
          <label>password: <input type="password" name="password"/></label>
          {volunteerSelected && <label>dropsite: <DropSites dropSites={this.props.dropSites}/> </label>}
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
 
export default connect(({ auth, loading, error, dropSites }) => ({
  error,
  user: auth.user,
  dropSites,
  loading
}),
{ signup, addDropSite }
)(Admin);

class DropSites extends PureComponent {
  render() {
    const { dropSites } = this.props;
    return (
      <div className="select">
        <select name="dropSite" className="button is-outlined is-size-6">
          {dropSites.map(dropSite => {
            return (<option key={dropSite._id} value={dropSite._id}> {dropSite.name} </option>);
          })}
        </select>
      </div>
    );
  }
}
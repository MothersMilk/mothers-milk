import React, { PureComponent } from 'react';
import { loadMyDonations, removeMyDonation, updateMyDonation } from '../donations/actions';
import { connect } from 'react-redux';
import { checkForToken } from '../home/actions';
import AddDonations from './AddDonations';

class Donations extends PureComponent {

  constructor(){
    super();
    this.state = { 
      displayMain: false,
      display: false
    };
  }

  componentDidMount() {
    this.props.loadMyDonations();
  }

  handleClick = () => {
    this.setState({ displayMain: !this.state.displayMain });
  }

  handleRemove = id => {
    this.props.removeMyDonation(id);
  }

  handleEdit = donation => {
    this.props.updateMyDonation(donation);
  }


  render() {

    const { donations, dropSites, user } = this.props;
    const { displayMain, display } = this.state;

    
    return (
      <div className="tile is-parent">
        <div className="tile is-child box hero is-info">
          <div className="subtitle">
            <a className="subtitle has-text-success link-hover" onClick={this.handleClick}><strong>Make a Donation</strong></a></div>
          {displayMain &&
          <div>
            <hr/>
            <AddDonations user={user}/>
            <hr/>
            <button className="button is-light" onClick={() => this.setState({ display: !this.state.display })}>My Donation Total</button>
            
            {display && <TotalDisplay donations={donations}/>}

            {display && 
            <table className="table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>DropSite</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <Row 
                    key={donation._id} 
                    id={donation._id}
                    dropSite={donation.dropSite}
                    dropSites={dropSites} 
                    quantity={donation.quantity}
                    remove={id => this.handleRemove(id)}
                    edit={donation => this.handleEdit(donation)} 
                    status={donation.status}/>
                ))}
              </tbody>
            </table>}
          </div>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    donations: state.donations,
    user: state.auth.user,
    dropSites: state.dropSites
  };
}

export default connect(
  mapStateToProps,
  { loadMyDonations, removeMyDonation, updateMyDonation, checkForToken }
)(Donations);

class Row extends PureComponent {
  state = {
    editing: false,
    _id: this.props.id
  }

  toggleEdit = () => {
    this.setState(prev => {
      return { editing : !prev.editing };
    });
  }

  handleChange = ({ target: input }) => this.setState({ [input.name]: input.value });

  handleSubmit = () => {
    const donation = { ...this.state };
    delete donation.editing;
    this.props.edit(donation);
    this.toggleEdit();
  }

  handleDropSiteChange = ({ target }) => {
    this.setState({ dropSite: target.value });
  }

  render() {
    const { quantity, status, id, dropSite, dropSites, remove } = this.props;
    const { editing } = this.state;   
    return(
      <tr>
        <td> 
          {!editing 
            ? quantity + ' .oz'
            : <input name='quantity' defaultValue={quantity} onChange={this.handleChange}/>  
          }        
        </td>

        <td>
          {status}
        </td>

        <td> 
          {!editing
            ? dropSites.find(d => d._id === dropSite._id || d._id === dropSite).name
            : <DropSites dropSite={dropSite} dropSites={dropSites} handleDropSiteChange={this.handleDropSiteChange}/>
          }
        </td>

        {editing && <td><button onClick={() => remove(id)}>Remove</button></td>}
        {editing && <td><button onClick={this.handleSubmit}>Apply</button></td>}       
        {status === 'Awaiting Pickup' && <td><button onClick={this.toggleEdit}>{!editing ? 'Edit' : 'Cancel'}</button></td>}

      </tr>
    );
  }
}

class DropSites extends PureComponent {
  render() {
    const { dropSite, dropSites, handleDropSiteChange } = this.props;
    return (
      <div className="select">
        <select defaultValue={dropSite._id} name="dropSite" className="button is-outlined is-size-6" onChange={handleDropSiteChange}>
          {dropSites.map(dropSite => {
            return (<option key={dropSite._id} value={dropSite._id}> {dropSite.name} </option>);
          })}
        </select>
      </div>
    );
  }
}

class TotalDisplay extends PureComponent {
  render() {
    const { donations } = this.props;
    
    const total = donations.reduce((acc = 0, e) => {
      return acc + e.quantity;
    }, 0);

    function convertToGal(num) {
      return (num < 128) ? `${num} Oz.` : `${Math.floor(num/128)} gal.  ${num%128} oz.`;
    }

    return(
      <h1>Estimated Total: {convertToGal(total)}</h1>
    );
  }
}
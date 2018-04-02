import React, { PureComponent } from 'react';
import { loadMyDonations, removeMyDonation, updateMyDonation } from '../donations/actions';
import { connect } from 'react-redux';
import { checkForToken } from '../home/actions';
import AddDonations from './AddDonations';

class Donations extends PureComponent {

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

    const { donations, user } = this.props;
    
    return (
      <div className="tile is-parent">
        <div className="tile is-child box hero is-info">
          <div>
            <hr/>
            <AddDonations user={user}/>
            <hr/>
            <table className="table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>ID</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <Row 
                    key={donation._id} 
                    id={donation._id}
                    dropSite={donation.dropSite}
                    quantity={donation.quantity}
                    remove={id => this.handleRemove(id)}
                    edit={donation => this.handleEdit(donation)} 
                    status={donation.status}/>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    donations: state.donations,
    user: state.auth.user
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
    const { quantity, status, id, remove } = this.props;
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
        </td>

        {editing && <td><button onClick={() => remove(id)}>Remove</button></td>}
        {editing && <td><button onClick={this.handleSubmit}>Apply</button></td>}       
        {status === 'Awaiting Pickup' && <td><button onClick={this.toggleEdit}>{!editing ? 'Edit' : 'Cancel'}</button></td>}

      </tr>
    );
  }
}
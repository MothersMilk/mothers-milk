import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { loadDonations, updateDonation, deleteDonation } from './actions';


class AllDonations extends PureComponent {
  state = { editing: null };

  componentDidMount =  () => this.props.loadDonations();

  handleUpdate = _id => { 
    const update = this.state;
    delete update.editing;
    delete update.show;
    this.props.updateDonation({ ...update, _id });
  };  

  handleDelete = id => this.props.deleteDonation(id);
  
  handleChange = ({ target: input }) => this.setState({ [input.name]: input.value });

  render() {
    const { donations, staffView } = this.props;
    const tableData = donations.length ? donations.map(item => {
      const { _id: id, donor, dropSite, quantity, status } = item;
      const editing = this.state.editing === id ? true : false;
      const statusOptions = [ 'Pending','Received', 'Missing'];
      const currentStatusIndex = statusOptions.findIndex(status => status === item.status);
      const options = statusOptions.map((status, i) => i === currentStatusIndex ? <option selected value={status}>{status}</option> : <option value={status}>{status}</option>);
      return (
        <tr class={ editing ? 'animated fadeIn' : null } key={id}>
          <td>
            {donor ? donor.name : null}
          </td>
          <td>
            {dropSite ? dropSite.name : null}
          </td>
          <td>
            { editing ?
              <input class="input is-small" type="text" placeholder={quantity} name="quantity" onChange={event => this.handleChange(event)}/> :
              quantity
            }
          </td>
          <td>
            { editing ? 
              <div class="select is-small is-primary">
                <select type="text" name="status" onChange={event => this.handleChange(event)}>
                  {options}
                </select>
              </div> :
              status
            }
          </td>
          { !staffView && editing ? <td><button class="button is-small" type="button" value="X" onClick={() => this.handleDelete(id)}>Remove donation</button></td> : null }
          <td>
            { editing ? 
              <button class="button is-small" type="submit" value="Apply Changes" onClick={() => this.handleUpdate(id)}>Apply Changes</button> :
              <button class="button is-small" type="button" value="✎" onClick={() => this.setState({ editing: id, show: !this.state.show })}>Edit</button> 
            }
          </td>
          <td>
            { editing ? 
              <div class="delete is-medium" type="submit" value="Apply Changes" onClick={() => this.setState({ editing: null })}></div> :
              null
            }
          </td>
        </tr>
      );
    }): null;

    return(
      <div className="column is-6 is-offset-3">
        <h3 className="title is-4">Donations</h3>
        <table className="table is-striped is-hoverable">
          <thead>
            <tr>
              <th>Donor</th>
              <th>Drop Site</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  ({ auth, donations }) => ({ user: auth.user, donations }),
  { loadDonations, updateDonation, deleteDonation }
)(AllDonations);

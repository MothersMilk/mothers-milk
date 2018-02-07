import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { loadDonations, updateDonation, deleteDonation } from './actions';


class AllDonations extends PureComponent {
  state = { editing: null };

  componentDidMount() {
    this.props.loadDonations();
  }

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
      const { _id: id, donor, dropSite, quantity, status, date } = item;
      const editing = this.state.editing === id ? true : false;
      const statusOptions = [ 'Pending','Received', 'Missing'];
      const currentStatusIndex = statusOptions.findIndex(status => status === item.status);
      const options = statusOptions.map((status, i) => i === currentStatusIndex ? <option key={i} value={status}>{status}</option> : <option key={i} value={status}>{status}</option>);
      
      function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        const d = new Date(inputFormat);
        return [pad(d.getMonth()+1), pad(d.getDate()), d.getFullYear()].join('/');
      }

      return (
        <tr className={editing ? 'animated fadeIn' : null} key={id}>
          <td>
            {date ? convertDate(date) : null}
          </td>
          <td>
            {donor ? donor.name : null}
          </td>
          <td>
            {dropSite ? dropSite.name : null}
          </td>
          <td>
            { editing ?
              <input className="input is-small" type="text" defaultValue={quantity} name="quantity" onChange={event => this.handleChange(event)}/> :
              quantity
            }
          </td>
          <td>
            { editing ? 
              <div className="select is-small is-primary">
                <select type="text" name="status" onChange={event => this.handleChange(event)}>
                  {options}
                </select>
              </div> :
              status
            }
          </td>
          { !staffView && editing ? <td><button className="button is-small" type="button" value="X" onClick={() => this.handleDelete(id)}>Remove donation</button></td> : null }
          <td>
            { editing ? 
              <button className="button is-small" type="submit" value="Apply Changes" onClick={() => this.handleUpdate(id)}>Apply Changes</button> :
              <button className="button is-small" type="button" value="✎" onClick={() => this.setState({ editing: id, show: !this.state.show })}>Edit</button> 
            }
          </td>
          <td>
            { editing ? 
              <div className="delete is-medium" type="submit" value="Apply Changes" onClick={() => this.setState({ editing: null })}></div> :
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
              <th>Date</th>
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

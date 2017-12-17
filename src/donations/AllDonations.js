import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { loadDonations, updateDonation, deleteDonation } from './actions';
import Table from '../tables/Table';

class AllDonations extends PureComponent {
  state = {
    editing: null
  }

  componentDidMount(){
    this.props.loadDonations();
  }

  handleUpdate = (event, item) => {
    event.preventDefault();
    const { elements: updates } = event.target;
    const updatedFields = Object.values(updates).filter(field => field.value !== '');
    updatedFields.forEach(field =>  item[field.name] = field.value);
    this.props.updateDonation(item);
  }

  handleDelete = id=> {
    this.props.deleteDonation(id);
  }

  fieldCheck = item => {
   
    return typeof item === 'object' ? item.name : item;
  };

  render() {
    const { donations } = this.props;
    const { editing } = this.state;

    const tabledonations = donations.length ? donations.map(item => {
      let rowdonations = Object.values(item).filter(item => item !== null);
      const id = rowdonations.shift();
      rowdonations = rowdonations.filter(data => data !== 0);
      rowdonations = rowdonations.filter(data => data !== true);
      const row = rowdonations.map((value, index) => <li className="table-cell">{this.fieldCheck(value)}</li>);
      return (
        <ul>
          {row}
          <li style={{ display:'inline' }}><input type="button" value="X" onClick={() => this.handleDelete(id)}/></li>
          <li style={{ display:'inline' }}><input type="button" value="✎" onClick={() => this.setState({ editing: id, show: !this.state.show })}/></li>
          {((editing === id) && (this.state.show)) && 
          <li>
            <form onSubmit={event => this.handleUpdate(event, item)}>
              <select name="status">
                <option key="0" value="Pending">Pending</option>
                <option key="1" value="Received">Received</option>
                <option key="2" value="Missing">Missing</option>
              </select>
              <input type="text" name="quantityReceived" placeholder="quantityReceived"/>
              <input type="submit"/>
            </form>
          </li>}
        </ul>
      );
    }): null;
    
    return(
      <div className="column is-6 is-offset-3">
        <h3 className="title is-4">Donations</h3>
        {tabledonations}
      </div>
    );
  }
}

export default connect(
  ({ auth, donations }) => ({ user: auth.user, donations }),
  { loadDonations, updateDonation, deleteDonation }
)(AllDonations);
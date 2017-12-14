import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addDonation, loadDonations } from './actions';

class AddDonations extends Component {

  constructor(){
    super();
    this.state = {
      showMessage: false
    };
  }
  
  handleDonate = event => {
    event.preventDefault();
    const { dropSite, quantity, lastDonation } = event.target.elements;
    const { user } = this.props;
    this.props.addDonation(
      { 
        quantity: quantity.value,
        dropSite: dropSite.value,
        donor: user._id,
        lastDonation: lastDonation.value
      });
    this.setState({ showMessage: true });
    window.setTimeout(() => {
      this.setState({ showMessage: false });
    }, 5000);
  }

  render() {
    const message = 'Thank you for donating';
    const { dropSites } = this.props;
   
    const listOfDropSites = dropSites && dropSites.map(dropSite =>(
      <option key={dropSite._id} value={dropSite._id}>{dropSite.name}</option>
    ));
    
    return (
      
      <div>
        {(this.state.showMessage) ? <p>{message}</p> : 
          (<div>
            <p>Please let us know the amount you are delivering to a milk drop or having picked up by FedEx.</p>
            <form onSubmit={event => this.handleDonate(event)}>
              <label>quantity(in ounces): <input name="quantity" placeholder="quantity"/></label>
              <select name="dropSite">
                {listOfDropSites}
              </select>
          FedEx Shipment?<input type="checkbox"/>
              <label>Is this your last donation?</label><input name="lastDonation" type="checkbox"/>
              <input type="submit"></input>
            </form>
          </div>
          )
        }
      </div>
    );
        // <p>For a list of all your donations</p>
        // <button onClick={loadDonations}><Donations></button>
  }
}

export default connect(
  ({ donations, dropSites }) => ({ donations, dropSites }),
  { addDonation }
)(AddDonations);
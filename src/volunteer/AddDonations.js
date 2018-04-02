import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { addDonation } from '../donations/actions';
import { checkForToken } from '../home/actions'; 

class AddDonations extends PureComponent {

  constructor() {
    super();
    this.state = {
      invalidQtyWarning: false,
      invalidMmbWarning: false,
      donationQuantity: '',
      showMessage: false,
      mmbId: ''
    };
  }

  handleDonationChange = ({ target }) => {
    this.setState({ donationQuantity: target.value });
  }

  handleMmbChange = ({ target }) => {
    this.setState({ mmbId: target.value });
  }

  handleDonate = event => {
    event.preventDefault();
    let { quantity } = event.target.elements;
    if (!quantity.value || isNaN(quantity.value)) {
      this.setState({ invalidQtyWarning: true });
      return;
    }

    else {
      const { user, addDonation } = this.props;
      const { donationQuantity, mmbId } = this.state;

      addDonation({ 
        quantity: donationQuantity,
        mmbId,
        dropSite: user.myDropSite,
        donor: user._id,
        status: 'Awaiting Pickup'
      });
      
      this.setState({
        donationQuantity: '',
        invalidQtyWarning: false,
        showMessage: true,
      });
    }
  }

  render() {
    const message = 'Donation added. thank u for using the system :) TODO: change message';
    const { invalidQtyWarning, donationQuantity } = this.state;
    
    return (
      <div className="tile is-parent hero is-info">

        {(this.state.showMessage) 
          ? <p>{message}</p>
          : (<div>
            <form onSubmit={this.handleDonate}>
              <div className="need-space"></div>
              <Quantity donationQuantity={donationQuantity} invalidQtyWarning={invalidQtyWarning} handleDonationChange={this.handleDonationChange}/>
              <MmbId handleMmbChange={this.handleMmbChange}/>
              <SubmitDonation/>
            </form>
          </div>)}

      </div>
    );
  }
}

const MmbId = ({ handleMmbChange, invalidMmbWarning }) => (
  <div className="field">
    <div className="subtitle is-6 label">MMB ID:
      <input className="button is-outlined" id="mmbId" placeholder="MMB#" onChange={handleMmbChange}/>
      <br/>
      { invalidMmbWarning && <span className="tag is-danger">Invalid mmb id</span> }
      <br/>
    </div>
  </div>
);

const Quantity = ({ invalidQtyWarning, donationQuantity, handleDonationChange }) => ( 
  <div className="field">
    <div className="subtitle is-6 label">Quantity(in ounces):
      <input className="button is-outlined" id="quantity" placeholder="quantity" value={donationQuantity} onChange={handleDonationChange}/>
      <br/>
      { invalidQtyWarning && <span className="tag is-danger">Quantity must be a number</span> }
      <br/>
    </div>
  </div>
);

const SubmitDonation = () => (
  <div>
    <br/>
    <button className="button is-primary" type="submit">Submit</button>
  </div>
);

export default connect(
  ({ donations, auth, dropSites = [] }) => ({ 
    donations,
    dropSites, 
    myDropSite: auth.user.myDropSite || null 
  }),
  { addDonation, checkForToken }
)(AddDonations);

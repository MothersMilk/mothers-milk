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
    let { donationQuantity, mmbId } = this.state;
    if (!donationQuantity|| isNaN(donationQuantity)) {
      this.setState({ invalidQtyWarning: true, successMessage: false });
      return;
    }

    else this.setState({ invalidQtyWarning: false });

    if (!mmbId || isNaN(mmbId) || mmbId.length !== 4) {
      this.setState({ invalidMmbWarning: true, successMessage: false });
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
        mmbId: '',
        invalidQtyWarning: false,
        invalidMmbWarning: false,
        successMessage: true
      });
    }
  }

  render() {
    const { invalidQtyWarning, donationQuantity, invalidMmbWarning, mmbId, successMessage } = this.state;
    
    return (
      <div className="tile is-parent hero is-info">

        <div>
          <form onSubmit={this.handleDonate}>
            <div className="need-space"></div>
            <Quantity donationQuantity={donationQuantity} invalidQtyWarning={invalidQtyWarning} handleDonationChange={this.handleDonationChange}/>
            <MmbId mmbId={mmbId} invalidMmbWarning={invalidMmbWarning} handleMmbChange={this.handleMmbChange}/>
            <SubmitDonation/>
            {successMessage && <span className="tag is-danger">Donation Added Successfully :)</span>}
          </form>
        </div>

      </div>
    );
  }
}

const MmbId = ({ mmbId, handleMmbChange, invalidMmbWarning }) => (
  <div className="field">
    <div className="subtitle is-6 label">MMB ID:
      <input className="button is-outlined" id="mmbId" value={mmbId} placeholder="MMB#" onChange={handleMmbChange}/>
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

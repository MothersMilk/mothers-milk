import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { addDonation } from './actions';
import { checkForToken } from '../home/actions'; 

class AddDonations extends PureComponent {

  constructor(){
    super();
    this.state = {
      dropSite: '5a33ee322d693f852640e2ee',
      isCheckedFedEx: false,
      isCheckedMilkDrop: false,
      invalidWarning: false,
      donationQuantity: '',
      showMessage: false
    };
    this.handleMilkDropChange = this.handleMilkDropChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.myDropSite && nextProps.myDropSite !== this.state.myDropSite) {
      this.setState({ myDropSite : nextProps.myDropSite });
    }
  }

  handleMilkDropChange(event) {
    const checked = this.state.isCheckedMilkDrop;
    this.setState({
      isCheckedMilkDrop: !checked
    });
  }

  handleFedExChange = event => {
    const checked = this.state.isCheckedFedEx;
    this.setState({
      isCheckedFedEx: !checked
    });
  }

  handleDonationChange = ({ target }) => {
    this.setState({ donationQuantity: target.value });
  }

  handleDonate = event => {
    event.preventDefault();
    let { dropSite, quantity, lastDonation } = event.target.elements;
    if (!quantity.value || isNaN(quantity.value)) {
      this.setState({ invalidWarning: true });
    }

    else {
      const { user, addDonation } = this.props;
      const { donationQuantity } = this.state;
      dropSite = typeof dropSite === 'string' ? dropSite : dropSite.value;

      addDonation({ 
        quantity: donationQuantity,
        dropSite,
        lastDonation: lastDonation.checked,
        donor: user._id,
        status: 'Awaiting Pickup'
      });
      
      this.setState({
        donationQuantity: '',
        myDropSite: dropSite, 
        invalidWarning: false,
        showMessage: true,
      });
    }
  }

  render() {

    const message = 'You\'re amazing! Thanks for helping us save babies across the Pacific Northwest and beyond!';
    const { dropSites, checkForToken, myDropSite } = this.props;
    const { invalidWarning, donationQuantity } = this.state;
    
    return (
      <div className="tile is-parent hero is-info">

        {(this.state.showMessage) 
          ? 
          <p>{message}</p>
          : 
          (<div>
            <form onSubmit={event => this.handleDonate(event)}>
              {(!this.state.isCheckedFedEx) && (<div className="field">
                <label className="subtitle is-6 checkbox is-black"><input type="checkbox" value="milkDrop" onChange={this.handleMilkDropChange}/>&nbsp;Drop off at nearest milk drop</label></div>)}       
              {(!this.state.isCheckedMilkDrop) && (!this.state.isCheckedFedEx) &&  
              <p className="subtitle is-6">--OR--</p>}
              {(!this.state.isCheckedMilkDrop) && (
                <label className="subtitle is-6 checkbox is-black"><input type="checkbox" value="FedEx" onChange={this.handleFedExChange}/>&nbsp;Ship milk via FedEx</label>)}
              {(this.state.isCheckedMilkDrop) && (<div className="subtitle is-6 label">Select a drop site location&nbsp;
                <DropSites dropSites={dropSites} checkForToken={checkForToken} myDropSite={myDropSite}/>
                <div className="need-space"></div>
                <Quantity donationQuantity={donationQuantity} invalidWarning={invalidWarning} handleDonationChange={this.handleDonationChange}/>
                <LastDonation/>
                <IllnessForm/>
                <SubmitDonation/>
              </div>)}
              {(this.state.isCheckedFedEx) && (<div className="subtitle is-6">
                <Quantity/>
                <LastDonation/>
                <IllnessForm/>
                <ShippingVideo/>
                <SubmitDonation/>
              </div>)}
            </form>
          </div> 
          
          )}

      </div>
    );
  }
}


class DropSites extends PureComponent {
  
  state = {
    myDropSite : '',
    dropSites: []
  }
  
  componentDidMount() {
    this.props.checkForToken();
  }

  render() {
    const { myDropSite, dropSites } = this.props;
    // if (!myDropSite || !dropSites || dropSites.length === 0) return null;
    const selected = myDropSite ? dropSites.find(dropSite => dropSite._id === myDropSite) : dropSites[0]._id;
    return (
      <div className="select">
        <select defaultValue={selected._id} name="dropSite" className="button is-outlined is-size-6">
          {dropSites.map(dropSite => {
            return (<option key={dropSite._id} value={dropSite._id}> {dropSite.name} </option>);
          })}
        </select>
      </div>
    );
  }
}

const Quantity = ({ invalidWarning, donationQuantity, handleDonationChange }) => ( 
  <div className="field">
    <div className="subtitle is-6 label">Quantity(in ounces):
      <input className="button is-outlined" id="quantity" placeholder="quantity" value={donationQuantity} onChange={handleDonationChange}/>
      <br/>
      { invalidWarning && <span className="tag is-danger">Quantity must be a number</span> }
      <br/>
    </div>
  </div>
);

const LastDonation = () => (
  <div className="field">
    <label className="subtitle is-6 checkbox is-black">
      <input name="lastDonation" type="checkbox"/>
    &nbsp;Is this your last donation?
    </label>
  </div>
);

const IllnessForm = () => (
  <div>
    <label className="subtitle is-6 checkbox is-black">
      <input name="illnessForm" type="checkbox"/>
      &nbsp;I have included an illness and travel update with my milk donation
    </label>
  </div>
);

const ShippingVideo = () => (
  <div><br/>
    <a href="https://youtu.be/igc-HqYsXsM" target="_blank" rel="noopener noreferrer">For a video with shipping instructions click here.
    </a>
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

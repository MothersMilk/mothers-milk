import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addDonation } from './actions';
import { checkForToken } from '../home/actions';

class AddDonations extends Component {

  constructor(){
    super();
    this.state = {
      dropSite: '5a33ee322d693f852640e2ee',
      isCheckedFedEx: false,
      isCheckedMilkDrop: false,
      invalidWarning: false,
      showMessage: false,
      justDonated: false
    };
    this.handleMilkDropChange = this.handleMilkDropChange.bind(this);
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

  handleDonate = event => {
    event.preventDefault();
    let { dropSite, quantity, lastDonation } = event.target.elements;
    if (!quantity.value || isNaN(quantity.value)) {
      this.setState({ invalidWarning: true });
    }

    else {
      const { user } = this.props;
      this.setState({ 
        invalidWarning: false,
        showMessage: true,
        justDonated: true
      });
      this.props.checkForToken();
      this.props.addDonation(
        { 
          quantity: quantity.value,
          dropSite: dropSite.value,
          lastDonation: lastDonation.checked,
          donor: user._id,
          status: 'Awaiting Pickup'
        });
      document.getElementById('quantity').value = '';
    }
  }

  render() {

    const message = 'You\'re amazing! Thanks for helping us save babies across the Pacific Northwest and beyond!';
    const { dropSites } = this.props;
    const { invalidWarning } = this.state;
    
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
                <DropSites dropSites={dropSites}/>
                <div className="need-space"></div>
                <Quantity invalidWarning={invalidWarning}/>
                <LastDonation/>
                <IllnessForm/>
                <SubmitDonation/>
              </div>)}
              {(this.state.isCheckedFedEx) && (<div className="subtitle is-6">
                <Quantity/>
                <LastDonation/>
                <IllnessForm/>
                <SubmitDonation/>
              </div>)}
            </form>
          </div> 
          
          )}

      </div>
    );
  }
}

const DropSites = ({ dropSites, myDropSite = null }) => {
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
};

const Quantity = ({ invalidWarning }) => ( 
  <div className="field">
    <div className="subtitle is-6 label">Quantity(in ounces):
      <input className="button is-outlined" id="quantity" placeholder="quantity" onSubmit={this.handleChange}/>
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

const SubmitDonation = () => (
  <div>
    <br/>
    <button className="button is-primary" type="submit">Submit</button>
  </div>
);

export default connect(
  ({ donations, auth, dropSites = [] }) => ({ donations, dropSites, myDropSite: auth.user.myDropSite }),
  { addDonation, checkForToken }
)(AddDonations);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addDonation } from './actions';

class AddDonations extends Component {

  constructor(){
    super();
    this.state = {
      showMessage: false,
      // dropSite: '5a33ee322d693f852640e2ee', for dev 
      dropSite: '5a34258e7bf84a00216aad89',
      isChecked: false,
      fedExName: ''
    };
  }

  handleMilkDropChange = (event) => {
    const milkDrop = event.target.checked ? 'milkDrop' : '';
    this.setState({
      isChecked: true,
      milkDrop: milkDrop
    });
    console.log('in milkDropChange isChecked', this.state.isChecked);
  }

  handleFedExChange = (event) => {
    const fedExName = event.target.checked ? 'FedEx' : '';
    this.setState({
      isChecked: true,
      fedExName: fedExName
    });

    console.log('in FedEx isChecked', this.state.isChecked);
  }

  handleDonate = event => {
    event.preventDefault();
    let { dropSite, quantity, lastDonation } = event.target.elements;
    const { user } = this.props;
    dropSite = this.state.isChecked ? this.state.dropSite : dropSite.value;
    this.props.addDonation(
      { 
        quantity: quantity.value,
        dropSite,
        lastDonation: lastDonation.value,
        donor: user._id,
        status: 'Awaiting Pickup',
        quantityReceived: 0
      });
    this.setState({ showMessage: true });
    window.setTimeout(() => {
      this.setState({ showMessage: false });
    }, 4000);
  }

  render() {
    const message = 'Thank you for donating!';
    const { dropSites } = this.props;

    return (
      <div className="tile is-parent hero is-light">

        {(this.state.showMessage) ? <p>{message}</p>
          : 
          (<div>
            <form onSubmit={event => this.handleDonate(event)}>
              {(this.state.fedExName !== 'FedEx') && (
                <label for="milk-drop-checkbox" className="subtitle is-6 checkbox is-black"><input type="checkbox" value="milkDrop" onChange={this.handleMilkDropChange}/>&nbsp;Drop off at nearest milk drop</label>)}       {(this.state.milkDrop !== 'milkDrop') && (this.state.fedExName !== 'FedEx') &&  
              <p className="subtitle is-6">--OR--</p>}
              {(this.state.milkDrop !== 'milkDrop') && (
                <label for="FedEx-checkbox" className="subtitle is-6 checkbox is-black"><input type="checkbox" value="FedEx" onChange={this.handleFedExChange}/>&nbsp;Ship milk via FedEx</label>)}
              {(this.state.milkDrop === 'milkDrop') && (<div className="subtitle is-6 label">Select a drop site location&nbsp;
                <DropSites dropSites={dropSites}/>
                <div className="need-space"></div>
                <Quantity/>
                <LastDonation/>
                <IllnessForm/>
                <SubmitDonation/>
              </div>)}
              {(this.state.fedExName === 'FedEx') && (<div className="subtitle is-6"><Quantity/>
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



const DropSites = ({ dropSites }) => (
  <div className="select">
    <select name="dropSite" className="button is-outlined is-size-6">
      {dropSites.map(dropSite => (
        <option key={dropSite._id} value={dropSite._id}>{dropSite.name}</option>
      ))}
    </select>
  </div>
);

const Quantity = () => ( 
  <div className="field">
    <div className="subtitle is-6 label">Quantity(in ounces):
      <input className="input" type="text" name="quantity" placeholder="quantity"/>
    </div>
  </div>
);

const LastDonation = () => (
  <div className="field">
    <input name="lastDonation" type="checkbox"/>
    <div className="subtitle is-6 checkbox is-black">&nbsp;
    Is this your last donation?
    </div>
  </div>
);

const SubmitDonation = () => (
  <div>
    <br/>
    <button className="button is-primary" type="submit">Submit</button>
  </div>
);

const IllnessForm = () => (
  <div>
    <input name="illnessForm" type="checkbox"/>
    <div className="subtitle is-6 checkbox is-black">&nbsp;I have included an illness and travel update with my milk donation
    </div>
  </div>
);

export default connect(
  ({ donations, dropSites = [] }) => ({ donations, dropSites }),
  { addDonation }
)(AddDonations);  
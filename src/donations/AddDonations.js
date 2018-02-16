import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addDonation } from './actions';
import { checkForToken } from '../home/actions';

class AddDonations extends Component {

  constructor(){
    super();
    this.state = {
      // dropSite: '5a33ee322d693f852640e2ee', for dev 
      dropSite: '5a34258e7bf84a00216aad89',
      isChecked: false,
      fedExName: '',
      invalidWarning: false,
      justDonated: false
    };
  }

  handleChange = (event) => {
    const fedExName = event.target.checked ? 'FedEx' : '';
    this.setState({
      isChecked: true,
      fedExName: fedExName
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
      dropSite = this.state.isChecked ? this.state.dropSite : dropSite.value;
      this.setState({ 
        myDropSite: dropSite._id, 
        invalidWarning: false,
        justDonated: true
      });
      this.props.checkForToken();
      this.props.addDonation(
        { 
          quantity: quantity.value,
          dropSite,
          lastDonation: lastDonation.checked,
          donor: user._id,
          status: 'Awaiting Pickup'
        });
      // event.target.reset();
    }
  }

  render() {
    const { dropSites, myDropSite } = this.props;
    return (
      <div className="tile is-parent hero is-light">        
        <div>
          <form onSubmit={event => this.handleDonate(event)}>
            <p className="subtitle is-6">Ship milk by FedEx   &nbsp;<input type="checkbox" value="FedEx" onChange={this.handleChange}/>
            </p>
            {(this.state.fedExName !== 'FedEx') && (
              <div>
                <p className="subtitle is-6">-- OR --</p>
                <p className="subtitle is-6">Drop at nearest milk drop location</p>
                <div className="subtitle is-6 label">Select a drop site location</div>
                <DropSites myDropSite={myDropSite} dropSites={dropSites}/>
              </div>
            )}
            <br/><br/>
            <div className="subtitle is-6 label">Quantity(in ounces):</div>
            <input className="button is-outlined" id="quantity" placeholder="quantity"/>
            <br/>
            { this.state.invalidWarning && <span className="tag is-danger">Quantity must be a number</span> }
            <br/>
            <div className="subtitle is-6 label">Is this your last donation?&nbsp;<input name="lastDonation" type="checkbox"/></div>
            <br/><br/>

            { this.state.justDonated 
              ? <div className="notification is-danger" onClick={() => this.setState({ justDonated: false })}>
                  You're amazing! Thanks for helping us save babies across the Pacific Northwest and beyond
              </div> 
              : <button className="button is-primary" type="submit">Submit</button>
            }

            <br/><br/>
          </form>             
        </div>
      </div>
    );
  }
}

const DropSites = function ({ dropSites, myDropSite = null, onSubmit }){
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

export default connect(
  ({ donations, auth, dropSites = [] }) => ({ donations, dropSites, myDropSite: auth.user.myDropSite }),
  { addDonation, checkForToken }
)(AddDonations);
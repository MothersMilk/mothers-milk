import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { addDonation } from './actions';
import { checkForToken } from '../home/actions'; 

class AddDonations extends PureComponent {

  constructor(){
    super();
    this.state = {
      // dropSite: '5a33ee322d693f852640e2ee', for dev 
      dropSite: '5a34258e7bf84a00216aad89',
      isChecked: false,
      fedExName: '',
      invalidWarning: false,
      justDonated: false,
      donationQuantity: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.myDropSite && nextProps.myDropSite !== this.state.myDropSite) {
      console.log('in componentwillrecievngdg, setting myDropSite to', nextProps.myDropSite);
      this.setState({ myDropSite : nextProps.myDropSite });
    }
  }


  handleChange = ({ target }) => {
    const fedExName = target.checked ? 'FedEx' : '';
    this.setState({
      isChecked: true,
      fedExName: fedExName
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
      const { donationQuantity, isChecked } = this.state;
      dropSite = isChecked ? dropSite : dropSite.value;

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
        justDonated: true
      });
    }
  }

  render() {
    const { dropSites, checkForToken } = this.props;
    const { donationQuantity, myDropSite } = this.state;
    return (
      <div className="tile is-parent hero is-light">        
        <div>
          <form onSubmit={this.handleDonate}>
            <p className="subtitle is-6">Ship milk by FedEx   &nbsp;<input type="checkbox" value="FedEx" onChange={this.handleChange}/>
            </p>
            {(this.state.fedExName !== 'FedEx') && (
              <div>
                <p className="subtitle is-6">-- OR --</p>
                <p className="subtitle is-6">Drop at nearest milk drop location</p>
                <div className="subtitle is-6 label">Select a drop site location</div>
                <DropSites checkForToken={checkForToken} myDropSite={myDropSite} dropSites={dropSites}/>
              </div>
            )}
            <br/><br/>
            <div className="subtitle is-6 label">Quantity(in ounces):</div>
            <input className="button is-outlined" id="quantity"  placeholder="quantity" onChange={this.handleDonationChange} value={donationQuantity}/>
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
    if (!myDropSite || !dropSites || dropSites.length === 0) return null;
    const selected = myDropSite ? dropSites.find(dropSite => dropSite._id === myDropSite) : dropSites[0]._id;
    console.log('in Dropsite component, loading', selected._id);
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

export default connect(
  ({ donations, auth, dropSites = [] }) => ({ 
    donations,
    dropSites, 
    myDropSite: auth.user.myDropSite || null 
  }),
  { addDonation, checkForToken }
)(AddDonations);
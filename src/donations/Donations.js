import React, { PureComponent } from 'react';
import { loadMyDonations } from '../donations/actions';
import { connect } from 'react-redux';
import { checkForToken } from '../home/actions';
import AddDonation from './AddDonations';

class Donations extends PureComponent {

  constructor(){
    super();
    this.state = { 
      displayMain: false,
      display: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { loadMyDonations } = this.props;
    loadMyDonations();
  }

  handleClick() {
    this.setState({ displayMain: !this.state.displayMain });
  }

  render() {

    const { donations, user } = this.props;
    const { displayMain, display } = this.state;
    return (
      <div className="tile is-parent">
        <div className="tile is-child box">
          <a className="subtitle has-text-primary link-hover" onClick={this.handleClick}>Donations</a>
          {displayMain &&
          <div>
            <hr/>
            <AddDonation user={user}/>
            <hr/>
            <button className="button is-light" onClick={() => this.setState({ display: !this.state.display })}>My Donations</button>
            
            {display && <TotalDisplay donations={donations} />}

            {display && 
            <table className="table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <Row key={donation._id} id={donation._id} quantity={donation.quantity} status={donation.status}/>
                ))}
              </tbody>
            </table>}
          </div>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    donations: state.donations,
    user: state.auth.user
  };
}

export default connect(
  mapStateToProps,
  { loadMyDonations, checkForToken }
)(Donations);

class Row extends PureComponent {
  render() {
    const { quantity, status } = this.props;   
    return(
      <tr>
        <td>{ quantity } oz.</td>
        <td>{ status }</td>
      </tr>
    );
  }
}

class TotalDisplay extends PureComponent {
  render() {
    const { donations } = this.props;
    
    const total = donations.reduce((acc = 0, e) => {
      return acc + e.quantity;
    }, 0);

    function convertToGal(num) {
      return (num < 128) ? `${num} Oz.` : `${Math.floor(num/128)} gal.  ${num%128} oz.`;
    }

    return(
      <h1>Estimated Total: {convertToGal(total)}</h1>
    );
  }
}
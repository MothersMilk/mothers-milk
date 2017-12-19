import React, { Component } from 'react';
import { loadMyDonations } from '../donations/actions';
import { connect } from 'react-redux';
import { checkForToken } from '../home/actions';
import AddDonation from './AddDonations';

class Donations extends Component {

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
            <button className="button is-light" onClick={() =>  this.setState({ display: true  })}>Total amount donated</button>
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

class Row extends Component {
  
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
import React, { PureComponent } from 'react';
import { loadMyDonations, removeMyDonation } from '../donations/actions';
import { connect } from 'react-redux';
import { checkForToken } from '../home/actions';
import AddDonations from './AddDonations';

class Donations extends PureComponent {

  constructor(){
    super();
    this.state = { 
      displayMain: false,
      display: false
    };
  }

  componentDidMount() {
    this.props.loadMyDonations();
  }

  handleClick = () => {
    this.setState({ displayMain: !this.state.displayMain });
  }

  handleRemove = id => {
    this.props.removeMyDonation(id);
  }


  render() {

    const { donations, user } = this.props;
    const { displayMain, display } = this.state;
    return (
      <div className="tile is-parent">
        <div className="tile is-child box hero is-info">
          <div className="subtitle">
            <a className="subtitle has-text-success link-hover" onClick={this.handleClick}><strong>Make a Donation</strong></a></div>
          {displayMain &&
          <div>
            <hr/>
            <AddDonations user={user}/>
            <hr/>
            <button className="button is-light" onClick={() => this.setState({ display: !this.state.display })}>My Donations</button>
            
            {display && <TotalDisplay donations={donations}/>}

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
                  <Row 
                    key={donation._id} 
                    id={donation._id} 
                    quantity={donation.quantity}
                    remove={id => this.handleRemove(id)} 
                    status={donation.status}/>
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
  { loadMyDonations, removeMyDonation, checkForToken }
)(Donations);

class Row extends PureComponent {
  state = {
    editing: false
  }

  render() {
    const { quantity, status, id, remove } = this.props;   
    return(
      <tr>
        <td>{ quantity } oz.</td>
        <td>{ status }</td>
        <td><button onClick={() => remove(id)}>X</button></td>
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
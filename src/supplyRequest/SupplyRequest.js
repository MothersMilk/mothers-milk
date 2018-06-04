import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadSupplyRequests, addSupplyRequest } from './actions';
// import AllSupplyRequests from './AllSupplyRequests'; 

class SupplyRequest extends Component {
  constructor() {
    super();
    this.state = { 
      display: false,
      ordering: false,
      isCheckedBags: false,
      isCheckedBoxes: false,
      bags: 0,
      boxes: 0
    };
  }

  handleOrderBagsChange = event => {
    const checked = this.state.isCheckedBags;
    this.setState({
      isCheckedBags: !checked
    });
  }

  handleOrderBoxesChange = event => {
    const checked = this.state.isCheckedBoxes;
    this.setState({
      isCheckedBoxes: !checked
    });
  }
  
  handleSupplyRequest = event => {
    event.preventDefault();
    this.setState({ ordering: true });
    const { user, addSupplyRequest } = this.props;

    addSupplyRequest({ 
      donor: user._id,
      bags: this.state.bags,
      boxes: this.state.boxes,
      status: 'Requested'
    });

  }

  handleBagNumberChange = ({ target }) => {
    this.setState({
      bags: parseInt(target.value, 10)
    });
  }

  handleBoxNumberChange = ({ target }) => {
    this.setState({
      boxes: target.value
    });
  }

  handleClick = () => {
    this.setState({ display: !this.state.display });
  }

  render(){
    const bagInputs = [['0 units', 0], ['1 unit ', 1], ['2 units', 2]];
    const boxInputs = [['<100 oz(3000mL)', 0], ['100-250 oz(3000-7500mL)', 1], ['250-500 oz(7500-15000mL)', 2], ['>500 oz(15000mL', 3] ];
    return (
      <div className="tile is-parent">
        <div className="tile is-child box hero is-info">
          <div className="subtitle"><a className="subtitle has-text-success link-hover" onClick={this.handleClick}><strong>Request Supplies</strong></a>
            {this.state.display && (<form onSubmit={event => this.handleSupplyRequest(event)}>
              <div>
                <hr/>
                <BagCheckbox onChange={this.handleOrderBagsChange}/>
                {(this.state.isCheckedBags) && (
                  <BagQuantity inputs={bagInputs} selectedOption={this.state.selectedBagsOption} onChange={this.handleBagNumberChange}/>
                )}
                <BoxCheckbox onChange={this.handleOrderBoxesChange}/>
                {(this.state.isCheckedBoxes) && (
                  <BoxQuantity inputs={boxInputs} selectedOption={this.state.selectedBoxesOption} onChange={this.handleBoxNumberChange}/>
                )}
                <SubmitSupplyRequest/>
                { this.state.ordering ? <div><hr/><p>Thank you for your order</p></div> : <p></p>}
              </div>
            </form>)
            }
          </div>
        </div>
      </div>
    );
  }
}

const BagCheckbox = ({ onChange }) => (
  <div>
    <label className="subtitle is-6 checkbox is-black"><input type="checkbox" name="request" value="bags" onChange={onChange}/>&nbsp;Send Me Milk Collection Bags</label><br/>
  </div>
);

const BagQuantity = ({ inputs, selectedOption, onChange }) => (
  <div className="subtitle is-6">Milk Collection Units <br/>(25 bags per unit):
    <div className="select">
      <select name="bags" onChange={onChange} className="button is-outlined is-size-6">
        {
          inputs.map(([text, value], i) => {
            return (<option key={i}
              value={value}>  
              { text }
            </option>);
          })}
      </select>
    </div>
  </div>
);

const BoxCheckbox = ({ onChange }) => (
  <label className="subtitle is-6 checkbox is-black"><input type="checkbox" name="request" value="boxes" onChange={onChange}/>&nbsp;Send Me Shipping Boxes</label>
);

const BoxQuantity = ({ inputs, selectedOption, onChange }) => (
  <div className="subtitle is-6">Esimated donation amount:
    <div className="select">
      <select name="boxes" onChange={onChange} className="button is-outlined is-size-6">
        {
          inputs.map(([text, value], i) => {
            return (<option key={i}
              value={value}>  
              { text }
            </option>);
          })}
      </select>
    </div>
  </div>
);

const SubmitSupplyRequest = () => (
  <div>
    <input type="submit" className="button"/>
  </div>
);


export default connect(
  ({ auth }) => ({ user: auth.user }),
  { loadSupplyRequests, addSupplyRequest }
)(SupplyRequest);
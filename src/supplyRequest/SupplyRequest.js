import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestSupply } from './actions';

class SupplyRequest extends Component {
  constructor() {
    super();
    this.state = { 
      display: false,
      ordering: false
    };
  }

  handleOrderBagsChange = (event) => {
    const bags = event.target.checked ? 'bags' : '';
    this.setState({
      isChecked: true,
      bags: bags
    });
  }
  
  handleSupplyRequest = event => {
    event.preventDefault();
    const { bags, boxes } = event.target.elements;
    const { user } = this.props;
    this.setState({ ordering: true });
    this.props.requestSupply({ 
      bags: bags.value,
      boxes: boxes.value,
      donor: user._id
    });
  }

  handleClick = () => {
    this.setState({ display: !this.state.display });
  }

  render(){
    return (
      <div className="tile is-parent">
        <div className="tile is-child box hero is-info">
          <div className="subtitle"><a className="subtitle has-text-success link-hover" onClick={this.handleClick}><strong>Request Supplies</strong></a>
          </div>
          <div>
            {this.state.display && (<form onSubmit={this.handleSupplyRequest}>
              <div>
                <hr/>
                <label className="subtitle is-6 checkbox is-black"><input type="checkbox" value="bags" onChange={this.handleOrderBagsChange}/>&nbsp;Order MilkCollection Bags</label>
              </div>
            </form>)
            }
          </div>
        </div>
      </div>
    );
  }
}





{/* render() {
    return (
      <div className="tile is-parent">
        <div className="tile is-child box hero is-info">
          <div className="sub-title"><a className="subtitle has-text-success link-hover" onClick={this.handleClick}><strong>Request Supplies</strong></a></div>
          <div>
            {this.state.display && <form onSubmit={this.handleSupplyRequest}>
              <div className="field"> 
                <div className="control">
                  <hr/>
                  <div className="input-title"></div>
                  <div className="inputLabel">Milk Collection Units (25 bags per unit):</div>
                  <div className="select is-small">
                    <select name="bags">
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                </div>
                <div className="control">
                  <div className="input-title"></div>
                  <div className="inputLabel">Shipping Boxes (Please estimate the amount of milk you expect to donate):</div>
                  <div className="select is-small">
                    <select name="boxes">
                      <option value="0">0</option>
                      <option value="1">&lt;100 oz (&lt; 3000 mL)</option>
                      <option value="2">100-250 oz (3000-7500mL)</option>
                      <option value="3">250-500 oz (7500mL-15,000mL)</option>
                      <option value="4">&gt;500 oz (&gt; 15,000 mL)</option>
                    </select>
                  </div>
                </div>
                <div className="need-space"></div>
                <input type="submit" className="button"/>
                { this.state.ordering ? <p>Thank you for your order</p> : <p></p>}
              </div>
            </form> }
          </div>
        </div>
      </div>
    );
  }
} */}

export default connect(
  ({ auth }) => ({ user: auth.user }),
  { requestSupply }
)(SupplyRequest);
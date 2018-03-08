import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestSupply } from './actions';

class SupplyRequest extends Component {
  constructor() {
    super();
    this.state = { 
      display: false,
      ordering: false,
      isBagChecked: false,
      isBoxChecked: false,
      bags: 0
    };
  }

  handleOrderBagsChange = (event) => {
    event.preventDefault();
    const bags = event.target.checked ? 'bags' : '';
    this.setState({
      isBagChecked: true,
      bags: bags
    });
    console.log('in order bags change isChecked', this.state.isChecked);
    console.log('bags?', bags);
  }

  handleOrderBoxesChange = (event) => {
    const boxes = event.target.checked ? 'boxes' : '';
    this.setState({
      isBoxChecked: true,
      boxes: boxes
    });
    console.log('in order boxes change isChecked', this.state.isChecked);
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

  setBagNum(event) {
    console.log(event.target.value);
    console.log(this.state.bags.value);
  }

  handleClick = () => {
    this.setState({ display: !this.state.display });
  }

  render(){
    const inputs = [['0 bags', '0'], ['1 bag ', '1'], ['2 bags', '2']];
    return (
      <div className="tile is-parent">
        <div className="tile is-child box hero is-info">
          <div className="subtitle"><a className="subtitle has-text-success link-hover" onClick={this.handleClick}><strong>Request Supplies</strong></a>
          </div>
          <div>
            {this.state.display && (<form onSubmit={event => this.handleSupplyRequest(event)}>
              <div>
                <hr/>
                <BagCheckbox onChange={this.handleOrderBagsChange}/>
                {(this.state.bags === 'bags') && (
                  <div className="subtitle is-6">Milk Collection Units (25 bags per unit):
                    <div>
                      {
                        inputs.map(([text, value], i) => (
                          <div key={i}>
                            <input type="radio"
                              checked={this.state.bags === value} 
                              onChange={event => this.setBagNum(event)} 
                              value={value} /> 
                            { text }
                          </div>
                        ))
                      }
                      {/* <input type="radio" value="0"/>O bags<input type="radio" value="1" defaultChecked/>1 bag<input type="radio" value="2"/>2 bags */}
                    </div>
                  </div>
                )}
                <BoxCheckbox onChange={this.handleOrderBoxesChange}/>
                <SubmitSupplyRequest/>
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
    <label className="subtitle is-6 checkbox is-black"><input type="checkbox" name="request" value="bags" onChange={onChange}/>&nbsp;Order Milk Collection Bags</label><br/>
  </div>
);

// class BagCheckbox extends Component {
//   render() {
//     const { handleOrderBagsChange } = this.props;
//   };
//   return(
//     <div className="input-title">
//     <label className="subtitle is-6 checkbox is-black"><input type="checkbox" value="bags" onChange={onChange}/>&nbsp;Order MilkCollection Bags</label><br/>
//   </div>
//   );
// }


const BoxCheckbox = ({ onChange }) => (
  <label className="subtitle is-6 checkbox is-black"><input type="checkbox" name="request" value="boxes" onChange={onChange}/>&nbsp;Order Shipping Boxes</label>
);

const SubmitSupplyRequest = () => (
  <div>
    <input type="submit" className="button"/>
  </div>
);



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
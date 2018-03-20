import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestSupply } from './actions';

class SupplyRequest extends Component {
  constructor() {
    super();
    this.state = { 
      display: false,
      ordering: false,
      isCheckedBags: false,
      isCheckedBoxes: false,
      selectedOption: 0
    };
    this.handleOrderBagsChange = this.handleOrderBagsChange.bind(this);
  }

  handleOrderBagsChange(event) {
    const checked = this.state.isCheckedBags;
    this.setState({
      isCheckedBags: !checked
    });
  }

  handleOrderBoxesChange = (event) => {
    const checked = this.state.isCheckedBoxes;
    // let toggleBoxes = this.state.boxes;
    // checked ? toggleBoxes=1 : toggleBoxes=0;
    this.setState({
      isCheckedBoxes: !checked,
      // boxes: toggleBoxes
    });
  }
  
  handleSupplyRequest = event => {
    event.preventDefault();
    // this.state.isCheckedBoxes ? this.setState({ boxes: 1 }) : this.setState({ boxes: 0 });
    // const { bags, boxes } = event.target.elements;
    const { user } = this.props;
    this.setState({ ordering: true });
    // this.props.requestSupply({ 
    //   bags: bags.value,
    //   boxes: boxes.value,
    //   donor: user._id
    // });
  }

  handleOptionChange = (changeEvent) => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  }

  handleClick = () => {
    this.setState({ display: !this.state.display });
  }

  render(){
    const inputs = [['0 units', '0'], ['1 unit ', '1'], ['2 units', '2']];
    return (
      <div className="tile is-parent">
        <div className="tile is-child box hero is-info">
          <div className="subtitle"><a className="subtitle has-text-success link-hover" onClick={this.handleClick}><strong>Request Supplies</strong></a>
            {this.state.display && (<form onSubmit={event => this.handleSupplyRequest(event)}>
              <div>
                <hr/>
                <BagCheckbox onChange={this.handleOrderBagsChange}/>
                {(this.state.isCheckedBags) && (
                  <BagQuantity inputs={inputs} bags={this.state.bags} selectedOption={this.state.selectedOption} onChange={this.handleOptionChange}/>
                )}
                <BoxCheckbox onChange={this.handleOrderBoxesChange}/>
                <SubmitSupplyRequest/>
                { this.state.ordering ? <p>Thank you for your order</p> : <p></p>}
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

const BagQuantity = ({ inputs, bags, selectedOption, onChange }) => (
  <div className="subtitle is-6">Milk Collection Units (25 bags per unit):
    <div id="radio-group">
      {
        inputs.map(([text, value], i) => (
          <div className="control" key={i}>
            <label className="radio">
              <input type="radio" className="bag-quantity"
                onChange={onChange} 
                value={value} 
                checked={selectedOption === value} 
              /> 
              &nbsp;{ text }
            </label>
          </div>
        ))
      }
    </div>
  </div>
);

const BoxCheckbox = ({ onChange }) => (
  <label className="subtitle is-6 checkbox is-black"><input type="checkbox" name="request" value="boxes" onChange={onChange}/>&nbsp;Send Me Shipping Boxes</label>
);

const SubmitSupplyRequest = () => (
  <div>
    <input type="submit" className="button"/>
  </div>
);


export default connect(
  ({ auth }) => ({ user: auth.user }),
  { requestSupply }
)(SupplyRequest);
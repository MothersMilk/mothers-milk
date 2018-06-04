import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { loadSupplyRequests, loadMySupplyRequests, updateSupplyRequest, deleteSupplyRequest } from './actions';

class AllSupplyRequests extends PureComponent {
  state = { editing: null };

  componentDidMount() {
    this.props.loadSupplyRequests();
  }

  handleUpdate = _id => {
    const update = this.state;
    delete update.editing;
    delete update.show;
    this.props.updateSupplyRequest({ ...update, _id });
  };

  handleDelete = id => this.props.deleteSupplyRequest(id);

  handleChange = ({ target: input }) => this.setState({ [input.name]: input.value });


  render() {
    const { supplies, staffView } = this.props;

    function convertDate(inputFormat) {
      function pad(s) { return (s < 10) ? '0' + s : s;}
      const d = new Date(inputFormat);
      return [pad(d.getMonth()+1), pad(d.getDate()), d.getFullYear()].join('/');
    }

    const tableData = supplies.length ? supplies.map(item => {
      const { _id: id, bags, boxes, status, date, mmbId } = item;
      const editing = this.state.editing === id ? true: false;
      const statusOptions = ['Requested', 'Shipped'];
      const currentStatusIndex = statusOptions.findIndex(status => status === item.status);
      const options = statusOptions.map((status, i) => i === currentStatusIndex ? <option key={i} value={status}> {status}</option> : <option key={i} value={status}> {status}</option>);

      return (
        <tr className={editing ? 'animated fadeIn' : null}
          key={id}>
          <td>
            {date ? convertDate(date) : null}
          </td>
          <td>
            {mmbId ? mmbId : null}
          </td>
          <td>
            {bags}
          </td>
          <td>
            {boxes}
          </td>
          <td>
            { editing ? 
              <div className="select is-small is-primary">
                <select type="text" name="status" onChange={event => this.handleChange(event)}>
                  {options}
                </select>
              </div> :
              status
            }
          </td>
          { !staffView && editing ? <td><button className="button is-small" type="button" value="X" onClick={() => this.handleDelete(id)}>Remove Request</button></td> : null }

          <td>
            { editing ? <button className="button is-small" type="submit" value="Apply Changes" onClick={() => this.handleUpdate(id)}>Apply Changes</button> : <button className="button is-small" type="button" value="✎" onClick={() => this.setState({ editing: id, show: !this.state.show })}>Edit</button>
            }
          </td>

          <td>
            { editing ? <div className="delete is-medium" type="submit" value="Apply Changes" onClick={() => this.setState({ editing: null })}></div> : null}
          </td>
        </tr>
      );
    }): null;

    return(
      <div className="column is-6 is-offset-1">
        <h3 className="title is-4">Supply Requests</h3>
        <table className="table is-striped is-hoverable">
          <thead>
            <tr>
              <th>Date</th>
              <th>MMB ID#</th>
              <th>Bag Units</th>
              <th>Boxes</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  ({ auth, supplies }) => ({ user: auth.user, supplies }), { loadSupplyRequests, loadMySupplyRequests, updateSupplyRequest, deleteSupplyRequest }
)(AllSupplyRequests);
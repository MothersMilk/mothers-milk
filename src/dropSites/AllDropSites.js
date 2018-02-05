import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { loadDropSites, updateDropSite, deleteDropSite } from './actions';

class AllDropSites extends PureComponent {
  state = { editing: null };
  
    componentDidMount =  () => this.props.loadDropSites();
  
    handleUpdate = _id => { 
      const update = this.state;
      delete update.editing;
      delete update.show;
      this.props.updateDropSite({ ...update, _id });
    };  
  
    handleDelete = id =>  this.props.deleteDropSite(id);
    
    handleChange = ({ target: input }) => this.setState({ [input.name]: input.value });
  
    render() {
      const { dropSites } = this.props;
      const tableData = dropSites.length ? dropSites.map(item => {
        const { _id: id } = item;
        const editing = this.state.editing === id ? true : false;
        return (
          <tr key={id}>
            <td>
              { editing ?
                <input type="text" defaultValue={item.name} name="name" onChange={event => this.handleChange(event)}/> :
                item.name
              }
            </td>
            <td>
              { editing ? 
                <input type="text" defaultValue={item.address} name="address" onChange={event => this.handleChange(event)}/> :
                item.address
              }
            </td>
            <td>
              { editing ? 
                <input type="text" defaultValue={item.hours} name="hours" onChange={event => this.handleChange(event)}/> :
                item.hours
              }
            </td>
            <td>
              <input type="button" value="X" onClick={() => this.handleDelete(id)}/>
            </td>
            <td>
              { editing ? 
                <input type="submit" value="Apply Changes" onClick={() => this.handleUpdate(id)}/> :
                <input type="button" value="✎" onClick={() => this.setState({ editing: id, show: !this.state.show })}/> 
              }
            </td>
          </tr>
        );
      }): null;
  
      return(
        <div className="column is-6 is-offset-3">
          <h3 className="title is-4">Drop Sites</h3>
          <table className="table is-bordered">
            <thead>
              <tr>
                <th>Drop Site</th>
                <th>Address</th>
                <th>Hours</th>
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
  ({ dropSites }) => ({ dropSites }),
  { loadDropSites, updateDropSite, deleteDropSite }
)(AllDropSites);


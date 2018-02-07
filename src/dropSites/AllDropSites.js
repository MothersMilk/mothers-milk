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
          <tr className= {editing ? 'animated fadeIn' : null} key={id}>
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
            { editing ? 
              <td>
                <button className="button is-small" type="button" value="X" onClick={() => this.handleDelete(id)}>Remove dropsite</button>
              </td> : null
            }
            <td>
              { editing ? 
                <button className="button is-small" type="submit" value="Apply Changes" onClick={() => this.handleUpdate(id)}>Apply Changes</button> :
                <button className="button is-small" type="button" value="✎" onClick={() => this.setState({ editing: id, show: !this.state.show })}>Edit</button>
              }
            </td>
            <td>
              { editing ? 
                <div className="delete is-medium" type="submit" value="Apply Changes" onClick={() => this.setState({ editing: null })}></div> :
                null
              }
            </td>
          </tr>
        );
      }): null;
  
      return(
        <div className="column is-6 is-offset-3">
          <h3 className="title is-4">Drop Sites</h3>
          <table className="table is-striped is-hoverable">
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


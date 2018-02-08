import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { loadUsers, updateUser, deleteUser } from './actions';

class AllUsers extends PureComponent {

  state = { editing: null };
  
    componentDidMount =  () => this.props.loadUsers();
  
    handleUpdate = _id => { 
      const update = this.state;
      delete update.editing;
      delete update.show;
      this.props.updateUser({ ...update, _id });
    };  
  
    handleDelete = id =>  this.props.deleteUser(id);
    
    handleChange = ({ target: input }) => this.setState({ [input.name]: input.value });
  
    render() {
      const { users } = this.props;
      const tableData = users.length ? users.map(item => {
        const { _id: id } = item;
        const editing = this.state.editing === id ? true : false;
        const roleOptions = ['donor', 'admin', 'volunteer', 'staff'];
        const currentRoleIndex = roleOptions.findIndex(status => status === item.roles[0]);
        const options = roleOptions.map((role, i) => i === currentRoleIndex ? <option value={[role]} key={i}>{role}</option> : <option value={[role]} key={i}>{role}</option>);
        return (
          <tr className={editing ? 'animated fadeIn' : null} key={id}>
            <td>
              { editing ?
                <input className="input is-small" type="text" defaultValue={item.mmbId} name="mmbId" onChange={event => this.handleChange(event)}/> :
                item.mmbId
              }
            </td>
            <td>
              { editing ?
                <input className="input is-small" type="text" defaultValue={item.email} name="email" onChange={event => this.handleChange(event)}/> :
                item.email
              }
            </td>
            <td>
              { editing ?
                <input className="input is-small" type="Name" defaultValue={item.name} name="name" onChange={event => this.handleChange(event)}/> :
                item.name
              }
            </td>
            <td>
              { editing ?
                <div className="select is-small is-primary">
                  <select type="roles" defaultValue={item.roles[0]} name="roles" onChange={event => this.handleChange(event)}>
                    {options}
                  </select>
                </div> :
                item.roles[0]
              }
            </td>
            { editing ?
              <td>
                <button className="button is-small" type="button" value="X" onClick={() => this.handleDelete(id)}>Remove user</button>
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
          <h3 className="title is-4">Users</h3>
          <table className="table is-striped is-hoverable">
            <thead>
              <tr>
                <th>MMB ID#</th>
                <th>Email</th>
                <th>Name</th>
                <th>Roles</th>
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
  ({ auth, users }) => ({ user: auth.user, users }),
  { loadUsers, updateUser, deleteUser }
)(AllUsers);
  

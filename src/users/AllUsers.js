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
        const roleOptions = ['donor', 'admin', 'volunteer'];
        const currentRoleIndex = roleOptions.findIndex(status => status === item.roles[0]);
        const options = roleOptions.map((role, i) => i === currentRoleIndex ? <option selected value={[role]}>{role}</option> : <option value={[role]}>{role}</option>);
        return (
          <tr key={id}>
            <td>
              { editing ?
                <input type="text" defaultValue={item.email} name="email" onChange={event => this.handleChange(event)}/> :
                item.email
              }
            </td>
            <td>
              { editing ?
                <input type="Name" defaultValue={item.name} name="name" onChange={event => this.handleChange(event)}/> :
                item.name
              }
            </td>
            <td>
              { /* // Use a multi select here if users are allowed more than one role. If not, change data model */ }
              { editing ? 
                <select type="roles" defaultValue={item.roles[0]} name="roles" onChange={event => this.handleChange(event)}>
                  {options}
                </select> :
                item.roles[0]
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
          <h3 className="title is-4">Users</h3>
          <table>
            <thead>
              <tr>
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
  

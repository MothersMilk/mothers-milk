import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout } from './actions';

// is this file even used????

function Nav({ user, signout }) {
  const isAdmin = user ? user.roles.includes('admin') : false;
  return (
    <div  className="navbar-menu">
      <div className="navbar">
        { user &&
        <div>
          { 
            isAdmin ?
              <NavLink className="navbar-item" to="/admin">My Dashboard </NavLink> :
              <NavLink className="navbar-item" to="/home">My Donations</NavLink> 
          }
        </div>
        }
      </div>
    </div>
  );
}

export default connect(
  state => ({ user: state.auth.user }),
  { signout }
)(Nav);
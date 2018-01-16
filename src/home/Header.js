import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signin, signup, signout } from './actions';
import { NavLink, Link } from 'react-router-dom';

class Header extends Component {

  handleSignIn = event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    this.props.signin(
      { 
        email: email.value,
        password: password.value 
      });
  }

  render(){
    const { user , signout } = this.props;    
    return (
      <header className="columns header">
        <div className="column is-3 is-offset-1">
          <Link to="/"><img alt="logo" src="/images/logo.jpg"/></Link>
        </div>       
        <div className="column is-2 is-offset-5">
          <form className="field signInForm" onSubmit={event => this.handleSignIn(event)}>
            {!user && <div>
              <div className="control">
                <label className="clip">Email:
                  <input className="input"  placeholder="email" name="email"/>
                </label>
              </div>
              <div className="control">
                <label className="clip">Password:
                  <input className="input" type="password" placeholder="password" name="password"/>
                </label>
              </div>
              <div className="control">
                <br/>
                <input className="button" type="submit"/>
              </div>
            </div>}
            {user  && <NavLink className="button" to="/" onClick={signout}>Logout</NavLink>}
          </form>
        </div>
      </header>
    );
  }
}

export default connect(({ auth }) => ({
  error: auth.error,
  user: auth.user
}),
{ signin, signup, signout }
)(Header);
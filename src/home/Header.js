import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signin, signout } from './actions';
import { NavLink, Link } from 'react-router-dom';

class Header extends Component {

  render(){
    const { user , signin, signout } = this.props;    
    return (
      <header className="columns header">
        <div className="column is-3 is-offset-1">
          <Link to="/"><img alt="logo" src="/images/logo.jpg"/></Link>
        </div>       
        <div className="column is-2 is-offset-5">
          { user ? <SignOut onSignOut={signout}/> : <SignIn onSignIn={signin}/> }
        </div>
      </header>
    );
  }
}

const SignOut = ({ onSignOut }) => <NavLink className="button" to="/" onClick={onSignOut}>Logout</NavLink>;

class SignIn extends Component {

  handleSignIn = event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    this.props.onSignIn(
      { 
        email: email.value,
        password: password.value 
      });
  }

  render(){
    return (
      <form className="field signInForm" onSubmit={this.handleSignIn}>
        <div>
          <div className="control">
            <input className="input"  placeholder="email" name="email"/>
          </div>
          <div className="control">
            <input className="input" type="password" placeholder="password" name="password"/>
          </div>
          <div className="control">
            <input className="button" type="submit"/>
          </div>
        </div>
      </form>
       
    );
  }
}

export default connect(
  ({ auth }) => ({ user: auth.user }),
  { signin, signout }
)(Header);
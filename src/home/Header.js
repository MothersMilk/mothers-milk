import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signin, signout } from './actions';
import { NavLink, Link } from 'react-router-dom';

class Header extends Component {

  render(){
    const { user , loading, error, signin, signout } = this.props;    
    return (
      <header className="columns header">
        <div className="column is-3 is-offset-1">
          <Link to="/"><img alt="logo" src="/images/logo.jpg"/></Link>
        </div>       
        <div className="column is-2 is-offset-5">
          { user ? <SignOut onSignOut={signout} loading={loading} error={error}/> : <SignIn loading={loading} error={error} onSignIn={signin}/> }
        </div>
      </header>
    );
  }
}

const SignOut = ({ onSignOut, loading }) => <NavLink className={loading ? 'button is-loading' : 'button'} to="/" onClick={onSignOut}>Logout</NavLink>;

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
    const { user, signout, loading, error } = this.props;    
    return (
      <form className="field signInForm" onSubmit={this.handleSignIn}>
        {!user && <div>
          <div className="control">
            <input className="input"  placeholder="email" name="email"/>
          </div>
          <div className="control">
            <input className="input" type="password" placeholder="password" name="password"/>
          </div>
          <div className="control">
            {error ? <div className="button is-danger is-small">Authentication Failed</div> : null}
            <button className={loading ? 'button is-loading' : 'button'} type="submit">Sign In</button>
          </div>
        </div>}
        {user  && <NavLink className="button" to="/" onClick={signout}>Logout</NavLink>}
      </form>     
    );
  }
}

export default connect(({ auth, loading, error }) => ({
  error,
  user: auth.user,
  loading
}),
{ signin, signout }
)(Header);
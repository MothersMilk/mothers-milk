import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, render, user, ...rest }) => (
  <Route {...rest} render={props => {
    if (user) {
      return render ? render(props) : <Component {...props}/>;
    }   
    return (
      <Redirect to="/"/>
    );
  }}/>
);

export default connect(
  state => ({ user: state.auth.user }),
  null
)(PrivateRoute);
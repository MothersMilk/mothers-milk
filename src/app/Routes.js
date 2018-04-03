import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Home from '../home/Home';

export default () => (
  <Switch> 
    <Route exact path="/" render={() => <Home/>}/>
    <Redirect to="/"/>
  </Switch>  
);
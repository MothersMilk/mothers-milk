import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { checkForToken } from '../home/actions';
import { loadDropSites } from '../dropSites/actions';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

class App extends Component {
  
  componentDidMount() {
    this.props.checkForToken();
    this.props.loadDropSites();
  }

  render() {
    const { checkedToken } = this.props;
    return (
      <div>
        <head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css"/>
        </head>
        <Router>
          { checkedToken &&
            <div className="App">
              <main>
                <Routes/>
              </main>
            </div>
          }
        </Router>
      </div>
    );
  }
}

export default connect(
  ({ auth }) => ({ 
    user: auth.user,
    checkedToken: auth.checkedToken
  }),
  { checkForToken, loadDropSites }
)(App);
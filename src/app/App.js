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
    
    // This shouldn't be here, what if no token?
    // Needs to be in route that is only loaded if logged in.
    this.props.loadDropSites();
  }

  render() {
    const { checkedToken } = this.props;
    return (
      <div>
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
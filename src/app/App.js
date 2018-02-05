import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { checkForToken } from '../home/actions';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

class App extends Component {
  
  componentDidMount() {
    this.props.checkForToken();
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
  { checkForToken }
)(App);
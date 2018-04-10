import React, { Component } from 'react';
import './App.css';
import '../style/mystyle.css';
import { connect } from 'react-redux';
import { checkForToken } from '../home/actions';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

class App extends Component {
  
  componentDidMount() {
    this.props.checkForToken();
  }

  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <main>
              <Routes/>
            </main>
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(
  ({ auth }) => ({ 
    user: auth.user
  }),
  { checkForToken }
)(App);
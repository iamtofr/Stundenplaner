import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LandingPage} />
          <Route path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;

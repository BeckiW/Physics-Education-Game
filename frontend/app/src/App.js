import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
          <div>
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/login" exact component={LogInForm} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;

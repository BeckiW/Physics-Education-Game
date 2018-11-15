import React, { Component } from 'react';
import GamePage from './game-page'
import UserPage from './user-page/userpage.js'
import TopicPage from './topic-page'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
          <div>
            <Switch>
              <Route path="/" exact component={GamePage} />
              <Route path="/user" exact component={UserPage} />
              <Route path="/topic/:id" exact component={TopicPage} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;

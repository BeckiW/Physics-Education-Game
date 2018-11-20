import React, { Component } from 'react';
import Header from './header'
import HomePage from './home-page'
import DashboardPage from './dashboard-page'
import UserPage from './user-page/userpage.js'
import TopicPage from './topic-page'
import Stats from './stats-page'
import PostQuizPage from './post-quiz-page'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import './App.scss';

let BACKEND_URL = "http://localhost:8080/"

class App extends Component {

  render() {
    return (
      <Router>
          <div className="app">
            <Header />

            <div className="content">
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/dashboard" exact component={DashboardPage} />
                <Route path="/user" exact component={UserPage} />
                <Route path="/topic/:id" exact component={TopicPage} />
                <Route path="/PostQuizPage" exact component={PostQuizPage} />
                <Route path="/stats" exact component={Stats} />
              </Switch>
            </div>
        </div>
      </Router>
    )
  }
}

export default App;

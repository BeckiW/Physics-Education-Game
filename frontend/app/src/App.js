import React, { Component } from 'react';
import Header from './header'
import HomePage from './home-page'
import DashboardPage from './dashboard-page'
import UserPage from './user-page/userpage.js'
import TopicPage from './topic-page'
import Stats from './stats-page'
import PostQuizPage from './post-quiz-page'
import PostQuizLosePage from './post-quiz-lose'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import './App.scss';


class App extends Component {

  state = {
    isAuthenticated: false,
    user: null,
    token: ''
  }

  onSuccess = (response) => {
    const token = response.headers.get('userToken');
    response.json().then(user => {
      if (token) {
        this.setState({isAuthenticated: true, user: user, token: token});
      }
    });
};

  onFailed = (error) => {
    alert(error);
  };

  logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null})
};

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
                <Route path="/topic/:id" exact
                  render={(props) => <TopicPage {...props}
                   swimTime={this.onSuccess}
                   hikeTime={this.onFailed}
                   gymTime={this.logout} />}
                   />
                <Route path="/PostQuizPage" exact component={PostQuizPage} />
                <Route path="/EndQuizPage" exact component={PostQuizLosePage} />
                <Route path="/stats" exact component={Stats} />
              </Switch>
            </div>
        </div>
      </Router>
    )
  }
}

export default App;

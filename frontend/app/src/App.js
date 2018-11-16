import React, { Component } from 'react';
import GamePage from './game-page'
import UserPage from './user-page/userpage.js'
import TopicPage from './topic-page'
import Stats from './stats-page'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import './App.scss';

class App extends Component {

  state = {
     totalScore: 0
  }

  updateTotalScore = () => {
    let prevScore = this.state.totalScore
    let newScore = this.state.question.answers.find(answer => (
      answer.id === this.state.selectedAnswer
    )).score
    this.setState({
      totalScore: prevScore + newScore
    })
  }


  render() {
    return (
      <Router>
          <div>
            <Switch>
              <Route path="/" exact component={GamePage} />
              <Route path="/user" exact component={UserPage} />
              <Route path="/topic/:id" exact component={TopicPage} />
              <Route path="/stats" exact component={Stats} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;

import React from "react"
import Header from '../header'
import Achievements from '../achievements'
import LineChart from '../line-graph'
import DuoPhysicsClient from "../../model/duophysics-client.js"
import { Chart } from "react-charts";
import './style.scss'

class Stats extends React.Component {

  state = {
    totalScore: 0,
    pointsData: 0
  }

  componentDidMount() {
    this.fetchResults()
  }


  fetchResults = () => {
    let userId = DuoPhysicsClient.getUserId();

    fetch(`${DuoPhysicsClient.ServerUrl}/scores/${userId}`)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(json)
      this.setState({
        totalScore: json[0].total
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }



  render() {
    let userName = DuoPhysicsClient.getUserName()

    return (

    <div className="stats-page">
      <div className="user-container">
        <h1>Achievements</h1>

        <div className="user-content">
          <div>
            <img src="./anon-user.jpg" alt="user" />
          </div>
          <div>
            <p>Hello {userName}</p>
            <p>Great job! You have earned {this.props.totalScore} points so far!</p>
          </div>
        </div>
      </div>

      <Achievements
        pointsData={this.state.totalScore}
        pointsLimit={20}
        source="badge-heart2"
        headline="Champion!"
        text="You conquered a course!"
      />
      <Achievements
        pointsData={this.state.totalScore}
        pointsLimit={50}
        source="badge-star"
        headline="Champion!"
        text="You conquered a course!"
      />
      <Achievements
        pointsData={this.state.totalScore}
        pointsLimit={70}
        source="badge-heart2"
        headline="Champion!"
        text="You conquered a course!"
      />
      <Achievements
        pointsData={this.state.totalScore}
        pointsLimit={100}
        source="badge-diamond"
        headline="Champion!"
        text="You conquered a course!"
      />
      <Achievements
        pointsData={this.state.totalScore}
        pointsLimit={150}
        source="badge-diamond2"
        headline="Champion!"
        text="You conquered a course!"
      />
    </div>
    )
  }

}

export default Stats

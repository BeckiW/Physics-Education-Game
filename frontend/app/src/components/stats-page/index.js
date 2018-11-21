import React from "react"
import Header from '../header'
import Achievements from '../achievements'
import LineChart from '../line-graph'
import DuoPhysicsClient from "../../model/duophysics-client.js"
import { Chart } from "react-charts";
import './style.scss'

class Stats extends React.Component {

  state = {
    resultData: [],
    totalPoints: 0,
    pointsData: 0
  }

  componentDidMount() {
    this.fetchResults()
    this.updateData();
  }

  updateData() {
    this.addPointsData()
  }


  fetchResults = () => {
    let UserId = localStorage.getItem('UserId');

    fetch(`${DuoPhysicsClient.ServerUrl}/results/${UserId}`).then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(json)
      this.setState({
        resultData: json
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }




  addPointsData = () => {
      let UserId = localStorage.getItem('UserId');
      let Points = 0;

      this.state.resultData.forEach((UserId) => {
        Points += parseFloat(UserId.score);
      })

      this.setState({
        pointsData: Points
      })
    }



  render() {
    return (

    <div>
        <div className="user-container">
            <h1> Achievements </h1>
              <div>
                <img src="./anon-user.jpg" alt="user" />
              </div>
            <div className="user-box">
              <div>
                <p>Username: {this.props.username}</p>
              </div>
              <div>
                <p>Great job! You have earned {this.state.pointsData} points so far!</p>
              </div>
            </div>
          </div>
        <div className="achievement-container">
          <Achievements
            pointsData={this.state.pointsData}
            pointsLimit={20}
            source="badge-heart2"
          />
          </div>
          <div className="achievement-container">
          <Achievements
            pointsData={this.state.pointsData}
            pointsLimit={50}
            source="badge-star"
          />
          </div>
          <div className="achievement-container">
          <Achievements
            pointsData={this.state.pointsData}
            pointsLimit={70}
            source="badge-heart2"
          />
          </div>
          <div className="achievement-container">
          <Achievements
            pointsData={this.state.pointsData}
            pointsLimit={100}
            source="badge-diamond"
          />
          </div>
          <div className="achievement-container">
          <Achievements
            pointsData={this.state.pointsData}
            pointsLimit={150}
            source="badge-diamond2"
          />
          </div>

        </div>
    )
  }

}

export default Stats

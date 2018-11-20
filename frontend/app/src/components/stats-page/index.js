import React from "react"
import Header from '../header'
import './style.scss'

class Stats extends React.Component {


  render() {
    return (
    <div>
      <h1> Achievements </h1>
      <div className = "achievement-container">
      <img src="/trophy.png" alt="icon1" />
      </div>

    </div>
    )
  }

}

export default Stats

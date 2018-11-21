import React from "react"

class Achievements extends React.Component {

  render() {
    return (
      <div className={this.props.pointsData > this.props.pointsLimit ? "completed" : "badge"} >
        <img src={"./" + this.props.source + ".png"} alt={this.props.source} />
      </div>
    )
  }
}

export default Achievements

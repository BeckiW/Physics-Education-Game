import React from "react"
import "./style.scss"


class Question extends React.Component {

  render() {
    return (

      <div className="question-container">
        <ul>
          <li>{this.props.id}</li>
          <li>{this.props.question}</li>
        </ul>
      </div>
    )
  }
}

export default Question

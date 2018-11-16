import React from 'react'
import Header from '../header'
import Answer from '../answer'
import './style.scss'


class Question extends React.Component {



  render() {
    return (
      <div>

        <div className="question-container">
          <ul>
            <p>{this.props.question._id}</p>
            <p>{this.props.question.text}</p>
          </ul>
        </div>

      </div>
    )
  }
}

export default Question

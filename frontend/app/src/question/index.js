import React from 'react'
import Header from '../header'
import Answer from '../answer'
import './style.scss'


class Question extends React.Component {

state = {
  question: this.props.question
}




  render() {
    return (
      <div>
      <Header />

        <div className="question-container">
          <ul>
            <p>{this.props.question._id}</p>
            <p>{this.props.question.text}</p>
          </ul>

          <div className="answers">
                {this.props.question.answers.map(answer => (
                  <Answer
                    id={answer.id}
                    answer={answer}
                    /> ))}
      </div>

      </div>
      </div>
    )
  }
}

export default Question

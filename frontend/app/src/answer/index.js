import React from 'react'
import './style.scss'


class Answer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      answer: null
    }
  }

  isCorrectAnswer = () => {
    alert(this.props.index)
    this.props.isCorrectAnswer(this.props.index)
    this.props.handleClickLoadNext()
  }

  render() {
    return (
      <div className="answer">
        <button id={this.props.index} onClick={this.isCorrectAnswer}>{this.props.answer}</button>
      </div>
    )
  }
}

export default Answer

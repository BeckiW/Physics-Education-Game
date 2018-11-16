import React from 'react'
import './style.scss'


class Answer extends React.Component {

  handleClick = (event) => {
     this.setState({
       selectedAnswer: event.target.value,
     }, () => this.props.onSelectedAnswer(this.state.selectedAnswer))
 }

  render() {
    return (

    <div className="answer">
     <button >{this.props.answer}</button>
     </div>

    )
  }
}

export default Answer

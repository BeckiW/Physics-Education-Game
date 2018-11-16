import React from 'react'
import './style.scss'


class Answer extends React.Component {

  constructor(props) {
        super(props)
        this.state = {
          answer: null
        }
      }

  onClick = () => {
    alert(this.props.index)
    let currentAnswer = this.props.index
    this.setState({
        answer: currentAnswer
      })
  }

  handleOnClick = () => {
      this.props.handleOnClick(this.state)
    }


  render() {
    return (

    <div className="answer">
     <button id={this.props.index} onClick={this.handleClick}>{this.props.answer}</button>
     </div>

    )
  }
}

export default Answer

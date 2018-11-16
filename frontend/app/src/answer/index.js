import React from 'react'
import './style.scss'


class Question extends React.Component {

  state ={
    selectedAnswer: ""
  }



  render() {
    return (

    <div className="answer">
     <button >{this.props.answer}</button>
     </div>


    )
  }
}

export default Question

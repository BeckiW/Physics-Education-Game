import React from 'react'
import "./style.scss"
import Question from '../question'


class TopicPage extends React.Component {

    state = {
        questionData: [],
        questionToShow: 0,
        correctAnswer: ""
      }


  componentDidMount() {
    this.fetchQuestions()
  }

  fetchQuestions = () => {
    let topicId = "";

    if (this.props.id) {
      topicId = this.props.id;
    } else {
      topicId = this.props.match.params.id;
    }

    fetch(`http://localhost:8080/topics/${topicId}`).then((response) => {
      return response.json()
    })
    .then((json) => {
      this.setState({
        questionData: json
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

  handleClickLoadNext = () => {
    let nextQuestionToShow = this.state.questionToShow + 1
    this.setState({
        questionToShow: nextQuestionToShow
      })
  }

  checkCorrectAnswer = () => {


  }



  render() {


    if (this.state.error) {
      return (<div><h1 className="broken">Sorry...</h1><p className="testBroken">Something went wrong!</p></div>)
    }
    if (this.state.questionData === undefined || this.state.questionData.length === 0) {
      return <div><p>No questions found</p></div>
    }

    let question = this.state.questionData[this.state.questionToShow]

    return (
      <div>
        <div className="question-text">
          <Question question={question}/>
        </div>
        <button onClick={this.handleClickLoadNext}> Load Next Question </button>

    </div>
    )
  }
}

export default TopicPage

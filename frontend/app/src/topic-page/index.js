import React from 'react'
import "./style.scss"
import Question from '../question'
import Answer from '../answer'
import ProgressBar from '../progressBar'

let shuffleArray = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class TopicPage extends React.Component {

    state = {
        questionData: [],
        questionToShow: 0,
        correctAnswer: null,
        selectedAnswer: "",
        totalScore: 0,
        progress: 0,
        questionsAnswered: 0,
      }


  componentDidMount() {
    this.fetchQuestions()
  }

  progressStep = () => {
    this.setState({
      progress: Math.round(((this.state.totalScore)/10) * 100)})
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
    .then((data) => {
      data = shuffleArray(data);

      this.setState({
        questionData: data
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

  isCorrectAnswer = (selectedAnswerIndex) => {
    //takes the index of the current question
    let currentQuestion = this.state.questionData[this.state.questionToShow]
    // passed up as props from child
    if (selectedAnswerIndex == currentQuestion.correct_answer) {
      this.setState({
        totalScore: this.state.totalScore + 1
      }, this.progressStep)

    } else {
      console.log("You lose")
    }
  }


  render() {

    if (this.state.error) {
      return (<div><h1 className="broken">Sorry...</h1><p className="testBroken">Something went wrong!</p></div>)
    }
    if (this.state.questionData === undefined || this.state.questionData.length === 0) {
      return <div><p>No questions found</p></div>
    }

    let question = this.state.questionData[this.state.questionToShow]

    if (this.state.totalScore >= 2 || this.state.questionData.length < 1) {
      //does this have to be in a callback? Or a settime out
      window.location.assign('/PostQuizPage');
    }

    return (
      <div className="activity-container">
        <div className="activity-progress">
          <ProgressBar progress={this.state.progress} />
        </div>

        <div className="question-text">
          <Question question={question}/>
        </div>

        <div className="answers">
              {question.answers.map((answer, index) => (
                <Answer
                  id={answer.id}
                  index={index}
                  answer={answer}
                  isCorrectAnswer={this.isCorrectAnswer}
                  handleClickLoadNext={this.handleClickLoadNext}
                />
              ))}
        </div>

        <div className="extras">
          <button onClick={this.handleClickLoadNext}>Skip Question</button>
        </div>
    </div>
    )
  }
}

export default TopicPage

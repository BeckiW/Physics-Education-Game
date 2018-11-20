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
        showQuestionResult: false,
        lastQuestionCorrect: false
      }


  componentDidMount() {
    this.fetchQuestions()
  }

  updateProgressBar = () => {
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

  advanceQuestion = () => {
    this.updateProgressBar()
    let nextQuestionToShow = this.state.questionToShow + 1

    this.setState({
        questionToShow: nextQuestionToShow,
        questionsAnswered: this.state.questionsAnswered + 1,
        showQuestionResult: false
      })
  }

  onSkipQuestion = () => {
    this.advanceQuestion()
  }

  onAnswerSelected = (selectedAnswerIndex) => {
    //takes the index of the current question
    let currentQuestion = this.state.questionData[this.state.questionToShow]
    // passed up as props from child
    if (selectedAnswerIndex === currentQuestion.correct_answer) {
      console.log("Correct Answer!")
      this.setState({
        totalScore: this.state.totalScore + 1,
        showQuestionResult: true,
        lastQuestionCorrect: true
      })

    } else {
      console.log("Wrong Answer!")
      this.setState({
        totalScore: this.state.totalScore,
        showQuestionResult: true,
        lastQuestionCorrect: false
      })
    }
  }


  updateTotalScore = () => {
    let prevScore = this.state.totalScore
    let newScore = this.state.question.answers.find(answer => (
      answer.id === this.state.selectedAnswer
    )).score
    this.setState({
      totalScore: prevScore + newScore
    })
  }


  render() {

    if (this.state.error) {
      return (<div><h1 className="broken">Sorry...</h1><p className="testBroken">Something went wrong!</p></div>)
    }
    if (this.state.questionData === undefined || this.state.questionData.length === 0) {
      return <div><p>No questions found</p></div>
    }

    let question = this.state.questionData[this.state.questionToShow]

    if (this.state.totalScore >= 10) {
      window.location.assign('/PostQuizPage');
    }
    else if (this.state.questionsAnswered === 5 && this.state.totalScore < 10){
      window.location.assign('/EndQuizPage')
    }

    let content = ""

    if (this.state.showQuestionResult)
    {
      let className = this.state.lastQuestionCorrect ? "correct-answer" : "wrong-answer"
      let text = this.state.lastQuestionCorrect ? "Correct Answer!" : "Wrong Answer"

      content = <div className={"result " + className}>
        <div className="next-question">
          <button onClick={this.onSkipQuestion}>Next Question</button>
        </div>

        <h2>{text}</h2>
      </div>
    }
    else
    {
      content = <div>
        <div className="answers">
          {question.answers.map((answer, index) => (
            <Answer
              id={answer.id}
              index={index}
              answer={answer}
              onAnswerSelected={this.onAnswerSelected}
              totalScore={this.totalScore}
            />
          ))}
        </div>

        <div className="extras">
          <button onClick={this.onSkipQuestion}>Skip Question</button>
        </div>
      </div>
    }

    return (
      <div className="activity-container">
        <div className="activity-progress">
          <ProgressBar progress={this.state.progress} />
        </div>

        <div className="question-text">
          <Question question={question}/>
        </div>

        {content}
    </div>
    )
  }
}

export default TopicPage

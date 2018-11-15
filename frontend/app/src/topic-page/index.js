import React from "react"
import "./style.scss"
import Question from '../question'


class TopicPage extends React.Component {

    state = {
        questionData: [],
        error: false
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

    fetch(`http://localhost:8080/topics/${topicId}`).then(response => {
      return response.text()
    }).then(text => {
      try {
        this.setState({ questionData: json })
      } catch(err) {
        this.setState({ questionData: {}, error:true })
      }
    })
}

  render() {
    if (this.state.error) {
      return (<div><h1 className = "broken" >Sorry...</h1><p className = "testBroken">Something went wrong!</p></div>)
    }
    if (!this.state.questionData.id) {
      return null
    }

    return (
      <div>
        <div className="question-text">
        {this.state.questionData.map((question) => {
          return <Question id= {question.topic_id}
            question={question.question}/>
          })}
        </div>
    </div>
    )
  }
}

export default TopicPage

import React from "react"
import "./style.scss"

const url = `http://localhost8080/topics/id`


class TopicPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      questionData: {},
      error: false
    }
  }

  componentDidMount() {
    let topicId = 0;

    if (this.props.id) {
      topicId = this.props.id;
    } else {
      topicId = this.props.match.params.id;
    }

    fetch(`http://localhost:8080/topics/${topicId}`).then(response => {
      return response.text()
    }).then(text => {
      try {
        const json = JSON.parse(text);
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
          <p>{this.state.questionData.question}</p>
        </div>


      <div className="question-container">
        <div className="job-intro">
          <p>{this.state.questionData.answers}</p>
        </div>
      </div>

    </div>
    )
  }
}

export default TopicPage

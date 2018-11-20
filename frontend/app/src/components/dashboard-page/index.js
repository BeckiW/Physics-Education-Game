import React from 'react'
import "./style.scss"
import TopicList from '../topiclist'


let userToken = ""
let URL = "http://localhost:8080/topics/"

class DashboardPage extends React.Component {

  state = {
    topics: [],
    isAuthenticated: false,
    user: null,
    token: ''
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    console.log("A")

    fetch(URL)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        console.log(json)

        this.setState({
          topics: json
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="dashboard-main">
          <div className="topic-list">
            <h2>Physics Topics</h2>
            {this.state.topics.map((topic) => {
              return <TopicList id={topic._id}
                title={topic.title}
                icon={topic.icon}
                />
            })}
          </div>
        </div>
        <div className="dashboard-sidebar">
          <div>
            <h2>Something Here!</h2>
          </div>
        </div>
      </div>
    )
  }

}

export default DashboardPage

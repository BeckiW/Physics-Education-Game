import React from 'react'
import "./style.scss"
import Header from '../header'
import TopicList from '../topiclist'


let userToken = ""
let URL = "http://localhost:8080/topics/"

class GamePage extends React.Component {

  state = {
      topics: []
    }

    componentDidMount() {
      this.fetchData()
    }

    fetchData = () => {
        fetch(URL)
          .then((response) => {
            return response.json()
          })
          .then((json) => {
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

    <div>

      <Header />

      <div className="product-container">
              {this.state.topics.map((topic) => {
                return <TopicList id= {topic._id}
                  title={topic.title}
                  />
              })}
      </div>

    </div>

    )
  }

}

export default GamePage

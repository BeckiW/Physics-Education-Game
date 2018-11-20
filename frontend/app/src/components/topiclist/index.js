import React from "react"
import "./style.scss"



class TopicList extends React.Component {



  render() {
    return (
      <div className="topic-item">
          <a href={"/topic/" + this.props.id}><img src={"https://localhost:8080/topic_icons/" + this.props.icon} alt="Icon" /></a>
          <a href={"/topic/" + this.props.id}>{this.props.title}</a>
      </div>
    )
  }
}

export default TopicList

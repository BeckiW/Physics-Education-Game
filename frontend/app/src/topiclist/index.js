import React from "react"
import "./style.scss"



class TopicList extends React.Component {



  render() {
    return (

      <div className="topic-container">
        <ul className="topic-list" onClick={this.onClickHandler}>
          <li>{this.props.id}</li>
          <li><a className="topic-link" href={"/topic/" + this.props.id}>{this.props.title}</a></li>
        </ul>
      </div>
    )
  }
}

export default TopicList

import React from 'react'
import './style.scss'


class ProgressBar extends React.Component {

  state = {
    active: false,
  };

  progressStep = {
    width: this.state.active ? "100%" : this.props.progress + "%"
  }

  render() {

    return(
      <div className="progressBar">
        <div className="background"></div>
        <div className="filler" style={this.progressStep}></div>
      </div>

    )
  }

}

export default ProgressBar

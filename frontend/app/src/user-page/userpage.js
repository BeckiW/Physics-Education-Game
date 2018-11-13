import React from "react"
import { Link } from "react-router-dom"
import SignUpForm from "./signup"
import LogInForm from "./login"
import './style.scss'

class UserPage extends React.Component {

  state = {
    isLoggedIn: false,
  }


  checkLogInStatus = status => {
    this.setState({
      isLoggedIn: status
    }, () => { console.log(this.state.isLoggedIn)} )
  }

  render() {
    if(this.state.isLoggedIn) {
      return (
        <div className="pageContentUserInfo">
          <h1> You are logged in! </h1>
        </div>
      )
    } else {
      return (
        <div className="pageContentLoginPage">
          <div className="backButtonContainer">
            <Link to="/"><button className="navigationButtonTop-small">&larr; Back to level page</button></Link>
          </div>
          <div className="formsContainer">
            <div className="formBox">
              <LogInForm onLogin={this.checkLogInStatus} />
            </div>
            <div className="formBox">
              <SignUpForm onLogin={this.checkLogInStatus} />
            </div>
          </div>
        </div>

      )
    }
  }
}

export default UserPage

import React from "react"
import { Link } from "react-router-dom"
import SignUpForm from "./signup"
import LogInForm from "./login"

class UserPage extends React.Component {

  state = {
    isLoggedIn: false,
    newBook: {},
    newBookAdded: false
  }

  postData = () => {
    const url = "http://localhost:8080/books"
    const { newBook } = this.state
    fetch(url, {
      method: "POST",
      body: JSON.stringify(newBook),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 201) {
          this.setState({
            newBookAdded: true
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  addNewBook = newBook => {
    this.setState({
      newBook
    }, () => { this.postData() })
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

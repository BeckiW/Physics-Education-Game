import React from "react";
import Header from "../header";
import DuoPhysicsClient from "../../model/duophysics-client.js";

class LogInForm extends React.Component {
  state = {
    username: "",
    password: "",
    isLoggedIn: false
  };

  handleFormUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitForm = event => {
    event.preventDefault();
    const userDetails = {
      username: this.state.username,
      password: this.state.password
    };
    fetch("http://localhost:8080/sessions", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(result => {
        DuoPhysicsClient.onLogin(
          result.id,
          result.username,
          result.accessToken
        );
        console.log("Success!");

        this.setState(
          {
            isLoggedIn: true
          },
          () => {
            this.props.onLogin(this.state.isLoggedIn);
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <div className="login-title">LOG IN</div>
        <form className="loginForm" onSubmit={this.submitForm}>
          <input
            className="input-details"
            name="username"
            type="text"
            placeholder="Username"
            onChange={this.handleFormUpdate}
          />

          <input
            className="input-details"
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.handleFormUpdate}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default LogInForm;

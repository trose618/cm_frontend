import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleLogin } from "../thunks/userThunks";

class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      client: null
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    e.target.reset();
    console.log(this.state);
    this.props.handleSubmit(this.state, this);
    this.setState({ username: "", password: "", client: true });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div
        style={{ width: "50%", marginTop: "20%", height: "auto" }}
        className="ui form segment raised"
      >
        <form onSubmit={this.handleSubmit}>
          <h1>Coach Me SignUp</h1>
          <input
            type="text"
            placeholder="Enter username"
            value={this.state.username}
            name="username"
            onChange={this.handleChange}
          />
          <br />
          <input
            type="password"
            placeholder="Enter password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
          />
          <hr />
          What kind of account are you signing up for?
          <br />
          <input
            type="radio"
            name="client"
            value={true}
            onChange={this.handleChange}
          />
          Client
          <br />
          <input
            type="radio"
            name="client"
            value={false}
            onChange={this.handleChange}
          />
          Coach
          <br />
          <input type="submit" value="SignUp" />
          <br />
          <a href="https://www.ussquash.com/coach/coach-certification/">
            Not a certified coach?
          </a>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: (userInfo, self) =>
      dispatch(handleLogin(userInfo, "users"))
        .then(res => res.json())
        .then(data => {
          if (!data.user) {
            alert(data.error);
          } else {
            console.log(data.user);
            localStorage.setItem("token", data.jwt);
            dispatch({ type: "SIGNUP_USER", payload: data.user });
            self.props.history.push("/profile");
          }
        })
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(SignUpForm)
);

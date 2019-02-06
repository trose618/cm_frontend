import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleLogin } from "../thunks/userThunks";
import { getLessons } from "../thunks/lessonThunks";
import { getCoaches } from "../thunks/coachThunks";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    e.target.reset();
    this.props.handleSubmit(this.state, this);
    this.props.history.push("/profile");
    this.setState({ username: "", password: "" });
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
          Coach Me Login
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
          <br />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: (userInfo, self) =>
      dispatch(handleLogin(userInfo, "login"))
        .then(res => res.json())
        .then(data => {
          if (!data.user) {
            alert(data.error);
          } else {
            localStorage.setItem("token", data.jwt);
            dispatch({ type: "LOGIN_USER", payload: data.user });
            dispatch(getLessons());
            dispatch(getCoaches());

            self.props.history.push("/profile");
          }
        })
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(LoginForm)
);

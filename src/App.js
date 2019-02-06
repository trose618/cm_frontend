import React, { Component } from "react";
import "./App.css";
import SignUpForm from "./components/SignUpForm";
import PrimarySearchAppBar from "./components/PrimarySearchAppBar";
import LoginForm from "./components/LoginForm";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import HomePage from "./components/HomePage";
import { connect } from "react-redux";
import { setCurrentUser } from "./actions/userActions";
import { getCoaches } from "./thunks/coachThunks";
import { getLessons } from "./thunks/lessonThunks";
import CoachSearchProfile from "./components/CoachSearchProfile";

import CoachContainer from "./components/CoachContainer";

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem("token")) {
      fetch("http://localhost:3000/api/v1/reload", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
        .then(res => res.json())
        .then(data => this.props.handleReload(data.user));
    }
    this.props.handleCoachReload();
    this.props.handleLessonsReload();
  }

  render() {
    return (
      <div className="App">
        <PrimarySearchAppBar />
        <div className="main-display-div">
          <Switch>
            <Route
              path="/signUp"
              render={() => {
                return (
                  <div className="ui one column stackable center aligned page grid signUp">
                    <SignUpForm handleSubmit={this.handleSubmit} />
                  </div>
                );
              }}
            />
            <Route
              path="/profile"
              render={() => {
                return localStorage.getItem("token") ? (
                  <UserProfile />
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
            <Route
              path="/login"
              render={() => {
                return localStorage.getItem("token") ? (
                  <Redirect to="/profile" />
                ) : (
                  <div className="ui one column stackable center aligned page grid signUp">
                    <LoginForm />
                  </div>
                );
              }}
            />
            <Route
              path="/coachProfile"
              render={() => {
                return this.props.selected_coach ? (
                  <CoachSearchProfile />
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
            <Route
              path="/coaches"
              render={() => {
                return localStorage.getItem("token") ? (
                  <CoachContainer />
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
            <Route path="/" component={HomePage} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleReload: userInfo => {
      dispatch(setCurrentUser(userInfo));
    },

    handleCoachReload: () => {
      dispatch(getCoaches());
    },

    handleLessonsReload: () => {
      dispatch(getLessons());
    }
  };
};

const mapStateToProps = args => {
  return args;
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

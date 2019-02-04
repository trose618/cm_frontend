import React, { Component } from "react";
import { connect } from "react-redux";

class UserProfile extends Component {
  componentWillReceiveProps(prevProps) {
    if (localStorage.getItem("token")) {
    }
  }

  render() {
    return (
      <div>
        <h1> {this.props.currentUser.username}</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state);
  return { currentUser: state.currentUser };
};

export default connect(mapStateToProps)(UserProfile);

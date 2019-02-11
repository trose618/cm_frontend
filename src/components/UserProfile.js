import React, { Component } from "react";
import { connect } from "react-redux";
import Calendar from "./Calendar";

class UserProfile extends Component {
  render() {
    const default_image = `https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1-744x744.jpg`;
    return (
      <div className="profile-container">
        <div style={{ display: "inline-block", height: "auto" }}>
          <h2>
            {this.props.username
              ? `Welcome, ${this.props.username}!`
              : "Loading..."}
          </h2>
          <div className="profile-div">
            <img
              alt=""
              src={this.props.image_url ? this.props.image_url : default_image}
            />
            <br />
            {this.props.username}
          </div>
          <div className="profile-bio">
            <span style={{ fontStyle: "strong" }}>Bio</span>
            <hr />
            <div>{this.props.bio}</div>
          </div>
        </div>
        <Calendar />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.currentUser };
};

export default connect(mapStateToProps)(UserProfile);

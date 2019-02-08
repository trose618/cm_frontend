import React, { Component } from "react";
import { connect } from "react-redux";

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
            <div>
              Quisque purus tellus, eleifend elementum tortor congue, accumsan
              vehicula metus. Praesent non sapien ut arcu aliquet varius at ac
              nisi. Aliquam ut posuere metus, ac fringilla lectus. Interdum et
              malesuada fames ac ante ipsum primis in faucibus. Integer
              ullamcorper non lacus maximus viverra. Sed et faucibus orci. In
              efficitur ante ac sapien lobortis, posuere tempor orci gravida.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return { ...state.currentUser };
};

export default connect(mapStateToProps)(UserProfile);

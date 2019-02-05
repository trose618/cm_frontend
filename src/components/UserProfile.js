import React, { Component } from "react";
import { connect } from "react-redux";

class UserProfile extends Component {
  render() {
    const default_image = `https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1-744x744.jpg`;
    return (
      <div>
        <h2>Profile Page</h2>
        <div className="profile-div">
          <img
            alt=""
            src={this.props.image_url ? this.props.imgage_url : default_image}
          />
          <br />
          {this.props.username}
        </div>

        <hr />
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state);
  return { ...state.currentUser };
};

export default connect(mapStateToProps)(UserProfile);

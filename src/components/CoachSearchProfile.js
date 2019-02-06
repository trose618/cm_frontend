import React from "react";
import { connect } from "react-redux";
import LessonModal from "./LessonModal";

class CoachSearchProfile extends React.Component {
  handleClick = () => {
    this.setState({ openLessonForm: true });
  };

  render() {
    const default_image = `https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1-744x744.jpg`;
    return (
      <div className="search-profile-div">
        <h1>{this.props.coach.username}'s Profile</h1>
        <img
          alt=""
          src={
            this.props.coach.image_url
              ? this.props.coach.imgage_url
              : default_image
          }
        />
        <br />
        <div
          style={{
            display: this.props.currentUser.client === true ? "block" : "none"
          }}
        >
          <LessonModal />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    coach: state.selected_coach,
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(CoachSearchProfile);

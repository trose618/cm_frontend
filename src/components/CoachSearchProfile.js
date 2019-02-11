import React from "react";
import { connect } from "react-redux";
import LessonModal from "./LessonModal";
import Button from "@material-ui/core/Button";
import { startConvo } from "../thunks/userThunks";

class CoachSearchProfile extends React.Component {
  handleClick = () => {
    this.props.messageCoach(
      this.props.currentUser.id,
      this.props.coach.id,
      this.props.coach.username,
      this.props.currentUser.username
    );
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
              ? this.props.coach.image_url
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
        <Button onClick={this.handleClick}>Message</Button>
        <div className="profile-bio" style={{ marginLeft: "25%" }}>
          <span style={{ fontStyle: "strong" }}>Bio</span>
          <hr />
          <br />
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
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    messageCoach: (client_id, coach_id, coach_name, user_name) =>
      dispatch(startConvo(client_id, coach_id, coach_name, user_name))
  };
};

const mapStateToProps = state => {
  return {
    coach: state.selected_coach,
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoachSearchProfile);

import React from "react";
import { connect } from "react-redux";
import LessonModal from "./LessonModal";
import Button from "@material-ui/core/Button";
import { startConvo } from "../thunks/userThunks";

class CoachSearchProfile extends React.Component {
  handleClick = () => {
    let convo_names = this.props.convos.map(convo => convo.title);

    if (
      convo_names.includes(
        `convo between ${this.props.coach.username} and ${
          this.props.currentUser.username
        }`
      )
    ) {
      alert("convo already exists");
      this.props.handleToggleChat();
    } else {
      this.props.messageCoach(
        this.props.currentUser.id,
        this.props.coach.id,
        this.props.coach.username,
        this.props.currentUser.username
      );
    }
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
          <div>{this.props.coach.bio}</div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    messageCoach: (client_id, coach_id, coach_name, user_name) => {
      dispatch(startConvo(client_id, coach_id, coach_name, user_name)).then(
        data => {
          if (data.conversation) {
            alert("new convo!");
            dispatch({ type: "TOGGLE_CHAT", payload: true });
          } else {
            alert("already have an existing chat with this coach");
          }
        }
      );
    },
    handleToggleChat: () => {
      dispatch({ type: "TOGGLE_CHAT", payload: true });
    }
  };
};

const mapStateToProps = state => {
  return {
    coach: state.selected_coach,
    currentUser: state.currentUser,
    convos: state.conversations
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoachSearchProfile);

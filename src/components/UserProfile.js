import React, { Component } from "react";
import { connect } from "react-redux";
import Calendar from "./Calendar";

class UserProfile extends Component {

  renderUpcomingLessons = () => {
    if (this.props.lessons.length === 0) {
      return <li>No upcoming lessons.</li>
    } else {
      let lesson = this.props.lessons[0]
      return <li>Lesson between {lesson.client_name} and coach {lesson.coach_name}.</li>
    }

  }

  render() {
    const default_image = `https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1-744x744.jpg`;
    return (
      <div>
        <div style={{ display: "inline-block", height: "auto", width: "100%", position: "relative" }}>
          <h2>
            {this.props.username
              ? `Welcome, ${this.props.username}!`
              : "Loading..."}
          </h2>
          <div className="profile-div">
            <div>
              <img className="profile-picture" style={{ height: "300px" }}
                alt=""
                src={this.props.image_url ? this.props.image_url : default_image}
              />
              <span className="profile-lessons">
                <span className="profile-lessons-header">Upcoming Lessons</span>
                <ul>
                  {this.renderUpcomingLessons()}
                </ul>
              </span>
            </div>
            <br />
            {this.props.username}
          </div>
          <div className="profile-bio">
            <span style={{ fontStyle: "strong" }}>A bit about myself...</span>
            <hr />
            <div>{this.props.bio}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.currentUser, lessons: state.confirmed_lessons };
};

export default connect(mapStateToProps)(UserProfile);

import React, { Component } from "react";
import { connect } from "react-redux";

class Lesson extends Component {
  state = {};

  handleAccept = () => {
    this.props.handleAccept(this.props.lesson.id);
  };

  handleDecline = () => {
    this.props.handleDecline(this.props.lesson.id);
  };

  handleConfirm = () => {
    this.props.handleConfirm(this.props.lesson.id);
  };

  render() {
    const date = new Date(this.props.lesson.lesson_date);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;

    let dateString =
      date.getUTCFullYear() +
      "/" +
      ("0" + (date.getUTCMonth() + 1)).slice(-2) +
      "/" +
      ("0" + date.getUTCDate()).slice(-2) +
      " ";

    const lessonHeadForCoach = () => {
      if (this.props.lesson.checked !== true) {
        if (this.props.lesson.accepted !== true) {
          return "New Lesson Request";
        } else {
          return "Waiting For Confirmation";
        }
      } else {
        return "Lesson Scheduled";
      }
    };

    const lessonHeadForClient = () => {
      if (this.props.lesson.checked !== true) {
        if (this.props.lesson.accepted !== true) {
          return "Waiting For Coach To Respond";
        } else {
          return "Confirm This Lesson";
        }
      } else {
        return "Lesson Scheduled";
      }
    };

    return (
      <div>
        <div className="ui card raised lesson-card">
          <h3>
            {this.props.client ? lessonHeadForClient() : lessonHeadForCoach()}
          </h3>
          <br />
          Coach: {this.props.lesson.coach_name}
          <br />
          Name: {this.props.lesson.client_name}
          <br />
          Lesson Date: {dateString}
          <br />
          Lesson Time: {strTime}
          <br />
          Level: {this.props.lesson.client_level}
          <br />
          Age: {this.props.lesson.client_age}
          <br />
          Focus of Lesson:
          <br />
          {this.props.lesson.lesson_focus}
          <br />
          Email: {this.props.lesson.client_email}
          <br />
          <div>
            {this.props.client ? (
              <div>
                {this.props.lesson.accepted === true &&
                this.props.lesson.checked !== true ? (
                  <div className="ui button" onClick={this.handleConfirm}>
                    Confirm Lesson
                  </div>
                ) : null}
              </div>
            ) : (
              <div>
                {this.props.lesson.accepted !== true ? (
                  <div>
                    <div
                      className="ui button accept-decline-buttons"
                      onClick={this.handleAccept}
                    >
                      Accept Lesson
                    </div>
                    <div
                      className="ui button accept-decline-buttons"
                      onClick={this.handleDecline}
                    >
                      Decline Lesson
                    </div>
                  </div>
                ) : (
                  <div className="ui button" onClick={this.handleDecline}>
                    Cancel Lesson
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    client: state.currentUser.client
  };
};

export default connect(mapStateToProps)(Lesson);

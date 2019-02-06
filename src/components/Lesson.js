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

    const lessonHead = this.props.client
      ? `Waiting for coach response`
      : `Pending request from ${this.props.lesson.client_name}`;

    return (
      <div>
        <div className="ui card raised">
          <h3>{lessonHead}</h3>
          <br />
          <p>Requested Date: {dateString + " " + strTime}</p>
          <br />
          <p>Level: {this.props.lesson.client_level}</p>
          <br />
          <p>Age: {this.props.lesson.client_age}</p>
          <br />
          <p>
            Focus of Lesson:
            <br />
            {this.props.lesson.lesson_focus}
          </p>
          <br />
          <p>Email: {this.props.lesson.client_email}</p>

          <br />
          <div style={{ display: this.props.client ? "none" : "show" }}>
            <div className="ui button" onClick={this.handleAccept}>
              Accept Lesson
            </div>
            <div className="ui button" onClick={this.handleDecline}>
              Decline Lesson
            </div>
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

import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { connect } from "react-redux";

import "../App.css";
moment.locale("en-GB");
BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  state = {
    cal_events: []
  };

  convertDate = date => {
    return moment.utc(date).toDate();
  };

  componentDidMount() {
    let lessons = this.props.lessons.map(lesson => {
      let date = lesson.lesson_date
        .split(/[\-T:]+/)
        .map(digit => parseInt(digit));

      return {
        title: `Lesson with ${lesson.client_name}`,
        start: new Date(date[0], date[1] - 1, date[2], date[3], date[4], 0),
        end: new Date(date[0], date[1] - 1, date[2], date[3] + 1, date[4], 0),
        desc: lesson.lesson_focus
      };
    });
    this.setState({ cal_events: this.props.lessons });
    // let self = this;
    // axios
    //   .get("http://localhost:3000/api/v1/coach_lessons", {
    //     method: "GET",
    //     headers: {
    //       Authorization: localStorage.getItem("token")
    //     }
    //   })
    //   .then(response => {
    //     let appointments = response.data;

    //     for (let i = 0; i < appointments.length; i++) {
    //       appointments[i].start = moment
    //         .utc(appointments[i].lesson_date)
    //         .toDate();
    //       //   appointments[i].end = moment.utc(appointments[i].end).toDate();
    //     }
    //     self.setState({
    //       cal_events: appointments
    //     });
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lessons) {
      let lessons = nextProps.lessons.map(lesson => {
        let date = lesson.lesson_date
          .split(/[\-T:]+/)
          .map(digit => parseInt(digit));

        return {
          title: `Lessons with ${lesson.client_name}`,
          start: new Date(date[0], date[1] - 1, date[2], date[3], date[4], 0),
          end: new Date(date[0], date[1] - 1, date[2], date[3] + 1, date[4], 0),
          desc: lesson.lesson_focus
        };
      });
      this.setState({
        cal_events: lessons
      });
    }
  }

  render() {
    console.log(this.state.cal_events);
    const { cal_events } = this.state;
    const localizer = BigCalendar.momentLocalizer(moment);

    return (
      <div className="Calendar">
        <header className="Calendarheader">
          <h1 className="Calendar-title">{`${
            this.props.user.username
          }'s Calendar`}</h1>
        </header>
        <div style={{ height: 700 }}>
          <BigCalendar
            selectable
            localizer={localizer}
            events={cal_events}
            step={30}
            defaultView="day"
            views={["month", "week", "day"]}
            defaultDate={new Date()}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { lessons: state.confirmed_lessons, user: state.currentUser };
};

export default connect(mapStateToProps)(Calendar);

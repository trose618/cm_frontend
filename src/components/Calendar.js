import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { connect } from "react-redux";
//import { getConfirmedLessons } from "../thunks/lessonThunks";
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
    fetch("http://localhost:3000/api/v1/confirmed_lessons", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(cLessons => {
        let lessons = cLessons.map(lesson => {
          let date = lesson.lesson_date
            .split(/[\-T:]+/)
            .map(digit => parseInt(digit));

          return {
            title: `Lesson with ${lesson.client_name}`,
            start: new Date(date[0], date[1] - 1, date[2], date[3], date[4], 0),
            end: new Date(
              date[0],
              date[1] - 1,
              date[2],
              date[3] + 1,
              date[4],
              0
            ),
            desc: lesson.lesson_focus
          };
        });
        this.setState({
          cal_events: lessons
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lessons.length) {
      let lessons = nextProps.lessons.map(lesson => {
        let date = lesson.lesson_date
          .split(/[\-T:]+/)
          .map(digit => parseInt(digit));
        console.log(date[2], date[2] + 1);
        return {
          title: `${lesson.client_name}'s lesson`,
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

import React from "react";
import { connect } from "react-redux";
import Lesson from "./Lesson";
import { acceptLesson } from "../thunks/lessonThunks";
import { declineLesson } from "../thunks/lessonThunks";

const PendingLessonsContainer = props => {
  const testingArray = props.lessons;

  const handleAccept = lesson_id => {
    props.acceptLesson(lesson_id);
  };

  const handleDecline = lesson_id => {
    props.declineLesson(lesson_id);
  };

  const yourLessons = lessons => {
    let pendingLessons = lessons.filter(lesson => {
      return lesson.accepted === false;
    });
    return pendingLessons;
  };

  return (
    <div>
      <h1>{props.currentUser.client ? "Pending Lessons" : "Requests"}</h1>
      <div className="ui grid cards">
        {yourLessons(testingArray).map(lesson => {
          return (
            <Lesson
              key={lesson.id}
              lesson={lesson}
              handleAccept={handleAccept}
              handleDecline={handleDecline}
            />
          );
        })}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    acceptLesson: id => {
      dispatch(acceptLesson(id));
    },
    declineLesson: id => {
      dispatch(declineLesson(id));
    }
  };
};

const mapStateToProps = state => {
  console.log(state);
  return { lessons: state.lessons, currentUser: state.currentUser };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingLessonsContainer);

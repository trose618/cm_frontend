import React from "react";
import { connect } from "react-redux";
import Lesson from "./Lesson";
import { acceptLesson } from "../thunks/lessonThunks";
import { declineLesson } from "../thunks/lessonThunks";
import { confirmLesson } from "../thunks/lessonThunks";

const PendingLessonsContainer = props => {
  const testingArray = props.lessons;

  const handleAccept = lesson_id => {
    props.acceptLesson(lesson_id);
  };

  const handleDecline = lesson_id => {
    props.declineLesson(lesson_id);
  };

  const handleConfirm = lesson_id => {
    props.confirmLesson(lesson_id);
  };

  //   const yourLessons = lessons => {
  //     let pendingLessons = lessons.filter(lesson => {
  //       if (this.props.currentUser.client) {
  //         return lesson;
  //       } else {
  //         return;
  //       }
  //     });
  //     return pendingLessons;
  //   };

  return (
    <div>
      <h1>{props.currentUser.client ? "Pending Lessons" : "Requests"}</h1>
      <div className="ui grid cards">
        {props.lessons.map(lesson => {
          return (
            <Lesson
              key={lesson.id}
              lesson={lesson}
              handleAccept={handleAccept}
              handleDecline={handleDecline}
              handleConfirm={handleConfirm}
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
    },
    confirmLesson: id => {
      dispatch(confirmLesson(id));
    }
  };
};

const mapStateToProps = state => {
  //console.log(state);
  return { lessons: state.lessons, currentUser: state.currentUser };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingLessonsContainer);

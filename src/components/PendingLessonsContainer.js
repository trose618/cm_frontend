import React from "react";
import { connect } from "react-redux";
import Lesson from "./Lesson";
import { acceptLesson } from "../thunks/lessonThunks";
import { declineLesson } from "../thunks/lessonThunks";
import { confirmLesson } from "../thunks/lessonThunks";

const PendingLessonsContainer = props => {
  const handleAccept = lesson_id => {
    props.acceptLesson(lesson_id);
  };

  const handleDecline = lesson_id => {
    props.declineLesson(lesson_id);
  };

  const handleConfirm = lesson_id => {
    props.confirmLesson(lesson_id);
  };

  const waitingForCoach = () => {
    return props.lessons
      .filter(lesson => {
        return lesson.accepted === false;
      })
      .sort(function(a, b) {
        a = new Date(a.lesson_date);
        b = new Date(b.lesson_date);
        return a < b ? -1 : a > b ? 1 : 0;
      });
  };

  const confirmed = () => {
    return props.lessons
      .filter(lesson => {
        return lesson.checked === true;
      })
      .sort(function(a, b) {
        a = new Date(a.lesson_date);
        b = new Date(b.lesson_date);
        return a < b ? -1 : a > b ? 1 : 0;
      });
  };

  const confirmThese = () => {
    return props.lessons
      .filter(lesson => {
        return lesson.checked === false && lesson.accepted === true;
      })
      .sort(function(a, b) {
        a = new Date(a.lesson_date);
        b = new Date(b.lesson_date);
        return a < b ? -1 : a > b ? 1 : 0;
      });
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
      <h1>Scheduled Lessons</h1>
      <div>
        <div className="scrolling-wrapper">
          {confirmed().map(lesson => {
            return (
              <div className="lesson-card" key={lesson.id}>
                <Lesson
                  lesson={lesson}
                  handleAccept={handleAccept}
                  handleDecline={handleDecline}
                  handleConfirm={handleConfirm}
                />
              </div>
            );
          })}
        </div>
      </div>
      <hr />
      <div>
        <h1>Lessons Waiting For Your Confirmation</h1>
        <div>
          <div className="scrolling-wrapper">
            {confirmThese().map(lesson => {
              return (
                <div className="lesson-card" key={lesson.id}>
                  <Lesson
                    lesson={lesson}
                    handleAccept={handleAccept}
                    handleDecline={handleDecline}
                    handleConfirm={handleConfirm}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <hr />
      <div>
        <h1>Waiting For Coach To Respond</h1>
        <div>
          <div className="scrolling-wrapper">
            {waitingForCoach().map(lesson => {
              return (
                <div className="lesson-card" key={lesson.id}>
                  <Lesson
                    lesson={lesson}
                    handleAccept={handleAccept}
                    handleDecline={handleDecline}
                    handleConfirm={handleConfirm}
                  />
                </div>
              );
            })}
          </div>
        </div>
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

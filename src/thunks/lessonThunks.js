import { setLessons } from "../actions/lessonActions";

export const getLessons = () => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/coach_lessons", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(lessons => dispatch(setLessons(lessons)));
  };
};

export const acceptLesson = id => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/lessons/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({ accepted: true })
    })
      .then(res => res.json())
      .then(data => dispatch({ type: "ACCEPT_LESSON", payload: data.lesson }));
    //
  };
};

export const declineLesson = id => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/lessons/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => dispatch({ type: "DECLINE_LESSON", payload: id }));
    //
  };
};
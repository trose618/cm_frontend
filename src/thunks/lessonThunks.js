import { setLessons } from "../actions/lessonActions";

export const getLessons = () => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/lessons")
      .then(res => res.json())
      .then(lessons => dispatch(setLessons(lessons)));
  };
};

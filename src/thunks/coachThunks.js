import { setCoaches } from "../actions/coachActions";

export const getCoaches = () => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/coaches")
      .then(res => res.json())
      .then(coaches => dispatch(setCoaches(coaches)));
  };
};

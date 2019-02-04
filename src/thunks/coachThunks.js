export const getCoaches = () => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/coaches");
  };
};

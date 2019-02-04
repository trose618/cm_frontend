export const handleSubmit = userInfo => ({
  type: "LOGIN_USER",
  payload: userInfo
});

export const setCurrentUser = userInfo => ({
  type: "SET_USER",
  payload: userInfo
});

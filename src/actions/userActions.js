export const handleSubmit = userInfo => ({
  type: "LOGIN_USER",
  payload: userInfo
});

export const setCurrentUser = userInfo => ({
  type: "SET_USER",
  payload: userInfo
});

export const selectCoach = coachInfo => ({
  type: "SET_SELECTED_COACH",
  payload: coachInfo
});

export const submitLesson = lessonData => {
  return {
    type: "NEW_LESSON",
    payload: lessonData.lesson
  };
};

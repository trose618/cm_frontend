export const handleLogin = (user, path) => {
  return function(dispatch) {
    //alert(`http://localhost:3000/api/v1/${path}`);
    return fetch(`http://localhost:3000/api/v1/${path}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        user: {
          username: user.username,
          password: user.password,
          client: user.client
        }
      })
    });
  };
};

export const handleNewLesson = (coach_id, client_id, lesson) => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/lessons", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        lesson: {
          client_level: lesson.client_level,
          client_name: lesson.client_name,
          lesson_focus: lesson.lesson_focus,
          client_email: lesson.client_email,
          coach_id: coach_id,
          client_id: client_id,
          lesson_date: lesson.lesson_date,
          client_age: lesson.client_age,
          accepted: false
        }
      })
    });
  };
};

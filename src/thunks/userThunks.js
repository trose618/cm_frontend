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

export const handleUserDelete = id => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        dispatch({
          type: "DELETE_USER",
          payload: id
        });
      });
  };
};

export const handleUpdateUser = (id, state) => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        user: {
          username: state.username,
          bio: state.bio,
          image_url: state.image_url
        }
      })
    })
      .then(res => res.json())
      .then(data => dispatch({ type: "UPDATE_USER", payload: data.user }));
  };
};
export const handleUpdateImage = (id, image) => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        image_url: image
      })
    })
      .then(res => res.json())
      .then(console.log);
  };
};
export const handleUpdateBio = (id, bio) => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        bio: bio
      })
    })
      .then(res => res.json())
      .then(console.log);
  };
};

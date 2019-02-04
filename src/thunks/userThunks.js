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

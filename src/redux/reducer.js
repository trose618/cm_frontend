const initialState = {
  currentUser: { username: "", password: "" },
  coaches: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        currentUser: action.payload
      };

    case "SIGNUP_USER":
      return {
        ...state,
        currentUser: action.payload
      };

    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        currentUser: { username: "test", password: "test" }
        // localStorage.removeItem("token");
        // this.setState({ currentUser: {} }, () => this.props.history.push("/login"));
      };

    case "SET_USER":
      return {
        ...state,
        currentUser: action.payload
      };

    case "SET_COACHES":
      return {
        ...state,
        coaches: action.payload
      };
    default:
      return state;
  }
};

export default reducer;

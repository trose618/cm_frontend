const initialState = {
  currentUser: {
    username: "",
    password: "",
    image_url: ""
  },
  coaches: [],
  selected_coach: false
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
        currentUser: { username: "", password: "" },
        selected_coach: false
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

    case "SET_SELECTED_COACH":
      return {
        ...state,
        selected_coach: action.payload
      };
    default:
      return state;
  }
};

export default reducer;

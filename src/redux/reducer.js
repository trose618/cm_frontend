const initialState = {
  currentUser: false,
  coaches: [],
  lessons: [],
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
        currentUser: false,
        selected_coach: false,
        lessons: [],
        coaches: []
        // localStorage.removeItem("token");
        // this.setState({ currentUser: {} }, () => this.props.history.push("/login"));
      };
    case "NEW_LESSON":
      let newLessons = [...state.lessons];
      newLessons.push(action.payload);
      //let updatedLesson = state.lessons.push(action.payload);
      return {
        ...state,
        lessons: newLessons
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

    case "SET_LESSONS":
      return {
        ...state,
        lessons: action.payload
      };

    case "SET_SELECTED_COACH":
      return {
        ...state,
        selected_coach: action.payload
      };

    case "ACCEPT_LESSON":
      let newArr = [...state.lessons];
      newArr = newArr.filter(lesson => {
        return lesson.id !== action.payload.id;
      });
      return {
        ...state,
        lessons: newArr
      };

    case "DECLINE_LESSON":
      let neArr = [...state.lessons];
      neArr = neArr.filter(lesson => {
        return lesson.id !== action.payload;
      });
      return {
        ...state,
        lessons: neArr
      };
    default:
      return state;
  }
};

export default reducer;

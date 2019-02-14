const initialState = {
  currentUser: false,
  coaches: [],
  lessons: [],
  selected_coach: false,
  toggleChatInterface: false,
  conversations: [],
  activeConversation: false,
  confirmed_lessons: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CONFIRMED_LESSONS":
      return {
        ...state,
        confirmed_lessons: action.payload
      };
    case "RECEIVED_CONVO":
      console.log("reducer recieved convo");
      return {
        ...state,
        conversations: [...state.conversations, action.payload]
      };

    case "RECEIVED_MESSAGE":
      return {
        ...state,
        conversations: action.payload
      };
    case "SET_CURRENT_CONVO":
      return {
        ...state,
        activeConversation: action.payload
      };
    case "LOAD_CONVOS":
      return {
        ...state,
        conversations: action.payload
      };
    case "TOGGLE_CHAT":
      return {
        ...state,
        toggleChatInterface: !state.toggleChatInterface
      };
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
        coaches: [],
        conversations: [],
        toggleChatInterface: false,
        activeConversation: false,
        confirmed_lessons: []
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
      newArr = newArr.map(lesson => {
        if (lesson.id === action.payload.id) {
          lesson = action.payload;
        }
        return lesson;
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

    case "UPDATE_USER":
      return {
        ...state,
        currentUser: action.payload
      };

    case "DELETE_USER":
      localStorage.removeItem("token");
      return {
        ...state,
        currentUser: false,
        selected_coach: false,
        lessons: [],
        coaches: []
      };

    default:
      return state;
  }
};

export default reducer;

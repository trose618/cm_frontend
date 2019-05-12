import React from "react";
import { ActionCableConsumer } from "react-actioncable-provider";
import MessagesArea from "./MessagesArea";
import { connect } from "react-redux";
import { getConvos } from "../thunks/userThunks";
import ChatConnection from "./ChatConnection";

// let connection = new ChatConnection(1, handleReceivedMessage);

class ConversationsList extends React.Component {
  componentDidMount() {
    if (this.connection) {
      this.connection.disconnect();
      this.connection = null;
    }
    const that = this;
    this.connection = new ChatConnection(
      that.props.user.id,
      that.handleReceivedMessage
    );
    // this.connection.senderId = this.props.user.id;
    // this.connection.callback = this.handleData;

    if (this.props.activeConversation !== false) {
      this.connection.openNewRoom(this.props.activeConversation);
    }
  }

  handleMessageReceived = response => {
    this.handleReceivedMessage(response);
  };

  handleReceivedData(data) {
    console.log("I'm getting called");
    this.handleReceivedMessage(data);
  }

  handleCloseActiveConvo = () => {
    this.props.handleClick(false);
  };

  handleClick = id => {
    this.props.handleClick(id);
  };

  componentWillUnmount() {
    this.connection.disconnect();
    this.connection = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeConversation === false) {
      this.connection.disconnect();
    } else if (!this.props.activeConversation) {
      if (nextProps.activeConversation) {
        console.log("no previous opened convo, but opening convo");

        this.connection.openNewRoom(nextProps.activeConversation);
      }
    } else if (this.props.activeConversation) {
      if (nextProps.activeConversation) {
        console.log("if switching between convos");
        let rooms = this.connection.roomConnections.map(room => room.roomId);
        if (!rooms.includes(nextProps.activeConversation)) {
          this.connection.openNewRoom(nextProps.activeConversation);
        }
      }
    }
  }

  handleReceivedConversation = response => {
    alert("New convo");
    const { conversation } = response;
    //comment out everything above
    this.props.handleReceivedConversation(conversation);
  };

  handleReceivedMessage = response => {
    console.log("the response", response);
    const { content } = response;
    console.log("this is the 'new' message: ", content);
    const conversations = [...this.props.conversations];
    let conversation = this.props.conversations.find(
      conversation => conversation.id === response.room_id
    );

    //for some reason, newly created convos don't come with .messages defined, 
    //only after reloading the page
    if (!conversation.messages) {
      conversation.messages = []
    }
    conversation.messages = [
      ...conversation.messages,
      {
        id: response.message_id,
        conversation_id: response.room_id,
        user_id: response.sender,
        created_at: response.created_at,
        text: content
      }
    ];

    this.props.handleReceivedMessage(conversations);
  };

  sendMessage = message => {
    this.connection.talk(message, this.props.activeConversation);
  };

  render = () => {
    const { conversations, activeConversation } = this.props;

    return (
      <div className="conversation-main">
        <div className="conversationsList">
          <h2>Conversations</h2>
          <div>{mapConversations(conversations, this.handleClick)}</div>
        </div>

        {activeConversation ? (
          //this div is strictly for moving the location of the chatbox
          <div className="messagesArea">
            <MessagesArea
              handleSendMessage={this.sendMessage}
              conversation={findActiveConversation(
                conversations,
                activeConversation
              )}
              messages={
                findActiveConversation(conversations, activeConversation)
                  .messages
              }
              closeConvo={this.handleCloseActiveConvo}
            />
          </div>
        ) : null}
      </div>
    );
  };
}

// helpers

const findActiveConversation = (conversations, activeConversation) => {

  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick) => {
  return conversations.map(conversation => {
    return (
      <div
        key={conversation.id}
        className=""
        onClick={() => handleClick(conversation.id)}
        style={{ marginBottom: "1vh" }}
      >
        <span className="convo-title" style={{ opacity: "1" }}>
          {conversation.title}
        </span>
      </div>
    );
  });
};

const mapStateToProps = state => {
  console.log(state);
  return {
    conversations: state.conversations,
    activeConversation: state.activeConversation,
    toggleChatInterface: state.toggleChatInterface,
    user: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getConvos: () => {
      dispatch(getConvos());
    },
    handleClick: id => {
      dispatch({ type: "SET_CURRENT_CONVO", payload: id });
    },
    handleReceivedConversation: convo => {
      dispatch({ type: "RECEIVED_CONVO", payload: convo });
    },
    handleReceivedMessage: convos => {
      dispatch({ type: "RECEIVED_MESSAGE", payload: convos });
    },
    uploadImportedConvosToReducer: convos => {
      dispatch({ type: "LOAD_CONVOS", payload: convos });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationsList);

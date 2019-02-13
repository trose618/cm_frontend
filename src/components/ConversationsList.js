import React from "react";
import { ActionCableConsumer } from "react-actioncable-provider";
import MessagesArea from "./MessagesArea";
import Cable from "./Cable";
import { connect } from "react-redux";
import { getConvos } from "../thunks/userThunks";

class ConversationsList extends React.Component {
  state = {
    conversations: [],
    activeConversation: null
  };

  componentDidMount() {
    this.props.getConvos();
  }

  handleCloseActiveConvo = () => {
    this.props.handleClick(null);
  };

  handleClick = id => {
    //comment out everythign above
    this.props.handleClick(id);
  };

  handleReceivedConversation = response => {
    alert("New convo");
    const { conversation } = response;
    //comment out everything above
    this.props.handleReceivedConversation(conversation);
  };

  handleReceivedMessage = response => {
    console.log("the response", response);
    const { message } = response;
    console.log("this is the 'new' message: ", message);
    const conversations = [...this.props.conversations];
    let conversation = this.props.conversations.find(
      conversation => conversation.id === message.conversation_id
    );

    conversation.messages = [...conversation.messages, message];

    this.props.handleReceivedMessage(conversations);
  };

  render = () => {
    const { conversations, activeConversation } = this.props;

    return (
      <div className="conversation-main">
        <div className="conversationsList">
          <ActionCableConsumer
            channel={{ channel: "ConversationsChannel" }}
            onReceived={this.handleReceivedConversation}
          />
          {this.props.conversations.length ? (
            <Cable
              conversations={conversations}
              handleReceivedMessage={this.handleReceivedMessage}
            />
          ) : null}

          <h2>Conversations</h2>
          <div>{mapConversations(conversations, this.handleClick)}</div>
        </div>

        {activeConversation ? (
          //this div is strictly for moving the location of the chatbox
          <div className="messagesArea">
            <MessagesArea
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
      >
        {conversation.title}
      </div>
    );
  });
};

const mapStateToProps = state => {
  return {
    conversations: state.conversations,
    activeConversation: state.activeConversation,
    toggleChatInterface: state.toggleChatInterface
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

import React from "react";
import { ActionCable } from "react-actioncable-provider";
import { API_ROOT } from "../constants";
import NewConversationForm from "./NewConversationForm";
import MessagesArea from "./MessagesArea";
import Cable from "./Cable";
import { connect } from "react-redux";

class ConversationsList extends React.Component {
  state = {
    conversations: [],
    activeConversation: null
  };

  componentDidMount = () => {
    fetch(`${API_ROOT}/user_convos`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(conversations => {
        this.setState({ conversations });
        this.props.loadConvos(conversations);
      });
  };

  handleCloseActiveConvo = () => {
    this.setState({ activeConversation: null });
  };

  handleClick = id => {
    this.setState({ activeConversation: id });

    //comment out everythign above
    this.props.handleClick(id);
  };

  handleReceivedConversation = response => {
    alert("New convo");
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation]
    });

    //comment out everything above
    this.props.handleReceivedConversation(conversation);
  };

  handleReceivedMessage = response => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    this.setState({ conversations });

    //comment out everything above
    //this.props.handleReceivedMessage(conversation);
  };

  render = () => {
    const { conversations, activeConversation } = this.state;
    return (
      <div className="conversation-main">
        <div className="conversationsList">
          <ActionCable
            channel={{ channel: "ConversationsChannel" }}
            onReceived={this.handleReceivedConversation}
          />
          {this.state.conversations.length ? (
            <Cable
              conversations={conversations}
              handleReceivedMessage={this.handleReceivedMessage}
            />
          ) : null}

          <h2>Conversations</h2>
          <div>{mapConversations(conversations, this.handleClick)}</div>
          {/* <NewConversationForm /> */}
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

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    loadConvos: convos => {
      dispatch({ type: "LOAD_CONVOS", payload: convos });
    },
    handleClick: id => {
      dispatch({ type: "SET_CURRENT_CONVO", payload: id });
    },
    handleReceivedConversation: convo => {
      dispatch({ type: "RECEIVE_CONVO", payload: convo });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationsList);

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

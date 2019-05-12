import React from "react";
import NewMessageForm from "./NewMessageForm";
import { connect } from "react-redux";
import ActionCable from "actioncable"
import ChatConnection from "./ChatConnection";

//this component displays actual chat box with a conversation.
//should create the socket connection
class MessagesArea extends React.Component {

  handleCloseConvo = () => {
    this.props.handleClick(false)
  }

  handleSendMessage = message => {

    alert(message)
  }

  handleReceivedMessages = () => {
    alert("message received")
  }

  componentDidMount() {

    //if there is an active conversation, create a connection to channel
    if (this.props.activeConversation !== false) {
      this.connection = new ChatConnection(this.props.userId, this.handleReceivedMessages)
      this.connection.openNewRoom(this.props.activeConversation)
      // debugger;
    }
  }

  componentWillUnmount() {
    // alert("closing chat")

    this.connection.disconnect();
    // this.connection = null;
    debugger;
  }




  render() {

    //stopped using closeConvo function passed down from parent component
    const {
      conversation: { id, title },
      userId,
      messages,
      closeConvo,
      handleSendMessage
    } = this.props;

    return (
      <div className="messagesAreaInside">
        <span className="close-convo-button" onClick={this.handleCloseConvo}>
          x
          </span>
        <div className="chat-title">
          <h3>{title}</h3>
        </div>
        <div className="messagesdisplay">
          <div>{messages ? orderedMessages(messages, userId) : null} </div>
        </div>

        <div className="new-message-form">
          <NewMessageForm
            handleSendMessage={this.handleSendMessage}
            conversation_id={id}
            user_id={userId}
          />
        </div>
      </div>
    );

  }
}


const mapStateToProps = state => {
  return {
    userId: state.currentUser.id,
    activeConversation: state.activeConversation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClick: id => {
      dispatch({ type: "SET_CURRENT_CONVO", payload: id });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesArea);

// helpers

const formattedTime = datetime => {
  let date = new Date(datetime);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

const orderedMessages = (messages, userId) => {
  let sortedMessages = messages

  console.log(sortedMessages);

  if (sortedMessages) {
    sortedMessages = messages.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
  }
  return sortedMessages.map(message => {
    return (
      <div className="message" key={message.id * Math.random() * 100}>
        <div
          style={{
            backgroundColor: message.user_id === userId ? "aqua" : "yellow"
          }}
        >
          {message.text} <br />
          {formattedTime(message.created_at)}
        </div>
      </div>
    );
  });
};

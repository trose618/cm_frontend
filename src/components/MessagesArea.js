import React from "react";
import NewMessageForm from "./NewMessageForm";
import { connect } from "react-redux";

const MessagesArea = ({
  conversation: { id, title },
  userId,
  messages,
  closeConvo,
  handleSendMessage
}) => {
  return (
    <div className="messagesAreaInside">
      <span className="close-convo-button" onClick={closeConvo}>
        x
      </span>
      <div className="chat-title">
        <h3>{title}</h3>
      </div>
      <div className="messagesdisplay">
        <div>{orderedMessages(messages, userId)} </div>
      </div>

      <div className="new-message-form">
        <NewMessageForm
          handleSendMessage={handleSendMessage}
          conversation_id={id}
          user_id={userId}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { userId: state.currentUser.id };
};

export default connect(mapStateToProps)(MessagesArea);

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
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
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

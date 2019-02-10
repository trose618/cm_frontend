import React, { Component } from "react";
import ConversationsList from "./ConversationsList";

class ConversationApp extends Component {
  render() {
    return (
      <div className="conversationApp">
        <ConversationsList />
      </div>
    );
  }
}

export default ConversationApp;

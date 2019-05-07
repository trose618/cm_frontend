import React from "react";
import { API_ROOT, HEADERS } from "../constants";

class NewMessageForm extends React.Component {
  state = {
    text: "",
    conversation_id: this.props.conversation_id,
    user_id: this.props.user_id
  };


  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.handleSendMessage(this.state.text);
    this.setState({ text: "" });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.props.handleSendMessage(this.state.text);
      this.setState({ text: "" });
    }
  };

  render = () => {
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <textarea
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
            style={{ width: "100%" }}
            rows={2}
            placeholder="Type a message..."
            onKeyPress={this.handleKeyPress}
          />
          <br />
          <input type="submit" value="send" />
        </form>
      </div>
    );
  };
}

export default NewMessageForm;

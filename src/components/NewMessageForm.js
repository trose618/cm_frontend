import React from "react";
import { API_ROOT, HEADERS } from "../constants";

class NewMessageForm extends React.Component {
  state = {
    text: "",
    conversation_id: this.props.conversation_id,
    user_id: this.props.user_id
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      conversation_id: nextProps.conversation_id,
      user_id: nextProps.user_id
    });
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    fetch(`${API_ROOT}/messages`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ text: "" });
  };

  render = () => {
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <textarea
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
            cols={30}
            rows={1}
          />
          <input type="submit" value="send" />
        </form>
      </div>
    );
  };
}

export default NewMessageForm;

import React from "react";

class CoachCard extends React.Component {
  render() {
    console.log(this.props);
    return <div>{this.props.username}</div>;
  }
}

export default CoachCard;

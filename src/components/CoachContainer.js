import React from "react";
import { connect } from "react-redux";
import CoachCard from "./CoachCard";

class CoachContainer extends React.Component {
  displayCoaches = () => {
    return this.props.coaches.map(coach => (
      <CoachCard key={coach.id} {...coach} />
    ));
  };

  render() {
    return <div>{this.displayCoaches()}</div>;
  }
}
const mapStateToProps = state => {
  return { coaches: state.coaches };
};
export default connect(mapStateToProps)(CoachContainer);

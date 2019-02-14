import React from "react";
import { connect } from "react-redux";
import MaterialCoachCard from "./MaterialCoachCard";

class CoachContainer extends React.Component {
  displayCoaches = () => {
    return this.props.coaches.map(coach => (
      <div className="lesson-card" key={coach.id}>
        <MaterialCoachCard coach={coach} />
      </div>
    ));
  };

  render() {
    return (
      <div>
        <h1> Pick a Coach</h1>
        <hr style={{ marginTop: "30vh" }} />
        <div className="scrolling-wrapper">{this.displayCoaches()}</div>
        <hr />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { coaches: state.coaches };
};
export default connect(mapStateToProps)(CoachContainer);

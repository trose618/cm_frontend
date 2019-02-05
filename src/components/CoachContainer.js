import React from "react";
import { connect } from "react-redux";
import MaterialCoachCard from "./MaterialCoachCard";

class CoachContainer extends React.Component {
  displayCoaches = () => {
    return this.props.coaches.map(coach => (
      <MaterialCoachCard key={coach.id} coach={coach} />
    ));
  };

  render() {
    return (
      <div className="ui grid cards coach-container">
        {this.displayCoaches()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { coaches: state.coaches };
};
export default connect(mapStateToProps)(CoachContainer);

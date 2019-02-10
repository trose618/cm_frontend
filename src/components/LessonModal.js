import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { handleNewLesson } from "../thunks/userThunks";
import { connect } from "react-redux";
import { submitLesson } from "../actions/userActions";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});

class SimpleModal extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleFormSubmit = () => {
    alert("Lesson booked!");
    this.setState({ open: false });
    this.props.handleFormSubmit(
      this.props.coach_id,
      this.props.client_id,
      this.state
    );
  };

  handleFormInput = e => {
    // console.log(e.target);
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen}>Book Lesson</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Book a Lesson
            </Typography>
            Enter date and time of lesson
            <input
              type="datetime-local"
              name="lesson_date"
              max="2019-3-4"
              min="2019-2-5"
              onChange={this.handleFormInput}
            />
            <br />
            Age
            <input
              type="number"
              name="client_age"
              min="3"
              max="100"
              onChange={this.handleFormInput}
            />
            <br />
            Experience Level
            <select name="client_level" onChange={this.handleFormInput}>
              <option>3.0</option>
              <option>3.5</option>
              <option>4.0</option>
              <option>4.5</option>
              <option>5.0</option>
              <option>5.5</option>
              <option>6.0/Pro</option>
            </select>
            <br />
            Lesson Focus
            <br />
            <textarea
              name="lesson_focus"
              value={this.state.lesson_focus}
              rows="5"
              cols="45"
              onChange={this.handleFormInput}
            />
            <br />
            Your name
            <input
              name="client_name"
              type="text"
              value={this.state.client_name}
              onChange={this.handleFormInput}
            />
            <br />
            Email
            <input
              name="client_email"
              type="email"
              value={this.state.client_email}
              onChange={this.handleFormInput}
            />
            <br />
            <div className="ui button" onClick={this.handleFormSubmit}>
              Submit Lesson
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    coach_id: state.selected_coach.id,
    client_id: state.currentUser.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleFormSubmit: (coach, client, lesson) =>
      dispatch(handleNewLesson(coach, client, lesson))
        .then(res => res.json())
        .then(lesson => {
          console.log("being reached");
          dispatch(submitLesson(lesson));
        })
    //lesson => submitLesson(lesson)
  };
};

// We need an intermediary variable for handling the recursive nesting.
const LessonModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SimpleModal));

export default LessonModal;

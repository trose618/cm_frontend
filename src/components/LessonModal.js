import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

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
    open: false,
    lesson: {
      name: "",
      details: ""
    }
  };

  handleClick = () => {
    alert("Lesson booked!");
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
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
            Enter date of lesson
            <input type="date" name="lesson" max="2019-3-4" min="2019-2-5" />
            <br />
            Enter time of lessons
            <input type="time" name="lesson_time" />
            <br />
            Your name
            <input type="text" value={this.state.lesson.name} />
            <br />
            Age
            <input type="number" name="Age" min="3" max="100" />
            <br />
            Experience Level
            <select>
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
              name="details"
              value={this.state.lesson.details}
              rows="5"
              cols="45"
            />
            <br />
            <div className="ui button" onClick={this.handleClick}>
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

// We need an intermediary variable for handling the recursive nesting.
const LessonModal = withStyles(styles)(SimpleModal);

export default LessonModal;

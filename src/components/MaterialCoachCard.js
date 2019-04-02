import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { selectCoach } from "../actions/userActions";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};

function MaterialCoachCard(props) {
  const { classes } = props;
  const default_image = `https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1-744x744.jpg`;

  const handleClick = () => {
    props.handleLoadProfile(props.coach);
    props.history.push("/coachProfile");
  };

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={handleClick}>
        {/* <CardMedia
          className={classes.media}
          image={props.coach.image_url ? props.coach.image_url : default_image}
          title="Contemplative Reptile"
        /> */}
        <img
          className="coach-card-pic"
          alt=""
          src={props.coach.image_url ? props.coach.image_url : default_image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.coach.username}
          </Typography>
          <Typography>Rating: 5-Stars</Typography>
          <Typography component="p">{props.coach.bio}</Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
         <Button size="small" color="primary" onClick={handleClick}>
          Profile
        </Button>

        <Button size="small" color="primary">
          Message
        </Button>

        <Button size="small" color="primary">
          Lesson
        </Button> 
      </CardActions> */}
    </Card>
  );
}

MaterialCoachCard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    handleLoadProfile: props => dispatch(selectCoach(props))
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(withStyles(styles)(MaterialCoachCard))
);

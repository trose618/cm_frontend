import React from "react";

class CoachCard extends React.Component {
  render() {
    const default_image = `https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1-744x744.jpg`;

    return (
      <div className="ui card coach-card">
        <img
          alt=""
          src={this.props.image_url ? this.props.image_url : default_image}
        />
        <br />
        Rating:
        <br />
        {this.props.username}
      </div>
    );
  }
}

CoachCard.defaultProps = {
  image_url: `https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1-744x744.jpg`
};

export default CoachCard;

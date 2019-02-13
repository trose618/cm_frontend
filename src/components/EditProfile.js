import React, { Component } from "react";
import { connect } from "react-redux";
import { handleUserDelete } from "../thunks/userThunks";
import { handleUpdateUser } from "../thunks/userThunks";

class EditProfile extends Component {
  state = {
    imageShowEdit: false,
    imageEdit: false,
    usernameEdit: false,
    bioEdit: false,
    username: this.props.username,
    image_url: this.props.image_url,
    bio: !!this.props.bio ? this.props.bio : "no bio"
  };

  handleNameClick = () => {
    console.log(this.state.bio);
    console.log(`update with ${this.state.username}`);
    this.setState({ usernameEdit: !this.state.usernameEdit });
    this.props.handleUserUpdate(this.props.id, this.state);
  };

  handleImageClick = () => {
    console.log(`update with ${this.state.image_url}`);
    this.setState({ imageEdit: !this.state.imageEdit });
    this.props.handleUserUpdate(this.props.id, this.state);
  };

  handleBioClick = () => {
    console.log(`update with ${this.state.bio}`);
    this.setState({ bioEdit: !this.state.bioEdit });
    this.props.handleUserUpdate(this.props.id, this.state);
  };

  handleMouseEnter = () => {
    console.log("hovering");
    this.setState({ imageShowEdit: true });
  };

  handleMouseLeave = () => {
    console.log("Leavig");
    this.setState({ imageShowEdit: false });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleImageEdit = () => {
    this.setState({ imageEdit: !this.state.imageEdit });
  };

  handleBioEdit = () => {
    this.setState({ bioEdit: !this.state.bioEdit });
  };

  handleUsernameEdit = () => {
    this.setState({ usernameEdit: !this.state.usernameEdit });
  };

  handleDeleteClick = () => {
    alert("Deleting Profile. You will be taken to the sign up screen.");
    this.props.handleDelete(this.props.id);
  };

  componentDidMount() {
    console.log("props ", this.props);
    this.setState({
      username: this.props.username,
      image_url: this.props.image_url,
      bio: this.props.bio
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      username: nextProps.username,
      image_url: nextProps.image_url,
      bio: nextProps.bio
    });
  }

  render() {
    console.log(this.state.image_url);
    const default_image = `https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1-744x744.jpg`;

    return (
      <div style={{ width: "100%", height: "auto", position: "relative" }}>
        <h2>Edit Profile</h2>
        <div>
          <div>
            <div
              onMouseOver={this.handleMouseEnter}
              onMouseOut={this.handleMouseLeave}
              style={{ marginLeft: "35%", width: "30%" }}
            >
              <img
                style={{ width: "100%" }}
                alt=""
                src={
                  this.props.image_url ? this.props.image_url : default_image
                }
              />
              <div
                style={{ display: this.state.imageShowEdit ? "block" : "none" }}
                className="image-edit-button"
              >
                <span className="ui button" onClick={this.handleImageEdit}>
                  Edit
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="edit-profile-info">
              <div>
                <div
                  style={{ display: this.state.imageEdit ? "block" : "none" }}
                >
                  <input
                    type="text"
                    value={this.state.image_url}
                    name="image_url"
                    onChange={this.handleChange}
                  />
                  <span className="ui button" onClick={this.handleImageClick}>
                    Submit
                  </span>
                  <hr />
                </div>
              </div>

              <div>
                <span>Name: </span> {this.props.username}
                <br />
                <span onClick={this.handleUsernameEdit}>Edit</span>
                <br />
                <div
                  style={{
                    display: this.state.usernameEdit ? "block" : "none"
                  }}
                >
                  <input
                    type="text"
                    value={this.state.username}
                    name="username"
                    onChange={this.handleChange}
                  />
                  <span className="ui button" onClick={this.handleNameClick}>
                    Submit
                  </span>
                </div>
              </div>
              <hr />
              <div>
                <span>Bio: </span> {this.props.bio} <br />
                <span onClick={this.handleBioEdit}>Edit</span>
                <br />
                <div style={{ display: this.state.bioEdit ? "block" : "none" }}>
                  <input
                    type="text"
                    value={this.state.bio}
                    name="bio"
                    onChange={this.handleChange}
                  />
                  <span className="ui button" onClick={this.handleBioClick}>
                    Submit
                  </span>
                </div>
              </div>
              <hr />
              <div>
                <span
                  onClick={this.handleDeleteClick}
                  className="ui red button"
                >
                  Delete My Profile
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.currentUser };
};

const mapDispatchToProps = dispatch => {
  return {
    handleDelete: id => dispatch(handleUserDelete(id)),
    handleUserUpdate: (id, state) => dispatch(handleUpdateUser(id, state))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);

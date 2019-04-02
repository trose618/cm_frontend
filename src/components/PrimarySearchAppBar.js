import React, { Fragment } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    LeftAnchorEl: null,
    mobileMoreAnchorEl: null,
    signedInUser: {}
  };

  handleLogout = () => {
    this.handleMenuClose();
    this.props.handleLogout();
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMessagesClick = () => {
    this.setState({ anchorEl: null }, () => {
      this.setState({ mobileMoreAnchorEl: null }, () => {
        this.props.toggleMessageInterface();
      });
    });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleMyAccount = () => {
    this.setState({ anchorEl: null }, () => {
      this.setState({ mobileMoreAnchorEl: null }, () => {
        this.props.history.push("/editProfile");
      });
    });
  };

  handleCoaches = () => {
    this.setState({ anchorEl: null }, () => {
      this.setState({ mobileMoreAnchorEl: null }, () => {
        this.props.history.push("/coaches");
      });
    });
  };

  handleProfile = () => {
    this.setState({ anchorEl: null }, () => {
      this.setState({ mobileMoreAnchorEl: null }, () => {
        this.props.history.push("/profile");
      });
    });
  };

  handlePendingClick = () => {
    this.props.history.push("/pendingLessons");
  };

  render() {
    //console.log("props in navBar", this.props);
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    // LeftAnchorEl ^^
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    // const isLeftMenuOpen = Boolean(LeftAnchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const pendingLessons = this.props.lessons.filter(lesson => {
      if (this.props.currentUser.client) {
        return lesson.checked === false;
      } else {
        return lesson.accepted === false;
      }
    });

    const pendingCount = pendingLessons.length;

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleProfile}>Profile</MenuItem>
        <MenuItem onClick={this.handleMyAccount}>My account</MenuItem>
        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
      </Menu>
    );

    // const renderLeftMenu = (
    //   <Menu
    //     anchorEl={anchorEl}
    //     anchorOrigin={{ vertical: "top", horizontal: "right" }}
    //     transformOrigin={{ vertical: "top", horizontal: "right" }}
    //     open={isLeftMenuOpen}
    //     onClose={this.handleMenuClose}
    //   >
    //     <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
    //     <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
    //     <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
    //   </Menu>
    // );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit" onClick={this.handleMessagesClick}>
            <Badge badgeContent={0} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handlePendingClick}>
          <IconButton color="inherit">
            <Badge badgeContent={pendingCount} color="secondary">
              <Link to="/pendingLessons">Lessons</Link>
            </Badge>
          </IconButton>
          <p>Pending Requests</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            {/* <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton> */}

            <Badge style={{ paddingRight: "1vw" }}>
              <Link style={{}} to="/profile">
                Coach-Me
                </Link>
            </Badge>


            <Badge style={{ paddingRight: "1vw" }}>
              <Link to="/coaches">Coaches</Link>
            </Badge>

            <Badge badgeContent={pendingCount} color="secondary" style={{ paddingRight: "1vw" }}>
              <Link to="/pendingLessons">Lessons</Link>
            </Badge>

            {/* <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div> */}
            <div className={classes.grow} />

            <div className={classes.sectionDesktop}>
              {localStorage.getItem("token") ? (
                <div>
                  {this.props.currentUser ? <Badge>
                    <Link style={{}} to="/profile">
                      {this.props.currentUser.username}
                    </Link>
                  </Badge> : null}
                  <IconButton
                    color="inherit"
                    onClick={this.handleMessagesClick}
                  >
                    <Badge badgeContent={0} color="secondary">
                      <MailIcon />
                    </Badge>
                  </IconButton>

                  <IconButton
                    aria-owns={isMenuOpen ? "material-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </div>
              ) : (
                  <Fragment>
                    <Link to={"/signUp"}>Sign Up</Link>
                    <Link to={"/login"}>Login</Link>
                  </Fragment>
                )}
            </div>
            <div className={classes.sectionMobile}>
              {localStorage.getItem("token") ? (
                <IconButton
                  aria-haspopup="true"
                  onClick={this.handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              ) : (
                  <Fragment>
                    <Link to={"/signUp"}>Sign Up</Link>
                    <Link to={"/login"}>Login</Link>
                  </Fragment>
                )}
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
        {/* {renderLeftMenu} */}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  //console.log(state);
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogout: () => dispatch({ type: "LOGOUT" }),
    toggleMessageInterface: () => dispatch({ type: "TOGGLE_CHAT" })
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(PrimarySearchAppBar))
);

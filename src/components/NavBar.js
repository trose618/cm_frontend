import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class NavBar extends Component {
    state = {
        signedInUser: false,
        lessonAlert: false,
        openMenu: false
    }

    handleLogout = () => {
        this.setState({ openMenu: false })
        this.props.handleLogout();
    };

    handleMenuClick = () => {
        this.setState({ openMenu: !this.state.openMenu })
    }

    handleMouseEnter = () => {
        this.setState({ openMenu: true })
    }

    handleMouseLeave = () => {
        this.setState({ openMenu: false })
    }

    handleMessagesClick = () => {

        this.props.toggleMessageInterface();

    };

    render() {

        // variable checked to determine what components to display
        const loggedIn = !!this.props.currentUser

        const pendingLessons = this.props.lessons.filter(lesson => {
            if (this.props.currentUser.client) {
                return lesson.checked === false;
            } else {
                return lesson.accepted === false;
            }
        });
        // variable used to check if action is required regarding a lesson
        const pendingCount = pendingLessons.length;

        return (
            <div className="main-nav-div">
                <div style={{ width: "100%", position: "relative", height: "auto" }}>
                    <div className="nav-left">

                        <a href="coaches"><span>Coaches</span></a>

                        <span style={{ position: "relative" }}>
                            <a href="pendingLessons"><span>Lessons</span>{pendingCount ? (<i className="fas fa-exclamation lesson-alert"></i>) : null}</a>
                        </span>

                        <a href="calendar"><span>Calendar</span></a>
                    </div>
                    {loggedIn ? (<div className="nav-right">

                        <a href="/profile">{this.props.currentUser.username}</a>

                        <span style={{ position: "relative" }}>
                            <i className="fas fa-comment-dots menu" onClick={this.handleMessagesClick}></i>

                            {/* do this when you figure out new messages channel in ruby <i className="fas fa-exclamation message-alert"></i> */}
                        </span>


                        <span className="icon-div" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                            <i className="fas fa-user menu" onClick={this.handleMenuClick}></i>
                            <div style={this.state.openMenu ? ({ display: "block" }) : ({ display: "none" })}>
                                <div className="main-menubox-div">
                                    <a href="profile">My Profile</a>
                                    <hr />
                                    <a href="editProfile">Settings</a>
                                    <hr />
                                    <a href="login" onClick={this.handleLogout}>Sign Out</a>
                                </div>
                            </div>
                        </span>


                    </div>) : (<div className="nav-right"><a href="/signup"><span>Sign Up</span></a><a href="/login"><span>Log In</span></a></div>)}
                </div>

            </div >
        )
    }
}

const mapStateToProps = state => {
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
    )(NavBar));

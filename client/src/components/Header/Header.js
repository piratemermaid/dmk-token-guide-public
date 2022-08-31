import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
    signOut,
    toggleWorkMode,
    toggleNightMode
} from "../../redux/actions/appState";
import { useUser } from "../../hooks/user";
import { useEvent } from "../../hooks/event";
import ROUTES from "../Router/routes";
import "./Header.scss";

const Header = (props) => {
    const { authenticated, workMode, nightMode } = props.appState;

    const user = useUser();
    const event = useEvent();

    function getLink(url) {
        if (url === "account") {
            return authenticated ? (
                <Link to="/login" onClick={() => props.signOut()}>
                    Logout
                </Link>
            ) : (
                <Link to="/login">Login</Link>
            );
        }

        let text;
        switch (url) {
            case ROUTES.TASK_GUIDE:
                text = "Task Guide";
                break;
            case ROUTES.ATTRACTION_GUIDE:
                text = "Attraction Guide";
                break;
            case ROUTES.MANAGE_COLLECTION:
                text = "My Collection";
                break;
            case ROUTES.LEVELING:
                text = "Leveling";
                break;
            case ROUTES.TOWER_EVENT:
                text = "Tower Events";
                break;
            case ROUTES.EVENT:
                text =
                    event?.type === "Regular"
                        ? `${event?.name} Event`
                        : "Event";
                break;
            case ROUTES.STRIKING_GOLD:
                text = "Striking Gold";
                break;
            case ROUTES.ACCOUNT:
                text = "My Account";
                break;
            case ROUTES.ABOUT:
                text = "About";
                break;
            case ROUTES.DEV_NOTES:
                text = "Dev Notes";
                break;
            case ROUTES.GENERATOR:
                text = "Generator";
                break;
            default:
                text = "Token Guide";
                break;
        }
        return (
            <Link className={getLinkClass(url)} to={url}>
                {text}
            </Link>
        );
    }

    function getLinkClass(url) {
        if (props.history.location.pathname === "/options") {
            return "";
        } else if (props.history.location.pathname === url) {
            return "active";
        } else {
            return "";
        }
    }

    let color;
    nightMode ? (color = "grey darken-2") : (color = "deep-purple lighten-2");
    return (
        <div id="header">
            <ul
                id="dropdown-guides"
                className="dropdown-content hide-on-small-only"
            >
                <li>{getLink(ROUTES.ROOT)}</li>
                <li>{getLink(ROUTES.TASK_GUIDE)}</li>
                <li>{getLink(ROUTES.ATTRACTION_GUIDE)}</li>
            </ul>
            <ul id="dropdown-collection" className="dropdown-content">
                <li>{getLink(ROUTES.MANAGE_COLLECTION)}</li>
                <li>{getLink(ROUTES.LEVELING)}</li>
                <li>{getLink(ROUTES.ACCOUNT)}</li>
                {user?.admin ? <li>{getLink(ROUTES.GENERATOR)}</li> : null}
            </ul>
            <ul id="dropdown-events" className="dropdown-content">
                <li>{getLink(ROUTES.EVENT)}</li>
                <li>{getLink(ROUTES.TOWER_EVENT)}</li>
                <li>{getLink(ROUTES.STRIKING_GOLD)}</li>
            </ul>
            <ul id="dropdown-about" className="dropdown-content">
                <li>{getLink(ROUTES.ABOUT)}</li>
                <li>{getLink(ROUTES.DEV_NOTES)}</li>
            </ul>
            <nav className={`nav-extended ${color}`}>
                <div className="nav-wrapper">
                    <Link to="/" className={workMode ? "hidden" : "brand-logo"}>
                        DMK Guide
                    </Link>
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <a
                                className="dropdown-trigger"
                                href="#!"
                                data-target="dropdown-guides"
                            >
                                Guides
                                <i className="material-icons right">
                                    arrow_drop_down
                                </i>
                            </a>
                        </li>
                        <li>
                            <a
                                className="dropdown-trigger"
                                href="#!"
                                data-target="dropdown-collection"
                            >
                                My Account
                                <i className="material-icons right">
                                    arrow_drop_down
                                </i>
                            </a>
                        </li>
                        <li>
                            <a
                                className="dropdown-trigger"
                                href="#!"
                                data-target="dropdown-events"
                            >
                                Events
                                <i className="material-icons right">
                                    arrow_drop_down
                                </i>
                            </a>
                        </li>
                        <li>
                            <a
                                className="dropdown-trigger"
                                href="#!"
                                data-target="dropdown-about"
                            >
                                About
                                <i className="material-icons right">
                                    arrow_drop_down
                                </i>
                            </a>
                        </li>
                        <li>{getLink("account")}</li>
                    </ul>
                    <a
                        data-target="header-mobile"
                        className="sidenav-trigger hide-on-large"
                    >
                        <i className="material-icons">menu</i>
                    </a>
                </div>
                <div className="nav-content">
                    <div className="hide-on-med-and-down">
                        <div className="mode-toggles">
                            <div className="switch nightMode-toggle">
                                <label>
                                    Night Mode:
                                    <input
                                        type="checkbox"
                                        checked={nightMode ? "checked" : ""}
                                        onChange={props.toggleNightMode}
                                    />
                                    <span className="lever" />
                                </label>
                            </div>
                            <div className="switch workMode-toggle">
                                <label>
                                    Work Mode:
                                    <input
                                        type="checkbox"
                                        checked={workMode ? "checked" : ""}
                                        onChange={props.toggleWorkMode}
                                    />
                                    <span className="lever" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="hide-on-large-only center">
                        <div className="mode-toggles-s row">
                            <div className="col s6 switch workMode-toggle">
                                <label>
                                    Work Mode:
                                    <input
                                        type="checkbox"
                                        checked={workMode ? "checked" : ""}
                                        onChange={props.toggleWorkMode}
                                    />
                                    <span className="lever" />
                                </label>
                            </div>
                            <div className="col s6 switch nightMode-toggle">
                                <label>
                                    Night Mode:
                                    <input
                                        type="checkbox"
                                        checked={nightMode ? "checked" : ""}
                                        onChange={props.toggleNightMode}
                                    />
                                    <span className="lever" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <ul
                className="sidenav sidenav-close hide-on-large"
                id="header-mobile"
            >
                <li className="link-category">Guides</li>
                <li>{getLink(ROUTES.ROOT)}</li>
                <li>{getLink(ROUTES.TASK_GUIDE)}</li>
                <li>{getLink(ROUTES.ATTRACTION_GUIDE)}</li>
                <li className="divider" />
                <li className="link-category">My Account</li>
                <li>{getLink(ROUTES.MANAGE_COLLECTION)}</li>
                <li>{getLink(ROUTES.LEVELING)}</li>
                <li>{getLink(ROUTES.ACCOUNT)}</li>
                {user?.admin ? <li>{getLink(ROUTES.GENERATOR)}</li> : null}
                <li className="divider" />
                <li className="link-category">Events</li>
                <li>{getLink(ROUTES.EVENT)}</li>
                <li>{getLink(ROUTES.TOWER_EVENT)}</li>
                <li>{getLink(ROUTES.STRIKING_GOLD)}</li>
                <li className="divider" />
                <li className="link-category">About</li>
                <li>{getLink(ROUTES.ABOUT)}</li>
                <li>{getLink(ROUTES.DEV_NOTES)}</li>
                <li>{getLink("account")}</li>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div style={{ display: "hidden", height: "60px" }} />
            </ul>
        </div>
    );
};

function mapStateToProps(state) {
    const { appState } = state;
    return { appState };
}

export default connect(mapStateToProps, {
    signOut,
    toggleWorkMode,
    toggleNightMode
})(withRouter(Header));

/**
 * Home page container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, {Component, PropTypes} from 'react';
import {Media, Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router';
// Self-defined
import {fetchUserIfNeeded} from '../../../actions/user';
import {fetchProjectsIfNeeded} from '../../../actions/projects';
import {fetchUsersIfNeeded} from '../../../actions/users';
import {fetchOrganizationsIfNeeded} from '../../../actions/organizations';
import {getUserIconSource} from '../../../../client/utils/utils';
// Style
import {HomePage as STYLE, ProfileImage as PROFILE_STYLE} from '../../../../client/style';

var IMG_CONTAINER_STYLE = {
    textAlign: "center",
    display: "flex",
    marginTop: "30px"
};

var LINK_STYLE = {
    fontSize: "24px",
    fontWeight: "500",
    color: "#333333",
    textDecoration: "none"
};

export default class HomePage extends Component {

    componentDidMount() {
        const {dispatch} = this.props;

        dispatch(fetchUserIfNeeded());
        dispatch(fetchProjectsIfNeeded());
        dispatch(fetchUsersIfNeeded());
        dispatch(fetchOrganizationsIfNeeded());
    }

    render() {
        const {basePath, projects, user, users} = this.props;

        let numOwnedProjects = user.projects ? Object.keys(user.projects).length : 0,
            numViewableProjects = projects.length,
            numUsers = users.length,
            numOrganizations = user.orgs ? user.orgs.length : 0; // TODO: check for admin

        return (
            <section className="content" style={STYLE.profileBox}>
                <div className="row">
                    <div className="col-sm-10">
                <Jumbotron>
                    <h1>Hello {user._id} !</h1>
                    <Media>
                        <Media.Left>
                            <a href="/" style={LINK_STYLE}>
                                <img width="128" height="128" src="/img/webgme-icon.png" alt="Image"
                                     style={{margin: "5px 10px 10px 10px"}}/>
                            </a>
                        </Media.Left>
                        <Media.Body>
                            <p>You are currently at the profile page for webgme.</p>
                            <p>Here can you view and control the
                                access level of your webgme projects, see what other users are present on this deployment
                                and add them to your organizations.</p>
                            <p>To start using the editor click the icon to the left or go to your project listing
                                and open a specific one.</p>
                        </Media.Body>

                    </Media>
                </Jumbotron>
</div></div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="small-box bg-light-blue">
                            <div className="inner">
                                <h3 style={STYLE.widgetBox}>{numViewableProjects}</h3>
                                <p>Collaborator on Projects</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-cubes"/>
                            </div>
                            <Link to={`${basePath}projects`}
                                  className="small-box-footer">
                                Show Projects <i className="fa fa-arrow-circle-right"/>
                            </Link>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="small-box bg-green">
                            <div className="inner">
                                <h3 style={STYLE.widgetBox}>{numOrganizations}</h3>
                                <p>Membership(s) in Organizations</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-institution"/>
                            </div>
                            <Link to={`${basePath}organizations`}
                                  className="small-box-footer">
                                Show Organizations <i className="fa fa-arrow-circle-right"/>
                            </Link>
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <div className="small-box bg-red">
                            <div className="inner">
                                <h3 style={STYLE.widgetBox}>{numUsers}</h3>
                                <p>Users on the Deployment</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-users"/>
                            </div>
                            <Link to={`${basePath}users`}
                                  className="small-box-footer">
                                Show Users <i className="fa fa-arrow-circle-right"/>
                            </Link>
                        </div>
                    </div>
                </div>


            </section>
        );
    }

}

HomePage.propTypes = {
    basePath: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
};

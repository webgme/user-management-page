/**
 * Home page container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// Self-defined
import { fetchUserIfNeeded } from '../../../actions/user';

const STYLE = {
    profileBox: {
        paddingLeft: "10%",
        paddingRight: "10%"
    },
    profileBoxBorder: {
        margin: "auto",
        padding: "10px 10px",
        width: "40%"
    },
    widgetBox: {
        color: "white"
    }
};

class HomePage extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchUserIfNeeded());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.props.user) {
            const { dispatch } = nextProps;
            dispatch(fetchUserIfNeeded());
        }
    }

    render() {
        const { user } = this.props;
        let numOwnedProjects = user.projects ? Object.keys(user.projects).length : 0,
        // numViewableProjects = TODO: add this after adding project to store
            numOrganizations = user.orgs ? user.orgs.length : 0; // TODO: check for admin

        return (
            <section className="content" style={STYLE.profileBox}>

                <div className="row">
                    <div className="small-box bg-aqua col-sm-6">
                        <div className="inner">
                            <h3 style={STYLE.widgetBox}>{'Fix after store has projects'}</h3>
                            <p>Total Project(s)</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-cubes"/>
                        </div>
                        <Link to={`${this.props.basePath}projects`}
                              className="small-box-footer">
                            Show Projects <i className="fa fa-arrow-circle-right"/>
                        </Link>
                    </div>

                    <div className="small-box bg-red col-sm-6">
                        <div className="inner">
                            <h3 style={STYLE.widgetBox}>{numOrganizations}</h3>
                            <p>Organization Membership(s)</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-institution"/>
                        </div>
                        <Link to={`${this.props.basePath}organizations`}
                              className="small-box-footer">
                            Show Organizations <i className="fa fa-arrow-circle-right"/>
                        </Link>
                    </div>

                </div>

                <div className="box box-primary" style={STYLE.profileBoxBorder}>
                    <div className="box-body box-profile">
                        <img className="profile-user-img img-responsive img-circle"
                             src="/img/gme-logo.png"
                             alt="User profile picture"/>

                        <h3 className="profile-username text-center">&nbsp;{user._id}&nbsp;</h3>

                        <p className="text-muted text-center">WebGME</p>

                        <ul className="list-group list-group-unbordered">
                            <li className="list-group-item">
                                <b>Owned Projects</b> <a className="pull-right">{numOwnedProjects}</a>
                            </li>
                            <li className="list-group-item">
                                <b>Viewable Projects</b> <a className="pull-right">{'Need to fix this'}</a>
                            </li>
                            <li className="list-group-item">
                                <b>Organizations</b> <a className="pull-right">{'Also need to fix this'}</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </section>
        );
    }

}

HomePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    };
};

export default connect(mapStateToProps)(HomePage)
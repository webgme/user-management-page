/**
 * Home & landing page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import Link from 'react-router/lib/Link';
import React from 'react';

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

export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            numOrganizations: 0,
            numProjects: 0,
            user: {}
        };
    }

    componentDidMount() {
        Promise.all([
            this.props.restClient.projects.getAllProjects(),
            this.props.restClient.user.getCurrentUser()
        ])
            .then(([projects, user]) => {
                this.setState({
                    ownedProjects: projects.filter(project => {
                        return project.owner === user._id;
                    }).length,
                    numOrganizations: user.orgs.length,
                    viewableProjects: projects.length,
                    user: user
                });
            });
    }

    render() {
        return <section className="content" style={STYLE.profileBox}>

            <div className="row">
                <div className="small-box bg-aqua col-sm-6">
                    <div className="inner">
                        <h3 style={STYLE.widgetBox}>{this.state.numProjects}</h3>
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
                        <h3 style={STYLE.widgetBox}>{this.state.numOrganizations}</h3>
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

                    <h3 className="profile-username text-center">&nbsp;{this.state.user._id}&nbsp;</h3>

                    <p className="text-muted text-center">WebGME</p>

                    <ul className="list-group list-group-unbordered">
                        <li className="list-group-item">
                            <b>Owned Projects</b> <a className="pull-right">{this.state.ownedProjects}</a>
                        </li>
                        <li className="list-group-item">
                            <b>Viewable Projects</b> <a className="pull-right">{this.state.viewableProjects}</a>
                        </li>
                        <li className="list-group-item">
                            <b>Organizations</b> <a className="pull-right">{this.state.numOrganizations}</a>
                        </li>
                    </ul>
                </div>
            </div>

        </section>;
    }

}

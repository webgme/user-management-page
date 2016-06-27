/**
 * Individual user profile page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import Link from 'react-router/lib/Link';
import React from 'react/lib/React';

const STYLE = {
    profileBox: {
        paddingLeft: "10%",
        paddingRight: "10%"
    },
    profileBoxBorder: {
        borderRadius: "50px",
        margin: "auto",
        padding: "10px 10px",
        width: "40%"
    },
    widgetBox: {
        color: "white"
    }
};

export default class ProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
                    numProjects: projects.length,
                    numOrganizations: user.orgs.length,
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
                    <Link to={`${this.props.routes[0].basePath}projects`}
                          className="small-box-footer">
                        More info <i className="fa fa-arrow-circle-right"/>
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
                    <Link to={`${this.props.routes[0].basePath}organizations`}
                          className="small-box-footer">
                        More info <i className="fa fa-arrow-circle-right"/>
                    </Link>
                </div>

            </div>

            <div className="box box-primary" style={STYLE.profileBoxBorder}>
                <div className="box-body box-profile">

                    <h3 className="profile-username text-center">{this.state.user._id}</h3>

                    <p className="text-muted text-center">WebGME</p>

                    <ul className="list-group list-group-unbordered">
                        <li className="list-group-item">
                            <b>UserID:</b> <a className="pull-right">{this.state.user._id}</a>
                        </li>
                        <li className="list-group-item">
                            <b>Email</b> <a className="pull-right">{this.state.user.email}</a>
                        </li>
                        <li className="list-group-item">
                            <b>Site Admin</b> <a className="pull-right">{this.state.user.siteAdmin ? 'Yes' : 'No'}</a>
                        </li>
                    </ul>

                    {/* <a href="#" className="btn btn-primary btn-block"><b>Update (Coming Soon)</b></a> */}
                </div>
            </div>

        </section>;
    }

}

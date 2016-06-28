/**
 * Home & landing page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import React from 'react/lib/React';

const STYLING = {
    profileBox: {
        paddingLeft: "35%",
        paddingRight: "35%"
    },
    profileBoxBorder: {
        borderRadius: "50px",
        padding: "10px 10px"
    }
};

export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ownedProjects: 0,
            name: '',
            numOrganizations: 0,
            viewableProjects: 0
        };
    }

    componentDidMount() {
        Promise.all([
            this.props.restClient.user.getCurrentUser(),
            this.props.restClient.projects.getAllProjects()
        ])
            .then(([user, projects]) => {
                this.setState({
                    ownedProjects: Object.keys(user.projects).length,
                    name: user._id,
                    numOrganizations: user.orgs.length,
                    viewableProjects: projects.length
                });
            });
    }

    render() {
        return <section className="content" style={STYLING.profileBox}>

            <div className="box box-primary" style={STYLING.profileBoxBorder}>
                <div className="box-body box-profile">
                    <img className="profile-user-img img-responsive img-circle"
                         src="/img/gme-logo.png"
                         alt="User profile picture"/>

                    <h3 className="profile-username text-center">{this.state.name}</h3>

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

                    <a href="#" className="btn btn-primary btn-block"><b>Update (Coming Soon)</b></a>
                </div>
            </div>
        </section>;
    }

}

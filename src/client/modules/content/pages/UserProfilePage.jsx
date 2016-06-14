/**
 * Individual user profile page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import React from 'react/lib/React';

const STYLING = {
    profileBox: {
        paddingLeft: "35%",
        paddingRight: "35%"
    },
    profileBoxBorder: {
        padding: "10px 10px"
    }
};

export default class UserProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'loading',
            numProjects: 0,
            numOrganizations: 0
        };
    }

    componentDidMount() {
        this.props.restClient.user.getCurrentUser()
            .then(currentUser => {

                let localNumProj = 0;
                for (let oneProj in currentUser.projects) { // eslint-disable-line no-unused-vars, guard-for-in
                    localNumProj++;
                }
                this.setState({
                    name: currentUser._id,
                    numProjects: localNumProj,
                    numOrganizations: currentUser.orgs.length
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
                                <b>Projects</b> <a className="pull-right">{this.state.numProjects}</a>
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

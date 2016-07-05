/**
 * Individual user profile page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import React from 'react';

const STYLE = {
    profileBox: {
        paddingLeft: "35%",
        paddingRight: "35%"
    },
    profileBoxBorder: {
        padding: "10px 10px"
    }
};

export default class ProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ownedProjects: 0,
            name: '',
            numOrganizations: 0,
            viewableProjects: 0,
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
                    ownedProjects: Object.keys(user.projects).length,
                    numOrganizations: user.orgs.length,
                    user: user,
                    viewableProjects: projects.length
                });
            });
    }

    render() {
        return <section className="content" style={STYLE.profileBox}>

            <div className="box box-primary" style={STYLE.profileBoxBorder}>
                <div className="box-body box-profile">

                    <h3 className="profile-username text-center">&nbsp;{this.state.user._id}&nbsp;</h3>

                    <p className="text-muted text-center">WebGME</p>

                    <ul className="list-group list-group-unbordered">
                        <li className="list-group-item">
                            <b>UserID:</b> <a className="pull-right">&nbsp;{this.state.user._id}&nbsp;</a>
                        </li>
                        <li className="list-group-item">
                            <b>Email</b> <a className="pull-right">&nbsp;{this.state.user.email}&nbsp;</a>
                        </li>
                        <li className="list-group-item">
                            <b>Site Admin</b> <a className="pull-right">{this.state.user.siteAdmin ? 'Yes' : 'No'}</a>
                        </li>
                    </ul>

                </div>
            </div>

        </section>;
    }

}

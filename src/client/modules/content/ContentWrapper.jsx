/* global window */
import React from 'react';
import OrganizationsPage from './pages/OrganizationsPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import UserProfilePage from './pages/UserProfilePage.jsx';

export default class ContentWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.restClient = props.restClient;
    }

    render() {

        let Child;
        switch (this.props.passRoute.match(/\w+\/$/)[0]) {
        case 'projects/':
            Child = ProjectsPage;
            break;
        case 'profile/':
            Child = UserProfilePage;
            break;
        case 'organizations/':
            Child = OrganizationsPage;
            break;
        default:
            Child = ProjectsPage;
            // First time registering the URL
            window.location.hash = '#/projects/';
        }

        return <div className="content-wrapper">

            <section className="content-header">
                <h1>
                    WebGME Management:
                    <small> ...(optional)... </small>
                </h1>
                <ol className="breadcrumb">
                    <li>
                        <a href="#"><i className="fa fa-dashboard"/> Level</a>
                    </li>
                    <li className="active">Here
                    </li>
                </ol>
            </section>

            <Child restClient={this.restClient}/>

        </div>;
    }

}

ContentWrapper.propTypes = {
    passRoute: React.PropTypes.string,
    restClient: React.PropTypes.Object
};

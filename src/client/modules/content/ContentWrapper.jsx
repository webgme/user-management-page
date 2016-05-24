/* global window */
import React from 'react';
import OrganizationsPage from './pages/OrganizationsPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import UserProfilePage from './pages/UserProfilePage.jsx';
import ContentWrapperHeader from './ContentWrapperHeader.jsx';

export default class ContentWrapper extends React.Component {

    constructor(props) {
        super(props);
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
            <ContentWrapperHeader/>
            <Child/>
        </div>;
    }

}

ContentWrapper.propTypes = {
    passRoute: React.PropTypes.string
};

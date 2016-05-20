import React from 'react';
// import OrganizationsPage from './pages/OrganizationsPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
// import UserProfilePage from './pages/UserProfilePage.jsx';
import ContentWrapperHeader from './ContentWrapperHeader.jsx';

export default class ContentWrapper extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="content-wrapper">
            <ContentWrapperHeader />
            <ProjectsPage />
        </div>;
    }

}

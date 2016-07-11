/* global document */

/**
 * Routes for main app
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react';
import { IndexRedirect, Route } from 'react-router';
// Self-defined
import App from '../../common/containers/App';
import ContentWrapper from '../../common/components/content/ContentWrapper';
import HomePage from '../../common/containers/content/pages/HomePage';
import OrganizationPage from '../../common/containers/content/pages/OrganizationPage';
import OrganizationsPage from '../../common/containers/content/pages/OrganizationsPage';
import ProfilePage from '../../common/containers/content/pages/ProfilePage';
import ProjectPage from '../../common/containers/content/pages/ProjectPage';
import ProjectsPage from '../../common/components/content/pages/ProjectsPage';
import ProjectsByOwnerPage from '../../common/components/content/pages/ProjectsByOwnerPage';
import UsersPage from '../../common/components/content/pages/UsersPage';

const basePath = document.getElementById('baseUrlHolder').getAttribute('data');

export default (

    <Route path={basePath} component={App} basePath={basePath}>

        <IndexRedirect to="home" />

        <Route component={ContentWrapper}>

            <Route path="home" component={HomePage} />

            <Route path="organizations" component={OrganizationsPage} />

            <Route path="organizations/:organizationId" component={OrganizationPage} />

            <Route path="profile" component={ProfilePage} />

            <Route path="projects" component={ProjectsPage} />

            <Route path="projects/:ownerId" component={ProjectsByOwnerPage} />

            {/* Singular project needs same space so not a sub-component*/}
            <Route path="projects/:ownerId/:projectName" component={ProjectPage} />

            <Route path="users" component={UsersPage} />

        </Route>

    </Route>

);

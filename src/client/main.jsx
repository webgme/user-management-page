/**
 * Entry point for webpack, contains all client-side routing
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */
/* global document, require */

// Libraries
import browserHistory from 'react-router/lib/browserHistory';
import IndexRedirect from 'react-router/lib/IndexRedirect';
import React from 'react/lib/React';
import {render} from 'react/lib/ReactMount';
import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';
// Self-defined
import App from './modules/app';
import ContentWrapper from './modules/content/ContentWrapper';
import HomePage from './modules/content/pages/HomePage';
import OrganizationPage from './modules/content/pages/OrganizationPage';
import OrganizationsPage from './modules/content/pages/OrganizationsPage';
import ProjectPage from './modules/content/pages/ProjectPage';
import ProjectsPage from './modules/content/pages/ProjectsPage';
import UserProfilePage from './modules/content/pages/UserProfilePage';

require('admin-lte/dist/css/AdminLTE.min.css');
require('admin-lte/dist/css/skins/_all-skins.min.css');
require('admin-lte/dist/js/app');
require('bootstrap-webpack');
require('font-awesome-webpack');
require('react-select/examples/src/example.less');
require('chart.js');
require('react-chartjs');

let basePath = document.getElementById('baseUrlHolder').getAttribute('data');

render((

    <Router history={browserHistory}>

        <Route path={basePath} component={App} basePath={basePath}>

            <IndexRedirect to="home"/>

            <Route component={ContentWrapper}>

                <Route path="home" component={HomePage}/>

                <Route path="organizations" component={OrganizationsPage}/>

                <Route path="organizations/:organizationId" component={OrganizationPage}/>

                <Route path="profile" component={UserProfilePage}/>

                <Route path="projects" component={ProjectsPage}/>

                {/* Singular project needs same space so not a sub-component*/}
                <Route path="projects/:ownerId/:projectName" component={ProjectPage}/>

            </Route>

        </Route>

        {/* Empty path, reloads to login page*/}
        <Route path="/login"/>

    </Router>

), document.getElementById('mainEntry'));

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
// Our components
import App from './modules/app.jsx';
import ContentWrapper from './modules/content/ContentWrapper.jsx';
import OrganizationPage from './modules/content/pages/OrganizationPage.jsx';
import OrganizationsPage from './modules/content/pages/OrganizationsPage.jsx';
import ProjectPage from './modules/content/pages/ProjectPage.jsx';
import ProjectsPage from './modules/content/pages/ProjectsPage.jsx';
import UserProfilePage from './modules/content/pages/UserProfilePage.jsx';

require('admin-lte/dist/css/AdminLTE.min.css');
require('admin-lte/dist/css/skins/_all-skins.min.css');
require('admin-lte/dist/js/app');
require('bootstrap-webpack');
require('font-awesome-webpack');
require('react-select/examples/src/example.less');
require('chart.js');
require('react-chartjs');

const basePath = '/rest/external/usermanagement/';

render((

    <Router history={browserHistory}>

        <Route path={basePath} component={App} basePath={basePath}>

            <IndexRedirect to="projects"/>

            <Route component={ContentWrapper}>

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

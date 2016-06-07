/* global document, require */

// Libraries
import React from '../../node_modules/react/lib/React';
import {render} from 'react-dom';
import Router from '../../node_modules/react-router/lib/Router';
import Route from '../../node_modules/react-router/lib/Route';
import hashHistory from '../../node_modules/react-router/lib/hashHistory';
import IndexRedirect from '../../node_modules/react-router/lib/IndexRedirect';
// Our components
import App from './modules/app.jsx';
import UserProfilePage from './modules/content/pages/UserProfilePage.jsx';
import OrganizationsPage from './modules/content/pages/OrganizationsPage.jsx';
import ContentWrapper from './modules/content/ContentWrapper.jsx';
import ProjectPage from './modules/content/pages/ProjectPage.jsx';
import ProjectsPage from './modules/content/pages/ProjectsPage.jsx';

require('bootstrap-webpack');
require('font-awesome-webpack');
require('admin-lte/dist/css/AdminLTE.min.css');
require('admin-lte/dist/css/skins/_all-skins.min.css');
require('admin-lte/dist/js/app');
require('react-select/examples/src/example.less');

render((

    <Router history={hashHistory}>

        <Route path="/" component={App}>

            <IndexRedirect to="/projects"/>

            <Route component={ContentWrapper}>

                <Route path="/projects" component={ProjectsPage}/>

                {/* Singular project needs same space so not a sub-component*/}
                <Route path="/projects/:ownerId/:projectName" component={ProjectPage}/>

                <Route path="/profile" component={UserProfilePage}/>

                <Route path="/organizations" component={OrganizationsPage}/>

            </Route>

        </Route>

    </Router>

), document.getElementById('mainEntry'));

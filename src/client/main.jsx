/* global document */
import React from 'react';
import {render} from 'react-dom';
import App from './modules/app.jsx';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router';
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

        <Route path='/' component={App}>

            <IndexRedirect to="/projects"/>

            <Route component={ContentWrapper}>

                <Route path='/projects' component={ProjectsPage}/>

                {/*Singular project needs same space so not a subcomponent*/}
                <Route path="/projects/:ownerId/:projectName" component={ProjectPage}/>

                <Route path='/profile' component={UserProfilePage}/>

                <Route path='/organizations' component={OrganizationsPage}/>

            </Route>

        </Route>

    </Router>

), document.getElementById('mainEntry'));
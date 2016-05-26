/* global document */
import React from 'react';
import {render} from 'react-dom';
import App from './modules/app.jsx';
import {Router, Route, hashHistory, browserHistory} from 'react-router';
import ProjectsPage from './modules/content/pages/ProjectsPage.jsx';
import UserProfilePage from './modules/content/pages/UserProfilePage.jsx';
import OrganizationsPage from './modules/content/pages/OrganizationsPage.jsx';
import ContentWrapper from './modules/content/ContentWrapper.jsx';
import Header from './modules/header/Header.jsx';
import Sidebar from './modules/sidebar/SideBar.jsx';
import Footer from './modules/footer/Footer.jsx';


require('bootstrap-webpack');
require('font-awesome-webpack');
require('admin-lte/dist/css/AdminLTE.min.css');
require('admin-lte/dist/css/skins/_all-skins.min.css');
require('admin-lte/dist/js/app');

render((

    <Router history={hashHistory}>

        <Route path='/' component={App}>

            <Route component={ContentWrapper}>
                <Route path='/projects' component={ProjectsPage}/>
                <Route path='/profile' component={UserProfilePage}/>
                <Route path='/organizations' component={OrganizationsPage}/>
            </Route>

        </Route>

    </Router>

), document.getElementById('mainEntry'));
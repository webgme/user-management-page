/* global document */
import React from 'react';
import {render} from 'react-dom';
import App from './modules/app.jsx';
import {Router, Route, hashHistory, browserHistory} from 'react-router';
import ProjectsPage from './modules/content/pages/ProjectsPage.jsx';
import UserProfilePage from './modules/content/pages/UserProfilePage.jsx';
import OrganizationsPage from './modules/content/pages/OrganizationsPage.jsx';
import ContentWrapper from './modules/content/ContentWrapper.jsx';

require('bootstrap-webpack');
require('font-awesome-webpack');
require('admin-lte/dist/css/AdminLTE.min.css');
require('admin-lte/dist/css/skins/_all-skins.min.css');
require('admin-lte/dist/js/app');

render((
    <App/>
), document.getElementById('mainEntry'));
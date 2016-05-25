/* global document */
import React from 'react';
import {render} from 'react-dom';
import App from './modules/app.jsx';
import {Router, Route, hashHistory} from 'react-router';
import ProjectsPage from './modules/content/pages/ProjectsPage.jsx';

require('bootstrap-webpack');
require('font-awesome-webpack');
require('admin-lte/dist/css/AdminLTE.min.css');
require('admin-lte/dist/css/skins/_all-skins.min.css');
require('admin-lte/dist/js/app');

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
        <Route path="/projects" component={ProjectsPage}/>
    </Router>
));

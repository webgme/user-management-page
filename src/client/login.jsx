/* global document, require */

/**
 * Entry point for login/register page.
 *
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import browserHistory from 'react-router/lib/browserHistory';
import React from 'react/lib/React';
import {render} from 'react/lib/ReactMount';
import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';
// Self-defined
import App from './modules/login/app';
import LoginForm from './modules/login/LoginForm';
import RegisterForm from './modules/login/RegisterForm';

require('bootstrap-webpack');
require('admin-lte/dist/css/AdminLTE.min.css');

let basePath = document.getElementById('baseUrlHolder').getAttribute('data');

render((

    <Router history={browserHistory}>

        <Route path={basePath} component={App} basePath={basePath}>

            <Route path="login" component={LoginForm}/>

            <Route path="register" component={RegisterForm}/>

        </Route>

    </Router>

), document.getElementById('mainEntry'));

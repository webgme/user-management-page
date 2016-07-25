/* global document, require */

/**
 * Routes for login/register
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react';
import { Route } from 'react-router';
// Self-defined
import App from '../../common/components/login/app';
import LoginForm from '../../common/components/login/LoginForm';
import RegisterPage from '../../common/components/login/RegisterPage';

const basePath = document.getElementById('baseUrlHolder').getAttribute('data');

export default (

    <Route path={basePath} component={App} basePath={basePath}>

        <Route path="login" component={LoginForm}/>

        <Route path="register" component={RegisterPage}/>

    </Route>
);

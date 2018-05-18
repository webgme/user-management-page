/* global document, require */

/**
 * Routes for login/register
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react';
import { Route } from 'react-router-dom';
// Self-defined
import App from '../../common/components/login/app';
import LoginForm from '../../common/components/login/LoginForm';
import RegisterPage from '../../common/components/login/RegisterPage';

const basePath = document.getElementById('baseUrlHolder').getAttribute('data');

export default (
    <div>
        <Route path={`${basePath}login`} render={() => (
            <App basePath={basePath}>
                <LoginForm/>
            </App>)}
        />
        <Route path={`${basePath}register`} render={() => (
            <App basePath={basePath}>
                <RegisterPage/>
            </App>)}
        />
    </div>
);

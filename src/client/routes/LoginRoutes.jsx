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
const mountPath = document.getElementById('mountPathHolder').getAttribute('data');
const fullBasePath = basePath + mountPath;

export default (
    <div>
        <Route path={`${fullBasePath}login`} render={() => (
            <App basePath={fullBasePath}>
                <LoginForm/>
            </App>)}
        />
        <Route path={`${fullBasePath}register`} render={() => (
            <App basePath={fullBasePath}>
                <RegisterPage/>
            </App>)}
        />
    </div>
);

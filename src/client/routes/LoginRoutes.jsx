/* eslint-disable require-jsdoc */
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
import ResetPage from '../../common/components/login/ResetPage';

const basePath = document.getElementById('baseUrlHolder').getAttribute('data');
const mountPath = document.getElementById('mountPathHolder').getAttribute('data');
const fullBasePath = basePath + mountPath;

function Reset(props) {
    return (<App basePath={fullBasePath}>
        <ResetPage userId={props.match.params.userId} resetHash={props.match.params.resetHash}/>
    </App>);
}

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
        <Route path={`${fullBasePath}reset/:userId/:resetHash`} component={Reset}/>
    </div>
);

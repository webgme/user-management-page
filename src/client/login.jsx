/* global document, require */

/**
 * Entry point for login/register page.
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import React from 'react';
import {render} from 'react-dom';
import { browserHistory, Router } from 'react-router';
// Self-defined
import LoginRoutes from './routes/LoginRoutes';

require('bootstrap-webpack');
require('admin-lte/dist/css/AdminLTE.min.css');

render((

    <Router history={browserHistory} routes={LoginRoutes} />

), document.getElementById('mainEntry'));

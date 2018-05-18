/* global document, require */

/**
 * Entry point for login/register page.
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
// Self-defined
import LoginRoutes from './routes/LoginRoutes';

require('bootstrap-webpack');
require('admin-lte/dist/css/AdminLTE.min.css');

render((
    <div>
        <Router>
            {LoginRoutes}
        </Router>
    </div>

), document.getElementById('mainEntry'));

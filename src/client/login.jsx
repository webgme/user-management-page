/* global document, require */
/**
 * Entry point for login/register page.
 *
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import React from 'react';
import {render} from 'react-dom';
import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';

// Self-defined
import LoginApp from './modules/login/app';

require('bootstrap-webpack');
require('admin-lte/dist/css/AdminLTE.min.css');

render((<LoginApp/>), document.getElementById('mainEntry'));

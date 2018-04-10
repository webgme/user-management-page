/* global document, require */

/**
 * Entry point for webpack
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
// Self-defined
import MainRoutes from './routes/MainRoutes';
import configureStore from '../common/store';

// Preload store with basePath
const basePath = document.getElementById('baseUrlHolder').getAttribute('data');
const store = configureStore({ basePath });

require('admin-lte/dist/css/AdminLTE.min.css');
require('admin-lte/dist/css/skins/_all-skins.min.css');
require('admin-lte/dist/js/adminlte');
require('bootstrap-webpack');
require('font-awesome-webpack');
require('react-select/less/default.less');
require('chart.js');
require('react-chartjs');

render((

    <Provider store={store}>

        <Router history={browserHistory} routes={MainRoutes} />

    </Provider>

), document.getElementById('mainEntry'));

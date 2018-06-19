/* global document, require */

/**
 * Entry point for webpack
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
// Self-defined
import App from '../common/containers/App';
import configureStore from '../common/store';

// Preload store with basePath
const basePath = document.getElementById('baseUrlHolder').getAttribute('data');
const mountPath = document.getElementById('mountPathHolder').getAttribute('data');
const fullBasePath = basePath + mountPath;
const store = configureStore({basePath: fullBasePath});

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
        <Router>
            <App basePath={fullBasePath}/>
        </Router>
    </Provider>

), document.getElementById('mainEntry'));

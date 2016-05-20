import React from 'react';
import ReactDOM from 'react-dom';
import App from './modules/app.jsx';

require('bootstrap-webpack');
require('font-awesome/css/font-awesome.min.css');
require('admin-lte/dist/css/AdminLTE.min.css');
require('admin-lte/dist/css/skins/_all-skins.min.css');
require('admin-lte/dist/js/app');

ReactDOM.render(<App/>, document.getElementById('mainEntry'));

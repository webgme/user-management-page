import React from 'react'
import { render } from 'react-dom'
import App from './modules/app.jsx'
require('bootstrap-webpack');

require('admin-lte/dist/css/AdminLTE.min.css');
require('admin-lte/dist/css/skins/_all-skins.min.css');
require('admin-lte/dist/js/app');

render(<App/>, document.getElementById('mainEntry'));
/**
 * Settings menu of the header component
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import React, { Component } from 'react';

export default class SettingsMenu extends Component {

    render() {
        return <li className="nondropdown settings-menu">
            <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"/></a>
        </li>;
    }
}

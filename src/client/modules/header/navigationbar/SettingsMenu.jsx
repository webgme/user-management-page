/**
 * Settings menu of the header component
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import React from 'react/lib/React';

export default class SettingsMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <li className="nondropdown settings-menu">
            <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"/></a>
        </li>;
    }
}

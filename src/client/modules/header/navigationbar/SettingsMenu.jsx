import React from 'react';

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

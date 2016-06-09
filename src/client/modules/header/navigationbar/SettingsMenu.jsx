import React from '../../../../../node_modules/react/lib/React';

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
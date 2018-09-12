/**
 * Link to the editor button..
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import React, { Component } from 'react';
import {OverlayTrigger, Popover} from 'react-bootstrap';

export default class EditorLink extends Component {

    render() {
        const mountedPath = document.getElementById('baseUrlHolder').getAttribute('data');

        return (
            <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={
                <Popover id="GoToEditor">
                    Go to Editor!
                </Popover>}>
                <li className="nondropdown settings-menu">
                    <a href={mountedPath + "/"}>
                        <i className="fa fa-object-group"/>
                    </a>
                </li>
            </OverlayTrigger>
        );
    }
}

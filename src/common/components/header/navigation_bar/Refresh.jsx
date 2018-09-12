/**
 * Refresh component
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import React, { Component } from 'react';
import {OverlayTrigger, Popover} from "react-bootstrap";

export default class Refresh extends Component {

    render() {
        const { refresh } = this.props;

        return (
            <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={
                <Popover id="Refresh">
                    Refresh data
                </Popover>}>
                <li className="nondropdown settings-menu" onClick={refresh} >
                    <a href="#" data-toggle="control-sidebar">
                        <i className="fa fa-refresh" style={{pointerEvents: "none"}}/>
                    </a>
                </li>
            </OverlayTrigger>
        );
    }
}

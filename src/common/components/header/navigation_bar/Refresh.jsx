/**
 * Refresh component
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import React, { Component } from 'react';

export default class Refresh extends Component {

    render() {
        const { refresh } = this.props;

        return (
            <li className="nondropdown settings-menu" onClick={refresh} >
                <a href="#" data-toggle="control-sidebar">
                    <i className="fa fa-refresh" style={{pointerEvents: "none"}}/>
                </a>
            </li>
        );
    }
}

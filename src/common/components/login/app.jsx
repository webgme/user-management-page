/* globals window */
/**
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Self-defined
import LoginClient from '../../../client/rest_client/loginClient';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.loginClient = new LoginClient();

        if (window.top === window && typeof window.sessionStorage.getItem('originalReferrer') !== 'string') {
            window.sessionStorage.setItem('originalReferrer', window.document.referrer);
        }
    }

    render() {

        // Passing props through the route
        let FormWithBasePath = React.Children.map(this.props.children,
            child => React.cloneElement(child, {
                loginClient: this.loginClient,
                basePath: this.props.basePath
            }));

        return (
            <div className="login-box">
                <div className="login-logo">
                    <b>GME</b>Profile
                </div>

                {FormWithBasePath}

            </div>
        );
    }
}

App.propTypes = {
    basePath: PropTypes.string.isRequired
};

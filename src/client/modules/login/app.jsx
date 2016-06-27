/**
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import React from 'react/lib/React';
// Self-defined
import LoginClient from '../../rest_client/loginClient';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.loginClient = new LoginClient();
    }

    render() {

        // Passing props through the route
        let FormWithBasePath = React.Children.map(this.props.children,
            child => React.cloneElement(child, {
                loginClient: this.loginClient,
                basePath: this.props.route.basePath
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
    route: React.PropTypes.shape({
        basePath: React.PropTypes.string.isRequired
    })
};

/**
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import React from 'react/lib/React';
// Self-defined
import RestClient from '../../rest_client/restClient';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.restClient = new RestClient('');
    }

    render() {

        // Passing props through the route
        let FormWithBasePath = React.Children.map(this.props.children,
            child => React.cloneElement(child, {
                restClient: this.restClient,
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

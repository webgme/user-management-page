/**
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import React from 'react/lib/React';
// Self-defined

export default class LoginApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        // Passing props through the route
        let FormWithBasePath = React.Children.map(this.props.children,
            child => React.cloneElement(child, {
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

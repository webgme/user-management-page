/* global window */

/**
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';

// Self-defined
import RegisterForm from './RegisterForm';

export default class RegisterPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allowUserCreation: false
        };
        this.registerUser = this.registerUser.bind(this);
    }

    componentDidMount() {
        this.props.loginClient.getGmeConfig()
            .then(gmeConfig => {
                this.setState({
                    allowUserCreation: gmeConfig.authentication.allowUserRegistration
                });
            });
    }

    registerUser(userId, password, email) {
        return this.props.loginClient.register(userId, password, email)
            .then(() => {
                this.props.loginClient.login(userId, password)
                    .then(() => {
                        browserHistory.push('/');
                        window.location.reload();
                    });
            })
            .catch(err => {
                return err.status || 500;
            });
    }

    render() {

        return <RegisterForm onNewUser={this.registerUser}
                             backLinkData={{
                                 title: 'I already have an account',
                                 path: `${this.props.basePath}login`
                             }}
                             title="Register a new membership"
                             allowUserCreation={this.state.allowUserCreation}/>;
    }
}

RegisterPage.propTypes = {
    basePath: PropTypes.string,
    loginClient: PropTypes.object
};

/* global window */

/**
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

// Self-defined
import RegisterForm from './RegisterForm';

class RegisterPage extends Component {

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
                        this.props.history.push(this.props.basePath);
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

export default withRouter(RegisterPage);
/* global window */

/**
 * @author pmeijer / https://github.com/pmeijer
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { browserHistory, Link } from 'react-router';
// Self-defined
import LoginField from '../content/widgets/LoginField';
import {verifyEmail, verifyPassword, verifyUserOrOrganizationId} from '../../../client/utils/loginUtils';

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allowUserRegistration: false,
            // agreeToTerms: false,
            confirmPassword: '',
            email: '',
            // State so a different message for duplicate userId can be shown
            invalidMessage: {
                confirmPassword: "Passwords must match",
                email: "Invalid email",
                password: "Password must be at least 3 characters long and must not be " +
                          "a poor password such as 'password'",
                userId: "Username must only contain letters, numbers, and the underscore" +
                        " and must be at least 3 characters long"
            },
            password: '',
            userId: '',
            validCredentials: {
                // agreeToTerms: true,
                confirmPassword: true,
                email: true,
                password: true,
                userId: true
            }
        };

        // Event handlers
        this.checkAllFields = this.checkAllFields.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.checkUserId = this.checkUserId.bind(this);
        this.onAgreeToTermsChange = this.onAgreeToTermsChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.onUserIdChange = this.onUserIdChange.bind(this);
    }

    componentDidMount() {
        this.props.loginClient.getGmeConfig()
            .then(gmeConfig => {
                this.setState({
                    allowUserRegistration: gmeConfig.authentication.allowUserRegistration
                });
            });
    }

    checkAllFields() {
        this.setState({
            validCredentials: {
                // agreeToTerms: this.state.agreeToTerms,
                confirmPassword: this.state.password === this.state.confirmPassword,
                email: verifyEmail(this.state.email),
                password: verifyPassword(this.state.password),
                userId: verifyUserOrOrganizationId(this.state.userId)
            }
        });

    }

    checkEmail() {
        this.setState({
            validCredentials: {
                // agreeToTerms: this.state.validCredentials.agreeToTerms,
                confirmPassword: this.state.validCredentials.confirmPassword,
                email: verifyEmail(this.state.email),
                password: this.state.validCredentials.password,
                userId: this.state.validCredentials.userId
            }
        });
    }

    checkPassword() {
        this.setState({
            validCredentials: {
                // agreeToTerms: this.state.validCredentials.agreeToTerms,
                confirmPassword: this.state.validCredentials.confirmPassword,
                email: this.state.validCredentials.email,
                password: verifyPassword(this.state.password),
                userId: this.state.validCredentials.userId
            }
        });
    }

    checkUserId() {
        this.setState({
            validCredentials: {
                // agreeToTerms: this.state.validCredentials.agreeToTerms,
                confirmPassword: this.state.validCredentials.confirmPassword,
                email: this.state.validCredentials.email,
                password: this.state.validCredentials.password,
                userId: verifyUserOrOrganizationId(this.state.userId)
            }
        });
    }

    onAgreeToTermsChange() {
        this.setState({
            agreeToTerms: !this.state.agreeToTerms
        });
    }

    onConfirmPasswordChange(event) {
        this.setState({
            confirmPassword: event.target.value
        });
    }

    onEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }

    onPasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    onRegister() {
        let allValid = true;

        Promise.resolve(this.checkAllFields())
            .then(() => {
                Object.keys(this.state.validCredentials).forEach(key => {
                    if (!this.state.validCredentials[key]) {
                        allValid = false;
                    }
                });

                if (allValid) {
                    this.props.loginClient.register(this.state.userId, this.state.password, this.state.email)
                        .then(() => {
                            this.props.loginClient.login(this.state.userId, this.state.password)
                                .then(() => {
                                    browserHistory.push('/');
                                    window.location.reload();
                                });
                        })
                        .catch(err => {
                            if (err.status === 400) {
                                // Immutability add-ons aren't worth installing for this one case
                                this.setState({
                                    invalidMessage: {
                                        confirmPassword: "Passwords must match",
                                        email: "Invalid email",
                                        password: "Password must be at least 3 characters long and must not be " +
                                                  "a poor password such as 'password'",
                                        userId: "Username already taken"
                                    },
                                    validCredentials: {
                                        confirmPassword: this.state.password === this.state.confirmPassword,
                                        email: this.state.validCredentials.email,
                                        password: this.state.validCredentials.password,
                                        userId: false
                                    }
                                });
                            }
                            console.error(err); // eslint-disable-line no-console
                        });
                } else {
                    // Reset fields
                    this.setState({
                        // agreeToTerms: false,
                        confirmPassword: '',
                        email: this.state.validCredentials.email ? this.state.email : '',
                        password: '',
                        userId: this.state.validCredentials.userId ? this.state.userId : ''
                    });
                }
            });
    }

    onUserIdChange(event) {
        this.setState({
            userId: event.target.value
        });
    }

    render() {

        let validAndNotEmpty = Object.keys(this.state.validCredentials).reduce(
            (previousValue, currentValue /* , currentIndex, array */) => {
                return previousValue && this.state.validCredentials[currentValue] && this.state[currentValue] !== '';
            }, true);

        return <div className="register-box-body">
            <p className="login-box-msg">Register a new membership</p>

            {this.state.allowUserRegistration ? null :
                <div style={{color: "red", fontSize: "15px", paddingBottom: "10px", textAlign: "center"}}>
                    User Registration Not Permitted
                </div>}

            <form>

                {/* userId */}
                <LoginField autoFocus={true}
                            hint="User ID"
                            iconClass="glyphicon glyphicon-user"
                            invalidMessage={this.state.invalidMessage.userId}
                            onBlur={this.checkUserId}
                            onInputChange={this.onUserIdChange}
                            valid={this.state.validCredentials.userId}
                            value={this.state.userId}/>

                {/* email */}
                <LoginField hint="Email"
                            iconClass="glyphicon glyphicon-envelope"
                            invalidMessage={this.state.invalidMessage.email}
                            onBlur={this.checkEmail}
                            onInputChange={this.onEmailChange}
                            valid={this.state.validCredentials.email}
                            value={this.state.email}/>

                {/* password */}
                <LoginField hint="Password"
                            iconClass="glyphicon glyphicon-lock"
                            invalidMessage={this.state.invalidMessage.password}
                            onBlur={this.checkPassword}
                            onInputChange={this.onPasswordChange}
                            textType="password"
                            valid={this.state.validCredentials.password}
                            value={this.state.password}/>

                {/* confirm password */}
                <LoginField hint="Confirm password"
                            iconClass="glyphicon glyphicon-log-in"
                            invalidMessage={this.state.invalidMessage.confirmPassword}
                            onInputChange={this.onConfirmPasswordChange}
                            textType="password"
                            valid={this.state.validCredentials.confirmPassword}
                            value={this.state.confirmPassword}/>

                {/* Remember Check / Sign in attempt */}
                <div className="row">

                    {/*
                    {!this.state.validCredentials.agreeToTerms ? // eslint-disable-line no-negated-condition
                        <div className="row">
                            <div className="col-sm-12" style={{textAlign: "left"}}>
                                <span style={{color: "red", textAlign: "left"}}>Please agree to the terms</span>
                            </div>
                        </div> : null}
                     */}

                    <div className="col-sm-8" style={{paddingTop: "10px"}}>

                        {/*
                        <Checkbox checked={this.state.agreeToTerms}
                                  onChange={this.onAgreeToTermsChange}
                                  validationState={this.state.agreeToTerms ? "success" : "warning"}>
                            I agree to the terms
                        </Checkbox>
                        */}

                        <Link to={`${this.props.basePath}login`}>
                            I already have an account
                        </Link>

                    </div>

                    <div className="col-sm-4">
                        {this.state.allowUserRegistration ?
                            <Button bsStyle="primary"
                                    disabled={!validAndNotEmpty}
                                    onClick={this.onRegister}
                                    style={{float: "right", marginTop: "5px"}}>
                                Register
                            </Button> : null }
                    </div>

                </div>

            </form>

        </div>;
    }
}

RegisterForm.propTypes = {
    basePath: PropTypes.string,
    loginClient: PropTypes.object
};

/* global window */

/**
 * @author pmeijer / https://github.com/pmeijer
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import browserHistory from 'react-router/lib/browserHistory';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Link from 'react-router/lib/Link';
import React from 'react/lib/React';
// Self-defined
import LoginField from '../content/widgets/LoginField';
import {verifyEmail, verifyPassword, verifyUserOrOrganizationId} from '../../utils/loginUtils';

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // agreeToTerms: false,
            confirmPassword: '',
            email: '',
            password: '',
            userId: '',
            validCredentials: {
                agreeToTerms: true,
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

    checkAllFields() {
        return Promise.resolve(
            this.setState({
                validCredentials: {
                    // agreeToTerms: this.state.agreeToTerms,
                    confirmPassword: this.state.password === this.state.confirmPassword,
                    email: verifyEmail(this.state.email),
                    password: verifyPassword(this.state.password),
                    userId: verifyUserOrOrganizationId(this.state.userId)
                }
            })
        );
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

        this.checkAllFields()
            .then(() => {
                Object.keys(this.state.validCredentials).forEach(key => {
                    if (!this.state.validCredentials[key]) {
                        allValid = false;
                    }
                });

                if (allValid) {
                    this.props.loginClient.register(this.state.userId, this.state.password, this.state.email)
                        .then(() => {
                            browserHistory.push(this.props.basePath);
                            window.location.reload();
                        })
                        .catch(err => {
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
            (previousValue, currentValue, currentIndex, array) => {
                return previousValue && this.state.validCredentials[currentValue] && this.state[currentValue] !== '';
            }, true);

        return <div className="register-box-body">
            <p className="login-box-msg">Register a new membership</p>

            <form>

                {/* userId */}
                <LoginField hint="User ID"
                            iconClass="glyphicon glyphicon-user"
                            invalidMessage={"Username must only contain letters, numbers, and the underscore" +
                                            " and must be at least 3 characters long"}
                            onBlur={this.checkUserId}
                            onInputChange={this.onUserIdChange}
                            valid={this.state.validCredentials.userId}
                            value={this.state.userId}
                            warning={!this.state.validCredentials.userId}/>

                {/* email */}
                <LoginField hint="Email"
                            iconClass="glyphicon glyphicon-envelope"
                            invalidMessage={"Invalid email"}
                            onBlur={this.checkEmail}
                            onInputChange={this.onEmailChange}
                            valid={this.state.validCredentials.email}
                            value={this.state.email}
                            warning={!this.state.validCredentials.email}/>

                {/* password */}
                <LoginField hint="Password"
                            iconClass="glyphicon glyphicon-lock"
                            invalidMessage={"Password must be at least 3 characters long and must not be " +
                                            "a poor password such as 'password'"}
                            onBlur={this.checkPassword}
                            onInputChange={this.onPasswordChange}
                            textType="password"
                            valid={this.state.validCredentials.password}
                            value={this.state.password}
                            warning={!this.state.validCredentials.password}/>

                {/* confirm password */}
                <LoginField hint="Confirm password"
                            iconClass="glyphicon glyphicon-log-in"
                            invalidMessage={"Passwords must match"}
                            onInputChange={this.onConfirmPasswordChange}
                            textType="password"
                            valid={this.state.validCredentials.confirmPassword}
                            value={this.state.confirmPassword}
                            warning={!this.state.validCredentials.confirmPassword}/>

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
                        <Button bsStyle="primary"
                                disabled={!validAndNotEmpty}
                                onClick={this.onRegister}
                                style={{float: "right", marginTop: "5px"}}>
                            Register
                        </Button>
                    </div>

                </div>

            </form>

        </div>;
    }
}

RegisterForm.propTypes = {
    basePath: React.PropTypes.string,
    loginClient: React.PropTypes.object
};

/**
 * @author pmeijer / https://github.com/pmeijer
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Link from 'react-router/lib/Link';
import React from 'react/lib/React';
// Self-defined
import LoginField from '../content/widgets/LoginField';
import {verifyEmail, verifyPassword, verifyUserId} from '../../utils/loginUtils';

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agreeToTerms: false,
            confirmPassword: '',
            email: '',
            password: '',
            userId: ''
        };

        // Event handlers
        this.onAgreeToTermsChange = this.onAgreeToTermsChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.onUserIdChange = this.onUserIdChange.bind(this);
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
        this.props.restClient.login.register(this.state.userId, this.state.password, this.state.email)
            .catch(err => {
                console.error(err); // eslint-disable-line no-console
            });

        // Reset fields
        this.setState({
            agreeToTerms: false,
            confirmPassword: '',
            email: '',
            password: '',
            userId: ''
        });
    }

    onUserIdChange(event) {
        this.setState({
            userId: event.target.value
        });
    }

    render() {
        return <div className="register-box-body">
            <p className="login-box-msg">Register a new membership</p>

            <form>

                {/* Username */}
                <LoginField hint="User ID"
                            iconClass="glyphicon glyphicon-user"
                            onInputChange={this.onUserIdChange}
                            value={this.state.userId}/>

                {/* Email */}
                <LoginField hint="Email"
                            iconClass="glyphicon glyphicon-envelope"
                            onInputChange={this.onEmailChange}
                            value={this.state.email}/>

                {/* Password */}
                <LoginField hint="Password"
                            iconClass="glyphicon glyphicon-lock"
                            textType="password"
                            onInputChange={this.onPasswordChange}
                            value={this.state.password}/>

                {/* Confirm password */}
                <LoginField hint="Confirm password"
                            iconClass="glyphicon glyphicon-log-in"
                            textType="password"
                            onInputChange={this.onConfirmPasswordChange}
                            value={this.state.confirmPassword}/>

                {/* Remember Check / Sign in attempt */}
                <div className="row">

                    <Checkbox className="col-sm-6"
                              checked={this.state.agreeToTerms}
                              onChange={this.onAgreeToTermsChange}
                              validationState={this.state.agreeToTerms ? "success" : "warning"}>
                        I agree to the terms
                    </Checkbox>

                    <div className="col-sm-6">
                        <Button bsStyle="warning"
                                style={{float: "right"}}
                                disabled={!(verifyEmail(this.state.email) &&
                                            verifyPassword(this.state.password) &&
                                            verifyUserId(this.state.userId) &&
                                            this.state.agreeToTerms)}>
                            Register
                        </Button>
                    </div>

                </div>

            </form>

            <Link to={`${this.props.basePath}login`}>
                I already have an account
            </Link>
        </div>;
    }
}

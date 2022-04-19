/* eslint-disable require-jsdoc */
/* global window */

/**
 * @author pmeijer / https://github.com/pmeijer
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Link, withRouter} from 'react-router-dom';
// Self-defined
import LoginField from '../content/widgets/LoginField';
// Style
import {LoginForm as STYLE} from '../../../client/style';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allowGuests: false,
            allowUserRegistration: false,
            allowPasswordReset: false,
            password: '',
            rememberMe: false,
            userId: '',
            hasAdditionalInfo: false,
            additionalInfo: '',
            reset: 'none',
            allowAzureLogin: false,
        };
        // Event handlers
        this.onClickSignIn = this.onClickSignIn.bind(this); // Allows click to release focus vs enter key
        this.onClickSignInSmallDevice = this.onClickSignInSmallDevice.bind(this);
        this.onGuestLogIn = this.onGuestLogIn.bind(this);
        this.onGuestLogInSmallDevice = this.onGuestLogInSmallDevice.bind(this);
        this.onLogIn = this.onLogIn.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onRememberMeChange = this.onRememberMeChange.bind(this);
        this.onUserIdChange = this.onUserIdChange.bind(this);
        this.onReset = this.onReset.bind(this);

        this.onClickAAD = this.onClickAAD.bind(this);
        this.onAADLogin = this.onAADLogin.bind(this);
    }

    componentDidMount() {
        this.props.loginClient.getGmeConfig()
            .then((gmeConfig) => {
                this.setState({
                    allowGuests: gmeConfig.authentication.allowGuests,
                    allowUserRegistration: gmeConfig.authentication.allowUserRegistration,
                    allowPasswordReset: gmeConfig.authentication.allowPasswordReset,
                    allowAzureLogin: gmeConfig.authentication.enable &&
                        gmeConfig.authentication.azureActiveDirectory.enable,
                });
            });
    }

    onClickSignIn(event) {
        // Release focus
        event.target.blur();

        this.onLogIn();
    }

    onClickAAD(event) {
        // Release focus
        event.target.blur();

        this.onAADLogin();
    }

    onClickSignInSmallDevice(event) {
        // Release focus
        event.target.blur();

        this.onLogIn(true);
    }

    onGuestLogIn() {
        this.props.history.push('/');
        window.location.reload();
    }

    onGuestLogInSmallDevice() {
        this.props.history.push(this.props.basePath);
        window.location.reload();
    }

    onPasswordChange(event) {
        this.setState({
            password: event.target.value,
            hasAdditionalInfo: false,
        });
    }

    onRememberMeChange() {
        this.setState({
            rememberMe: !this.state.rememberMe,
        });
    }

    onLogIn(/* isSmallDevice */) {
        this.props.loginClient.login(this.state.userId, this.state.password)
            .then(res => {
                if (/2\d\d/.test(res.statusCode)) {

                    let redirectPath = /redirect=(\S+)/.exec(window.location.href) ?
                        /redirect=(\S+)/.exec(window.location.href)[1] : '';
                    let nextLocation = '';

                    if (redirectPath === '') {
                        nextLocation = this.props.basePath;
                    } else {
                        nextLocation = window.decodeURIComponent(redirectPath);
                    }

                    this.props.history.push(nextLocation);
                    window.location.reload();
                }
            })
            .catch(err => {
                // Reset fields
                this.setState({
                    password: '',
                    rememberMe: false,
                    hasAdditionalInfo: true,
                    additionalInfo: 'Invalid username or password.',
                    reset: this.state.allowPasswordReset ? 'ready' : null,
                });
            });
    }

    onAADLogin(/* isSmallDevice */) {
        this.props.loginClient.azureLogin()
            .then(res => {
                if (/2\d\d/.test(res.statusCode)) {

                    let redirectPath = /redirect=(\S+)/.exec(window.location.href) ?
                        /redirect=(\S+)/.exec(window.location.href)[1] : '';
                    let nextLocation = '';

                    if (redirectPath === '') {
                        nextLocation = this.props.basePath;
                    } else {
                        nextLocation = window.decodeURIComponent(redirectPath);
                    }

                    this.props.history.push(nextLocation);
                    window.location.reload();
                }
            })
            .catch(err => {
                // Reset fields
                this.setState({
                    password: '',
                    rememberMe: false,
                    hasAdditionalInfo: true,
                    additionalInfo: 'Error during AAD authentication of the user - check with your administrator.',
                    reset: this.state.allowPasswordReset ? 'ready' : null,
                });
            });
    }

    onReset() {
        this.props.loginClient.reset(this.state.userId)
            .then(_ => {
                this.setState({
                    reset: 'success',
                    hasAdditionalInfo: true,
                    additionalInfo: 'Password reset request has been sent.',
                });
            })
            .catch( err => {
                this.setState({
                    reset: 'falied',
                    hasAdditionalInfo: true,
                    additionalInfo: 'Cannot send password reset request!',
                });
            });
    }

    onUserIdChange(event) {
        this.setState({
            userId: event.target.value,
            hasAdditionalInfo: false,
        });
    }

    render() {
        return <div className="login-box-body">
            <p className="login-box-msg">
                Sign in to start your session
            </p>

            {this.state.hasAdditionalInfo ?
                <div>
                    <div className="row">
                        <div className="col-sm-12" style={STYLE.invalidLogin.column}>
                            <span style={STYLE.invalidLogin.text}>{this.state.additionalInfo}</span>
                        </div>
                    </div>
                    <br/>
                </div> : null}

            <form autoComplete="on" method="post">

                {/* Username */}
                <LoginField
                    autoFocus={true}
                    hint="User ID"
                    iconClass="glyphicon glyphicon-user"
                    name="username"
                    onInputChange={this.onUserIdChange}
                    valid={true}
                    value={this.state.userId}/>

                {/* Password */}
                <LoginField
                    hint="Password"
                    iconClass="glyphicon glyphicon-lock"
                    name="password"
                    onEnter={this.onLogIn}
                    onInputChange={this.onPasswordChange}
                    textType="password"
                    valid={this.state.hasAdditionalInfo}
                    value={this.state.password}/>

                {/* Remember Check / Sign in attempt */}
                <div className="row">

                    <div className="col-sm-4" style={{paddingTop: '10px'}}>

                        {/*
                        <Checkbox checked={this.state.rememberMe}
                                  onChange={this.onRememberMeChange}
                                  style={{marginBottom: 0}}
                                  validationState={this.state.rememberMe ? "success" : "warning"}>
                            Remember Me
                        </Checkbox>
                        */}

                        {/* TODO: implement system for forgot password
                        <OverlayTrigger trigger="click"
                                        placement="bottom"
                                        overlay={<Popover title="" id="randomId">
                                <strong>Coming soon</strong>
                                </Popover>}>
                            <Link to={`${this.props.basePath}login`}>I forgot my password</Link>
                        </OverlayTrigger>

                         <br/>*/}

                        {this.state.allowUserRegistration ?
                            <Link to={`${this.props.basePath}register`}>
                                Register
                            </Link> : null}
                    </div>
                    <div className="col-sm-8">

                        <div style={{float: 'right', marginTop: '5px'}}>
                            <ButtonGroup className="hidden-xs">
                                {this.state.allowPasswordReset && this.state.reset === 'ready' ?
                                    <Button
                                        bsStyle="danger"
                                        onClick={this.onReset}>
                                        Reset
                                    </Button> : null}
                                {this.state.allowGuests ?
                                    <Button
                                        bsStyle="warning"
                                        onClick={this.onGuestLogIn}>
                                        Guest
                                    </Button> : null}
                                {this.state.allowAzureLogin ?
                                    <Button
                                        bsStyle="warning"
                                        onClick={this.onClickAAD}>
                                        AAD login
                                    </Button> : null}
                                <Button
                                    bsStyle="primary"
                                    onClick={this.onClickSignIn}>
                                    Sign In
                                </Button>
                            </ButtonGroup>

                            <ButtonGroup className="visible-xs">
                                {this.state.allowPasswordReset && this.state.reset === 'ready' ?
                                    <Button
                                        bsStyle="danger"
                                        onClick={this.onReset}>
                                        Reset
                                    </Button> : null}
                                {this.state.allowGuests ?
                                    <Button
                                        bsStyle="warning"
                                        onClick={this.onGuestLogInSmallDevice}>
                                        Guest
                                    </Button> : null}
                                {this.state.allowAzureLogin ?
                                    <Button
                                        bsStyle="warning"
                                        onClick={this.onClickAAD}>
                                        AAD login
                                    </Button> : null}
                                <Button
                                    bsStyle="primary"
                                    onClick={this.onClickSignInSmallDevice}>
                                    Sign In
                                </Button>
                            </ButtonGroup>
                        </div>

                    </div>

                </div>

            </form>

        </div>;
    }
}

LoginForm.propTypes = {
    basePath: PropTypes.string,
    loginClient: PropTypes.object
};

export default withRouter(LoginForm);

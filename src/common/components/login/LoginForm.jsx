/* global window */

/**
 * @author pmeijer / https://github.com/pmeijer
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { browserHistory, Link } from 'react-router';
// Self-defined
import LoginField from '../content/widgets/LoginField';
// Style
import { LoginForm as STYLE } from '../../../client/style';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allowGuests: false,
            allowUserRegistration: false,
            password: '',
            rememberMe: false,
            userId: '',
            validCredentials: true
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
    }

    componentDidMount() {
        this.props.loginClient.getGmeConfig()
            .then((gmeConfig) => {
                this.setState({
                    allowGuests: gmeConfig.authentication.allowGuests,
                    allowUserRegistration: gmeConfig.authentication.allowUserRegistration
                });
            });
    }

    onClickSignIn(event) {
        // Release focus
        event.target.blur();

        this.onLogIn();
    }

    onClickSignInSmallDevice(event) {
        // Release focus
        event.target.blur();

        this.onLogIn(true);
    }

    onGuestLogIn() {
        browserHistory.push('/');
        window.location.reload();
    }

    onGuestLogInSmallDevice() {
        browserHistory.push(this.props.basePath);
        window.location.reload();
    }

    onPasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    onRememberMeChange() {
        this.setState({
            rememberMe: !this.state.rememberMe
        });
    }

    onLogIn(isSmallDevice) {
        this.props.loginClient.login(this.state.userId, this.state.password)
            .then(res => {
                if (/2\d\d/.test(res.statusCode)) {

                    let redirectPath = /redirect=(\S+)/.exec(window.location.href) ?
                                       /redirect=(\S+)/.exec(window.location.href)[1] : '',
                        nextLocation = '';

                    if (redirectPath === '') {
                        nextLocation = '/';
                    } else {
                        nextLocation = window.decodeURIComponent(redirectPath);
                    }

                    if (isSmallDevice) {
                        // On small device go to user-management right away.
                        nextLocation = this.props.basePath;
                    }

                    browserHistory.push(nextLocation);
                    window.location.reload();
                }
            })
            .catch(err => {
                console.error(err); // eslint-disable-line no-console
                // Reset fields
                this.setState({
                    password: '',
                    rememberMe: false,
                    validCredentials: false
                });
            });
    }

    onUserIdChange(event) {
        this.setState({
            userId: event.target.value
        });
    }

    render() {
        return <div className="login-box-body">
            <p className="login-box-msg">
                Sign in to start your session
            </p>

            {!this.state.validCredentials ?
                <div>
                    <div className="row">
                        <div className="col-sm-12" style={STYLE.invalidLogin.column}>
                            <span style={STYLE.invalidLogin.text}>Invalid username or password</span>
                        </div>
                    </div>
                    <br/>
                </div> : null}

            <form autoComplete="on" method="post">

                {/* Username */}
                <LoginField autoFocus={true}
                            hint="User ID"
                            iconClass="glyphicon glyphicon-user"
                            name="username"
                            onInputChange={this.onUserIdChange}
                            valid={true}
                            value={this.state.userId}/>

                {/* Password */}
                <LoginField hint="Password"
                            iconClass="glyphicon glyphicon-lock"
                            name="password"
                            onEnter={this.onLogIn}
                            onInputChange={this.onPasswordChange}
                            textType="password"
                            valid={this.state.validCredentials}
                            value={this.state.password}/>

                {/* Remember Check / Sign in attempt */}
                <div className="row">

                    <div className="col-sm-5" style={{paddingTop: "10px"}}>

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

                    <div className="col-sm-7">

                        <div style={{float: "right", marginTop: "5px"}}>
                            <ButtonGroup className="hidden-xs">
                                {this.state.allowGuests ?
                                    <Button bsStyle="warning"
                                            onClick={this.onGuestLogIn}>
                                        Guest
                                    </Button> : null}
                                <Button bsStyle="primary"
                                        onClick={this.onClickSignIn}>
                                    Sign In
                                </Button>
                            </ButtonGroup>

                            <ButtonGroup className="visible-xs">
                                {this.state.allowGuests ?
                                    <Button bsStyle="warning"
                                            onClick={this.onGuestLogInSmallDevice}>
                                        Guest
                                    </Button> : null}
                                <Button bsStyle="primary"
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

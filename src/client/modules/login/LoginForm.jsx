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
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import React from 'react/lib/React';
// Self-defined
import LoginField from '../content/widgets/LoginField';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            rememberMe: false,
            userId: '',
            validCredentials: true
        };
        // Event handlers
        this.onClickSignIn = this.onClickSignIn.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onRememberMeChange = this.onRememberMeChange.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
        this.onUserIdChange = this.onUserIdChange.bind(this);
    }

    onClickSignIn(event) {
        // Release focus
        event.target.blur();

        this.onSignIn();
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

    onSignIn() {

        this.props.loginClient.login(this.state.userId, this.state.password)
            .then(res => {
                if (/2\d\d/.test(res.statusCode)) {

                    let redirectPath = /redirect=(\S+)/.exec(window.location.href) ?
                        /redirect=(\S+)/.exec(window.location.href)[1] :
                        '',
                        nextLocation = '';

                    if (redirectPath === '') {
                        nextLocation = window.location.pathname.replace('login', '');
                    } else {
                        nextLocation = window.decodeURIComponent(redirectPath);
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
                        <div className="col-sm-12" style={{textAlign: "center"}}>
                            <span style={{color: "red", textAlign: "center"}}>Invalid username or password</span>
                        </div>
                    </div>
                    <br/>
                </div> : null}

            <form>

                {/* Username */}
                <LoginField hint="User ID"
                            iconClass="glyphicon glyphicon-user"
                            onInputChange={this.onUserIdChange}
                            valid={true}
                            value={this.state.userId}/>

                {/* Password */}
                <LoginField hint="Password"
                            iconClass="glyphicon glyphicon-lock"
                            onEnter={this.onSignIn}
                            onInputChange={this.onPasswordChange}
                            textType="password"
                            valid={this.state.validCredentials}
                            value={this.state.password}/>

                {/* Remember Check / Sign in attempt */}
                <div className="row">

                    <div className="col-sm-8" style={{paddingTop: "10px"}}>

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
                        <Link to={`${this.props.basePath}register`}>
                            Register
                        </Link>
                    </div>

                    <div className="col-sm-4">

                        <div style={{float: "right", marginTop: "5px"}}>
                            <Button bsStyle="primary"
                                    onClick={this.onSignIn}
                                disabled={this.state.userId === '' || this.state.password.length < 3}>
                                Sign In
                            </Button>
                        </div>

                    </div>

                </div>

            </form>

        </div>;
    }
}

LoginForm.propTypes = {
    basePath: React.PropTypes.string,
    loginClient: React.PropTypes.object
};

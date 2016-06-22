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

        this.props.loginClient.login(this.state.userId,
                                          this.state.password,
                                          "http://localhost:8888/rest/external/usermanagement/")
            .then(res => {
                if (/2\d\d/.test(res.statusCode)) {
                    let redirect = res.req._query[0],
                        decodedRedirect = window.decodeURIComponent(redirect),
                        url = /redirect=(\S+)/.exec(decodedRedirect)[1];
                    browserHistory.push(url);
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

            {!this.state.validCredentials ? <div>
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
                            value={this.state.userId}/>

                {/* Password */}
                <LoginField hint="Password"
                            iconClass="glyphicon glyphicon-lock"
                            onEnter={this.onSignIn}
                            onInputChange={this.onPasswordChange}
                            textType="password"
                            value={this.state.password}/>

                {/* Remember Check / Sign in attempt */}
                <div className="row">

                    <Checkbox className="col-sm-6"
                              checked={this.state.rememberMe}
                              onChange={this.onRememberMeChange}
                              validationState={this.state.rememberMe ? "success" : "warning"}>
                        Remember Me
                    </Checkbox>

                    <div className="col-sm-6">

                        <Link to={`${this.props.basePath}register`}>
                            <Button bsStyle="warning">
                                Register
                            </Button>
                        </Link>

                        <Button bsStyle="primary" onClick={this.onSignIn}>
                            Sign In
                        </Button>

                    </div>

                </div>

            </form>

            {/* TODO: implement system for forgot password */}
            <OverlayTrigger trigger="click"
                            placement="bottom"
                            overlay={<Popover title="" id="randomId">
                                <strong>Coming soon</strong>
                                </Popover>}>
                <Link to={`${this.props.basePath}login`}>I forgot my password</Link>
            </OverlayTrigger>

        </div>;
    }
}

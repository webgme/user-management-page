/**
 * Profile page container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
// Self-defined
import LoginField from '../../../components/content/widgets/LoginField';
import { fetchUser, fetchUserIfNeeded } from '../../../actions/user';
import { verifyEmail, verifyPassword } from '../../../../client/utils/loginUtils';
// Style
import { ProfilePage as STYLE } from '../../../../client/style';

class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmPassword: '',
            email: this.props.user.email,
            invalidMessage: {
                confirmPassword: "Passwords must match",
                email: "Invalid email",
                password: "Password must be at least 3 characters long and must not be " +
                          "a poor password such as 'password'",
                userId: "Username must only contain letters, numbers, and the underscore" +
                        " and must be at least 3 characters long"
            },
            password: '',
            validCredentials: {
                confirmPassword: true,
                email: true,
                password: true
            }
        };
        // Event handlers
        this.checkConfirmPassword = this.checkConfirmPassword.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchUserIfNeeded());
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            email: nextProps.user.email
        });
    }

    checkConfirmPassword() {
        this.setState({
            validCredentials: {
                confirmPassword: this.state.validCredentials.password &&
                                 this.state.password === this.state.confirmPassword,
                email: this.state.validCredentials.email,
                password: this.state.validCredentials.password,
                userId: this.state.validCredentials.userId
            }
        });
    }

    checkEmail() {
        this.setState({
            validCredentials: {
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
                confirmPassword: this.state.validCredentials.confirmPassword,
                email: this.state.validCredentials.email,
                password: verifyPassword(this.state.password),
                userId: this.state.validCredentials.userId
            }
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

    onUpdate(event) {
        event.preventDefault();

    }

    render() {
        const { user } = this.props;

        return <section className="content" style={STYLE.profileBox}>

            <div className="box box-primary" style={STYLE.profileBoxBorder}>
                <div className="box-body box-profile">

                    <h3 className="profile-username text-center">&nbsp;{user._id}&nbsp;</h3>

                    <p className="text-muted text-center">WebGME</p>

                    <ul className="list-group list-group-unbordered">
                        {/* Username */}
                        <LoginField iconClass="glyphicon glyphicon-user"
                                    name="username"
                                    readOnly={true}
                                    valid={true}
                                    value={`UserID: ${user._id ? user._id : ''}`}/>
                        {/* Custom Site Admin */}
                        <div>
                            <div className={`input-group`}>

                                <span className="input-group-addon">
                                    <i className="glyphicon glyphicon-check"/>
                                </span>
                                <div className="row">

                                    <div className="col-md-8">
                                        <input className="form-control"
                                               readOnly={true}
                                               value="Site Admin"/>
                                    </div>

                                    <div className="col-md-4" style={{float: "right"}}>
                                        <ButtonGroup>
                                            <Button bsStyle="default" disabled>Yes</Button>
                                            <Button bsStyle="primary">No</Button>
                                        </ButtonGroup>
                                    </div>

                                </div>
                            </div>

                            <br/>
                        </div>
                        {/* Email */}
                        <LoginField hint="Email"
                                    iconClass="glyphicon glyphicon-envelope"
                                    invalidMessage={this.state.invalidMessage.email}
                                    onBlur={this.checkEmail}
                                    onInputChange={this.onEmailChange}
                                    valid={this.state.validCredentials.email}
                                    value={this.state.email}/>
                        {/* New Password */}
                        <LoginField hint="New Password"
                                    iconClass="glyphicon glyphicon-lock"
                                    invalidMessage={this.state.invalidMessage.password}
                                    name="password"
                                    onBlur={this.checkPassword}
                                    onInputChange={this.onPasswordChange}
                                    textType="password"
                                    valid={this.state.validCredentials.password}
                                    value={this.state.password}/>
                        {/* Confirm New Password */}
                        <LoginField hint="Confirm New Password"
                                    iconClass="glyphicon glyphicon-log-in"
                                    invalidMessage={this.state.invalidMessage.confirmPassword}
                                    name="confirm-password"
                                    onBlur={this.checkConfirmPassword}
                                    onInputChange={this.onConfirmPasswordChange}
                                    textType="password"
                                    valid={this.state.validCredentials.confirmPassword}
                                    value={this.state.confirmPassword}/>

                    </ul>

                    <Button bsStyle="primary"
                            onClick={this.onUpdate}
                            style={STYLE.updateButton}>
                        Update
                    </Button>

                </div>
            </div>

        </section>;
    }

}

ProfilePage.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    const { user } = state.user;

    return {
        user
    };
};

export default connect(mapStateToProps)(ProfilePage);

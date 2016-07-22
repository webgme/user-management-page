/**
 * Reusable profile box
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
// Self-defined
import LoginField from '../../../components/content/widgets/LoginField';
import { fetchUser } from '../../../actions/user';
import { fetchUsers } from '../../../actions/users';
import { verifyEmail, verifyPassword } from '../../../../client/utils/loginUtils';
import { getUserIconSource } from '../../../../client/utils/utils';

// Style
import { ProfileBox as STYLE, ProfileImage as PROFILE_STYLE } from '../../../../client/style';

export default class ProfileBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmPassword: '',
            email: this.props.user ? this.props.user.email : '',
            invalidMessage: {
                confirmPassword: "Passwords must match",
                email: "Invalid email",
                password: "Password must be at least 3 characters long and must not be " +
                "a poor password such as 'password'"
            },
            password: '',
            siteAdmin: this.props.user.siteAdmin || false,
            validCredentials: {
                confirmPassword: true,
                email: true,
                password: true
            }
        };
        // Event handlers
        this.checkAllFields = this.checkAllFields.bind(this);
        this.checkConfirmPassword = this.checkConfirmPassword.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSiteAdminChange = this.onSiteAdminChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            email: nextProps.user.email,
            siteAdmin: nextProps.user.siteAdmin
        });
    }

    checkAllFields() {
        this.setState({
            validCredentials: {
                confirmPassword: this.state.password === this.state.confirmPassword,
                email: verifyEmail(this.state.email),
                password: verifyPassword(this.state.password) || this.state.password === ''
            }
        });
    }

    checkConfirmPassword() {
        this.setState({
            validCredentials: {
                confirmPassword: this.state.validCredentials.password &&
                this.state.password === this.state.confirmPassword,
                email: this.state.validCredentials.email,
                password: this.state.validCredentials.password
            }
        });
    }

    checkEmail() {
        this.setState({
            validCredentials: {
                confirmPassword: this.state.validCredentials.confirmPassword,
                email: verifyEmail(this.state.email),
                password: this.state.validCredentials.password
            }
        });
    }

    checkPassword() {
        this.setState({
            validCredentials: {
                confirmPassword: this.state.validCredentials.confirmPassword,
                email: this.state.validCredentials.email,
                password: verifyPassword(this.state.password)
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

    onSiteAdminChange(event) {
        // Release focus
        event.target.blur();

        this.setState({
            siteAdmin: event.target.checked
        });
    }

    onUpdate(event) {
        // Release focus
        event.target.blur();

        const { dispatch, editable, user } = this.props;

        Promise.resolve(this.checkAllFields())
            .then(() => {
                const valid = Object.keys(this.state.validCredentials).every(key => {
                    return this.state.validCredentials[key];
                });

                if (valid) {
                    let updatedUser = {
                        email: this.state.email
                    };
                    if (this.state.password !== '') {
                        updatedUser.password = this.state.password;
                    }
                    if (editable) {
                        updatedUser.siteAdmin = this.state.siteAdmin;
                    }

                    this.props.restClient.users.updateUser(user._id, updatedUser)
                        .then(() => {
                            this.setState({
                                password: '',
                                confirmPassword: '',
                                validCredentials: {
                                    confirmPassword: this.state.password === this.state.confirmPassword,
                                    email: true,
                                    password: true
                                }
                            });
                            // Refresh user
                            dispatch(fetchUser());
                            dispatch(fetchUsers());
                        })
                        .catch((err) => {
                            console.error('Error:', err); // eslint-disable-line no-console
                        });
                } else {
                    // Reset fields
                    this.setState({
                        confirmPassword: '',
                        email: this.state.validCredentials.email ? this.state.email : '',
                        password: ''
                    });
                }
            });
    }

    render() {
        const { editable, user } = this.props;

        return (
            <div className="col-md-6 col-md-offset-3">
                <div className="box box-primary" style={STYLE.profileBoxBorder}>
                    <div className="box-body box-profile">
                        <img className="profile-user-img img-responsive img-circle"
                             src={getUserIconSource(user._id)}
                             alt="User profile picture"
                             style={PROFILE_STYLE}/>

                        <h3 className="profile-username text-center">&nbsp;{user._id}&nbsp;</h3>

                        <ul className="list-group list-group-unbordered">
                            {/* Username */}
                            <LoginField disabled={true}
                                        iconClass="glyphicon glyphicon-user"
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
                                <input className="form-control"
                                       disabled={true}
                                       value="Site Admin"/>
                                <span className="input-group-addon">
                                    <input type="checkbox"
                                           onChange={this.onSiteAdminChange}
                                           disabled={!editable}
                                           checked={this.state.siteAdmin}
                                           aria-label="Checkbox for following text input"/>
                                </span>
                                    {/*<ButtonGroup>
                                    <Button bsStyle={this.state.siteAdmin ? "primary" : "default"}
                                            disabled={!editable}
                                            onClick={this.onSiteAdminChange}
                                            id="Yes">Yes</Button>
                                    <Button bsStyle={this.state.siteAdmin ? "default" : "primary"}
                                            disabled={!editable}
                                            onClick={this.onSiteAdminChange}
                                            id="No">No</Button>
                                </ButtonGroup>*/}
                                </div>

                                <br/>
                            </div>
                            {/* Email */}
                            <LoginField disabled={!editable}
                                        hint="Email"
                                        iconClass="glyphicon glyphicon-envelope"
                                        invalidMessage={this.state.invalidMessage.email}
                                        onBlur={this.checkEmail}
                                        onInputChange={this.onEmailChange}
                                        valid={this.state.validCredentials.email}
                                        value={this.state.email ? this.state.email : ''}/>
                            {/* New Password */}
                            {editable ?
                            <LoginField hint="New Password"
                                        iconClass="glyphicon glyphicon-lock"
                                        invalidMessage={this.state.invalidMessage.password}
                                        name="password"
                                        onBlur={this.checkPassword}
                                        onInputChange={this.onPasswordChange}
                                        textType="password"
                                        valid={this.state.validCredentials.password}
                                        value={this.state.password}/> : null}
                            {/* Confirm New Password */}
                            {editable ?
                            <LoginField hint="Confirm New Password"
                                        iconClass="glyphicon glyphicon-log-in"
                                        invalidMessage={this.state.invalidMessage.confirmPassword}
                                        name="confirm-password"
                                        onBlur={this.checkConfirmPassword}
                                        onInputChange={this.onConfirmPasswordChange}
                                        textType="password"
                                        valid={this.state.validCredentials.confirmPassword}
                                        value={this.state.confirmPassword}/> : null}

                        </ul>

                        {editable ?
                        <Button bsStyle="primary"
                                onClick={this.onUpdate}
                                style={STYLE.updateButton}>
                            Update
                        </Button> : null}

                    </div>
                </div>
            </div>
        );
    }

}

ProfileBox.propTypes = {
    dispatch: PropTypes.func.isRequired,
    editable: PropTypes.bool,
    restClient: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

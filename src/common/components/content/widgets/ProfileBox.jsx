/**
 * Reusable profile box
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, {Component, PropTypes} from 'react';
import {Button} from 'react-bootstrap';
// Self-defined
import LoginField from '../../../components/content/widgets/LoginField';
import {fetchUser} from '../../../actions/user';
import {fetchUsers} from '../../../actions/users';
import {verifyEmail, verifyPassword} from '../../../../client/utils/loginUtils';
import {getUserIconSource} from '../../../../client/utils/utils';
import CustomModal from './CustomModal';

// Style
import {ProfileBox as STYLE, ProfileImage as PROFILE_STYLE} from '../../../../client/style';

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
            canCreate: this.props.user.canCreate,
            validCredentials: {
                confirmPassword: true,
                email: true,
                password: true
            },
            hasEdits: false,
            showModal: false
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
        this.onCanCreateChange = this.onCanCreateChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.confirmModal = this.confirmModal.bind(this);
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
            confirmPassword: event.target.value,
            hasEdits: true
        });
    }

    onEmailChange(event) {
        this.setState({
            email: event.target.value,
            hasEdits: true
        });
    }

    onPasswordChange(event) {
        this.setState({
            password: event.target.value,
            hasEdits: true
        });
    }

    onSiteAdminChange(event) {
        // Release focus
        event.target.blur();

        this.setState({
            siteAdmin: event.target.checked,
            hasEdits: true
        });
    }

    onCanCreateChange(event) {
        // Release focus
        event.target.blur();

        this.setState({
            canCreate: event.target.checked,
            hasEdits: true
        });
    }

    deleteUser() {
        const {dispatch} = this.props;
        this.props.restClient.users.deleteUser(this.props.user._id)
            .then(() => {
                dispatch(fetchUsers());
            })
            .catch(() => {
                dispatch(fetchUsers());
            });
    }

    showModal() {
        this.setState({
            showModal: true
        });
    }

    hideModal() {
        this.setState({
            showModal: false
        });
    }

    confirmModal(event) {
        this.setState({
            showModal: false
        }, this.deleteUser(event));
    }

    onUpdate(event) {
        // Release focus
        event.target.blur();

        const {dispatch, editable, user} = this.props;

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
                    if (editable && !this.props.isCurrentUser) {
                        updatedUser.siteAdmin = this.state.siteAdmin;
                    }
                    if (editable && !this.props.isCurrentUser) {
                        updatedUser.canCreate = this.state.canCreate;
                    }

                    if (this.props.isCurrentUser) {
                        this.props.restClient.user.updateCurrentUser(updatedUser)
                            .then(() => {
                                this.setState({
                                    password: '',
                                    confirmPassword: '',
                                    validCredentials: {
                                        confirmPassword: this.state.password === this.state.confirmPassword,
                                        email: true,
                                        password: true
                                    },
                                    hasEdits: false
                                });
                                // Refresh user
                                dispatch(fetchUser());
                                dispatch(fetchUsers());
                            })
                            .catch((err) => {
                                console.error('Error:', err); // eslint-disable-line no-console
                                dispatch(fetchUser());
                                dispatch(fetchUsers());
                            });
                    } else {
                        this.props.restClient.users.updateUser(user._id, updatedUser)
                            .then(() => {
                                this.setState({
                                    password: '',
                                    confirmPassword: '',
                                    validCredentials: {
                                        confirmPassword: this.state.password === this.state.confirmPassword,
                                        email: true,
                                        password: true
                                    },
                                    hasEdits: false
                                });
                                // Refresh user
                                dispatch(fetchUser());
                                dispatch(fetchUsers());
                            })
                            .catch((err) => {
                                console.error('Error:', err); // eslint-disable-line no-console
                                dispatch(fetchUser());
                                dispatch(fetchUsers());
                            });
                    }
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
        const {editable, user, config, isCurrentUser} = this.props;
        let isGuest = user._id === config.authentication.guestAccount,
            nbrOfOwnedProjects = Object.keys(user.projects).filter(function(projectId) {
                // FIXME: Do not rely on split
                return projectId.split('+')[0] === user._id;
            }).length;

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
                            {/* Custom Site Admin (guest cannot be assigned siteAdmin) */}
                            { isGuest ? null :
                                <div>
                                    <div className={`input-group`}>
                                    <span className="input-group-addon">
                                        <i className="glyphicon glyphicon-check"/>
                                    </span>
                                        <input className="form-control"
                                               readOnly={true}
                                               disabled={(!editable || this.props.isCurrentUser) ? true : undefined}
                                               value="Site Admin"/>
                                    <span className="input-group-addon">
                                        <input type="checkbox"
                                               onChange={this.onSiteAdminChange}
                                               disabled={(!editable || this.props.isCurrentUser) ? true : undefined}
                                               readOnly={(!editable || this.props.isCurrentUser) ? true : undefined}
                                               checked={this.state.siteAdmin}
                                               aria-label="Checkbox for following text input"/>
                                    </span>
                                    </div>
                                    <br/>
                                </div>
                            }
                            {/* Custom Can Create*/}
                            {editable && !this.props.isCurrentUser ? <div>
                                <div className={`input-group`}>
                                    <span className="input-group-addon">
                                        <i className="glyphicon glyphicon-check"/>
                                    </span>
                                    <input className="form-control"
                                           readOnly={true}
                                           value="Can Create"/>
                                    <span className="input-group-addon">
                                        <input type="checkbox"
                                               onChange={this.onCanCreateChange}
                                               checked={this.state.canCreate}
                                               aria-label="Checkbox for following text input"/>
                                    </span>
                                </div>
                                <br/>
                            </div> : null}
                            {/* Email */}
                            { isGuest ? null :
                                <LoginField disabled={!editable}
                                            hint="Email"
                                            iconClass="glyphicon glyphicon-envelope"
                                            invalidMessage={this.state.invalidMessage.email}
                                            onBlur={this.checkEmail}
                                            onInputChange={this.onEmailChange}
                                            valid={this.state.validCredentials.email}
                                            value={this.state.email ? this.state.email : ''}/>
                            }
                            {/* New Password */}
                            {editable && !isGuest ?
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
                            {editable && !isGuest ?
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

                        {editable && !isCurrentUser && !isGuest ?
                            <Button bsStyle="danger"
                                    onClick={this.showModal}
                                    style={STYLE.deleteButton}>
                                Delete ...
                            </Button> : null}

                        {editable && this.state.hasEdits ?
                            <Button bsStyle="primary"
                                    onClick={this.onUpdate}
                                    style={STYLE.updateButton}>
                                Update
                            </Button> : null}

                    </div>
                </div>

                <CustomModal cancelButtonMessage="Cancel"
                             cancelButtonStyle="default"
                             closeHandler={this.hideModal}
                             confirmButtonMessage="OK"
                             confirmButtonStyle="danger"
                             confirmHandler={this.confirmModal}
                             confirmId={user._id}
                             modalMessage={'Are you sure you want to delete ' + user._id + '? This user owns ' +
                               nbrOfOwnedProjects + ' project(s).' + (nbrOfOwnedProjects > 0 ?
                                 ' Check projects table filtered by owner for full list. ' : ' ') +
                                 'Deleted users still reside in the database with the extra property "disabled: true"' +
                                 ' and can be recovered manually.'
                             }
                             showModal={this.state.showModal}
                             title="Delete User"/>
            </div>
        );
    }

}

ProfileBox.propTypes = {
    dispatch: PropTypes.func.isRequired,
    editable: PropTypes.bool,
    isCurrentUser: PropTypes.bool,
    restClient: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

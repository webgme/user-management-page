/**
 * Reusable profile box
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, {Component, PropTypes} from 'react';
import {Button, Well} from 'react-bootstrap';
// Self-defined
import LoginField from '../../../components/content/widgets/LoginField';
import {fetchUser} from '../../../actions/user';
import {fetchUsers} from '../../../actions/users';
import {fetchOrganizations} from '../../../actions/organizations';
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
            canCreate: this.props.user.canCreate || false,
            validCredentials: {
                confirmPassword: true,
                email: true,
                password: true
            },
            hasEdits: false,
            showModal: false,
            showModelEnableUser: false,

            showEditData: false,
            showEditSettings: false,
            editDataValue: JSON.stringify(this.props.user.data, null, 2),
            editSettingsValue: JSON.stringify(this.props.user.settings, null, 2)
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

        this.showModalEnableUser = this.showModalEnableUser.bind(this);
        this.hideModalEnableUser = this.hideModalEnableUser.bind(this);
        this.confirmModalEnableUser = this.confirmModalEnableUser.bind(this);

        this.showEditInline = this.showEditInline.bind(this);
        this.cancelEditInline = this.cancelEditInline.bind(this);
        this.onEditInlineChange = this.onEditInlineChange.bind(this);
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
        this.props.restClient.users.deleteUser(this.props.user._id, this.props.user.disabled)
            .then(() => {
                dispatch(fetchUsers());
                dispatch(fetchOrganizations());
            })
            .catch(() => {
                dispatch(fetchUsers());
            });
    }

    reEnableUser() {
        const {dispatch} = this.props;
        this.props.restClient.users.updateUser(this.props.user._id, {disabled: false})
            .then(() => {
                dispatch(fetchUsers());
            })
            .catch(() => {
                dispatch(fetchUsers());
            });
    }

    // Confirmation modals
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

    showModalEnableUser() {
        this.setState({
            showModalEnableUser: true
        });
    }

    hideModalEnableUser() {
        this.setState({
            showModalEnableUser: false
        });
    }

    confirmModalEnableUser(event) {
        this.setState({
            showModalEnableUser: false
        }, this.reEnableUser(event));
    }

    // Data/Settings forms
    showEditInline(event) {
        debugger;
        if (event.target.id === 'user-data-edit') {
            this.setState({
                showEditData: true
            });
        } else {
            this.setState({
                showEditSettings: true
            });
        }
    }

    cancelEditInline(event) {
        debugger;
        event.preventDefault();
        if (event.target.id === 'user-data-form') {
            this.setState({
                showEditData: false,
                editDataValue: JSON.stringify(this.props.user.data, null, 2)
            });
        } else {
            this.setState({
                showEditSettings: false,
                editSettingsValue: JSON.stringify(this.props.user.settings, null, 2)
            });
        }
    }

    onEditInlineChange(event) {
        debugger;
        if (event.target.id === 'user-data-text') {
            this.setState({
                editDataValue: event.target.value,
                hasEdits: true
            });
        } else {
            this.setState({
                editSettingsValue: event.target.value,
                hasEdits: true
            });
        }
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
                    if (this.props.currentUser.siteAdmin) {
                        updatedUser.siteAdmin = this.state.siteAdmin;
                    }
                    if (this.props.currentUser.siteAdmin) {
                        updatedUser.canCreate = this.state.canCreate;
                    }

                    if (this.props.isCurrentUser && !this.props.currentUser.siteAdmin) {
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
                        try {
                            let newData = JSON.parse(this.state.editDataValue);
                            if (JSON.stringify(newData) !== JSON.stringify(this.props.user.data)) {
                                // data valid and not the same
                                updatedUser.data = newData;
                            }
                        } catch (e) {
                            console.error(e);
                        }

                        try {
                            let newSettings = JSON.parse(this.state.editSettingsValue);
                            if (JSON.stringify(newSettings) !== JSON.stringify(this.props.user.settings)) {
                                // data valid and not the same
                                updatedUser.settings = newSettings;
                            }
                        } catch (e) {
                            console.error(e);
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
                                    },
                                    hasEdits: false,
                                    showEditData: false,
                                    showEditSettings: false,
                                    editDataValue: JSON.stringify(updatedUser.data || this.props.user.data, null, 2),
                                    editSettingsValue: JSON.stringify(updatedUser.settings || this.props.user.settings,
                                        null, 2)
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
        const {editable, user, config, isCurrentUser, currentUser} = this.props;
        let isGuest = user._id === config.authentication.guestAccount,
            nbrOfOwnedProjects = Object.keys(user.projects).filter(function (projectId) {
                // FIXME: Do not rely on split
                return projectId.split('+')[0] === user._id;
            }).length;

        return (
                <div className="box box-primary" style={STYLE.profileBoxBorder}>
                    <div className="box-body box-profile">
                        <img className="profile-user-img img-responsive img-circle"
                             src={getUserIconSource(user._id)}
                             alt="User profile picture"
                             style={PROFILE_STYLE}/>

                        <h3 className="profile-username text-center" style={user.disabled ? {color: 'grey'} : {}}>
                            &nbsp;{user._id + (user.disabled ? ' (Disabled)' : '')}&nbsp;
                        </h3>

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

                        {currentUser.siteAdmin?
                            <div>
                                <div style={STYLE.infoTitle}>
                                    DATA
                                    {user.disabled ? null :
                                        <i id="user-data-edit" className="fa fa-cog pull-right"
                                           style={{cursor: 'pointer'}}
                                           onClick={this.showEditInline}/>
                                    }
                                </div>

                                {this.state.showEditData ?
                                    <form id="user-data-form" onSubmit={this.cancelEditInline}>
                                        <textarea id="user-data-text" value={this.state.editDataValue}
                                                  style={STYLE.textArea}
                                                  onChange={this.onEditInlineChange}/>
                                        <input className="btn btn-default btn-xs" type="submit" value="Cancel"/>
                                    </form> :
                                    <pre style={STYLE.preTextArea}>
                                        {JSON.stringify(user.data, null, 2)}
                                    </pre>
                                }

                                <br/>

                                <div style={STYLE.infoTitle}>
                                    SETTINGS
                                    {user.disabled ? null :
                                        <i id="user-settings-edit" className="fa fa-cog pull-right"
                                           style={{cursor: 'pointer'}}
                                           onClick={this.showEditInline}/>
                                    }
                                </div>

                                {this.state.showEditSettings ?
                                    <form id="user-settings-form" onSubmit={this.cancelEditInline}>
                                        <textarea id="user-settings-text" value={this.state.editSettingsValue}
                                                  style={STYLE.textArea}
                                                  onChange={this.onEditInlineChange}/>
                                        <input className="btn btn-default btn-xs" type="submit" value="Cancel"/>
                                    </form> :
                                    <pre style={STYLE.preTextArea}>
                                        {JSON.stringify(user.settings, null, 2)}
                                    </pre>
                                }

                                <br/>
                            </div>
                            : null
                        }

                        {currentUser.siteAdmin && !isCurrentUser && !isGuest ?
                            <Button bsStyle="danger"
                                    onClick={this.showModal}
                                    style={STYLE.deleteButton}>
                                {user.disabled ? 'Force' : ''} Delete ...
                            </Button> : null}

                        {currentUser.siteAdmin && user.disabled ?
                            <Button bsStyle="primary"
                                    onClick={this.showModalEnableUser}
                                    style={STYLE.updateButton}>
                                Enable User ...
                            </Button> : null}

                        {editable && this.state.hasEdits ?
                            <Button bsStyle="primary"
                                    onClick={this.onUpdate}
                                    style={STYLE.updateButton}>
                                Update
                            </Button> : null}
                    </div>

                    <CustomModal cancelButtonMessage="Cancel"
                                 cancelButtonStyle="default"
                                 closeHandler={this.hideModal}
                                 confirmButtonMessage="OK"
                                 confirmButtonStyle="danger"
                                 confirmHandler={this.confirmModal}
                                 confirmId={user._id}
                                 modalMessage={
                             user.disabled ?
                               'Are you really sure that you forcefully want to delete ' + user._id + '? After the ' +
                               'deletion there will no longer be any stored data for the user. If this user was ever ' +
                                'logged in and a new users registers under the same id - the previous user might ' +
                                 'have sessions stored allowing him to identify as the new user! Additionaly if any ' +
                                  'projects are owned by "' + user._id + '" these would be owned by any new user or ' +
                                   'organization created at the now would be available id.' :

                             'Are you sure you want to delete ' + user._id + '? This user owns ' +
                               nbrOfOwnedProjects + ' project(s).' + (nbrOfOwnedProjects > 0 ?
                                 ' Check projects table filtered by owner for full list. ' : ' ') +
                                 'Deleted users still reside in the database with the extra property "disabled: true"' +
                                 ' and can be recovered manually.'
                             }
                                 showModal={this.state.showModal}
                                 title={user.disabled ? "Forcefully Delete User" : "Delete User"}/>

                    <CustomModal cancelButtonMessage="Cancel"
                                 cancelButtonStyle="default"
                                 closeHandler={this.hideModalEnableUser}
                                 confirmButtonMessage="OK"
                                 confirmButtonStyle="danger"
                                 confirmHandler={this.confirmModalEnableUser}
                                 confirmId={user._id}
                                 modalMessage={
                             'Are you sure you want to re-enable the deleted user "' + user._id + '"? After ' +
                             're-enabling the user the account will be active and the user will be able to log in ' +
                              'with the user-id and password stored.'
                             }
                                 showModal={this.state.showModalEnableUser}
                                 title={"Enable User"}/>
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

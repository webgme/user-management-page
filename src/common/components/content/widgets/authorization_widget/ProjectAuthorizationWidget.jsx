/**
 * Separate component to hold the authorization widget for the project page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
// Self defined
import AuthorizationWidget from './AuthorizationWidget';
import { multiselectFormat, sortObjectArrayByField } from '../../../../../client/utils/utils';
import { fetchOrganizations, fetchOrganizationsIfNeeded } from '../../../../actions/organizations';
import { fetchUsers, fetchUsersIfNeeded } from '../../../../actions/users';

export default class ProjectAuthorizationWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authorizeButtonGroup: {r: true, w: false, d: false},
            multiselectOptions: [],
            valuesInMultiselect: ''
        };
        // Event Handlers
        this.handleAuthorizationChange = this.handleAuthorizationChange.bind(this);
        this.handleMultiselectChange = this.handleMultiselectChange.bind(this);
        this.handleSubmitAuthorization = this.handleSubmitAuthorization.bind(this);
    }

    componentDidMount() {
        const { dispatch, organizations, users} = this.props;

        dispatch(fetchOrganizationsIfNeeded());
        dispatch(fetchUsersIfNeeded());

        let multiselectOptions = multiselectFormat(users.concat(organizations).sort(sortObjectArrayByField('_id')));
        this.setState({
            multiselectOptions
        });
    }

    componentWillReceiveProps(nextProps) {
        const { organizations, users } = nextProps;

        let multiselectOptions = multiselectFormat(users.concat(organizations).sort(sortObjectArrayByField('_id')));
        this.setState({
            multiselectOptions
        });
    }

    handleAuthorizationChange(event) {
        // Release focus
        event.target.blur();

        let buttonClicked = event.target.innerHTML.toLowerCase(),
            authorizeButtonGroup = this.state.authorizeButtonGroup;

        // Radio buttons
        Object.keys(this.state.authorizeButtonGroup).forEach(right => {
            authorizeButtonGroup[right] = right === buttonClicked;
        });

        this.setState({
            authorizeButtonGroup: authorizeButtonGroup
        });
    }

    handleMultiselectChange(value) {
        this.setState({
            valuesInMultiselect: value || ''
        });
    }

    handleSubmitAuthorization(event) {
        const { dispatch } = this.props;
        // Release focus
        event.target.blur();

        // Check if the user chose to authorize users or organizations
        let projectRights = '';
        if (this.state.authorizeButtonGroup.r) {
            projectRights = 'r';
        } else if (this.state.authorizeButtonGroup.w) {
            projectRights = 'rw';
        } else if (this.state.authorizeButtonGroup.d) {
            projectRights = 'rwd';
        }

        let promiseArrayToGrant = [];
        if (this.state.valuesInMultiselect !== '') {
            this.state.valuesInMultiselect.split(',').forEach(userOrOrgName => {
                promiseArrayToGrant.push(
                    this.props.restClient.projects.grantRightsToProject(this.props.ownerId,
                                                                        this.props.projectName,
                                                                        userOrOrgName,
                                                                        projectRights));
            });
        }

        Promise.all(promiseArrayToGrant)
            .then(() => {
                dispatch(fetchOrganizations());
                dispatch(fetchUsers());
            })
            .catch(err => {
                console.error(err); // eslint-disable-line no-console
            });

        // Reset fields after submitting
        this.setState({
            authorizeButtonGroup: {r: true, w: false, d: false},
            valuesInMultiselect: ''
        });
    }

    render() {
        const { canAuthorize } = this.props;

        const authorizationWidgetData = {
            selectableButtons: [
                {
                    onChange: this.handleAuthorizationChange,
                    text: 'R',
                    state: this.state.authorizeButtonGroup.r ? 'success' : null
                },
                {
                    onChange: this.handleAuthorizationChange,
                    text: 'W',
                    state: this.state.authorizeButtonGroup.w ? 'success' : null
                },
                {
                    onChange: this.handleAuthorizationChange,
                    text: 'D',
                    state: this.state.authorizeButtonGroup.d ? 'success' : null
                }
            ],
            submitButtons: [
                {
                    disabled: this.state.valuesInMultiselect === '',
                    onChange: this.handleSubmitAuthorization,
                    state: 'primary',
                    text: 'Submit'

                }
            ]
        };

        return (
            canAuthorize ?
                <AuthorizationWidget boxSize="12"
                                     disableLast={true}
                                     handleMultiselectChange={this.handleMultiselectChange}
                                     label={"Add Collaborators"}
                                     multi={true}
                                     multiselectOptions={this.state.multiselectOptions}
                                     noneSelected={this.state.valuesInMultiselect === ''}
                                     placeholder="Select one or more (type to search)"
                                     selectableButtons={authorizationWidgetData.selectableButtons}
                                     selectableButtonsChange={this.handleAuthorizationChange}
                                     selectableButtonsHelperTitle="Select Access Level"
                                     selectableButtonsHelperText="R - Read, W - Write, D - Delete"
                                     submitButtons={authorizationWidgetData.submitButtons}
                                     valuesInMultiselect={this.state.valuesInMultiselect}/> : null
        );
    }

}

ProjectAuthorizationWidget.propTypes = {
    organizations: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired
};

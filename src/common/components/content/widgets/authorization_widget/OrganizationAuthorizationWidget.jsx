/**
 * Separate component to hold the authorization widget for the organization page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
// Self defined
import AuthorizationWidget from './AuthorizationWidget';
import {multiselectFormat, sortObjectArrayByField} from '../../../../../client/utils/utils';
import { fetchUsers, fetchUsersIfNeeded } from '../../../../actions/users';
import { fetchOrganizations } from '../../../../actions/organizations';

export default class OrganizationAuthorizationWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valuesInMultiselect: ''
        };
        // Event Handlers
        this.handleMultiselectChange = this.handleMultiselectChange.bind(this);
        this.handleSubmitAuthorization = this.handleSubmitAuthorization.bind(this);
    }

    componentDidMount() {
        const { dispatch, users} = this.props;
        dispatch(fetchUsersIfNeeded());

        let multiselectOptions = multiselectFormat(users.sort(sortObjectArrayByField('_id')));
        this.setState({
            multiselectOptions
        });
    }

    componentWillReceiveProps(nextProps) {
        const { users } = nextProps;

        let multiselectOptions = multiselectFormat(users.sort(sortObjectArrayByField('_id')));
        this.setState({
            multiselectOptions
        });
    }

    handleMultiselectChange(value) {
        this.setState({
            valuesInMultiselect: value || ''
        });
    }

    handleSubmitAuthorization(event) {
        const { dispatch } = this.props;
        let promiseArrayToGrant = [];

        if (this.state.valuesInMultiselect !== '') {
            this.state.valuesInMultiselect.split(',').forEach(username => {
                promiseArrayToGrant.push(
                    this.props.restClient.organizations.addUserToOrganization(this.props.organizationId,
                        username)
                );
            });
        }

        Promise.all(promiseArrayToGrant)
            .then(() => {
                // Have to update the list after authorization rights change
                dispatch(fetchUsers());
                dispatch(fetchOrganizations());
            })
            .catch(err => {
                console.error(err); // eslint-disable-line no-console
            });

        // Empty multiselect after submission
        this.setState({
            valuesInMultiselect: ''
        });

    }

    render() {
        const { canAuthorize } = this.props;

        const authorizationWidgetData = {
            submitButtons: [
                {
                    onChange: this.handleSubmitAuthorization,
                    text: 'Submit',
                    state: 'primary',
                    disabled: this.state.valuesInMultiselect === ''
                }
            ]
        };

        return (
            canAuthorize ?
                <AuthorizationWidget boxSize="12"
                                     disableLast={true}
                                     handleMultiselectChange={this.handleMultiselectChange}
                                     label={"Add Members"}
                                     multi={true}
                                     multiselectOptions={this.state.multiselectOptions}
                                     noneSelected={this.state.valuesInMultiselect === ''}
                                     submitButtons={authorizationWidgetData.submitButtons}
                                     valuesInMultiselect={this.state.valuesInMultiselect}/> : null
        );
    }

}

OrganizationAuthorizationWidget.propTypes = {
    users: PropTypes.array.isRequired
};

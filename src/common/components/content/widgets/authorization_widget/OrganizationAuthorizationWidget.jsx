/**
 * Separate component to hold the authorization widget for the organization page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react';
// Self defined
import AuthorizationWidget from './AuthorizationWidget';
import {multiselectFormat, sortObjectArrayByField} from '../../../../../client/utils/utils';

export default class OrganizationAuthorizationWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valuesInMultiselect: ''
        };
        // Data Retrieval
        this.retrieveMultiselectOptions = this.retrieveMultiselectOptions.bind(this);
        // Event Handlers
        this.handleMultiselectChange = this.handleMultiselectChange.bind(this);
        this.handleSubmitAuthorization = this.handleSubmitAuthorization.bind(this);
    }

    componentDidMount() {
        this.retrieveMultiselectOptions();
    }

    retrieveMultiselectOptions() {
        this.props.restClient.users.getAllUsers()
            .then(allUsers => {
                this.setState({
                    multiselectOptions: multiselectFormat(allUsers.sort(sortObjectArrayByField('_id')))
                });
            });
    }

    handleMultiselectChange(value) {
        this.setState({
            valuesInMultiselect: value
        });
    }

    handleSubmitAuthorization(event) {

        let promiseArrayToGrant = [];

        // Only accounts for users right now
        if (this.props.display === 1 && this.state.valuesInMultiselect !== '') {
            this.state.valuesInMultiselect.split(',').forEach(username => {
                if (/Add/.test(event.target.innerHTML)) { // have to remove rights if none are selected
                    promiseArrayToGrant.push(
                        this.props.restClient.organizations.addUserToOrganization(this.props.organizationId,
                            username)
                    );
                } else if (/Remove/.test(event.target.innerHTML)) {
                    promiseArrayToGrant.push(
                        this.props.restClient.organizations.deleteUserFromOrganization(this.props.organizationId,
                            username)
                    );
                }
            });
        } else if (this.props.display === 2 && this.state.valuesInMultiselect !== '') {
            this.state.valuesInMultiselect.split(',').forEach(username => {
                if (/Add/.test(event.target.innerHTML)) { // have to remove rights if none are selected
                    promiseArrayToGrant.push(
                        this.props.restClient.organizations.makeAdminOfOrganization(this.props.organizationId,
                            username)
                    );
                } else if (/Remove/.test(event.target.innerHTML)) {
                    promiseArrayToGrant.push(
                        this.props.restClient.organizations.removeAdminOfOrganization(this.props.organizationId,
                            username)
                    );
                }
            });
        }

        Promise.all(promiseArrayToGrant)
            .then(() => {
                // Have to update the list after authorization rights change
                this.props.refreshTable();
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

        let authorizationWidgetData = {
            // Have to make these selectable to be in the right place
            submitButtons: [
                {
                    selectableButtonChange: this.handleSubmitAuthorization,
                    selectableButtonText: this.props.display === 1 ? 'Add members' : 'Add admins',
                    selectableButtonState: "success"
                },
                {
                    selectableButtonChange: this.handleSubmitAuthorization,
                    selectableButtonText: this.props.display === 1 ? 'Remove members' : 'Remove admins',
                    selectableButtonState: "danger"
                }
            ]
        };

        return (
        <AuthorizationWidget authorization={this.props.authorization}
                             boxSize="6"
                             handleMultiselectChange={this.handleMultiselectChange}
                             label={this.props.display === 1 ? "Add or Remove Members" : "Add or Remove Admins"}
                             multiselectOptions={this.state.multiselectOptions}
                             ownerId={this.props.organizationId}
                             restClient={this.props.restClient}
                             selectableButtons={authorizationWidgetData.submitButtons}
                             selectableButtonsChange={this.handleAuthorizationChange}
                             valuesInMultiselect={this.state.valuesInMultiselect}/>
        );
    }

}

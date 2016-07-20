/**
 * Transfer project widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
// Self defined
import AuthorizationWidget from './authorization_widget/AuthorizationWidget';
import { fetchOrganizations, fetchOrganizationsIfNeeded } from '../../../actions/organizations';
import { fetchProjects } from '../../../actions/projects';
import { fetchUsers } from '../../../actions/users';

export default class ProjectTransferWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multiselectOptions: [],
            valuesInMultiselect: ''
        };
        // Event Handlers
        this.handleMultiselectChange = this.handleMultiselectChange.bind(this);
        this.handleTransfer = this.handleTransfer.bind(this);
    }

    componentDidMount() {
        const { dispatch, orgsCanTransferTo } = this.props;

        dispatch(fetchOrganizationsIfNeeded());

        let multiselectOptions = orgsCanTransferTo.sort().map((orgId) => {
            return {
                label: orgId,
                value: orgId
            };
        });

        // FIXME: eslint warning
        this.setState({
            multiselectOptions
        });
    }

    componentWillReceiveProps(nextProps) {
        const { orgsCanTransferTo } = nextProps;

        let multiselectOptions = orgsCanTransferTo.sort().map((orgId) => {
            return {
                label: orgId,
                value: orgId
            };
        });
        this.setState({
            multiselectOptions
        });
    }

    handleMultiselectChange(value) {
        this.setState({
            valuesInMultiselect: value || ''
        });
    }

    handleTransfer(event) {
        const { basePath, dispatch, ownerId, projectName, restClient } = this.props;
        // Release focus
        event.target.blur();

        if (this.state.valuesInMultiselect !== '') {
            let newOwnerId = this.state.valuesInMultiselect;

            restClient.projects.transferProject(ownerId, projectName, newOwnerId)
                .then(() => {
                    dispatch(fetchOrganizations());
                    dispatch(fetchProjects());
                    dispatch(fetchUsers());

                    // Redirect to projects page
                    browserHistory.push(`${basePath}projects`);
                })
                .catch((err) => {
                    console.error(err); // eslint-disable-line no-console
                });
        }
        // Reset fields after submitting
        this.setState({
            valuesInMultiselect: ''
        });
    }

    render() {
        const { canTransfer } = this.props;
        const authorizationWidgetData = {
            submitButtons: [
                {
                    disabled: this.state.valuesInMultiselect === '',
                    onChange: this.handleTransfer,
                    text: 'Transfer',
                    state: "primary"
                }
            ]
        };

        return (
            canTransfer ?
                <AuthorizationWidget boxSize="12"
                                     disableLast={true}
                                     handleMultiselectChange={this.handleMultiselectChange}
                                     label={"Transfer Project"}
                                     multi={false}
                                     multiselectOptions={this.state.multiselectOptions}
                                     noneSelected={this.state.valuesInMultiselect === ''}
                                     placeholder="Select an organization (type to search)"
                                     submitButtons={authorizationWidgetData.submitButtons}
                                     valuesInMultiselect={this.state.valuesInMultiselect}/> : null
        );
    }

}

ProjectTransferWidget.propTypes = {
    orgsCanTransferTo: PropTypes.array.isRequired
};

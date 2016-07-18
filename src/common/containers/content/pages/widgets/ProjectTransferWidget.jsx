/**
 * Transfer project widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
// Self defined
import AuthorizationWidget from '../../../../components/content/widgets/authorization_widget/AuthorizationWidget';
import { getOrgsUserCanTransferTo } from '../../../../../client/utils/restUtils';
import { fetchOrganizations, fetchOrganizationsIfNeeded } from '../../../../actions/organizations';
import { fetchProjects } from '../../../../actions/projects';
import { fetchUsers } from '../../../../actions/users';

class ProjectTransferWidget extends Component {

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
        const { dispatch, orgsUserCanTransferTo } = this.props;

        dispatch(fetchOrganizationsIfNeeded());

        let multiselectOptions = orgsUserCanTransferTo.sort().map((orgId) => {
            return {
                label: orgId,
                value: orgId
            };
        });
        this.setState({
            multiselectOptions
        });
    }

    componentWillReceiveProps(nextProps) {
        const { orgsUserCanTransferTo } = nextProps;

        let multiselectOptions = orgsUserCanTransferTo.sort().map((orgId) => {
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
            valuesInMultiselect: value
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
        const authorizationWidgetData = {
            // Have to make these selectable to be in the right place
            selectableButtons: [
                {
                    selectableButtonChange: this.handleTransfer,
                    selectableButtonText: 'Transfer',
                    selectableButtonState: "primary"
                }
            ]
        };

        return (
            <AuthorizationWidget boxSize="12"
                                 handleMultiselectChange={this.handleMultiselectChange}
                                 label={"Transfer Project"}
                                 multi={false}
                                 multiselectOptions={this.state.multiselectOptions}
                                 noneSelected={this.state.valuesInMultiselect === ''}
                                 placeholder="Select an organization (type to search)"
                                 selectableButtons={authorizationWidgetData.selectableButtons}
                                 selectableButtonsChange={this.handleAuthorizationChange}
                                 submitButtons={authorizationWidgetData.submitButtons}
                                 valuesInMultiselect={this.state.valuesInMultiselect}/>
        );
    }

}

ProjectTransferWidget.propTypes = {
    orgsUserCanTransferTo: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const { basePath } = state;
    const { organizations } = state.organizations;

    const orgsUserCanTransferTo = getOrgsUserCanTransferTo(organizations, ownProps.userId, ownProps.ownerId);

    return {
        basePath,
        orgsUserCanTransferTo
    };
};

export default connect(mapStateToProps)(ProjectTransferWidget);

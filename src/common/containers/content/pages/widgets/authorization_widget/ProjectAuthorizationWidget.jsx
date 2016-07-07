/**
 * Separate component to hold the authorization widget for the project page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Self defined
import AuthorizationWidget from '../../../../../components/content/widgets/authorization_widget/AuthorizationWidget';
import { multiselectFormat, sortObjectArrayByField } from '../../../../../../client/utils/utils';
import { fetchOrganizationsIfNeeded } from '../../../../../actions/organizations';
import { fetchUsersIfNeeded } from '../../../../../actions/users';

class ProjectAuthorizationWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authorizeButtonGroup: {read: true, write: false, delete: false},
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
        const { dispatch, organizations, users } = nextProps;

        dispatch(fetchOrganizationsIfNeeded());
        dispatch(fetchUsersIfNeeded());

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
            valuesInMultiselect: value
        });
    }

    handleSubmitAuthorization(event) {
        // Release focus
        event.target.blur();

        // Check if the user chose to authorize users or organizations
        let projectRights = '';
        if (this.state.authorizeButtonGroup.read) {
            projectRights = 'r';
        } else if (this.state.authorizeButtonGroup.write) {
            projectRights = 'rw';
        } else if (this.state.authorizeButtonGroup.delete) {
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
                // this.props.refreshTable();
            })
            .catch(err => {
                console.error(err); // eslint-disable-line no-console
            });

        // Reset fields after submitting
        this.setState({
            authorizeButtonGroup: {read: true, write: false, delete: false},
            valuesInMultiselect: ''
        });
    }

    render() {

        let authorizationWidgetData = {
            selectableButtons: [
                {
                    selectableButtonChange: this.handleAuthorizationChange,
                    selectableButtonText: 'Read',
                    selectableButtonState: this.state.authorizeButtonGroup.read ? 'primary' : null
                },
                {
                    selectableButtonChange: this.handleAuthorizationChange,
                    selectableButtonText: 'Write',
                    selectableButtonState: this.state.authorizeButtonGroup.write ? 'primary' : null
                },
                {
                    selectableButtonChange: this.handleAuthorizationChange,
                    selectableButtonText: 'Delete',
                    selectableButtonState: this.state.authorizeButtonGroup.delete ? 'primary' : null
                }
            ],
            submitButtons: [
                {
                    submitButtonHandler: this.handleSubmitAuthorization,
                    submitButtonText: 'Submit',
                    submitButtonState: 'primary'
                }
            ]
        };

        return (

            <AuthorizationWidget authorization={this.props.authorization}
                                 boxSize="12"
                                 disableLast={true}
                                 handleMultiselectChange={this.handleMultiselectChange}
                                 label={"Authorize Users or Organizations"}
                                 multiselectOptions={this.state.multiselectOptions}
                                 noneSelected={this.state.valuesInMultiselect === ''}
                                 ownerId={this.props.ownerId}
                                 restClient={this.props.restClient}
                                 selectableButtons={authorizationWidgetData.selectableButtons}
                                 selectableButtonsChange={this.handleAuthorizationChange}
                                 submitButtons={authorizationWidgetData.submitButtons}
                                 valuesInMultiselect={this.state.valuesInMultiselect} />
        );
    }

}

ProjectAuthorizationWidget.propTypes = {
    organizations: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    const { organizations } = state.organizations;
    const { users } = state.users;

    return {
        organizations,
        users
    };
};

export default connect(mapStateToProps)(ProjectAuthorizationWidget);

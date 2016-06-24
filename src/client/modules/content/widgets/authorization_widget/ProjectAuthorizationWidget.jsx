/**
 * Separate component to hold the authorization widget for the project page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';
// Self defined
import AuthorizationWidget from './AuthorizationWidget';
import {multiselectFormat, sortObjectArrayByField} from '../../../../utils/utils';

export default class ProjectAuthorizationWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authorizeButtonGroup: {read: false, write: false, delete: false},
            multiselectOptions: [],
            valuesInMultiselect: ''
        };
        // Data Retrieval
        this.retrieveMultiselectOptions = this.retrieveMultiselectOptions.bind(this);
        // Event Handlers
        this.handleAuthorizationChange = this.handleAuthorizationChange.bind(this);
        this.handleMultiselectChange = this.handleMultiselectChange.bind(this);
        this.handleSubmitAuthorization = this.handleSubmitAuthorization.bind(this);
    }

    componentDidMount() {
        this.retrieveMultiselectOptions();
    }

    retrieveMultiselectOptions() {
        Promise.all([
            this.props.restClient.users.getAllUsers(),
            this.props.restClient.organizations.getAllOrganizations()
        ]).then(([allUsers, allOrganizations]) => {
            let usersAndOrganizations = allUsers.concat(allOrganizations);
            this.setState({
                multiselectOptions: multiselectFormat(usersAndOrganizations.sort(sortObjectArrayByField('_id')))
            });
        });
    }

    handleAuthorizationChange(event) {
        // Release focus
        event.target.blur();

        let buttonClicked = event.target.innerHTML.toLowerCase(),
            holdButtonGroup = this.state.authorizeButtonGroup;

        // Incremental Buttons
        if (buttonClicked === 'none') {
            holdButtonGroup = {read: false, write: false, delete: false};
        } else {
            // Handling selection
            if (this.state.authorizeButtonGroup[buttonClicked] === false) {
                for (let button in holdButtonGroup) {
                    if (button === buttonClicked) {
                        holdButtonGroup[buttonClicked] = true;
                        break;
                    } else {
                        holdButtonGroup[button] = true;
                    }
                }
                // Handling deselection
            } else if (this.state.authorizeButtonGroup[buttonClicked] === true) {
                let passedCurrentButton = false;
                for (let button in holdButtonGroup) {
                    if (button === buttonClicked) {
                        holdButtonGroup[buttonClicked] = false;
                        passedCurrentButton = true;
                    } else if (passedCurrentButton) {
                        holdButtonGroup[button] = false;
                    }
                }
            }
        }

        this.setState({
            authorizeButtonGroup: holdButtonGroup
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
        projectRights += this.state.authorizeButtonGroup.read ? 'r' : '';
        projectRights += this.state.authorizeButtonGroup.write ? 'w' : '';
        projectRights += this.state.authorizeButtonGroup.delete ? 'd' : '';

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
                this.props.refreshTable();
            })
            .catch(err => {
                console.error(err); // eslint-disable-line no-console
            });

        // Reset fields after submitting
        this.setState({
            authorizeButtonGroup: {read: false, write: false, delete: false},
            valuesInMultiselect: ''
        });
    }

    render() {

        let authorizationWidgetData = {
            noRightsSelected: !(this.state.authorizeButtonGroup.read ||
                                this.state.authorizeButtonGroup.write ||
                                this.state.authorizeButtonGroup.delete)
        };
        authorizationWidgetData.selectableButtons = [
            {
                selectableButtonChange: this.handleAuthorizationChange,
                selectableButtonText: 'None',
                selectableButtonState: authorizationWidgetData.noRightsSelected ? 'primary' : null
            },
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
        ];
        authorizationWidgetData.submitButtons = [
            {
                submitButtonHandler: this.handleSubmitAuthorization,
                submitButtonText: 'Submit',
                submitButtonState: authorizationWidgetData.noRightsSelected ? 'danger' : 'success'
            }
        ];

        return (

            <AuthorizationWidget boxSize="12"
                                 disableLast={true}
                                 handleMultiselectChange={this.handleMultiselectChange}
                                 label={"Authorize Users or Organizations"}
                                 multiselectOptions={this.state.multiselectOptions}
                                 noRightsSelected={authorizationWidgetData.noRightsSelected}
                                 ownerId={this.props.ownerId}
                                 restClient={this.props.restClient}
                                 selectableButtons={authorizationWidgetData.selectableButtons}
                                 selectableButtonsChange={this.handleAuthorizationChange}
                                 submitButtons={authorizationWidgetData.submitButtons}
                                 valuesInMultiselect={this.state.valuesInMultiselect}/>
        );
    }

}
